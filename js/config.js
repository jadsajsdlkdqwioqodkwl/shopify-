/**
 * Single source of truth for pricing/content used by tracking + the order form.
 * CONFIGURE THESE before going live:
 *   - META_PIXEL_ID: real Meta Pixel ID (Events Manager > your pixel > Settings)
 *   - GOOGLE_SHEETS_WEBHOOK_URL: Apps Script Web App URL (built separately, not yet)
 */
window.SITE_CONFIG = {
  META_PIXEL_ID: "REPLACE_WITH_REAL_PIXEL_ID",
  META_DEBUG: true,

  GOOGLE_SHEETS_WEBHOOK_URL: "REPLACE_WITH_APPS_SCRIPT_URL",

  CURRENCY: "PEN",

  PRODUCT: {
    content_id: "tarot-rider-waite-kit",
    name: "Mazo Rider Waite + Guía + Tapete + Amuleto",
    base_price: 79,
    compare_at_price: 99,
  },

  BUNDLES: [
    {
      id: "bundle_1",
      qty: 1,
      price: 79,
      label: "1 Mazo Rider Waite",
      sub: "+ guía, tapete y amuleto de regalo",
      badge: null,
      image: "assets/img/bundle-1.webp",
      preselected: true,
    },
    {
      id: "bundle_2",
      qty: 2,
      price: 149,
      label: "2 Mazos Rider Waite",
      sub: "Ideal para regalar o compartir",
      badge: "🔥 Más Vendido",
      image: "assets/img/bundle-2.webp",
      preselected: false,
    },
  ],

  UPSELLS: [
    {
      id: "holografico",
      content_id: "tarot-holografico",
      name: "Mazo Holográfico",
      sub: "Edición especial con acabado holográfico",
      price: 59,
      image: "assets/img/upsell-holografico.webp",
    },
    {
      id: "classic",
      content_id: "tarot-classic",
      name: "Mazo Classic Tarot",
      sub: "El clásico atemporal para tu colección",
      price: 49,
      image: "assets/img/upsell-classic.webp",
    },
  ],

  DELIVERY_METHODS: [
    {
      id: "pago_en_casa",
      label: "Pago en casa",
      sub: "Pagas al recibir tu pedido",
    },
    {
      id: "shalom",
      label: "Shalom",
      sub: "Envío por agencia Shalom",
    },
  ],
};
