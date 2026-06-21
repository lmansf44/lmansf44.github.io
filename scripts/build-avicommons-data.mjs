#!/usr/bin/env node
/**
 * build-avicommons-data.mjs
 * -----------------------------------------------------------------------------
 * Resolves _data/birding/life_list.yml against the Avicommons photo dataset
 * and writes the result to _data/birding/avicommons_resolved.json, which
 * Jekyll reads as `site.data.birding.avicommons_resolved`.
 *
 * Why this exists: Avicommons asks that you NOT fetch their JSON file on
 * every page load. This script fetches it once, at build time, keeps only
 * the handful of species on your life list, and discards the rest -- so the
 * live site never talks to avicommons.org directly.
 *
 * Run automatically in CI (see .github/workflows/deploy.yml, which runs this
 * before `bundle exec jekyll build`). To preview locally before pushing:
 *
 *   npm run build:avicommons
 *   bundle exec jekyll serve
 *
 * For offline testing (no network required), point it at the bundled sample:
 *
 *   node scripts/build-avicommons-data.mjs --source test/fixtures/avicommons-sample.json
 * -----------------------------------------------------------------------------
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load as parseYaml } from "js-yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const DEFAULT_SOURCE = "https://avicommons.org/latest.json";
const LIFE_LIST_PATH = path.join(ROOT, "_data", "birding", "life_list.yml");
const OUTPUT_PATH = path.join(ROOT, "_data", "birding", "avicommons_resolved.json");

// CC license short-codes -> canonical license deed URLs (used for attribution links).
const LICENSE_URLS = {
  "cc0": "https://creativecommons.org/publicdomain/zero/1.0/",
  "pdm": "https://creativecommons.org/publicdomain/mark/1.0/",
  "cc-by": "https://creativecommons.org/licenses/by/4.0/",
  "cc-by-sa": "https://creativecommons.org/licenses/by-sa/4.0/",
  "cc-by-nd": "https://creativecommons.org/licenses/by-nd/4.0/",
  "cc-by-nc": "https://creativecommons.org/licenses/by-nc/4.0/",
  "cc-by-nc-sa": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  "cc-by-nc-nd": "https://creativecommons.org/licenses/by-nc-nd/4.0/",
};

function parseArgs(argv) {
  const args = { source: DEFAULT_SOURCE };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--source" && argv[i + 1]) {
      args.source = argv[i + 1];
      i++;
    }
  }
  return args;
}

async function loadAvicommonsData(source) {
  let raw;
  if (/^https?:\/\//.test(source)) {
    console.log(`Fetching Avicommons dataset from ${source} ...`);
    const res = await fetch(source);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${source}: ${res.status} ${res.statusText}`);
    }
    raw = await res.json();
  } else {
    const filePath = path.isAbsolute(source) ? source : path.join(ROOT, source);
    console.log(`Reading Avicommons dataset from local file ${filePath} ...`);
    raw = JSON.parse(readFileSync(filePath, "utf8"));
  }

  // The full Avicommons JSON has historically shipped either as a flat array
  // of records (each with its own `code`), or as an object keyed by species
  // code. Normalize both shapes into an array of records.
  let records;
  if (Array.isArray(raw)) {
    records = raw;
  } else if (raw && typeof raw === "object") {
    records = Object.entries(raw).map(([code, value]) => ({ code, ...value }));
  } else {
    throw new Error("Unrecognized Avicommons JSON shape (expected array or object).");
  }
  return records;
}

function buildLookupMaps(records) {
  const byCode = new Map();
  const byName = new Map();
  const bySciName = new Map();

  for (const record of records) {
    if (!record || !record.code) continue;
    byCode.set(record.code.toLowerCase(), record);
    if (record.name) byName.set(record.name.toLowerCase(), record);
    if (record.sciName) bySciName.set(record.sciName.toLowerCase(), record);
  }
  return { byCode, byName, bySciName };
}

function resolveEntry(entry, lookups) {
  const { byCode, byName, bySciName } = lookups;
  const candidates = [];

  if (entry.code) candidates.push(String(entry.code).toLowerCase());
  if (entry.species) candidates.push(String(entry.species).toLowerCase());

  for (const candidate of candidates) {
    if (byCode.has(candidate)) return byCode.get(candidate);
    if (byName.has(candidate)) return byName.get(candidate);
    if (bySciName.has(candidate)) return bySciName.get(candidate);
  }
  return null;
}

async function main() {
  const { source } = parseArgs(process.argv.slice(2));

  if (!existsSync(LIFE_LIST_PATH)) {
    throw new Error(`Could not find life list at ${LIFE_LIST_PATH}`);
  }
  const lifeList = parseYaml(readFileSync(LIFE_LIST_PATH, "utf8")) || [];
  if (!Array.isArray(lifeList)) {
    throw new Error(`${LIFE_LIST_PATH} should contain a YAML list of entries.`);
  }

  const records = await loadAvicommonsData(source);
  const lookups = buildLookupMaps(records);

  const resolved = [];
  let unmatchedCount = 0;

  lifeList.forEach((entry, index) => {
    const label = entry.code || entry.species || `entry #${index + 1}`;

    if (!entry.date || (!entry.code && !entry.species)) {
      console.warn(
        `⚠️  Skipping life list entry "${label}": needs both a date and either "code" or "species".`,
      );
      return;
    }

    const match = resolveEntry(entry, lookups);
    if (!match) {
      unmatchedCount++;
      console.warn(
        `⚠️  No Avicommons photo found for "${label}". Check the spelling/code in life_list.yml. ` +
          `This entry will still show on your site (with the name you typed) but without a photo.`,
      );
    }

    resolved.push({
      matched: Boolean(match),
      code: match ? match.code : entry.code || null,
      name: match ? match.name : entry.species || entry.code,
      sciName: match ? match.sciName : null,
      key: match ? match.key : null,
      by: match ? match.by : null,
      license: match ? match.license : null,
      license_url: match && match.license ? LICENSE_URLS[match.license] || null : null,
      date: entry.date,
      location: entry.location || null,
      notes: entry.notes || null,
    });
  });

  // Number the life list chronologically (#1 = earliest date), independent
  // of whatever order the entries happen to be listed in life_list.yml.
  const byDateAsc = [...resolved].sort((a, b) => new Date(a.date) - new Date(b.date));
  const numberByIdentity = new Map();
  byDateAsc.forEach((entry, i) => numberByIdentity.set(entry, i + 1));
  resolved.forEach((entry) => {
    entry.number = numberByIdentity.get(entry);
  });

  mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(resolved, null, 2) + "\n");

  console.log(
    `\n✅ Wrote ${resolved.length} life list entries to ${path.relative(ROOT, OUTPUT_PATH)} ` +
      `(${resolved.length - unmatchedCount} matched, ${unmatchedCount} unmatched).`,
  );
}

main().catch((err) => {
  console.error("\n❌ build-avicommons-data.mjs failed:", err.message);
  process.exit(1);
});
