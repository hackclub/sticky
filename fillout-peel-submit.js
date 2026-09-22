// Peel sticker Submit button for Fillout. Paste into the form's Custom JavaScript.
(function () {
  if (window.__hcPeelInstalled) return;
  window.__hcPeelInstalled = true;

  var HEIGHT = 48;   // px
  var PAD    = 240;  // Figma units (512 = button height)

  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap';
  document.head.appendChild(link);

  var css = [
    '.hc-peel{',
    '  --h:' + HEIGHT + 'px; --s:calc(var(--h)/512);',
    '  --edge:max(calc(10*var(--s)),2px);',
    '  --ease:cubic-bezier(.2,.9,.25,1);',
    '  position:relative!important; display:inline-flex!important; align-items:center!important; justify-content:center!important; overflow:hidden!important;',
    '  height:var(--h)!important; min-height:0!important; width:auto!important; min-width:0!important;',
    '  padding:0 calc(' + PAD + '*var(--s))!important; border:0!important; background:none!important;',
    '  box-shadow:0 4px 14px rgba(0,0,0,.16), 0 1px 3px rgba(0,0,0,.12)!important;',
    '  border-radius:calc(122*var(--s))!important; isolation:isolate;',
    '  font-family:"Space Grotesk",system-ui,sans-serif!important; cursor:pointer;',
    '  transition:transform .35s var(--ease), box-shadow .35s var(--ease)!important; -webkit-tap-highlight-color:transparent;',
    '}',
    '.hc-peel:hover{box-shadow:0 6px 18px rgba(0,0,0,.18), 0 1px 3px rgba(0,0,0,.12)!important}',
    '.hc-peel:active{transform:scale(.965)!important; transition-duration:.12s!important}',
    '.hc-peel .hc-face{position:absolute; inset:0; width:100%; height:100%; display:block; pointer-events:none}',
    '.hc-peel .hc-face .hc-edge{fill:none; stroke:#fff; vector-effect:non-scaling-stroke; stroke-width:calc(2*var(--edge))}',
    '.hc-peel>span,.hc-peel>span *{font-family:"Space Grotesk",system-ui,sans-serif!important; font-weight:500!important}',
    '.hc-peel>span{',
    '  position:relative; z-index:0; display:grid!important; place-items:center; height:100%;',
    '  color:#fff!important; white-space:nowrap; overflow:visible!important; max-width:none!important;',
    '  font-size:calc(270*var(--s))!important; line-height:1!important; letter-spacing:calc(-12*var(--s))!important;',
    '  text-shadow:0 calc(4*var(--s)) calc(20*var(--s)) rgba(0,0,0,.25);',
    '}',
    // Fillout's loading spinner is a direct child <svg> before the label span
    '.hc-peel>svg:not(.hc-face):not(.hc-curl){position:relative; z-index:0; flex:none; color:#fff; width:calc(190*var(--s))!important; height:calc(190*var(--s))!important; margin:0 calc(70*var(--s)) 0 0!important}',
    '.hc-peel .hc-curl{',
    '  position:absolute; left:0; bottom:0; z-index:1; width:calc(337*var(--s)); height:calc(299*var(--s));',
    '  overflow:visible; pointer-events:none; transform-origin:0 100%; transform:scale(0);',
    '  transition:transform .3s var(--ease);',
    '}',
    '.hc-peel:hover .hc-curl,.hc-peel:focus-visible .hc-curl{transform:scale(1); transition:transform .32s cubic-bezier(.34,1.4,.5,1)}',
    '.hc-peel.is-peeled .hc-curl{transform:translate(calc(700*var(--s)),calc(-700*var(--s))) scale(2.5); transition:transform .55s cubic-bezier(.45,0,.15,1)}',
    '@media (prefers-reduced-motion:reduce){.hc-peel,.hc-peel .hc-curl{transition:none!important}}'
  ].join('\n');
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  function face(W) {
    var id = 'hc' + W;
    return (
      '<svg class="hc-face" viewBox="0 0 ' + W + ' 512" preserveAspectRatio="none" aria-hidden="true">' +
      '<defs>' +
      '<linearGradient id="' + id + '-red" gradientUnits="userSpaceOnUse" x1="' + (W - 45.61) + '" y1="0" x2="' + (W - 299.4) + '" y2="853.82">' +
      '<stop stop-color="#EE4A50"/><stop offset=".5" stop-color="#DA1F26"/><stop offset="1" stop-color="#8D282C"/></linearGradient>' +
      '<pattern id="' + id + '-stripes" patternUnits="userSpaceOnUse" width="63" height="45" patternTransform="rotate(41.2921)">' +
      '<rect width="63" height="22.5" fill="#fff"/></pattern>' +
      '<linearGradient id="' + id + '-fade" gradientUnits="userSpaceOnUse" x1="-12.992" y1="10.9956" x2="276.735" y2="876.717">' +
      '<stop stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
      '<mask id="' + id + '-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="' + W + '" height="512">' +
      '<rect width="' + W + '" height="512" rx="122" fill="url(#' + id + '-fade)"/></mask>' +
      '<clipPath id="' + id + '-clip"><rect width="' + W + '" height="512" rx="122"/></clipPath>' +
      '</defs>' +
      '<rect width="' + W + '" height="512" rx="122" fill="url(#' + id + '-red)"/>' +
      '<g clip-path="url(#' + id + '-clip)" mask="url(#' + id + '-mask)">' +
      '<rect x="-400" y="-400" width="' + (W + 800) + '" height="1400" fill="url(#' + id + '-stripes)" fill-opacity=".15"/></g>' +
      '<rect class="hc-edge" width="' + W + '" height="512" rx="122"/>' +
      '</svg>'
    );
  }

  var CURL =
    '<svg class="hc-curl" viewBox="0 0 337 299" aria-hidden="true">' +
    '<defs>' +
    '<linearGradient id="hc-curl-g" gradientUnits="userSpaceOnUse" x1="229.297" y1="89.424" x2="150.918" y2="180.578">' +
    '<stop stop-color="#fff"/><stop offset=".759615" stop-color="#C6D1D8"/><stop offset="1" stop-color="#C6D1D7"/></linearGradient>' +
    '<linearGradient id="hc-roll" gradientUnits="userSpaceOnUse" x1="49" y1="-50" x2="0" y2="0">' +
    '<stop stop-color="#fff"/><stop offset=".76" stop-color="#C6D1D8"/><stop offset="1" stop-color="#C6D1D7"/></linearGradient>' +
    '<filter id="hc-shadow" x="-40%" y="-40%" width="180%" height="180%" color-interpolation-filters="sRGB">' +
    '<feDropShadow in="SourceGraphic" dx="0" dy="6" stdDeviation="15" flood-opacity=".25" result="a"/>' +
    '<feDropShadow in="SourceGraphic" dx="-6" dy="8" stdDeviation="16" flood-opacity=".12" result="b"/>' +
    '<feDropShadow in="SourceGraphic" dx="-1" dy="2" stdDeviation="2" flood-opacity=".18" result="c"/>' +
    '<feMerge><feMergeNode in="b"/><feMergeNode in="a"/><feMergeNode in="c"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
    '<linearGradient id="hc-ao" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="-42" y2="43">' +
    '<stop stop-color="#000" stop-opacity=".09"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>' +
    '</defs>' +
    '<path fill="#fff" d="M-2856 -2800 L0 0 L35.8824 47.38 L92.9261 116.38 L226.335 243.34 L247.956 256.68 L286.599 285.66 L305 299 L3305 3240 L3305 9000 L-9000 9000 L-9000 -2800 Z"/>' +
    '<path fill="url(#hc-ao)" d="M-2856 -2800 L0 0 L35.8824 47.38 L92.9261 116.38 L226.335 243.34 L247.956 256.68 L286.599 285.66 L305 299 L3305 3240 L3263 3283 L263 342 L-2898 -2757 Z"/>' +
    '<g filter="url(#hc-shadow)">' +
    '<path fill="url(#hc-roll)" d="M0 0 L-36.7 -134 L-2807 -2850 L-2856 -2800 Z"/>' +
    '<path fill="url(#hc-curl-g)" transform="translate(-30 0)" d="M265.428 221.947C243.858 181.804 260.135 131.371 226.535 95.417C192.936 59.4625 150.304 90.078 111.928 71.4472C73.5521 52.8159 30 0 30 0C30 0 80.3993 95.478 162.16 177.239C243.922 259 337 301 337 301C337 301 286.998 262.09 265.428 221.947Z"/>' +
    '</g></svg>';

  function isSubmit(btn) {
    return btn.matches('button[data-cy="button-component"]') &&
           btn.closest('.fillout-field-button') &&
           /^\s*submit\s*$/i.test(btn.textContent);
  }

  function fit(btn) {
    var h = btn.offsetHeight, w = btn.offsetWidth;
    if (!h || !w) return;
    var W = Math.round(512 * w / h);
    if (btn.__hcW === W) return;
    btn.__hcW = W;
    var old = btn.querySelector('.hc-face');
    if (old) old.remove();
    btn.insertAdjacentHTML('afterbegin', face(W));
  }

  function decorate(btn) {
    if (!btn.classList.contains('hc-peel')) btn.classList.add('hc-peel');
    if (!btn.querySelector('.hc-curl')) btn.insertAdjacentHTML('beforeend', CURL);
    fit(btn);
    if (!btn.__hcPeelBound) {
      btn.__hcPeelBound = true;
      if (window.ResizeObserver) new ResizeObserver(function () { fit(btn); }).observe(btn);
      // un-peel if the button is still around after a failed submit
      btn.addEventListener('click', function () {
        btn.classList.add('is-peeled');
        setTimeout(function () {
          if (document.body.contains(btn)) btn.classList.remove('is-peeled');
        }, 1400);
      });
    }
  }

  function scan() {
    var buttons = document.querySelectorAll('button[data-cy="button-component"]');
    for (var i = 0; i < buttons.length; i++) if (isSubmit(buttons[i])) decorate(buttons[i]);
  }

  scan();
  new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(scan);
})();
