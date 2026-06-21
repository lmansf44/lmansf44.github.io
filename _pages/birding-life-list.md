---
layout: page
title: my life list
permalink: /birding/life-list/
nav: false
description: My birding life list, illustrated with Avicommons photos.
---

{% include birding/styles.liquid %}

<div class="birding-page">
  <a class="birding-back" href="{{ '/birding/' | relative_url }}">&larr; Back to Birding</a>
  <h1>My Life List</h1>
  <p>
    Photos are courtesy of <a href="https://avicommons.org/" target="_blank" rel="noopener noreferrer">Avicommons</a>,
    a library of Creative Commons&ndash;licensed bird photos. Hover (or tap) a photo for when and where I first saw
    that species; click through for photographer credit and license details.
  </p>

  <div class="birding-grid">
    {% assign all_lifers = site.data.birding.avicommons_resolved | sort: "date" | reverse %}
    {% for bird in all_lifers %}
      {% assign sub_text = bird.date | date: "%B %-d, %Y" | append: " · " | append: bird.location | escape %}
      {% assign credit_text = "" %}
      {% if bird.matched %}
        {% assign credit_text = "Photo: " | append: bird.by | append: " · Avicommons (" | append: bird.license | append: ")" | escape %}
      {% endif %}
      <button
        type="button"
        class="birding-card birding-lightbox-trigger"
        data-full="https://static.avicommons.org/{{ bird.code }}-{{ bird.key }}-480.jpg"
        data-title="{{ bird.name | escape }}"
        data-sub="{{ sub_text }}"
        {% if bird.matched %}data-credit="{{ credit_text }}"{% endif %}
        {% if bird.license_url %}data-license-url="{{ bird.license_url }}"{% endif %}
      >
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
        </div>
      </button>
    {% endfor %}
  </div>
</div>

{% include birding/lightbox.liquid %}
