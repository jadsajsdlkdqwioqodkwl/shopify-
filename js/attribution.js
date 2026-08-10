/**
 * Captures UTM params + fbclid from the landing URL and persists them for
 * the rest of the session, so attribution survives even though the funnel
 * (scroll -> modal -> submit) never navigates to a new page.
 */
(function () {
  const STORAGE_KEY = "tarot_attribution";
  const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

  function readStored() {
    try {
      return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function persist(data) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      /* storage unavailable, attribution just won't persist */
    }
  }

  const params = new URLSearchParams(window.location.search);
  const stored = readStored();

  const merged = { ...stored };
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) merged[key] = value;
  });
  const fbclid = params.get("fbclid");
  if (fbclid) merged.fbclid = fbclid;

  if (!merged.landing_page) {
    merged.landing_page = window.location.href;
  }

  persist(merged);

  window.getAttribution = function () {
    return { ...readStored() };
  };
})();
