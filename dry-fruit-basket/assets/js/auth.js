/**
 * Auth module — client-side only (no backend exists for this static site).
 *
 * Accounts are stored in localStorage. Passwords are NOT stored in plain
 * text but are only lightly obfuscated (not real cryptographic hashing) —
 * this is a demo-grade auth flow suitable for a front-end-only project,
 * not a substitute for a real authentication backend.
 */
const Auth = (function () {
  const USERS_KEY = "dfb_users_v1";
  const SESSION_KEY = "dfb_session_v1";

  function hash(str) {
    // Simple non-cryptographic hash, good enough to avoid storing raw
    // passwords in plain text in localStorage for this demo.
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    }
    return "h" + h.toString(16) + "." + btoa(unescape(encodeURIComponent(str))).split("").reverse().join("");
  }

  function getUsers() {
    return Utils.readJSON(USERS_KEY, []);
  }

  function saveUsers(users) {
    Utils.writeJSON(USERS_KEY, users);
  }

  function findUser(email) {
    email = String(email || "").trim().toLowerCase();
    return getUsers().find(function (u) { return u.email === email; });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
  }

  /** Returns { valid, issues[] } describing password strength requirements. */
  function checkPassword(password) {
    password = String(password || "");
    const issues = [];
    if (password.length < 8) issues.push("at least 8 characters");
    if (!/[a-zA-Z]/.test(password)) issues.push("at least one letter");
    if (!/[0-9]/.test(password)) issues.push("at least one number");
    return { valid: issues.length === 0, issues: issues };
  }

  /**
   * Pure validation, no side effects — safe to call just to check/display
   * field errors (e.g. while a "accept terms" checkbox is still unticked)
   * without accidentally creating an account.
   */
  function validateSignup(data) {
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim().toLowerCase();
    const phone = String(data.phone || "").trim();
    const password = String(data.password || "");
    const confirm = String(data.confirm || "");
    const errors = {};

    if (name.length < 2) errors.name = "Please enter your full name.";
    if (!isValidEmail(email)) errors.email = "Please enter a valid email address.";
    if (phone && !/^[0-9+\-\s]{7,15}$/.test(phone)) errors.phone = "Please enter a valid phone number.";

    const pw = checkPassword(password);
    if (!pw.valid) errors.password = "Password needs " + pw.issues.join(", ") + ".";
    if (password !== confirm) errors.confirm = "Passwords do not match.";

    if (!errors.email && findUser(email)) {
      errors.email = "An account with this email already exists.";
    }

    return { valid: Object.keys(errors).length === 0, errors: errors, normalized: { name: name, email: email, phone: phone, password: password } };
  }

  function signup(data) {
    const check = validateSignup(data);
    if (!check.valid) {
      return { ok: false, errors: check.errors };
    }

    const n = check.normalized;
    const users = getUsers();
    users.push({ name: n.name, email: n.email, phone: n.phone, passwordHash: hash(n.password), createdAt: Date.now() });
    saveUsers(users);
    setSession(n.email);
    return { ok: true };
  }

  function login(email, password) {
    email = String(email || "").trim().toLowerCase();
    password = String(password || "");
    const errors = {};

    if (!isValidEmail(email)) errors.email = "Please enter a valid email address.";
    if (!password) errors.password = "Please enter your password.";

    if (Object.keys(errors).length) {
      return { ok: false, errors: errors };
    }

    const user = findUser(email);
    if (!user || user.passwordHash !== hash(password)) {
      return { ok: false, errors: { form: "Incorrect email or password." } };
    }

    setSession(email);
    return { ok: true };
  }

  function setSession(email) {
    Utils.writeJSON(SESSION_KEY, { email: email, loggedInAt: Date.now() });
    document.dispatchEvent(new CustomEvent("dfb:auth-changed"));
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    document.dispatchEvent(new CustomEvent("dfb:auth-changed"));
  }

  function getCurrentUser() {
    const session = Utils.readJSON(SESSION_KEY, null);
    if (!session) return null;
    const user = findUser(session.email);
    if (!user) return null;
    return { name: user.name, email: user.email, phone: user.phone };
  }

  return {
    isValidEmail: isValidEmail,
    checkPassword: checkPassword,
    validateSignup: validateSignup,
    signup: signup,
    login: login,
    logout: logout,
    getCurrentUser: getCurrentUser
  };
})();
