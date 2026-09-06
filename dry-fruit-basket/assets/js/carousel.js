/**
 * Tiny dependency-free carousel used for the hero banner, the "New
 * Arrivals" strip and the customer reviews slider. Replaces the old
 * Bootstrap-carousel + jQuery + Owl Carousel dependency chain.
 *
 * Markup contract:
 *   <div class="carousel" data-carousel data-autoplay="true">
 *     <div class="carousel-slides"> ...one child per slide... </div>
 *     <button class="carousel-prev">‹</button>
 *     <button class="carousel-next">›</button>
 *     <div class="carousel-dots"></div>
 *   </div>
 */
const Carousel = (function () {
  function init(root) {
    const track = root.querySelector(".carousel-slides");
    if (!track) return;
    const slides = Array.prototype.slice.call(track.children);
    if (!slides.length) return;

    let index = 0;
    const dotsHost = root.querySelector(".carousel-dots");
    let dots = [];

    function show(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (s, idx) { s.classList.toggle("is-active", idx === index); });
      dots.forEach(function (d, idx) { d.classList.toggle("is-active", idx === index); });
    }

    if (dotsHost) {
      dotsHost.innerHTML = slides.map(function (_, i) {
        return '<button type="button" class="carousel-dot" data-index="' + i + '" aria-label="Go to slide ' + (i + 1) + '"></button>';
      }).join("");
      dots = Array.prototype.slice.call(dotsHost.children);
      dots.forEach(function (d) {
        d.addEventListener("click", function () { show(Number(d.getAttribute("data-index"))); restart(); });
      });
    }

    const prevBtn = root.querySelector(".carousel-prev");
    const nextBtn = root.querySelector(".carousel-next");
    if (prevBtn) prevBtn.addEventListener("click", function () { show(index - 1); restart(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { show(index + 1); restart(); });

    let timer = null;
    function restart() {
      if (root.getAttribute("data-autoplay") !== "true") return;
      clearInterval(timer);
      timer = setInterval(function () { show(index + 1); }, Number(root.getAttribute("data-interval")) || 5000);
    }

    root.addEventListener("mouseenter", function () { clearInterval(timer); });
    root.addEventListener("mouseleave", restart);

    show(0);
    restart();
  }

  function initAll() {
    document.querySelectorAll("[data-carousel]").forEach(init);
  }

  return { init: init, initAll: initAll };
})();
