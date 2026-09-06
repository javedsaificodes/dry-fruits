/**
 * Renders the shared site header and footer into every page.
 *
 * Each page only needs:
 *   <header id="site-header"></header>
 *   ...page content...
 *   <footer id="site-footer"></footer>
 *
 * Keeping the header/footer markup in one place (instead of copy-pasted
 * into every .html file) is what makes the nav, search box, login state
 * and cart badge behave consistently across the whole site.
 */
(function () {
  function categoryLinks() {
    return CATEGORIES.map(function (c) {
      return '<li><a href="' + Utils.page("pages/shop.html?category=" + c.slug) + '">' + c.label + "</a></li>";
    }).join("");
  }

  function headerTemplate() {
    const user = Auth.getCurrentUser();
    const accountBlock = user
      ? (
        '<div class="account-menu">' +
        '<a class="action-item account-toggle js-account-toggle" href="#">' +
        '<i class="fa-regular fa-circle-user"></i><span>' + Utils.escapeHtml(user.name.split(" ")[0]) + "</span>" +
        "</a>" +
        '<div class="account-dropdown js-account-dropdown">' +
        '<div class="account-dropdown-name">Hi, ' + Utils.escapeHtml(user.name) + "</div>" +
        '<div class="account-dropdown-email">' + Utils.escapeHtml(user.email) + "</div>" +
        '<button type="button" class="account-dropdown-logout js-logout"><i class="fa-solid fa-right-from-bracket"></i> Log out</button>' +
        "</div>" +
        "</div>"
      )
      : (
        '<a class="action-item" href="' + Utils.page("pages/login.html") + '">' +
        '<i class="fa-regular fa-user"></i><span>Login</span>' +
        "</a>"
      );

    return (
      '<div class="top-bar">' +
      '<div class="container">' +
      '<div class="row d-flex justify-content-between">' +
      '<div class="top-call">' +
      '<a class="phone"><i class="fa-solid fa-phone"></i></a>' +
      '<a href="tel:918424888555">91 8424 888 555</a>' +
      "<span>|</span>" +
      '<a href="tel:912241278855">91 22 4127 8855</a>' +
      "</div>" +
      '<div class="top-message"><span>₹ 1 from every pack sold will be donated to SKRM Foundation</span></div>' +
      '<div class="social-media"><ul>' +
      '<li><a href="#"><i class="fa-brands fa-facebook-f"></i></a></li>' +
      '<li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>' +
      '<li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>' +
      "</ul></div>" +
      "</div></div></div>" +

      '<div class="nav-bar">' +
      '<div class="container">' +
      '<div class="row d-flex justify-content-between align-items-center">' +
      '<div class="logo"><a href="' + Utils.page("index.html") + '"><img src="' + Utils.asset("assets/img/dry-fruits-logo.svg") + '" alt="Dry Fruit Basket logo"></a></div>' +

      '<div class="site-menu d-flex align-items-center">' +
      '<div class="middle-menu"><ul class="d-flex">' +
      CATEGORIES.map(function (c) {
        return '<li><a href="' + Utils.page("pages/shop.html?category=" + c.slug) + '">' + c.label + "</a></li>";
      }).join("") +
      '<li><a href="' + Utils.page("pages/about.html") + '">About</a></li>' +
      '<li><a href="' + Utils.page("pages/contact.html") + '">Contact</a></li>' +
      "</ul></div>" +

      '<div class="right-menu"><ul class="right-ul d-flex align-items-center">' +
      '<li><button type="button" class="action-item search-btn js-search-toggle"><i class="fa-solid fa-magnifying-glass"></i><span>Search</span></button></li>' +
      '<li>' + accountBlock + "</li>" +
      '<li><a class="action-item cart-link" href="' + Utils.page("pages/cart.html") + '">' +
      '<img class="cart" src="' + Utils.asset("assets/img/cart-bag.png") + '" alt="Cart">' +
      '<span class="nav-add-items js-cart-count">0</span></a></li>' +
      "</ul></div>" +
      "</div>" +

      '<button type="button" class="hamburger js-hamburger" aria-label="Toggle menu"><span class="line"></span><span class="line"></span><span class="line"></span></button>' +
      "</div></div>" +

      '<div class="search-bar js-search-bar">' +
      '<div class="container">' +
      '<form class="search-bar-form js-search-form">' +
      '<i class="fa-solid fa-magnifying-glass"></i>' +
      '<input type="search" class="js-search-input" placeholder="Search for cashews, almonds, dates…" autocomplete="off">' +
      '<button type="button" class="search-bar-close js-search-close"><i class="fa-solid fa-xmark"></i></button>' +
      "</form>" +
      '<div class="search-dropdown js-search-dropdown"></div>' +
      "</div></div>" +

      '<div class="mobile-panel js-mobile-panel">' +
      '<div class="mobile-panel-head">' +
      '<img src="' + Utils.asset("assets/img/dry-fruits-logo.svg") + '" alt="logo">' +
      '<button type="button" class="js-mobile-close" aria-label="Close menu"><i class="fa-solid fa-xmark"></i></button>' +
      "</div>" +
      '<ul class="mobile-panel-list">' +
      CATEGORIES.map(function (c) {
        return '<li><a href="' + Utils.page("pages/shop.html?category=" + c.slug) + '">' + c.label + "</a></li>";
      }).join("") +
      '<li><a href="' + Utils.page("pages/about.html") + '">About Us</a></li>' +
      '<li><a href="' + Utils.page("pages/contact.html") + '">Contact Us</a></li>' +
      (user
        ? '<li><a href="' + Utils.page("pages/cart.html") + '">Cart</a></li><li><button type="button" class="js-logout mobile-logout-btn">Log out (' + Utils.escapeHtml(user.name.split(" ")[0]) + ")</button></li>"
        : '<li><a href="' + Utils.page("pages/login.html") + '">Login</a></li><li><a href="' + Utils.page("pages/signup.html") + '">Sign Up</a></li><li><a href="' + Utils.page("pages/cart.html") + '">Cart</a></li>'
      ) +
      "</ul>" +
      "</div>" +
      '<div class="mobile-panel-overlay js-mobile-overlay"></div>' +
      "</div>"
    );
  }

  function footerTemplate() {
    const year = new Date().getFullYear();
    return (
      '<footer class="footer">' +
      '<div class="container">' +
      '<div class="row d-flex align-items-center">' +
      '<div class="col-lg-3 col-md-12 p-0"><div class="footer-img"><img src="' + Utils.asset("assets/img/dry-fruits-logo.svg") + '" alt="Dry Fruit Basket"><p class="footer-tagline">Premium dry fruits, seeds, dates &amp; nuts — sourced fresh, delivered to your door.</p></div></div>' +
      '<div class="col-lg-9 col-md-12"><div class="row">' +
      '<div class="col-lg-3 col-md-6 col-sm-6"><div class="footer-content"><span class="footer-content-title">categories</span><ul class="footer-ul">' + categoryLinks() + "</ul></div></div>" +
      '<div class="col-lg-3 col-md-6 col-sm-6"><div class="footer-content"><span class="footer-content-title">my account</span><ul class="footer-ul">' +
      '<li><a href="' + Utils.page("pages/login.html") + '">Login</a></li>' +
      '<li><a href="' + Utils.page("pages/signup.html") + '">Create Account</a></li>' +
      '<li><a href="' + Utils.page("pages/cart.html") + '">My Cart</a></li>' +
      "</ul></div></div>" +
      '<div class="col-lg-3 col-md-6 col-sm-6"><div class="footer-content"><span class="footer-content-title">customer care</span><ul class="footer-ul">' +
      '<li><a href="' + Utils.page("pages/contact.html") + '">Contact Us</a></li>' +
      '<li><a href="' + Utils.page("pages/contact.html") + '">FAQ</a></li>' +
      '<li><a href="#">Terms &amp; Conditions</a></li>' +
      '<li><a href="#">Privacy Policy</a></li>' +
      "</ul></div></div>" +
      '<div class="col-lg-3 col-md-6 col-sm-6"><div class="footer-content"><span class="footer-content-title">company</span><ul class="footer-ul">' +
      '<li><a href="' + Utils.page("pages/about.html") + '">About Us</a></li>' +
      '<li><a href="' + Utils.page("pages/shop.html") + '">Shop All</a></li>' +
      '<li><a href="' + Utils.page("pages/contact.html") + '">Corporate Gifting</a></li>' +
      "</ul></div></div>" +
      "</div></div>" +
      "</div>" +
      '<div class="row footer-bottom">' +
      '<div class="col-lg-6 col-md-12 p-0"><div class="copyright-content"><p class="m-0">© ' + year + ' Dry Fruit Basket. All Rights Reserved.</p></div></div>' +
      '<div class="col-lg-6 col-md-12"><div class="copyright-menu"><ul class="copyright-ul d-flex justify-content-center m-0">' +
      '<li class="copyright-li"><a href="#">Delivery</a></li>' +
      '<li class="copyright-li"><a href="#">Returns</a></li>' +
      '<li class="copyright-li"><a href="#">Terms</a></li>' +
      '<li class="copyright-li"><a href="#">Privacy</a></li>' +
      "</ul></div></div>" +
      "</div></div>" +
      "</footer>"
    );
  }

  function mountHeader() {
    const host = document.getElementById("site-header");
    if (!host) return;
    host.innerHTML = headerTemplate();

    const searchBar = host.querySelector(".js-search-bar");
    const searchInput = host.querySelector(".js-search-input");
    const searchDropdown = host.querySelector(".js-search-dropdown");
    const searchForm = host.querySelector(".js-search-form");

    host.querySelectorAll(".js-search-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        searchBar.classList.toggle("is-open");
        if (searchBar.classList.contains("is-open")) {
          setTimeout(function () { searchInput.focus(); }, 50);
        }
      });
    });
    const closeBtn = host.querySelector(".js-search-close");
    if (closeBtn) closeBtn.addEventListener("click", function () { searchBar.classList.remove("is-open"); });

    Search.bindLiveSearch(searchInput, searchDropdown, searchForm);

    const hamburger = host.querySelector(".js-hamburger");
    const mobilePanel = host.querySelector(".js-mobile-panel");
    const mobileOverlay = host.querySelector(".js-mobile-overlay");
    const mobileClose = host.querySelector(".js-mobile-close");
    function closeMobile() {
      mobilePanel.classList.remove("is-open");
      mobileOverlay.classList.remove("is-open");
      hamburger.classList.remove("is-active");
    }
    if (hamburger) {
      hamburger.addEventListener("click", function () {
        mobilePanel.classList.toggle("is-open");
        mobileOverlay.classList.toggle("is-open");
        hamburger.classList.toggle("is-active");
      });
    }
    if (mobileOverlay) mobileOverlay.addEventListener("click", closeMobile);
    if (mobileClose) mobileClose.addEventListener("click", closeMobile);

    const accountToggle = host.querySelector(".js-account-toggle");
    if (accountToggle) {
      const dropdown = host.querySelector(".js-account-dropdown");
      accountToggle.addEventListener("click", function (e) {
        e.preventDefault();
        dropdown.classList.toggle("is-open");
      });
      document.addEventListener("click", function (e) {
        if (!accountToggle.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.classList.remove("is-open");
        }
      });
    }

    host.querySelectorAll(".js-logout").forEach(function (btn) {
      btn.addEventListener("click", function () {
        Auth.logout();
        Utils.toast("You have been logged out.");
        setTimeout(function () { window.location.href = Utils.page("index.html"); }, 500);
      });
    });

    Cart.renderBadges();
  }

  function mountFooter() {
    const host = document.getElementById("site-footer");
    if (!host) return;
    host.innerHTML = footerTemplate();
  }

  document.addEventListener("dfb:auth-changed", mountHeader);

  document.addEventListener("DOMContentLoaded", function () {
    mountHeader();
    mountFooter();
  });
})();
