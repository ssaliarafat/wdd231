// ===============================
// Fifth Version Studios - Contact Page
// Features:
// 1) Responsive hamburger navigation
// 2) Add a timestamp before submitting the form
// ===============================

// ---------- DOM ELEMENTS ----------
const menuButton = document.querySelector(".menu-button");
const primaryNav = document.querySelector(".primary-nav");
const yearSpan = document.querySelector("#year");
const timestampField = document.querySelector("#timestamp");

// ---------- MOBILE NAVIGATION ----------
if (menuButton && primaryNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

// ---------- FOOTER YEAR ----------
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ---------- FORM TIMESTAMP ----------
if (timestampField) {
  timestampField.value = new Date().toISOString();
}