---
layout: page
title: birding
permalink: /birding/
nav: true
nav_order: 7
description: 
---

{% include birding/styles.liquid %}

<div class="birding-page">

  <section class="birding-intro">
    <div class="birding-intro-text">
      <p>
        I began birding in early 2019 after deciding to participate in the Ornithology event as a part of Science Olympiad. Since then, I have been hooked on birds, and credit the hobby for furthering my interest in the natural world and my career in science. As an ecologist and citizen science advocate, I am excited with how much the hobby is growing! You can check out my <a href="https://ebird.org/profile/MTIyMDAyNw/US" target="_blank" rel="noopener noreferrer">eBird profile here</a>
        ! Below are a few recent shots, my running photo gallery, and my life list illustrated with
        <a href="https://avicommons.org/" target="_blank" rel="noopener noreferrer">Avicommons</a>
        photos. 
      </p>
    </div>
    <div class="birding-intro-photos">
      <img src="{{ '/assets/img/birding1.jpg' | relative_url }}" />
      <img src="{{ '/assets/img/birding2.jpg' | relative_url }}" />
      <img src="{{ '/assets/img/birding3.jpg' | relative_url }}" />
    </div>
  </section>

  <section class="birding-gallery-section">
  <div class="birding-section-header">
    <h2>my bird photos</h2>
    <a class="birding-see-all" href="{{ '/birding/photos/' | relative_url }}">see full gallery &rarr;</a>
  </div>

  <div class="birding-scroller">
    {% assign random_photos = site.data.birding.bird_photos | sample: 12 %}

    {% for photo in random_photos %}
      <a class="birding-card" href="{{ '/birding/photos/' | relative_url }}">
        <img src="{{ photo.image | relative_url }}"
             alt="{{ photo.species | escape }}"
             loading="lazy" />
        <div class="birding-overlay">
          <span class="birding-overlay-title">{{ photo.species }}</span>
          <span class="birding-overlay-sub">{{ photo.location }}</span>
        </div>
      </a>
    {% endfor %}
  </div>
</section>

  <section class="birding-gallery-section">
    <div class="birding-section-header">
      <h2>my life list</h2>
      <a class="birding-see-all" href="{{ '/birding/life-list/' | relative_url }}">see full life list &rarr;</a>
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
