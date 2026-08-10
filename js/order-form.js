/**
 * Order modal: renders bundle/upsell/delivery options from SITE_CONFIG,
 * tracks selection state, computes the live total, validates + submits the
 * lead, and fires InitiateCheckout (on modal open) / Lead (on successful
 * submit) via MetaTracking.
 */
(function () {
  const cfg = window.SITE_CONFIG;

  const overlay = document.getElementById("orderModalOverlay");
  if (!overlay) return;
  const modal = new Modal(overlay);

  const bundleContainer = document.getElementById("bundleOptions");
  const upsellContainer = document.getElementById("upsellOptions");
  const deliveryContainer = document.getElementById("deliveryOptions");
  const totalValueEl = document.getElementById("orderTotalValue");
  const form = document.getElementById("leadForm");
  const nameInput = document.getElementById("leadName");
  const phoneInput = document.getElementById("leadPhone");
  const submitBtn = document.getElementById("submitBtn");
  const formStep = document.getElementById("orderFormStep");
  const successStep = document.getElementById("orderSuccessStep");

  const money = (n) => `S/ ${n.toFixed(0)}`;

  function renderBundles() {
    bundleContainer.innerHTML = cfg.BUNDLES.map(
      (b, i) => `
      <label class="option-card${b.preselected ? " is-selected" : ""}" data-bundle-card="${b.id}">
        ${b.badge ? `<span class="badge">${b.badge}</span>` : ""}
        <img src="${b.image}" alt="${b.label}" loading="lazy">
        <span class="info">
          <span class="title">${b.label}</span>
          <span class="sub">${b.sub}</span>
        </span>
        <span class="price">${money(b.price)}</span>
        <input type="radio" name="bundle" value="${b.id}" ${b.preselected ? "checked" : ""}>
      </label>`
    ).join("");
  }

  function renderUpsells() {
    upsellContainer.innerHTML = cfg.UPSELLS.map(
      (u) => `
      <label class="option-card" data-upsell-card="${u.id}">
        <img src="${u.image}" alt="${u.name}" loading="lazy">
        <span class="info">
          <span class="title">${u.name}</span>
          <span class="sub">${u.sub}</span>
        </span>
        <span class="price">+${money(u.price)}</span>
        <input type="checkbox" name="upsell" value="${u.id}">
      </label>`
    ).join("");
  }

  function renderDelivery() {
    deliveryContainer.innerHTML = cfg.DELIVERY_METHODS.map(
      (d, i) => `
      <label class="delivery-option${i === 0 ? " is-selected" : ""}" data-delivery-card="${d.id}">
        ${d.label}
        <small>${d.sub}</small>
        <input type="radio" name="delivery" value="${d.id}" class="visually-hidden" ${i === 0 ? "checked" : ""}>
      </label>`
    ).join("");
  }

  function getSelectedBundle() {
    const id = form.querySelector('input[name="bundle"]:checked').value;
    return cfg.BUNDLES.find((b) => b.id === id);
  }

  function getSelectedUpsells() {
    return Array.from(form.querySelectorAll('input[name="upsell"]:checked')).map((el) =>
      cfg.UPSELLS.find((u) => u.id === el.value)
    );
  }

  function getSelectedDelivery() {
    const el = form.querySelector('input[name="delivery"]:checked');
    return el ? el.value : null;
  }

  function computeTotal() {
    const bundle = getSelectedBundle();
    const upsells = getSelectedUpsells();
    const total = bundle.price + upsells.reduce((sum, u) => sum + u.price, 0);
    totalValueEl.textContent = money(total);
    return { bundle, upsells, total };
  }

  function syncCardSelectedClasses() {
    bundleContainer.querySelectorAll("[data-bundle-card]").forEach((card) => {
      card.classList.toggle("is-selected", card.querySelector("input").checked);
    });
    upsellContainer.querySelectorAll("[data-upsell-card]").forEach((card) => {
      card.classList.toggle("is-selected", card.querySelector("input").checked);
    });
    deliveryContainer.querySelectorAll("[data-delivery-card]").forEach((card) => {
      card.classList.toggle("is-selected", card.querySelector("input").checked);
    });
  }

  form.addEventListener("change", () => {
    syncCardSelectedClasses();
    computeTotal();
  });

  function currentContentIds(bundle, upsells) {
    return [cfg.PRODUCT.content_id, ...upsells.map((u) => u.content_id)];
  }

  overlay.addEventListener("modal:open", () => {
    const { bundle, upsells, total } = computeTotal();
    window.MetaTracking.track(
      "InitiateCheckout",
      {
        content_ids: currentContentIds(bundle, upsells),
        content_type: "product",
        value: total,
        currency: cfg.CURRENCY,
        num_items: bundle.qty + upsells.length,
      },
      { once: true }
    );
  });

  function validate() {
    let valid = true;
    const nameField = nameInput.closest(".field");
    const phoneField = phoneInput.closest(".field");
    nameField.classList.remove("has-error");
    phoneField.classList.remove("has-error");

    if (nameInput.value.trim().length < 2) {
      nameField.classList.add("has-error");
      valid = false;
    }
    if (!/^\d{9}$/.test(phoneInput.value.trim())) {
      phoneField.classList.add("has-error");
      valid = false;
    }
    return valid;
  }

  function saveLeadLocally(payload) {
    try {
      const key = "tarot_test_leads";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      existing.push(payload);
      localStorage.setItem(key, JSON.stringify(existing.slice(-20)));
    } catch (e) {
      /* ignore storage failures */
    }
  }

  async function submitLead(payload) {
    const webhookUrl = cfg.GOOGLE_SHEETS_WEBHOOK_URL;
    const isConfigured = webhookUrl && !webhookUrl.startsWith("REPLACE_WITH");

    if (!isConfigured) {
      if (cfg.META_DEBUG) {
        console.warn(
          "[Lead] GOOGLE_SHEETS_WEBHOOK_URL not configured yet — payload was NOT sent anywhere. " +
            "Saved to localStorage('tarot_test_leads') for QA. Set the real Apps Script URL in js/config.js when ready.",
          payload
        );
      }
      saveLeadLocally(payload);
      return { ok: true, delivered: false };
    }

    try {
      await fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return { ok: true, delivered: true };
    } catch (e) {
      saveLeadLocally(payload);
      return { ok: false, delivered: false, error: e };
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (sessionStorage.getItem("tarot_lead_submitted") === "1") return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";

    const { bundle, upsells, total } = computeTotal();
    const delivery = getSelectedDelivery();
    const attribution = window.getAttribution ? window.getAttribution() : {};

    const cookieValue = (name) => {
      const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
      return match ? decodeURIComponent(match[1]) : null;
    };

    const payload = {
      lead_id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      timestamp: new Date().toISOString(),
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      product: cfg.PRODUCT.name,
      bundle_selected: bundle.qty,
      bundle_price: bundle.price,
      upsell_holografico: upsells.some((u) => u.id === "holografico"),
      upsell_classic: upsells.some((u) => u.id === "classic"),
      order_total: total,
      currency: cfg.CURRENCY,
      delivery_method: delivery,
      utm_source: attribution.utm_source || null,
      utm_medium: attribution.utm_medium || null,
      utm_campaign: attribution.utm_campaign || null,
      utm_content: attribution.utm_content || null,
      utm_term: attribution.utm_term || null,
      fbclid: attribution.fbclid || null,
      fbp: cookieValue("_fbp"),
      fbc: cookieValue("_fbc"),
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
      landing_page: attribution.landing_page || window.location.href,
      page_url: window.location.href,
      screen: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
    };

    const result = await submitLead(payload);

    if (result.ok) {
      sessionStorage.setItem("tarot_lead_submitted", "1");
      window.MetaTracking.track(
        "Lead",
        {
          content_ids: currentContentIds(bundle, upsells),
          content_type: "product",
          value: total,
          currency: cfg.CURRENCY,
        },
        { once: true }
      );
      formStep.hidden = true;
      successStep.hidden = false;
    } else {
      submitBtn.disabled = false;
      submitBtn.textContent = "REALIZAR PEDIDO";
      alert("No pudimos enviar tu pedido. Por favor intenta nuevamente.");
    }
  });

  function openModal(triggerEl) {
    formStep.hidden = false;
    successStep.hidden = true;
    modal.open(triggerEl);
  }

  document.querySelectorAll("[data-modal-open]").forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn));
  });

  renderBundles();
  renderUpsells();
  renderDelivery();
  computeTotal();
})();
