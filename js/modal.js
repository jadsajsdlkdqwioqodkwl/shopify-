/**
 * Small reusable modal/dialog controller — reimplements the original theme's
 * ModalDialog behavior (show/hide, Escape-to-close, backdrop-click-to-close,
 * focus trap, body scroll lock) without pulling in the rest of the theme's
 * global.js.
 */
class Modal {
  constructor(overlayEl) {
    this.overlay = overlayEl;
    this.dialog = overlayEl.querySelector(".modal-dialog");
    this.openedBy = null;

    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) this.close();
    });
    this.overlay.querySelectorAll("[data-modal-close]").forEach((btn) => {
      btn.addEventListener("click", () => this.close());
    });
    document.addEventListener("keyup", (e) => {
      if (e.key === "Escape" && this.isOpen()) this.close();
    });
  }

  isOpen() {
    return this.overlay.classList.contains("is-open");
  }

  open(triggerEl) {
    this.openedBy = triggerEl || document.activeElement;
    this.overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    const focusable = this.dialog.querySelector("input, button, [tabindex]");
    if (focusable) focusable.focus();
    this.overlay.dispatchEvent(new CustomEvent("modal:open"));
  }

  close() {
    this.overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    if (this.openedBy && typeof this.openedBy.focus === "function") {
      this.openedBy.focus();
    }
    this.overlay.dispatchEvent(new CustomEvent("modal:close"));
  }
}

window.Modal = Modal;
