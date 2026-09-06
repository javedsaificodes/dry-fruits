/** Home page: fills the dynamic sections from the shared product catalog. */
document.addEventListener("DOMContentLoaded", function () {
  // Shop by categories — one tab panel per category, 4 products each.
  CATEGORIES.forEach(function (cat) {
    const panel = document.querySelector('[data-tab-panel="' + cat.slug + '"] .js-product-grid');
    if (panel) {
      ProductCard.renderGrid(panel, getProductsByCategory(cat.slug).slice(0, 4));
    }
  });

  // New arrivals — group products (those flagged "New" first) into chunks of 3.
  const newArrivalsTrack = document.querySelector(".js-new-arrivals-track");
  if (newArrivalsTrack) {
    const featured = PRODUCTS.filter(function (p) { return p.badge === "New"; });
    const rest = PRODUCTS.filter(function (p) { return p.badge !== "New"; });
    const ordered = featured.concat(rest).slice(0, 9);
    const chunks = [];
    for (let i = 0; i < ordered.length; i += 3) chunks.push(ordered.slice(i, i + 3));
    newArrivalsTrack.innerHTML = chunks.map(function (chunk) {
      return '<div class="carousel-slide"><div class="new-arrival-grid">' +
        chunk.map(function (p) {
          const v = p.variants[0];
          return (
            '<div class="arrival-card" data-product-id="' + p.id + '">' +
            '<a href="' + Utils.page("pages/product.html?id=" + p.id) + '"><img src="' + Utils.asset(p.image) + '" alt="' + Utils.escapeHtml(p.name) + '"></a>' +
            '<div class="arrival-card-body">' +
            '<h3>' + Utils.escapeHtml(p.name) + "</h3>" +
            "<p>" + Utils.escapeHtml(p.description) + "</p>" +
            '<div class="arrival-bottom">' +
            '<span class="price">' + Utils.formatCurrency(v.price) + '<span class="arrival-weight"> / ' + v.weight + "</span></span>" +
            '<button type="button" class="theme-btn js-add-to-cart">Add to Cart</button>' +
            "</div></div>" +
            '<select class="js-weight-select" hidden>' + p.variants.map(function (vv, i) { return '<option value="' + i + '" data-price="' + vv.price + '" data-mrp="' + (vv.mrp || "") + '">' + vv.weight + "</option>"; }).join("") + "</select>" +
            "</div>"
          );
        }).join("") +
        "</div></div>";
    }).join("");
    Carousel.init(newArrivalsTrack.closest("[data-carousel]"));
  }

  // Featured products strip — quick links into search results for that ingredient.
  const featuredStrip = document.querySelector(".js-featured-strip");
  if (featuredStrip) {
    const items = [
      { img: "assets/img/walnut.avif", label: "Walnut", q: "walnut" },
      { img: "assets/img/pista.avif", label: "Pista", q: "pista" },
      { img: "assets/img/almond.avif", label: "Almond", q: "almond" },
      { img: "assets/img/cashew.avif", label: "Cashew", q: "cashew" },
      { img: "assets/img/raisin.avif", label: "Raisin", q: "raisin" },
      { img: "assets/img/dates.avif", label: "Dates", q: "dates" },
      { img: "assets/img/cranberry.avif", label: "Cranberry", q: "cranberry" },
      { img: "assets/img/blue-barry.avif", label: "Blueberry", q: "blueberry" },
      { img: "assets/img/figs.avif", label: "Fig", q: "fig" },
      { img: "assets/img/apricot.avif", label: "Apricot", q: "apricot" },
      { img: "assets/img/black-currant.avif", label: "Black Currant", q: "black currant" }
    ];
    featuredStrip.innerHTML = items.map(function (it) {
      return (
        '<a class="featured-item" href="' + Utils.page("pages/shop.html?q=" + encodeURIComponent(it.q)) + '">' +
        '<img src="' + Utils.asset(it.img) + '" alt="' + it.label + '">' +
        "<span>" + it.label + "</span>" +
        "</a>"
      );
    }).join("");
  }
});
