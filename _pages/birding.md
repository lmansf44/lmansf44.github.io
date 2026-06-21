---
layout: page
title: birding
permalink: /birding/
nav: false
description: A look at my life as a birder.
---

{% include birding/styles.liquid %}

<div class="birding-page">

  <section class="birding-intro">
    <div class="birding-intro-text">
      <p>
        <!-- TODO: replace this with your own words! -->
        Birding has been a constant alongside my work in ecology — equal parts hobby, fieldwork
        habit, and excuse to be outside at dawn. Below are a few recent shots, my running photo
        gallery, and my life list, automatically illustrated with
        <a href="https://avicommons.org/" target="_blank" rel="noopener noreferrer">Avicommons</a>
        photos.
      </p>
    </div>
    <div class="birding-intro-photos">
      <!-- TODO: add 2-3 photos of yourself out birding to assets/img/birding/me/ and update these paths -->
      <img src="{{ '/assets/img/birding1.jpg' | relative_url }}" />
      <img src="{{ '/assets/img/birding2.jpg' | relative_url }}" />
    </div>
  </section>

  <section class="birding-gallery-section">
    <div class="birding-section-header">
      <h2>My Bird Photos</h2>
      <a class="birding-see-all" href="{{ '/birding/photos/' | relative_url }}">See full gallery &rarr;</a>
    </div>
    <div class="birding-scroller">
      {% assign recent_photos = site.data.birding.bird_photos | sort: "date" | reverse %}
      {% for photo in recent_photos limit: 12 %}
        <a class="birding-card" href="{{ '/birding/photos/' | relative_url }}">
          <img src="{{ photo.image | relative_url }}" alt="{{ photo.species | escape }}" loading="lazy" />
          <div class="birding-overlay">
            <span class="birding-overlay-title">{{ photo.species }}</span>
            <span class="birding-overlay-sub">{{ photo.date | date: "%b %-d, %Y" }} &middot; {{ photo.location }}</span>
          </div>
        </a>
      {% endfor %}
    </div>
  </section>

  <section class="birding-gallery-section">
    <div class="birding-section-header">
      <h2>My Life List</h2>
      <a class="birding-see-all" href="{{ '/birding/life-list/' | relative_url }}">See full life list &rarr;</a>
    </div>
    <div class="birding-scroller">
      {% assign recent_lifers = site.data.birding.avicommons_resolved | sort: "date" | reverse %}
      {% for bird in recent_lifers limit: 12 %}
        <a class="birding-card" href="{{ '/birding/life-list/' | relative_url }}">
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
        </a>
      {% endfor %}
    </div>
  </section>

</div>
