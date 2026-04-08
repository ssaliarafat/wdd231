import { places } from "../data/places.mjs";

const placesGrid = document.querySelector("#places-grid");
const visitMessage = document.querySelector("#visit-message");
const storageKey = "makindyeDiscoverLastVisit";
const msPerDay = 1000 * 60 * 60 * 24;

function renderPlaces() {
    if (!placesGrid) return;

    placesGrid.innerHTML = "";

    places.forEach((place, index) => {
        const card = document.createElement("article");
        card.className = `place-card place-${index + 1}`;

        card.innerHTML = `
            <h2>${place.name}</h2>
            <figure>
                <img src="${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button type="button">Learn More</button>
        `;

        placesGrid.appendChild(card);
    });
}

function showVisitMessage() {
    if (!visitMessage) return;

    const now = Date.now();
    const lastVisit = Number(localStorage.getItem(storageKey));

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSince = Math.floor((now - lastVisit) / msPerDay);

        if (daysSince < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitMessage.textContent = `You last visited ${daysSince} ${daysSince === 1 ? "day" : "days"} ago.`;
        }
    }

    localStorage.setItem(storageKey, String(now));
}

renderPlaces();
showVisitMessage();