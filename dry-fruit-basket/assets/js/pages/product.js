/** Product detail page (pages/product.html?id=...). */
document.addEventListener("DOMContentLoaded", function () {
  const root = document.querySelector(".js-product-detail");
  if (!root) return;

  const id = Utils.qs("id");
  const product = id ? getProductById(id) : null;

  if (!product) {
    root.innerHTML =
      '<div class="empty-state"><i class="fa-solid fa-triangle-exclamation"></i>' +
      "<p>We couldn't find that product.</p>" +
      '<a class="theme-btn" href="' + Utils.page("pages/shop.html") + '">Browse the shop</a></div>';
    return;
  }

  document.title = product.name + " | Dry Fruit Basket";
  const crumbEl = document.querySelector(".js-breadcrumb-current");
  if (crumbEl) crumbEl.textContent = product.name;

  let selectedVariant = 0;
  let qty = 1;

  function currentVariant() { return product.variants[selectedVariant]; }

  function renderPrice() {
    const v = currentVariant();
    root.querySelector(".js-detail-price").textContent = Utils.formatCurrency(v.price);
    const mrpEl = root.querySelector(".js-detail-mrp");
    if (v.mrp) {
      mrpEl.textContent = Utils.formatCurrency(v.mrp);
      mrpEl.hidden = false;
      const pct = Math.round((1 - v.price / v.mrp) * 100);
      root.querySelector(".js-detail-discount").textContent = pct > 0 ? pct + "% off" : "";
    } else {
      mrpEl.hidden = true;
      root.querySelector(".js-detail-discount").textContent = "";
    }
  }

  root.innerHTML =
    '<div class="product-detail-media">' +
    '<img src="' + Utils.asset(product.image) + '" alt="' + Utils.escapeHtml(product.name) + '">' +
    (product.badge ? '<span class="product-badge">' + Utils.escapeHtml(product.badge) + "</span>" : "") +
    "</div>" +
    '<div class="product-detail-info">' +
    '<h1>' + Utils.escapeHtml(product.name) + "</h1>" +
    '<div class="product-card-rating detail-rating"><span class="stars">' + Utils.starString(product.rating || 0) + '</span><span class="rating-count">' + (product.reviews || 0) + " reviews</span></div>" +
    '<p class="product-detail-desc">' + Utils.escapeHtml(product.description) + "</p>" +
    '<div class="product-detail-price-row">' +
    '<span class="price js-detail-price"></span>' +
    '<span class="mrp js-detail-mrp"></span>' +
    '<span class="discount-tag js-detail-discount"></span>' +
    "</div>" +
    '<div class="product-detail-variants">' +
    '<label>Pack size</label>' +
    '<div class="variant-pills js-variant-pills">' +
    product.variants.map(function (v, i) {
      return '<button type="button" class="variant-pill' + (i === 0 ? " is-active" : "") + '" data-index="' + i + '">' + v.weight + "</button>";
    }).join("") +
    "</div></div>" +
    '<div class="product-detail-qty">' +
    '<label>Quantity</label>' +
    '<div class="qty-stepper">' +
    '<button type="button" class="js-qty-minus" aria-label="Decrease quantity">−</button>' +
    '<input type="number" class="js-qty-input" value="1" min="1" max="99">' +
    '<button type="button" class="js-qty-plus" aria-label="Increase quantity">+</button>' +
    "</div></div>" +
    '<div class="product-detail-actions">' +
    '<button type="button" class="theme-btn theme-btn-solid js-detail-add-to-cart">Add to Cart</button>' +
    '<button type="button" class="icon-btn js-detail-wishlist" title="Add to wishlist"><i class="fa-regular fa-heart"></i></button>' +
    "</div>" +
    '<ul class="product-detail-trust">' +
    "<li><i class=\"fa-solid fa-truck-fast\"></i> Free shipping over ₹499</li>" +
    "<li><i class=\"fa-solid fa-shield-halved\"></i> 100% quality assured</li>" +
    "<li><i class=\"fa-solid fa-rotate-left\"></i> Easy 7-day returns</li>" +
    "</ul>" +
    "</div>";

  renderPrice();

  root.querySelectorAll(".variant-pill").forEach(function (pill) {
    pill.addEventListener("click", function () {
      selectedVariant = Number(pill.getAttribute("data-index"));
      root.querySelectorAll(".variant-pill").forEach(function (p) { p.classList.remove("is-active"); });
      pill.classList.add("is-active");
      renderPrice();
    });
  });

  const qtyInput = root.querySelector(".js-qty-input");
  root.querySelector(".js-qty-minus").addEventListener("click", function () {
    qtyInput.value = Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1);
  });
  root.querySelector(".js-qty-plus").addEventListener("click", function () {
    qtyInput.value = Math.min(99, (parseInt(qtyInput.value, 10) || 1) + 1);
  });

  root.querySelector(".js-detail-add-to-cart").addEventListener("click", function () {
    const v = currentVariant();
    const q = Math.max(1, parseInt(qtyInput.value, 10) || 1);
    Cart.addItem(product.id, v.weight, v.price, q);
    Utils.toast(product.name + " (" + v.weight + ") added to cart.");
  });

  root.querySelector(".js-detail-wishlist").addEventListener("click", function (e) {
    const btn = e.currentTarget;
    btn.classList.toggle("is-active");
    const icon = btn.querySelector("i");
    icon.classList.toggle("fa-regular");
    icon.classList.toggle("fa-solid");
    Utils.toast(btn.classList.contains("is-active") ? "Saved to your wishlist." : "Removed from wishlist.");
  });

  // Related products.
  const relatedGrid = document.querySelector(".js-related-grid");
  if (relatedGrid) {
    const related = getProductsByCategory(product.category).filter(function (p) { return p.id !== product.id; }).slice(0, 4);
    ProductCard.renderGrid(relatedGrid, related);
  }
});
