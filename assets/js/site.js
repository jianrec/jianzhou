---
---

(function () {
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  var themeToggle = document.querySelector('.theme-toggle');
  var toTop = document.querySelector('.to-top');
  var searchInput = document.getElementById('site-search');
  var searchResults = document.getElementById('search-results');
  var searchIndex = [];

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', open);
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var root = document.documentElement;
      var current = root.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : current === 'light' ? '' : 'dark';
      if (next) {
        root.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (error) {}
      } else {
        root.removeAttribute('data-theme');
        try { localStorage.removeItem('theme'); } catch (error) {}
      }
    });
  }

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function renderResults(query) {
    if (!searchResults) return;
    var q = query.trim().toLowerCase();
    if (!q) {
      searchResults.classList.remove('is-visible');
      searchResults.innerHTML = '';
      return;
    }

    var matches = searchIndex.filter(function (item) {
      return [item.title, item.category, item.tags].join(' ').toLowerCase().indexOf(q) !== -1;
    }).slice(0, 6);

    searchResults.innerHTML = matches.length ? matches.map(function (item) {
      return '<li><a href="' + item.url + '">' + item.title + '</a><span>' + item.category + ' · ' + item.date + '</span></li>';
    }).join('') : '<li class="empty">没有找到相关内容</li>';
    searchResults.classList.add('is-visible');
  }

  if (searchInput && searchResults) {
    fetch('{{ "/search.json" | relative_url }}')
      .then(function (res) { return res.json(); })
      .then(function (data) { searchIndex = data; })
      .catch(function () { searchIndex = []; });

    searchInput.addEventListener('input', function () {
      renderResults(searchInput.value);
    });

    document.addEventListener('click', function (event) {
      if (!event.target.closest('.search-box')) {
        searchResults.classList.remove('is-visible');
      }
    });
  }
})();
