/**
 * Shared product card renderer + the click/change handlers that make
 * "Add to Cart" and the weight selector work on every page that shows
 * product cards (home, shop, search results).
 */
const ProductCard = (function () {
  function render(product) {
    const variants = product.variants;
    const options = variants.map(function (v, i) {
      return '<option value="' + i + '" data-price="' + v.price + '" data-mrp="' + (v.mrp || "") + '">' + v.weight + "</option>";
    }).join("");
    const first = variants[0];
    const badge = product.badge ? '<span class="product-badge">' + Utils.escapeHtml(product.badge) + "</span>" : "";
    const mrp = first.mrp ? '<span class="mrp">' + Utils.formatCurrency(first.mrp) + "</span>" : "";

    return (
      '<div class="product-card" data-product-id="' + product.id + '">' +
      '<a class="product-card-media" href="' + Utils.page("pages/product.html?id=" + encodeURIComponent(product.id)) + '">' +
      badge +
      '<img src="' + Utils.asset(product.image) + '" alt="' + Utils.escapeHtml(product.name) + '" loading="lazy">' +
      "</a>" +
      '<div class="product-card-body">' +
      '<a class="product-card-title" href="' + Utils.page("pages/product.html?id=" + encodeURIComponent(product.id)) + '">' + Utils.escapeHtml(product.name) + "</a>" +
      '<div class="product-card-rating">' +
      '<span class="stars">' + Utils.starString(product.rating || 0) + "</span>" +
      '<span class="rating-count">(' + (product.reviews || 0) + ")</span>" +
      "</div>" +
      '<select class="product-card-weight js-weight-select" aria-label="Select weight">' + options + "</select>" +
      '<div class="product-card-price">' +
      '<span class="price js-price">' + Utils.formatCurrency(first.price) + "</span>" +
      '<span class="mrp js-mrp">' + (mrp || "") + "</span>" +
      "</div>" +
      "</div>" +
      '<ul class="cart-bottom">' +
      '<li><button type="button" class="icon-btn js-wishlist" title="Add to wishlist"><i class="fa-regular fa-heart"></i></button></li>' +
      '<li><button type="button" class="add-to-cart js-add-to-cart">Add to Cart</button></li>' +
      '<li><a class="icon-btn" href="' + Utils.page("pages/product.html?id=" + encodeURIComponent(product.id)) + '" title="View product"><i class="fa-solid fa-eye"></i></a></li>' +
      "</ul>" +
      "</div>"
    );
  }

  function renderGrid(container, products) {
    if (!container) return;
    if (!products.length) {
      container.innerHTML = '<div class="empty-state"><i class="fa-solid fa-box-open"></i><p>No products found.</p></div>';
      return;
    }
    container.innerHTML = products.map(render).join("");
  }

  // Event delegation — works for cards rendered on any page, at any time.
  document.addEventListener("change", function (e) {
    if (!e.target.classList.contains("js-weight-select")) return;
    const card = e.target.closest(".product-card");
    const select = e.target;
    const opt = select.options[select.selectedIndex];
    const price = Number(opt.getAttribute("data-price"));
    const mrp = opt.getAttribute("data-mrp");
    card.querySelector(".js-price").textContent = Utils.formatCurrency(price);
    const mrpEl = card.querySelector(".js-mrp");
    mrpEl.textContent = mrp ? Utils.formatCurrency(mrp) : "";
  });

  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".js-add-to-cart");
    if (!btn) return;
    const card = btn.closest("[data-product-id]");
    const productId = card.getAttribute("data-product-id");
    const product = getProductById(productId);
    if (!product) return;
    const select = card.querySelector(".js-weight-select");
    const qtyInput = card.querySelector(".js-qty-input");
    const idx = select ? Number(select.value) : 0;
    const variant = product.variants[idx] || product.variants[0];
    const qty = qtyInput ? Number(qtyInput.value) || 1 : 1;

    Cart.addItem(product.id, variant.weight, variant.price, qty);
    Utils.toast(product.name + " (" + variant.weight + ") added to cart.");

    btn.classList.add("added");
    const original = btn.textContent;
    btn.textContent = "Added ✓";
    setTimeout(function () { btn.classList.remove("added"); btn.textContent = original; }, 1200);
  });

  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".js-wishlist");
    if (!btn) return;
    btn.classList.toggle("is-active");
    const icon = btn.querySelector("i");
    if (btn.classList.contains("is-active")) {
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid");
      Utils.toast("Saved to your wishlist.");
    } else {
      icon.classList.remove("fa-solid");
      icon.classList.add("fa-regular");
    }
  });

  return { render: render, renderGrid: renderGrid };
})();
