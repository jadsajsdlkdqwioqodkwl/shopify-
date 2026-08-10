/**
 * Meta Pixel loader + fbq wrapper.
 * - Loads the standard Meta Pixel base code and calls fbq('init', ...).
 * - track(eventName, params, { once }) fires fbq('track', ...) with optional
 *   per-session dedupe (used for PageView/ViewContent/InitiateCheckout, which
 *   should only ever fire once per visit).
 * - Everything logs to console under SITE_CONFIG.META_DEBUG so you can verify
 *   each event fires at the right moment without opening Meta's own tools.
 */
(function () {
  const cfg = window.SITE_CONFIG;
  const PLACEHOLDER = "REPLACE_WITH_REAL_PIXEL_ID";
  const firedOnce = new Set();

  function debugLog(label, payload) {
    if (!cfg.META_DEBUG) return;
    // eslint-disable-next-line no-console
    console.log(`%c[Meta Pixel] ${label}`, "color:#4b2e83;font-weight:bold", payload || "");
  }

  function loadPixelBaseCode() {
    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */

    if (cfg.META_PIXEL_ID && cfg.META_PIXEL_ID !== PLACEHOLDER) {
      window.fbq("init", cfg.META_PIXEL_ID);
      debugLog("init", cfg.META_PIXEL_ID);
    } else {
      debugLog(
        "NOT INITIALIZED — META_PIXEL_ID is still the placeholder in js/config.js. " +
          "Events below are logged for verification only and are not being sent to Meta."
      );
    }
  }

  function track(eventName, params, options) {
    const opts = options || {};
    if (opts.once) {
      if (firedOnce.has(eventName)) {
        debugLog(`${eventName} skipped (already fired this session)`, params);
        return;
      }
      firedOnce.add(eventName);
    }

    if (typeof window.fbq === "function" && cfg.META_PIXEL_ID !== PLACEHOLDER) {
      window.fbq("track", eventName, params || {});
    }
    debugLog(eventName, params);
  }

  loadPixelBaseCode();

  window.MetaTracking = { track };
})();
