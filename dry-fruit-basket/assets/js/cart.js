/**
 * Cart module — fully client-side, persisted in localStorage.
 *
 * Cart items look like: { id, weight, price, qty }
 * `id` + `weight` together identify a line (same product, different pack
 * size are separate lines, matching how the product cards let you pick a
 * weight before adding to cart).
 */
const Cart = (function () {
  const STORAGE_KEY = "dfb_cart_v1";

  function getCart() {
    return Utils.readJSON(STORAGE_KEY, []);
  }

  function saveCart(cart) {
    Utils.writeJSON(STORAGE_KEY, cart);
    document.dispatchEvent(new CustomEvent("dfb:cart-updated", { detail: { cart: cart } }));
  }

  function findLine(cart, id, weight) {
    return cart.find(function (line) { return line.id === id && line.weight === weight; });
  }

  function addItem(id, weight, price, qty) {
    qty = Math.max(1, parseInt(qty, 10) || 1);
    const cart = getCart();
    const existing = findLine(cart, id, weight);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id: id, weight: weight, price: price, qty: qty });
    }
    saveCart(cart);
    return cart;
  }

  function updateQty(id, weight, qty) {
    const cart = getCart();
    const line = findLine(cart, id, weight);
    if (!line) return cart;
    qty = parseInt(qty, 10);
    if (!qty || qty < 1) {
      return removeItem(id, weight);
    }
    line.qty = Math.min(qty, 99);
    saveCart(cart);
    return cart;
  }

  function removeItem(id, weight) {
    let cart = getCart();
    cart = cart.filter(function (line) { return !(line.id === id && line.weight === weight); });
    saveCart(cart);
    return cart;
  }

  function clearCart() {
    saveCart([]);
  }

  function getCount() {
    return getCart().reduce(function (sum, line) { return sum + line.qty; }, 0);
  }

  function getSubtotal() {
    return getCart().reduce(function (sum, line) { return sum + line.qty * line.price; }, 0);
  }

  function getLinesWithProducts() {
    return getCart().map(function (line) {
      const product = typeof getProductById === "function" ? getProductById(line.id) : null;
      return Object.assign({}, line, { product: product });
    }).filter(function (line) { return !!line.product; });
  }

  /** Updates every cart-count badge on the current page (header, mobile nav, etc). */
  function renderBadges() {
    const count = getCount();
    document.querySelectorAll(".js-cart-count").forEach(function (el) {
      el.textContent = String(count);
      el.classList.toggle("is-empty", count === 0);
    });
  }

  document.addEventListener("dfb:cart-updated", renderBadges);
  document.addEventListener("DOMContentLoaded", renderBadges);

  return {
    getCart: getCart,
    addItem: addItem,
    updateQty: updateQty,
    removeItem: removeItem,
    clearCart: clearCart,
    getCount: getCount,
    getSubtotal: getSubtotal,
    getLinesWithProducts: getLinesWithProducts,
    renderBadges: renderBadges
  };
})();
