/** Cart page: renders line items and totals, and a lightweight checkout flow. */
document.addEventListener("DOMContentLoaded", function () {
  const emptyEl = document.querySelector(".js-cart-empty");
  const contentEl = document.querySelector(".js-cart-content");
  const linesEl = document.querySelector(".js-cart-lines");
  const successEl = document.querySelector(".js-cart-success");
  if (!linesEl) return;

  const FREE_SHIPPING_THRESHOLD = 499;
  const SHIPPING_FEE = 49;

  function lineRow(line) {
    const p = line.product;
    return (
      '<div class="cart-line" data-id="' + line.id + '" data-weight="' + Utils.escapeHtml(line.weight) + '">' +
      '<a class="cart-line-media" href="' + Utils.page("pages/product.html?id=" + p.id) + '"><img src="' + Utils.asset(p.image) + '" alt="' + Utils.escapeHtml(p.name) + '"></a>' +
      '<div class="cart-line-info">' +
      '<a class="cart-line-name" href="' + Utils.page("pages/product.html?id=" + p.id) + '">' + Utils.escapeHtml(p.name) + "</a>" +
      '<span class="cart-line-weight">Pack: ' + Utils.escapeHtml(line.weight) + "</span>" +
      '<button type="button" class="cart-line-remove js-remove-line"><i class="fa-solid fa-trash-can"></i> Remove</button>' +
      "</div>" +
      '<div class="cart-line-qty">' +
      '<button type="button" class="js-qty-minus" aria-label="Decrease quantity">−</button>' +
      '<input type="number" class="js-qty-input" value="' + line.qty + '" min="1" max="99">' +
      '<button type="button" class="js-qty-plus" aria-label="Increase quantity">+</button>' +
      "</div>" +
      '<div class="cart-line-price">' + Utils.formatCurrency(line.price * line.qty) + "</div>" +
      "</div>"
    );
  }

  function render() {
    const lines = Cart.getLinesWithProducts();

    if (!lines.length) {
      if (emptyEl) emptyEl.hidden = false;
      if (contentEl) contentEl.hidden = true;
      return;
    }
    if (emptyEl) emptyEl.hidden = true;
    if (contentEl) contentEl.hidden = false;
    if (successEl) successEl.hidden = true;
    if (contentEl) contentEl.style.display = "";

    linesEl.innerHTML = lines.map(lineRow).join("");

    const subtotal = Cart.getSubtotal();
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    const total = subtotal + shipping;

    setText(".js-cart-subtotal", Utils.formatCurrency(subtotal));
    setText(".js-cart-shipping", shipping === 0 ? "FREE" : Utils.formatCurrency(shipping));
    setText(".js-cart-total", Utils.formatCurrency(total));
    setText(".js-cart-item-count", String(Cart.getCount()));

    const shippingNote = document.querySelector(".js-shipping-note");
    if (shippingNote) {
      shippingNote.textContent = shipping === 0
        ? "You've unlocked free shipping!"
        : "Add " + Utils.formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal) + " more for free shipping.";
    }
  }

  function setText(selector, text) {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  }

  linesEl.addEventListener("click", function (e) {
    const row = e.target.closest(".cart-line");
    if (!row) return;
    const id = row.getAttribute("data-id");
    const weight = row.getAttribute("data-weight");

    if (e.target.closest(".js-remove-line")) {
      Cart.removeItem(id, weight);
      Utils.toast("Item removed from cart.");
      render();
      return;
    }
    if (e.target.closest(".js-qty-plus")) {
      const input = row.querySelector(".js-qty-input");
      const next = Math.min(99, (parseInt(input.value, 10) || 1) + 1);
      Cart.updateQty(id, weight, next);
      render();
      return;
    }
    if (e.target.closest(".js-qty-minus")) {
      const input = row.querySelector(".js-qty-input");
      const next = (parseInt(input.value, 10) || 1) - 1;
      Cart.updateQty(id, weight, next);
      render();
      return;
    }
  });

  linesEl.addEventListener("change", function (e) {
    if (!e.target.classList.contains("js-qty-input")) return;
    const row = e.target.closest(".cart-line");
    Cart.updateQty(row.getAttribute("data-id"), row.getAttribute("data-weight"), e.target.value);
    render();
  });

  const clearBtn = document.querySelector(".js-clear-cart-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      if (!Cart.getCart().length) return;
      Cart.clearCart();
      Utils.toast("Cart cleared.");
      render();
    });
  }

  const checkoutBtn = document.querySelector(".js-checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      if (!Cart.getCart().length) return;

      const user = Auth.getCurrentUser();
      if (!user) {
        Utils.toast("Please log in to checkout.", "error");
        setTimeout(function () {
          window.location.href = Utils.page("pages/login.html?redirect=cart");
        }, 700);
        return;
      }

      const orderId = "DFB" + Date.now().toString().slice(-8);
      const total = document.querySelector(".js-cart-total").textContent;

      if (contentEl) contentEl.hidden = true;
      if (successEl) {
        successEl.hidden = false;
        successEl.querySelector(".js-order-id").textContent = orderId;
        successEl.querySelector(".js-order-total").textContent = total;
        successEl.querySelector(".js-order-email").textContent = user.email;
      }
      Cart.clearCart();
    });
  }

  render();
});
