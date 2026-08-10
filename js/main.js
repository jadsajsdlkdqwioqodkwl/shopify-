/**
 * Page bootstrap: fires PageView + ViewContent once the DOM is ready.
 * order-form.js / sticky-cta.js wire themselves independently.
 */
document.addEventListener("DOMContentLoaded", () => {
  const cfg = window.SITE_CONFIG;

  window.MetaTracking.track("PageView", {}, { once: true });

  window.MetaTracking.track(
    "ViewContent",
    {
      content_ids: [cfg.PRODUCT.content_id],
      content_type: "product",
      content_name: cfg.PRODUCT.name,
      value: cfg.PRODUCT.base_price,
      currency: cfg.CURRENCY,
    },
    { once: true }
  );
});
