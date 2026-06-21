---
layout: page
title: Avian MetaNetwork
description: Mapping networks of bird-bird species interactions
img: assets/img/amn_cover.jpg
importance: 1
category: current
related_publications: true
---

Species interactions are a crucial aspect of ecosystem functioning and biodiversity, yet we lack comprehensive information on interactions at broad scales. The AvianMetaNetwork is a comprehensive database of bird-bird species interactions that attempts to fill this knowledge gap and enable research that answers macroecological and eco-evolutionary questions about species interactions. The database is built by undergraduates in the SpaCE lab through systematic literature review! Currently, the database is complete for North America (Canada, Alaska and the conterminous United States).



<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/amn_workflow.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Workflow diagram for the creation of the AvianMetaNetwork. Steps are shown in green boxes. Gray boxes indicate data sets (i.e., species lists, interaction data); L0 = level 0 (raw) data; L1 = level 1 (cleaned data); L2 = level 2 (summarized data in analyses).
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/amn_example.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Example networks generated from AvianMetaNetwork, for the three focal species: Oak Titmouse (Baeolophus inornatus, red diamond), Nuttall’s Woodpecker (Dryobates nuttallii, blue triangle), and Northern Pygmy-Owl (Glaucidium gnoma, yellow square). The networks represent the focal species and all of their interacting species. Each focal species is represented on all three networks with its corresponding symbol, and other interacting species are represented with white circles. Line color designates interaction type. See Data Code and Availability for network plotting code. Pictures obtained from Avicommons (Oak Titmouse: Adam Jackson | CC0 2.0; Nuttall’s Woodpecker: guyincognito | CC BY-NC 2.0; Northern Pygmy-Owl: Liam Hutcheson | CC BY-NC 2.0).

</div>

You can also put regular text between your rows of images, even citations {% cite einstein1950meaning %}.
Say you wanted to write a bit about your project before you posted the rest of the images.
You describe how you toiled, sweated, _bled_ for your project, and then... you reveal its glory in the next row of images.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>

The code is simple.
Just wrap your images with `<div class="col-sm">` and place them inside `<div class="row">` (read more about the <a href="https://getbootstrap.com/docs/4.4/layout/grid/">Bootstrap Grid</a> system).
To make images responsive, add `img-fluid` class to each; for rounded corners and shadows use `rounded` and `z-depth-1` classes.
Here's the code for the last row of images above:

{% raw %}

```html
<div class="row justify-content-sm-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
```

{% endraw %}
