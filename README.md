# Tarot Rider Waite — standalone lead-gen funnel

Single-page static site, migrated off a Shopify export. No backend required to host it; a small backend (Cloudflare Pages Function or Apps Script) will be needed once lead data starts flowing to Google Sheets — see [Cloudflare](#cloudflare) below.

## File structure

```
index.html          7-section landing page + lead-order modal
css/styles.css       all styling (fonts, palette, modal chrome, animations)
js/config.js         pricing/content + config placeholders (EDIT THIS FIRST)
js/attribution.js    captures utm_*/fbclid from the URL, persists for the session
js/tracking.js       Meta Pixel loader + fbq wrapper with dedupe + debug logging
js/modal.js          generic reusable dialog (open/close/focus-trap/Escape)
js/order-form.js     bundle/upsell selection, price calc, validation, lead submit
js/sticky-cta.js     shows the shaking sticky button once you scroll past the hero
js/main.js           fires PageView + ViewContent on load
pages/privacidad.html, terminos.html, reembolso.html   legal pages, linked from footer
assets/fonts/         Poppins + Inter, self-hosted (woff2 only)
assets/img/, assets/video/   product imagery — see "Images to add" below
```

## Before going live — configure `js/config.js`

| Setting | What to do |
|---|---|
| `META_PIXEL_ID` | Replace with your real Meta Pixel ID (Events Manager → your pixel → Settings). Until you do, the site still runs normally — it just logs what *would* fire to the console instead of sending it to Meta. |
| `GOOGLE_SHEETS_WEBHOOK_URL` | Leave as-is until you build the Apps Script Web App. Until configured, submitted leads are captured in the browser's `localStorage` (`tarot_test_leads`) for QA instead of being sent anywhere — nothing is silently lost, but nothing is delivered either. |
| `META_DEBUG` | Keep `true` while testing (logs every pixel event to the console); set to `false` for production if you don't want that console noise. |

## Images to add

Same pattern the original store used: the "gallery" is 7 sequential vertical (9:16) story images, one per landing section, with a video between images 1 and 2. Until real files are dropped in at these exact paths, the page shows a labeled placeholder (not a broken image icon) so it's obvious what's missing.

| File | Size |
|---|---|
| `assets/img/logo.png` | 512×512, transparent |
| `assets/img/core-1.webp` | 1080×1920 — hero |
| `assets/video/core-video.webm` | 1080×1920, <15MB — between core-1 and core-2 |
| `assets/img/core-2.webp` … `core-7.webp` | 1080×1920 each — one per remaining section |
| `assets/img/includes-mazo.webp`, `includes-guia.webp`, `includes-tapete.webp`, `includes-amuleto.webp` | 800×800 |
| `assets/img/bundle-1.webp`, `bundle-2.webp` | 600×600 — modal bundle cards |
| `assets/img/upsell-holografico.webp`, `upsell-classic.webp` | 600×600 — modal upsell cards |
| `assets/img/og-image.jpg` | 1200×630 — social preview |

Fonts: `assets/fonts/inter/inter_n7.woff2` is currently a **copy of the 600-weight file** (no true bold Inter was in the original export) — visually fine, but swap in a real Inter Bold file when convenient.

## Funnel mechanics (what replaced the Shopify app)

The original store used a third-party "EasySell COD Form" Shopify app for the entire order flow — its JS/CSS lived on `cdn.shopify.com` and wasn't part of the export, which is why forms/upsells/discounts hung forever once hosted outside Shopify. Everything below is a from-scratch standalone replacement of what that app did:

- **Bundles**: 1 mazo (S/79) / 2 mazos (S/149) — radio selection, same slot as the original's quantity-discount tiers.
- **Upsells**: Mazo Holográfico (+S/59), Mazo Classic (+S/49) — checkbox add-ons, same slot as the original's order-bump products.
- **Delivery**: Pago en casa / Shalom — simplified from the original's full 25-region district cascade to a single choice, per spec.
- **Checkout**: there's no payment gateway. "REALIZAR PEDIDO" captures the lead (name, phone, selections); a human confirms the order by WhatsApp/call afterward. This matches what the original COD funnel actually did — Shopify's real checkout was never in the loop for this store either.
- **Discount math**: computed client-side from `js/config.js`, no coupon codes.
- **Not implemented**: the original had a site-wide exit-intent downsell popup (S/5 off). Not in your spec for this build — straightforward to add later (`EASYSELL_DOWNSELLS` pattern in the git history under `products/taladro-percutor-21v-accesorios-bomtex/index.html` if you want the reference).

## Meta Pixel events

| Event | Fires when | Guarded against duplicates? |
|---|---|---|
| `PageView` | Page load | Yes, once per session |
| `ViewContent` | Page load, with real product id/name/price | Yes, once per session |
| `InitiateCheckout` | First time the order modal opens (not just because the button exists) | Yes, once per session |
| `Lead` | Only after a submission passes validation and is captured (not on click, not on invalid submit) | Yes, via `sessionStorage` flag |

Lead payload also captures `_fbp`/`_fbc` cookies, `fbclid`, UTM params, user agent, and referrer — everything Meta's Conversions API would want later for server-side match quality, so the Sheets data won't need a second migration when you build that.

## Cloudflare

- **Cloudflare Pages only** is enough to host this today — it's fully static.
- **No Cloudflare Pages Functions or Workers needed yet.** The only thing that would require one is a future server-side relay for the Google Sheets webhook (to hide the Apps Script URL or work around CORS) — not necessary to build now.
- **No environment variables or secrets** for this phase — `META_PIXEL_ID` and `GOOGLE_SHEETS_WEBHOOK_URL` are plain client-side config since neither is a secret (a Pixel ID is public by design; the Apps Script URL will be too, once it exists).
- When deploying, make sure your deploy method doesn't upload the `.git/` folder (it holds the full original Shopify export in history — harmless to keep locally as a backup, just don't publish it).

## Known limitations

- No real payment processing — this was never a Shopify-checkout store either; it's a COD/courier lead funnel, same as the original.
- Delivery choice is a single Pago en casa/Shalom radio, not the original's full district-level shipping-cost logic.
- Exit-intent downsell not implemented (not in spec).
- Lead delivery to Google Sheets isn't wired up yet — payloads are captured and logged locally until `GOOGLE_SHEETS_WEBHOOK_URL` is set.
- Full end-to-end UTM/fbclid capture could only be verified via unit-level logic testing during this build (the local `file://` test environment strips query strings on navigation) — will work correctly once deployed to a real `https://` URL, which is worth a real click-through test after first deploy.
