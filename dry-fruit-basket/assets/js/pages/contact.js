/** Contact page: client-side validated form (no backend — shows a confirmation on success). */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const phoneInput = document.getElementById("contact-phone");
  const messageInput = document.getElementById("contact-message");
  const successEl = document.querySelector(".js-contact-success");

  function setError(input, message) {
    const group = input.closest(".form-group");
    const errEl = group.querySelector(".field-error");
    if (errEl) errEl.textContent = message || "";
    group.classList.toggle("has-error", !!message);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let hasError = false;

    if (nameInput.value.trim().length < 2) { setError(nameInput, "Please enter your name."); hasError = true; }
    else setError(nameInput, "");

    if (!Auth.isValidEmail(emailInput.value)) { setError(emailInput, "Please enter a valid email address."); hasError = true; }
    else setError(emailInput, "");

    if (phoneInput.value && !/^[0-9+\-\s]{7,15}$/.test(phoneInput.value)) { setError(phoneInput, "Please enter a valid phone number."); hasError = true; }
    else setError(phoneInput, "");

    if (messageInput.value.trim().length < 10) { setError(messageInput, "Message should be at least 10 characters."); hasError = true; }
    else setError(messageInput, "");

    if (hasError) return;

    form.hidden = true;
    if (successEl) successEl.hidden = false;
    Utils.toast("Thanks! Your message has been sent.");
  });
});
