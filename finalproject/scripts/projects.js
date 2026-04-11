
// Fifth Version Studios - Projects Page
// Features:
// 1) Fetch project data from local JSON
// 2) Render 15 project cards dynamically
// 3) Filter cards by category
// 4) Open an accessible modal dialog for details

// ---------- DOM ELEMENTS ----------
const menuButton = document.querySelector(".menu-button");
const primaryNav = document.querySelector(".primary-nav");
const yearSpan = document.querySelector("#year");
const grid = document.querySelector("#project-grid");
const modal = document.querySelector("#project-modal");
const modalContent = document.querySelector("#modal-content");
const closeModalButton = document.querySelector("#close-modal");
const filterButtons = document.querySelectorAll(".filter");

// ---------- DATA ----------
let projects = [];

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

// FETCH PROJECT DATA 
async function loadProjects() {
    if (!grid) return;

    try {
        grid.innerHTML = `<p class="status">Loading projects…</p>`;

        const response = await fetch("data/projects.json");
        if (!response.ok) {
            throw new Error(`Could not load projects: ${response.status}`);
        }

        projects = await response.json();
        renderProjects(projects);
    } catch (error) {
        console.error("Project load error:", error);
        grid.innerHTML = `<p class="status">Sorry, projects could not load right now.</p>`;
    }
}

// RENDER PROJECT CARDS 
function renderProjects(items) {
    if (!grid) return;

    grid.innerHTML = items.map(item => `
    <article class="project-card">
      <img src="${item.thumb}" alt="${item.title} thumbnail" loading="lazy" width="800" height="600">
      <div>
        <h3>${item.title}</h3>
        <p class="muted">${item.year} • ${capitalize(item.category)}</p>
        <p>${item.genre}</p>
        <button class="button button-secondary open-modal" data-id="${item.id}">View Project</button>
      </div>
    </article>
  `).join("");

    // Attach click handlers to each View Project button.
    document.querySelectorAll(".open-modal").forEach(button => {
        button.addEventListener("click", (event) => {
            const id = event.currentTarget.dataset.id;
            const item = projects.find(project => project.id === id);
            if (item) openModal(item);
        });
    });
}

// ---------- HELPERS ----------
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

// ---------- FILTER BUTTONS ----------
filterButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        const filter = event.currentTarget.dataset.filter;

        filterButtons.forEach(btn => btn.classList.remove("active"));
        event.currentTarget.classList.add("active");

        if (filter === "all") {
            renderProjects(projects);
            return;
        }

        const filtered = projects.filter(project => project.category === filter);
        renderProjects(filtered);
    });
});

// ---------- MODAL ----------
function openModal(item) {
    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
        <p class="eyebrow">${capitalize(item.category)} • ${item.year}</p>
        <h2>${item.title}</h2>
        <p><strong>Description:</strong> ${item.description}</p>
        <p><strong>Genre:</strong> ${item.genre}</p>
    `;

    modal.showModal();
}

if (closeModalButton && modal) {
    closeModalButton.addEventListener("click", () => {
        modal.close();
    });
}

if (modal) {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
}

// ---------- INITIAL LOAD ----------
document.addEventListener("DOMContentLoaded", loadProjects);