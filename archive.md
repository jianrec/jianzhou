---
title: "文章"
permalink: /archive/
eyebrow: "Archive"
description: "按时间整理的全部文章。"
---

{% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}

{% for year in posts_by_year %}
<section class="archive-year" aria-labelledby="year-{{ year.name }}">
  <h2 id="year-{{ year.name }}">{{ year.name }}</h2>
  <div class="archive-list">
    {% for post in year.items %}
      {% include post-card.html post=post %}
    {% endfor %}
  </div>
</section>
{% else %}
<p class="empty-state">还没有发布文章。</p>
{% endfor %}
