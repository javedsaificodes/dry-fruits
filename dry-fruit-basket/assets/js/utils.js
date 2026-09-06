/**
 * Small shared helpers used across every page.
 *
 * ROOT must be set by an inline <script> before this file is loaded:
 *   <script>window.ROOT = "";</script>        (on root-level pages)
 *   <script>window.ROOT = "../";</script>      (on pages inside /pages/)
 */
window.ROOT = window.ROOT || "";

const Utils = (function () {
  function asset(path) {
    return window.ROOT + path;
  }

  function page(path) {
    return window.ROOT + path;
  }

  function formatCurrency(amount) {
    const n = Number(amount) || 0;
    return "₹" + n.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function qs(param) {
    return new URLSearchParams(window.location.search).get(param);
  }

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function debounce(fn, delay) {
    let timer = null;
    return function () {
      const args = arguments;
      const ctx = this;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(ctx, args); }, delay || 250);
    };
  }

  function starString(rating) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    let html = "";
    for (let i = 0; i < full; i++) html += '<i class="fa-solid fa-star"></i>';
    if (half) html += '<i class="fa-solid fa-star-half-stroke"></i>';
    for (let i = full + (half ? 1 : 0); i < 5; i++) html += '<i class="fa-regular fa-star"></i>';
    return html;
  }

  /** Simple toast notification used for cart/auth feedback across pages. */
  function toast(message, type) {
    let container = document.getElementById("dfb-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "dfb-toast-container";
      container.className = "dfb-toast-container";
      document.body.appendChild(container);
    }
    const el = document.createElement("div");
    el.className = "dfb-toast dfb-toast-" + (type || "success");
    el.innerHTML =
      '<i class="fa-solid ' + (type === "error" ? "fa-circle-exclamation" : "fa-circle-check") + '"></i>' +
      "<span>" + escapeHtml(message) + "</span>";
    container.appendChild(el);
    requestAnimationFrame(function () { el.classList.add("show"); });
    setTimeout(function () {
      el.classList.remove("show");
      setTimeout(function () { el.remove(); }, 300);
    }, 2600);
  }

  return {
    asset: asset,
    page: page,
    formatCurrency: formatCurrency,
    qs: qs,
    readJSON: readJSON,
    writeJSON: writeJSON,
    escapeHtml: escapeHtml,
    debounce: debounce,
    starString: starString,
    toast: toast
  };
})();
