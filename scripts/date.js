document.addEventListener("DOMContentLoaded", function () {
    // current year
    const yearSpan = document.getElementById("copyright-year");
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;

    // last modified date
    document.getElementById("lastModified").innerHTML = "Last Modified: " + document.lastModified;
});