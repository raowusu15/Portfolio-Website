/* ============================================================
   Robert Owusu — Portfolio v2 shared interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---- Icons ---- */
  function icons() { if (window.lucide && lucide.createIcons) lucide.createIcons(); }
  document.addEventListener('DOMContentLoaded', icons);
  window.addEventListener('load', icons);
  setTimeout(icons, 500);

  /* ---- Theme ---- */
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('theme', t); } catch (e) {}
    var ic = document.querySelector('#themeBtn i');
    if (ic) { ic.setAttribute('data-lucide', t === 'dark' ? 'sun' : 'moon'); icons(); }
  }
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('themeBtn');
    if (btn) {
      var cur = document.documentElement.getAttribute('data-theme') || 'dark';
      var ic = btn.querySelector('i'); if (ic) ic.setAttribute('data-lucide', cur === 'dark' ? 'sun' : 'moon');
      btn.addEventListener('click', function () {
        var now = document.documentElement.getAttribute('data-theme') || 'dark';
        setTheme(now === 'dark' ? 'light' : 'dark');
      });
    }
  });

  /* ---- Year ---- */
  document.addEventListener('DOMContentLoaded', function () {
    var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
  });

  /* ---- Nav scroll + progress + mobile ---- */
  var nav = document.getElementById('nav');
  var progress = document.getElementById('scrollProgress');
  function onScroll() {
    var y = window.scrollY || 0;
    if (nav) nav.classList.toggle('scrolled', y > 24);
    if (progress) { var h = document.documentElement.scrollHeight - window.innerHeight; progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%'; }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('DOMContentLoaded', function () {
    onScroll();
    var toggle = document.getElementById('navToggle');
    var links = document.querySelector('.nav__links');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var open = links.classList.toggle('open'); toggle.classList.toggle('open', open);
      });
      links.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { links.classList.remove('open'); toggle.classList.remove('open'); }); });
    }
  });

  /* ---- Reveal ---- */
  document.addEventListener('DOMContentLoaded', function () {
    var els = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      els.forEach(function (el) { io.observe(el); });
    } else els.forEach(function (el) { el.classList.add('in'); });
  });

  /* ---- Counters ---- */
  document.addEventListener('DOMContentLoaded', function () {
    var counters = document.querySelectorAll('[data-count]');
    function run(el) {
      var t = parseInt(el.getAttribute('data-count'), 10) || 0, start = null, dur = 1500;
      function step(ts) { if (!start) start = ts; var p = Math.min((ts - start) / dur, 1); var e = 1 - Math.pow(1 - p, 3); var v = Math.round(t * e);
        el.textContent = v >= 1000 ? (v / 1000).toFixed(v % 1000 === 0 ? 0 : 1) + 'K' : String(v);
        if (p < 1) requestAnimationFrame(step); else el.textContent = (t >= 1000 ? (t / 1000) + 'K' : t) + '+'; }
      requestAnimationFrame(step);
    }
    if ('IntersectionObserver' in window) { var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }); }, { threshold: 0.6 }); counters.forEach(function (el) { io.observe(el); }); }
    else counters.forEach(run);
  });

  /* ---- Skill bars ---- */
  document.addEventListener('DOMContentLoaded', function () {
    var fills = document.querySelectorAll('.skill__fill');
    if (!fills.length) return;
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.style.width = e.target.getAttribute('data-level') + '%'; io.unobserve(e.target); } }); }, { threshold: 0.4 });
      fills.forEach(function (f) { io.observe(f); });
    } else fills.forEach(function (f) { f.style.width = f.getAttribute('data-level') + '%'; });
  });

  /* ---- Hero slideshow ---- */
  document.addEventListener('DOMContentLoaded', function () {
    var slides = document.querySelectorAll('.slide');
    var dots = document.querySelectorAll('.slide-dot');
    if (!slides.length) return;
    var i = 0, timer;
    function go(n) {
      slides[i].classList.remove('active'); if (dots[i]) dots[i].classList.remove('active');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('active'); if (dots[i]) dots[i].classList.add('active');
    }
    function next() { go(i + 1); }
    function start() { timer = setInterval(next, 4200); }
    function reset() { clearInterval(timer); start(); }
    dots.forEach(function (d, n) { d.addEventListener('click', function () { go(n); reset(); }); });
    slides[0].classList.add('active'); if (dots[0]) dots[0].classList.add('active');
    start();
  });

  /* ---- Lightbox ---- */
  document.addEventListener('DOMContentLoaded', function () {
    var lb = document.getElementById('lightbox'), img = document.getElementById('lightboxImg'), close = document.getElementById('lightboxClose');
    if (!lb) return;
    function open(src, alt) { img.src = src; img.alt = alt || ''; lb.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function shut() { lb.classList.remove('open'); document.body.style.overflow = ''; setTimeout(function () { img.src = ''; }, 350); }
    document.querySelectorAll('[data-lightbox]').forEach(function (im) { im.addEventListener('click', function () { open(im.src, im.alt); }); });
    if (close) close.addEventListener('click', shut);
    lb.addEventListener('click', function (e) { if (e.target === lb) shut(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') shut(); });
  });

  /* ---- Command palette ---- */
  var PAGES = [
    { name: 'Home', icon: 'home', url: 'index.html' },
    { name: 'Bio', icon: 'user', url: 'bio.html' },
    { name: 'Research', icon: 'flask-conical', url: 'research.html' },
    { name: 'Professional Experience', icon: 'briefcase', url: 'professional.html' },
    { name: 'Projects', icon: 'layout-grid', url: 'projects.html' },
    { name: 'Conferences', icon: 'presentation', url: 'conferences.html' },
    { name: 'Publications', icon: 'file-text', url: 'publications.html' },
    { name: 'Honors & Awards', icon: 'award', url: 'awards.html' },
    { name: 'Skills', icon: 'sparkles', url: 'skills.html' },
    { name: 'Leadership & Volunteering', icon: 'users', url: 'leadership.html' },
    { name: 'Programs & Outreach', icon: 'megaphone', url: 'programs.html' },
    { name: 'International Exposure', icon: 'globe', url: 'international.html' },
    { name: 'Book a session', icon: 'calendar-check', url: 'contact.html' }
  ];
  document.addEventListener('DOMContentLoaded', function () {
    var cmdk = document.getElementById('cmdk');
    var openBtn = document.getElementById('cmdkBtn');
    if (!cmdk) return;
    var input = cmdk.querySelector('.cmdk__input');
    var list = cmdk.querySelector('.cmdk__list');
    var sel = 0, filtered = PAGES.slice();
    function render() {
      list.innerHTML = '';
      filtered.forEach(function (p, n) {
        var d = document.createElement('div');
        d.className = 'cmdk__item' + (n === sel ? ' sel' : '');
        d.innerHTML = '<i data-lucide="' + p.icon + '"></i><span>' + p.name + '</span>';
        d.addEventListener('click', function () { location.href = p.url; });
        list.appendChild(d);
      });
      icons();
    }
    function openCmd() { cmdk.classList.add('open'); input.value = ''; filtered = PAGES.slice(); sel = 0; render(); setTimeout(function () { input.focus(); }, 50); }
    function shut() { cmdk.classList.remove('open'); }
    if (openBtn) openBtn.addEventListener('click', openCmd);
    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); cmdk.classList.contains('open') ? shut() : openCmd(); }
      if (!cmdk.classList.contains('open')) return;
      if (e.key === 'Escape') shut();
      if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, filtered.length - 1); render(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, 0); render(); }
      if (e.key === 'Enter' && filtered[sel]) location.href = filtered[sel].url;
    });
    input.addEventListener('input', function () {
      var q = input.value.toLowerCase();
      filtered = PAGES.filter(function (p) { return p.name.toLowerCase().indexOf(q) !== -1; });
      sel = 0; render();
    });
    cmdk.addEventListener('click', function (e) { if (e.target === cmdk) shut(); });
  });
})();
