/** Login page: client-side validation against the localStorage user store. */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login-form");
  if (!form) return;

  const emailInput = document.getElementById("login-email");
  const passwordInput = document.getElementById("login-password");
  const formError = document.querySelector(".js-form-error");

  function setError(input, message) {
    const group = input.closest(".form-group");
    const errEl = group.querySelector(".field-error");
    if (errEl) errEl.textContent = message || "";
    group.classList.toggle("has-error", !!message);
  }

  function clearErrors() {
    setError(emailInput, "");
    setError(passwordInput, "");
    if (formError) { formError.textContent = ""; formError.hidden = true; }
  }

  emailInput.addEventListener("blur", function () {
    if (emailInput.value && !Auth.isValidEmail(emailInput.value)) {
      setError(emailInput, "Please enter a valid email address.");
    } else {
      setError(emailInput, "");
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    const result = Auth.login(emailInput.value, passwordInput.value);
    if (!result.ok) {
      if (result.errors.email) setError(emailInput, result.errors.email);
      if (result.errors.password) setError(passwordInput, result.errors.password);
      if (result.errors.form && formError) {
        formError.textContent = result.errors.form;
        formError.hidden = false;
      }
      return;
    }

    const user = Auth.getCurrentUser();
    Utils.toast("Welcome back, " + user.name.split(" ")[0] + "!");
    const redirect = Utils.qs("redirect");
    setTimeout(function () {
      window.location.href = Utils.page(redirect === "cart" ? "pages/cart.html" : "index.html");
    }, 600);
  });

  const togglePw = document.querySelector(".js-toggle-password");
  if (togglePw) {
    togglePw.addEventListener("click", function () {
      const isPw = passwordInput.type === "password";
      passwordInput.type = isPw ? "text" : "password";
      togglePw.innerHTML = isPw ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
    });
  }

  if (Utils.qs("redirect") === "cart") {
    Utils.toast("Log in to continue to checkout.");
  }
});
