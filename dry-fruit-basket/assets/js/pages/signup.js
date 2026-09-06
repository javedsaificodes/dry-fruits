/** Signup page: full client-side validation + a live password-strength hint. */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signup-form");
  if (!form) return;

  const nameInput = document.getElementById("signup-name");
  const emailInput = document.getElementById("signup-email");
  const phoneInput = document.getElementById("signup-phone");
  const passwordInput = document.getElementById("signup-password");
  const confirmInput = document.getElementById("signup-confirm");
  const termsInput = document.getElementById("signup-terms");
  const strengthEl = document.querySelector(".js-password-strength");
  const formError = document.querySelector(".js-form-error");

  function setError(input, message) {
    const group = input.closest(".form-group");
    const errEl = group.querySelector(".field-error");
    if (errEl) errEl.textContent = message || "";
    group.classList.toggle("has-error", !!message);
  }

  function clearErrors() {
    [nameInput, emailInput, phoneInput, passwordInput, confirmInput].forEach(function (i) { setError(i, ""); });
    if (formError) { formError.textContent = ""; formError.hidden = true; }
  }

  passwordInput.addEventListener("input", function () {
    const pw = passwordInput.value;
    const check = Auth.checkPassword(pw);
    if (!strengthEl) return;
    if (!pw) {
      strengthEl.textContent = "";
      strengthEl.className = "js-password-strength password-strength";
      return;
    }
    let level = "weak";
    if (check.valid && pw.length >= 12) level = "strong";
    else if (check.valid) level = "good";
    strengthEl.className = "js-password-strength password-strength strength-" + level;
    strengthEl.textContent = check.valid
      ? (level === "strong" ? "Strong password" : "Good password")
      : "Needs " + check.issues.join(", ");
  });

  emailInput.addEventListener("blur", function () {
    if (emailInput.value && !Auth.isValidEmail(emailInput.value)) {
      setError(emailInput, "Please enter a valid email address.");
    } else {
      setError(emailInput, "");
    }
  });

  confirmInput.addEventListener("input", function () {
    if (confirmInput.value && confirmInput.value !== passwordInput.value) {
      setError(confirmInput, "Passwords do not match.");
    } else {
      setError(confirmInput, "");
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    const fieldData = {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      password: passwordInput.value,
      confirm: confirmInput.value
    };

    // Validate everything up front (this is side-effect free) so the user
    // sees every problem at once, not just "accept the terms" one at a time.
    const check = Auth.validateSignup(fieldData);
    const map = { name: nameInput, email: emailInput, phone: phoneInput, password: passwordInput, confirm: confirmInput };
    let hasError = !check.valid;
    Object.keys(check.errors).forEach(function (key) {
      if (map[key]) setError(map[key], check.errors[key]);
    });

    if (!termsInput.checked) {
      hasError = true;
      if (formError) {
        formError.textContent = "Please accept the Terms & Conditions to continue.";
        formError.hidden = false;
      }
    }

    if (hasError) return;

    const result = Auth.signup(fieldData);
    if (!result.ok) {
      Object.keys(result.errors).forEach(function (key) {
        if (map[key]) setError(map[key], result.errors[key]);
      });
      return;
    }

    Utils.toast("Account created! Welcome, " + nameInput.value.split(" ")[0] + ".");
    setTimeout(function () { window.location.href = Utils.page("index.html"); }, 600);
  });
});
