<h1>Dry Fruit Basket<h1/> 

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
``
