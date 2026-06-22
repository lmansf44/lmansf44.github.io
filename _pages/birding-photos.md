---
layout: page
title: my bird photos
permalink: /birding/photos/
nav: false
description:
---

{% include birding/styles.liquid %}

<div class="birding-page">
  <a class="birding-back" href="{{ '/birding/' | relative_url }}">&larr; back to birding</a>

  <div class="birding-grid">
    {% assign all_photos = site.data.birding.bird_photos |  reverse %}
    {% for photo in all_photos %}
      {% assign sub_text = photo.location | escape %}
      <button
        type="button"
        class="birding-card birding-lightbox-trigger"
        data-full="{{ photo.image | relative_url }}"
        data-title="{{ photo.species | escape }}"
        data-sub="{{ sub_text }}"
      >
        <img src="{{ photo.image | relative_url }}" alt="{{ photo.species | escape }}" loading="lazy" />
        <div class="birding-overlay">
          <span class="birding-overlay-title">{{ photo.species }}</span>
          <span class="birding-overlay-sub">{{ photo.location }}</span>
        </div>
      </button>
    {% endfor %}
  </div>
</div>

{% include birding/lightbox.liquid %}
