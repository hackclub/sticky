(function () {
  var s = document.querySelector('.sticker');
  if (!s) return;
  s.addEventListener('click', function () {
    s.classList.add('is-peeled');
    setTimeout(function () { s.classList.remove('is-peeled'); }, 1400);
  });
})();

(function () {
  var src = document.querySelector('.sticker__curl');
  if (!src) return;
  document.querySelectorAll('.chip').forEach(function (chip) {
    var curl = src.cloneNode(true);
    curl.setAttribute('class', 'chip__curl');
    curl.querySelector('defs').remove();
    chip.appendChild(curl);
  });
})();

(function () {
  var layer = document.getElementById('scatter');
  if (!layer || !window.PointerEvent) return;

  // x/y: % of viewport, r: deg, w: width at 1920px, m: mobile width
  var stickers = [
    { src: 'tier2-c', x: 6,  y: 40, r: 9,   w: 190, m: 72, desktopOnly: true },
    { src: 'tier3-a', x: 2,  y: 72, r: -7,  w: 200, m: 80 },
    { src: 'tier1-c', x: 84, y: 4,  r: 11,  w: 190, m: 74 },
    { src: 'tier2-a', x: 90, y: 32, r: -10, w: 130, m: 60, desktopOnly: true },
    { src: 'tier3-d', x: 86, y: 58, r: 8,   w: 170, m: 72, desktopOnly: true },
    { src: 'tier1-b', x: 24, y: 88, r: 6,   w: 150, m: 60, desktopOnly: true }
  ];

  var scale = Math.min(window.innerWidth, window.innerHeight * 16 / 9) / 1920;
  stickers.forEach(function (st, i) {
    var img = document.createElement('img');
    img.className = 'loose';
    img.src = 'assets/' + st.src + '.webp';
    img.decoding = 'async';
    img.alt = '';
    img.draggable = false;
    if (st.desktopOnly) img.setAttribute('data-desktop-only', '');
    var w = Math.max(56, Math.round(st.w * scale));
    img.style.setProperty('--w', w + 'px');
    img.style.setProperty('--wm', st.m + 'px');
    img.style.setProperty('--r', st.r + 'deg');
    img.style.setProperty('--x', (window.innerWidth * st.x / 100) + 'px');
    img.style.setProperty('--y', (window.innerHeight * st.y / 100) + 'px');
    img.style.zIndex = i + 1;
    layer.appendChild(img);
    makeDraggable(img, st.r);
  });

  var zTop = stickers.length + 1;

  function makeDraggable(el, baseRot) {
    var startX, startY, originX, originY, lastX, lastY, vx = 0;

    el.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      el.setPointerCapture(e.pointerId);
      startX = lastX = e.clientX; startY = lastY = e.clientY;
      originX = parseFloat(el.style.getPropertyValue('--x')) || 0;
      originY = parseFloat(el.style.getPropertyValue('--y')) || 0;
      el.style.zIndex = ++zTop;
      el.classList.remove('is-settling');
      el.classList.add('is-dragging');
    });

    el.addEventListener('pointermove', function (e) {
      if (!el.classList.contains('is-dragging')) return;
      var x = originX + (e.clientX - startX);
      var y = originY + (e.clientY - startY);
      vx = e.clientX - lastX; lastX = e.clientX; lastY = e.clientY;
      el.style.setProperty('--x', x + 'px');
      el.style.setProperty('--y', y + 'px');
      el.style.setProperty('--r', (baseRot + Math.max(-14, Math.min(14, vx * 1.2))) + 'deg');
    });

    function release(e) {
      if (!el.classList.contains('is-dragging')) return;
      el.classList.remove('is-dragging');
      el.classList.add('is-settling');
      el.style.setProperty('--r', baseRot + 'deg');
      var r = el.getBoundingClientRect();
      var x = parseFloat(el.style.getPropertyValue('--x')), y = parseFloat(el.style.getPropertyValue('--y'));
      var pad = 12;
      if (r.right < pad + 40) x += (pad + 40 - r.right);
      if (r.left > window.innerWidth - pad - 40) x -= (r.left - (window.innerWidth - pad - 40));
      if (r.bottom < pad + 40) y += (pad + 40 - r.bottom);
      if (r.top > window.innerHeight - pad - 40) y -= (r.top - (window.innerHeight - pad - 40));
      el.style.setProperty('--x', x + 'px');
      el.style.setProperty('--y', y + 'px');
    }
    el.addEventListener('pointerup', release);
    el.addEventListener('pointercancel', release);
  }
})();

(function () {
  var pill = document.getElementById('india-pill');
  if (!pill) return;
  function show() { pill.hidden = false; document.body.classList.add('has-india'); }
  if (/[?&]in=1\b/.test(location.search)) return show();
  fetch('/api/geo').then(function (r) { return r.json(); }).then(function (d) {
    if (d && d.country === 'IN') show();
  }).catch(function () {});
})();
