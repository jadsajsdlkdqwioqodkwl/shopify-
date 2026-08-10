/**
 * Shows the shaking sticky "LO QUIERO! + PAGO EN CASA" button once the user
 * scrolls past the hero, and opens the order modal like any other
 * data-modal-open trigger.
 */
(function () {
  const stickyBtn = document.getElementById("stickyCta");
  const hero = document.querySelector(".hero");
  if (!stickyBtn || !hero) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      stickyBtn.classList.toggle("is-visible", !entry.isIntersecting);
    },
    { threshold: 0 }
  );
  observer.observe(hero);
})();
