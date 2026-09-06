/**
 * Site search — filters the shared PRODUCTS catalog by name, category,
 * description and tags. Powers both the live suggestion dropdown in the
 * header and the /pages/shop.html search results.
 */
const Search = (function () {
  function normalize(str) {
    return String(str || "").toLowerCase().trim();
  }

  function searchProducts(query, limit) {
    const q = normalize(query);
    if (!q) return [];
    const terms = q.split(/\s+/).filter(Boolean);

    function score(product) {
      const haystack = normalize(
        product.name + " " + product.category + " " + product.description + " " + (product.tags || []).join(" ")
      );
      let s = 0;
      terms.forEach(function (term) {
        if (haystack.indexOf(term) !== -1) s += 1;
        if (normalize(product.name).indexOf(term) === 0) s += 2;
      });
      return s;
    }

    return PRODUCTS
      .map(function (p) { return { product: p, score: score(p) }; })
      .filter(function (r) { return r.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, limit || 100)
      .map(function (r) { return r.product; });
  }

  /** Wires up a header search input + dropdown for live suggestions. */
  function bindLiveSearch(input, dropdown, form) {
    if (!input || !dropdown) return;

    function render(query) {
      const results = searchProducts(query, 6);
      if (!query.trim()) {
        dropdown.classList.remove("is-open");
        dropdown.innerHTML = "";
        return;
      }
      if (!results.length) {
        dropdown.innerHTML = '<div class="search-dropdown-empty">No products found for "' + Utils.escapeHtml(query) + '".</div>';
        dropdown.classList.add("is-open");
        return;
      }
      dropdown.innerHTML = results.map(function (p) {
        const price = p.variants[0].price;
        return (
          '<a class="search-dropdown-item" href="' + Utils.page("pages/product.html?id=" + encodeURIComponent(p.id)) + '">' +
          '<img src="' + Utils.asset(p.image) + '" alt="">' +
          '<span class="search-dropdown-info">' +
          '<span class="search-dropdown-name">' + Utils.escapeHtml(p.name) + "</span>" +
          '<span class="search-dropdown-price">' + Utils.formatCurrency(price) + "</span>" +
          "</span>" +
          "</a>"
        );
      }).join("") +
        '<a class="search-dropdown-viewall" href="' + Utils.page("pages/shop.html?q=" + encodeURIComponent(query)) + '">' +
        'View all results for "' + Utils.escapeHtml(query) + '" <i class="fa-solid fa-arrow-right"></i></a>';
      dropdown.classList.add("is-open");
    }

    input.addEventListener("input", Utils.debounce(function () { render(input.value); }, 200));
    input.addEventListener("focus", function () { if (input.value.trim()) render(input.value); });
    document.addEventListener("click", function (e) {
      if (!dropdown.contains(e.target) && e.target !== input) {
        dropdown.classList.remove("is-open");
      }
    });

    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const q = input.value.trim();
        if (q) window.location.href = Utils.page("pages/shop.html?q=" + encodeURIComponent(q));
      });
    }
  }

  return { searchProducts: searchProducts, bindLiveSearch: bindLiveSearch };
})();
