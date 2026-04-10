// ===============================
// Fifth Version Studios - Thank You Page
// Features:
// 1) Read form data from the URL
// 2) Display the submitted values on the confirmation page
// ===============================

// ---------- DOM ELEMENT ----------
const results = document.querySelector("#results");

// ---------- GET QUERY DATA ----------
const params = new URLSearchParams(window.location.search);

// ---------- DISPLAY SUBMISSION ----------
if (results) {
  results.innerHTML = `
    <p><strong>Name:</strong> ${params.get("name") || "Not provided"}</p>
    <p><strong>Email:</strong> ${params.get("email") || "Not provided"}</p>
    <p><strong>Your Thought:</strong> ${params.get("project") || "Not provided"}</p>
    <p><strong>Submitted:</strong> ${params.get("timestamp") || "Unknown"}</p>
  `;
}