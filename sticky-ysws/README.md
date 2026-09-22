# sticky — a Hack Club YSWS

Static landing page for the **sticky** YSWS (ship a sticker related project, get Hack Club stickers).
Implemented from the Figma comp "fallout / Slide 16:9 - 18".

No build step. Open `index.html`, or serve the folder with any static host
(GitHub Pages, Netlify, Vercel, Cloudflare Pages, `python3 -m http.server`).

```
index.html   page markup (hero, peel Submit sticker, two columns, footer)
styles.css   all styling; fluid type via clamp(), tiers scale with container queries
main.js      peel-off animation on the Submit sticker
assets/      Figma exports: logo flag, tier tag shape, sticker photos
```

Fonts load from Google Fonts: Fredoka (500–700, wdth 100) and Space Grotesk 700.

Tunables live at the top of `styles.css` in `:root` (colors, type scale, gutter).
The Submit sticker links to https://forms.hackclub.com/sticky.
