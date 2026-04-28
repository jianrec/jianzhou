---
title: "文章"
permalink: /archive/
description: "按时间整理的全部文章。"
---

{% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}

{% for year in posts_by_year %}
<section class="archive-year tag-sections" aria-labelledby="year-{{ year.name }}">
  <h2 id="year-{{ year.name }}">{{ year.name }}</h2>
  <ul class="simple-list">
    {% for post in year.items %}
      <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a> <time datetime="{{ post.date | date: "%Y-%m-%d" }}">{{ post.date | date: "%Y-%m-%d" }}</time></li>
    {% endfor %}
  </ul>
</section>
{% else %}
<p>还没有发布文章。</p>
{% endfor %}
