/** Shop page: category filtering, search results and sorting, all client-side. */
document.addEventListener("DOMContentLoaded", function () {
  const grid = document.querySelector(".js-product-grid");
  const heading = document.querySelector(".js-shop-heading");
  const countEl = document.querySelector(".js-result-count");
  const pillsEl = document.querySelector(".js-category-pills");
  const sortSelect = document.getElementById("sort-select");
  const searchBanner = document.querySelector(".js-active-search");
  const searchTermEl = document.querySelector(".js-active-search-term");
  const clearSearchBtn = document.querySelector(".js-clear-search");

  if (!grid) return;

  function currentState() {
    return { category: Utils.qs("category") || "", q: Utils.qs("q") || "" };
  }

  function setUrl(state) {
    const params = new URLSearchParams();
    if (state.category) params.set("category", state.category);
    if (state.q) params.set("q", state.q);
    const url = window.location.pathname + (params.toString() ? "?" + params.toString() : "");
    window.history.replaceState({}, "", url);
  }

  function renderPills(state) {
    if (!pillsEl) return;
    const all = [{ slug: "", label: "All Products" }].concat(CATEGORIES);
    pillsEl.innerHTML = all.map(function (c) {
      const active = state.category === c.slug ? " is-active" : "";
      return '<button type="button" class="category-pill' + active + '" data-slug="' + c.slug + '">' + c.label + "</button>";
    }).join("");
    pillsEl.querySelectorAll(".category-pill").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const state = currentState();
        state.category = btn.getAttribute("data-slug");
        setUrl(state);
        renderAll();
      });
    });
  }

  function sortList(list, sortVal) {
    const copy = list.slice();
    switch (sortVal) {
      case "price-asc":
        return copy.sort(function (a, b) { return a.variants[0].price - b.variants[0].price; });
      case "price-desc":
        return copy.sort(function (a, b) { return b.variants[0].price - a.variants[0].price; });
      case "name-asc":
        return copy.sort(function (a, b) { return a.name.localeCompare(b.name); });
      case "rating-desc":
        return copy.sort(function (a, b) { return (b.rating || 0) - (a.rating || 0); });
      default:
        return copy;
    }
  }

  function renderAll() {
    const state = currentState();
    renderPills(state);

    let list = state.q ? Search.searchProducts(state.q, 999) : PRODUCTS.slice();
    if (state.category) list = list.filter(function (p) { return p.category === state.category; });
    list = sortList(list, sortSelect ? sortSelect.value : "relevance");

    if (heading) {
      if (state.category) {
        const cat = CATEGORIES.find(function (c) { return c.slug === state.category; });
        heading.textContent = cat ? cat.label : "Shop";
      } else {
        heading.textContent = "Shop All Products";
      }
    }

    if (searchBanner) {
      if (state.q) {
        searchBanner.hidden = false;
        if (searchTermEl) searchTermEl.textContent = state.q;
      } else {
        searchBanner.hidden = true;
      }
    }

    if (countEl) countEl.textContent = list.length + (list.length === 1 ? " product" : " products");

    ProductCard.renderGrid(grid, list);
  }

  if (sortSelect) sortSelect.addEventListener("change", renderAll);
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", function () {
      const state = currentState();
      state.q = "";
      setUrl(state);
      renderAll();
    });
  }

  renderAll();
});
