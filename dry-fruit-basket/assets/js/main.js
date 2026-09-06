/**
 * Site-wide glue that every page needs: carousels and simple tab panels.
 * Page-specific logic (home, shop, product, cart, login, signup, contact)
 * lives in assets/js/pages/*.js and is included only where needed.
 */
const Tabs = (function () {
  function init(root) {
    const buttons = Array.prototype.slice.call(root.querySelectorAll("[data-tab]"));
    const panels = Array.prototype.slice.call(root.querySelectorAll("[data-tab-panel]"));
    if (!buttons.length || !panels.length) return;

    function activate(name) {
      buttons.forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-tab") === name); });
      panels.forEach(function (p) { p.classList.toggle("active", p.getAttribute("data-tab-panel") === name); });
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        activate(btn.getAttribute("data-tab"));
      });
    });

    const initial = root.querySelector("[data-tab].active") || buttons[0];
    if (initial) activate(initial.getAttribute("data-tab"));
  }

  function initAll() {
    document.querySelectorAll("[data-tabs]").forEach(init);
  }

  return { init: init, initAll: initAll };
})();

document.addEventListener("DOMContentLoaded", function () {
  Carousel.initAll();
  Tabs.initAll();

  // Fade in on load for a slightly less abrupt feel.
  document.body.classList.add("is-ready");
});
