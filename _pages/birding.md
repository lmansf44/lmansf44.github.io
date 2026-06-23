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

  <div class="birding-scroller" id="birding-photo-scroller">
    <!-- populated client-side below so the selection changes on every page load -->
  </div>
</section>

<script type="application/json" id="birding-photo-data">
[
  {% for photo in site.data.birding.bird_photos %}
  {
    "image": {{ photo.image | relative_url | jsonify }},
    "species": {{ photo.species | jsonify }},
    "location": {{ photo.location | jsonify }}
  }{% unless forloop.last %},{% endunless %}
  {% endfor %}
]
</script>

<script>
  (function () {
    var dataEl = document.getElementById('birding-photo-data');
    var scroller = document.getElementById('birding-photo-scroller');
    if (!dataEl || !scroller) return;

    var photos = JSON.parse(dataEl.textContent);
    var galleryUrl = {{ '/birding/photos/' | relative_url | jsonify }};

    // Fisher-Yates shuffle
    for (var i = photos.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = photos[i];
      photos[i] = photos[j];
      photos[j] = tmp;
    }

    var chosen = photos.slice(0, 12);

    scroller.innerHTML = chosen.map(function (photo) {
      var species = escapeHtml(photo.species);
      var location = escapeHtml(photo.location);
      return (
        '<a class="birding-card" href="' + galleryUrl + '">' +
          '<img src="' + photo.image + '" alt="' + species + '" loading="lazy" />' +
          '<div class="birding-overlay">' +
            '<span class="birding-overlay-title">' + species + '</span>' +
            '<span class="birding-overlay-sub">' + location + '</span>' +
          '</div>' +
        '</a>'
      );
    }).join('');

    function escapeHtml(str) {
      var div = document.createElement('div');
      div.textContent = str == null ? '' : str;
      return div.innerHTML;
    }
  })();
</script>

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
