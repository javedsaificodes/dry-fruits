# Dry Fruit Basket

A rebuilt, fully static e-commerce front end for a dry fruits / seeds / dates / nuts
shop. No build tools, no framework, no server required — open `index.html` in a
browser, or serve the folder with any static file server.

## What changed from the original

The original template was a single ~1,700-line `index.html` with duplicated,
broken markup (mismatched tags, a `<style>` block accidentally pasted inside the
`<body>`), no JavaScript at all, and no search, accounts or working cart. This
version is a ground-up rebuild that keeps the original brand look (colors, fonts,
logo, product photography) but fixes the structure and adds real functionality:

- **Professional folder structure** — pages, styles, scripts and data are each
  in their own place instead of one giant HTML file (see below).
- **Site search** — a live "as you type" suggestions dropdown in the header,
  plus a full search-results view on the Shop page.
- **Login & Sign Up** — real client-side form validation (required fields,
  email format, password strength, matching confirmation, terms checkbox).
- **A fully working cart** — add to cart (with pack-size and quantity), update
  quantity, remove items, running subtotal/shipping/total, and a checkout flow.
- Product data lives in one file, so every page (home, shop, search, product
  detail, cart) renders from the same catalog instead of hand-copied HTML.

## Folder structure

```
dry-fruits/
├── index.html                 Home page
├── pages/
│   ├── shop.html               All products — category filter, sort, search results
│   ├── product.html            Single product detail (?id=<product-id>)
│   ├── cart.html                Cart + checkout
│   ├── login.html                Login
│   ├── signup.html               Create account
│   ├── about.html                About Us
│   └── contact.html              Contact Us (validated form)
├── assets/
│   ├── css/
│   │   ├── grid.css            Minimal layout grid/utilities (container, row, col-*, d-flex…)
│   │   ├── base.css            Site-wide styles: header, nav, footer, home page sections
│   │   ├── shop.css            Product cards, product grid, product detail page
│   │   ├── cart.css            Cart page
│   │   ├── auth.css            Login / signup / contact forms
│   │   └── about.css           About page specific sections
│   ├── js/
│   │   ├── data/products.js    The product catalog (single source of truth)
│   │   ├── utils.js            Currency formatting, localStorage helpers, toasts
│   │   ├── cart.js             Cart logic (add/update/remove/totals), localStorage-backed
│   │   ├── auth.js             Signup/login validation + localStorage "accounts"
│   │   ├── search.js           Product search + live suggestions dropdown
│   │   ├── carousel.js         Small dependency-free carousel (hero, new arrivals, about page)
│   │   ├── product-card.js     Shared product card renderer + Add to Cart wiring
│   │   ├── components.js       Renders the shared header/footer on every page
│   │   ├── main.js             Site-wide glue: carousels + tab panels
│   │   └── pages/               One small script per page (home.js, shop.js, product.js,
│   │                            cart-page.js, login.js, signup.js, contact.js)
│   └── img/                    Product photos, banners, icons (unchanged from original)
└── README.md
```

Every page includes the same set of `<script>` tags in the same order (data →
utils → cart → auth → search → carousel → product-card → components → main →
page-specific script), and two placeholder elements the shared script fills in:

```html
<header id="site-header"></header>
...page content...
<footer id="site-footer"></footer>
```

This means the navigation, search box, login state and cart badge are defined
**once** (in `components.js`) and stay consistent everywhere, instead of being
copy-pasted into every HTML file (which is how the original template drifted
out of sync between pages).

## How the dynamic bits work

Because this is a static site with no backend, "login" and "cart" are
implemented entirely in the browser using `localStorage`:

- **Cart** (`assets/js/cart.js`) stores line items as
  `{ id, weight, price, qty }` under the key `dfb_cart_v1`. It's shared across
  every open tab of the site (same browser) and persists between visits.
- **Accounts** (`assets/js/auth.js`) stores created accounts under
  `dfb_users_v1` and the active session under `dfb_session_v1`. Passwords are
  never stored in plain text, but the obfuscation is **not** real cryptography
  — this is a front-end-only demo auth flow, not a substitute for a real
  authentication backend with a database and hashed+salted passwords.
- **Checkout** on the cart page is simulated: if you're not logged in it sends
  you to the login page first (`?redirect=cart`); once logged in, "Proceed to
  Checkout" generates an order ID, shows a confirmation, and clears the cart.
  There's no payment gateway — wiring one up (e.g. Razorpay/Stripe) would need
  a real backend to hold the secret key, which is out of scope for a static site.

If you outgrow `localStorage` (e.g. you want accounts and orders to be shared
across devices, or real payments), the natural next step is to point
`auth.js` and `cart.js` at a real backend API instead of `localStorage` — the
rest of the site (product data, rendering, pages) won't need to change.

## Adding or editing products

Everything about a product lives in one place:
`assets/js/data/products.js`. Each entry looks like:

```js
{
  id: "kaju-w320",
  name: "Premium Cashews (Kaju W320)",
  category: "dry-fruits",        // must match a slug in CATEGORIES
  image: "assets/img/dry-fruits/kaju.png",
  description: "...",
  rating: 4.6,
  reviews: 214,
  badge: "Bestseller",           // optional: "Bestseller" | "New" | omit
  tags: ["cashew", "kaju", "nuts"],
  variants: [
    { weight: "100 g", price: 179, mrp: 220 },
    { weight: "250 g", price: 399, mrp: 499 }
  ]
}
```

Add a new object to the `PRODUCTS` array and it automatically shows up in the
right category tab on the home page, the shop grid, search results, and gets
its own product detail page at `pages/product.html?id=<id>` — no other file
needs to change.

## Notes

- A handful of images from the original `assets/img/dry-fruits/` and root
  image folder aren't referenced by any product yet (e.g. `chocolate.png`,
  `milk-powder.png`, spare slider/arrival photos) — they're left in place in
  case you want to add more products or promotional banners later.
- External resources (Google Fonts, Font Awesome icons) are loaded from their
  CDNs; the site's own layout/styling does not depend on any external CSS or
  JS framework, so it keeps working even if those specific CDNs are blocked —
  you'd just lose the icon glyphs and the custom font.
