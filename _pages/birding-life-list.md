---
layout: page
title: my life list
permalink: /birding/life-list/
nav: false
description: 
---

{% include birding/styles.liquid %}

<div class="birding-page">
  <a class="birding-back" href="{{ '/birding/' | relative_url }}">&larr; back to birding</a>
  
  <p>
    Photos are courtesy of <a href="https://avicommons.org/" target="_blank" rel="noopener noreferrer">Avicommons</a>,
    a library of Creative Commons&ndash;licensed bird photos.
  </p>

  <div class="birding-grid">
    {% assign all_lifers = site.data.birding.avicommons_resolved | sort: "date" | reverse %}
    {% for bird in all_lifers %}
      {% if bird.code %}
        {% assign ebird_url = "https://ebird.org/species/" | append: bird.code %}
      {% else %}
        {% assign ebird_url = "https://ebird.org/search?q=" | append: bird.name | url_encode %}
      {% endif %}
      <a class="birding-card" href="{{ ebird_url }}" target="_blank" rel="noopener noreferrer">
        {% if bird.matched %}
          <img
            src="https://static.avicommons.org/{{ bird.code }}-{{ bird.key }}-240.jpg"
            alt="{{ bird.name | escape }}"
            loading="lazy"
          />
        {% else %}
          <div class="birding-placeholder">&#129418;</div>
        {% endif %}
        <span class="birding-number">#{{ bird.number }}</span>
        <div class="birding-caption-default">{{ bird.name }}</div>
        <div class="birding-overlay">
          <span class="birding-overlay-title">{{ bird.date | date: "%b %-d, %Y" }}</span>
          <span class="birding-overlay-sub">{{ bird.location }}</span>
          {% if bird.matched %}
            <span class="birding-credit">Photo: {{ bird.by }} &middot; Avicommons ({{ bird.license }})</span>
          {% endif %}
          <span class="birding-overlay-link-hint">View on eBird &rarr;</span>
        </div>
      </a>
    {% endfor %}
  </div>
</div>
</div>
