// MEMBERS ELEMENTS (DIRECTORY PAGE ONLY)
const membersEl = document.getElementById('members');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');


// LOAD MEMBERS ONLY IF DIRECTORY PAGE
async function loadMembers() {

    if (!membersEl) return;

    try {

        const res = await fetch('data/members.json');
        const members = await res.json();

        renderMembers(members);

    } catch (e) {

        membersEl.textContent = 'Failed to load members.';

    }

}


// RENDER MEMBERS
function renderMembers(members) {

    membersEl.innerHTML = '';

    members.forEach(m => {

        const card = document.createElement('article');

        card.className = 'card';

        card.innerHTML = `
        <img src="images/${m.image}" alt="${m.name}">
        <h3>${m.name}</h3>
        <p><strong>Address:</strong> ${m.address}</p>
        <p><strong>Phone:</strong> <a href="tel:${m.phone}">${m.phone}</a></p>
        <p><a href="${m.website}" target="_blank">Website</a></p>
        <p><em>Level: ${['Member', 'Silver', 'Gold'][m.level - 1]}</em></p>
        `;

        membersEl.appendChild(card);

    });

}


// HAMBURGER MENU (SAFE ON ALL PAGES)
document.addEventListener("DOMContentLoaded", function () {

    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("nav ul");

    if (hamburger && nav) {

        hamburger.addEventListener("click", function () {

            nav.classList.toggle("show");
            hamburger.classList.toggle("show");

        });

    }

});


// GRID / LIST BUTTONS (DIRECTORY PAGE ONLY)
if (gridBtn && listBtn && membersEl) {

    gridBtn.addEventListener('click', () => {

        membersEl.classList.replace('list', 'grid');

        gridBtn.setAttribute('aria-pressed', 'true');
        listBtn.setAttribute('aria-pressed', 'false');

    });

    listBtn.addEventListener('click', () => {

        membersEl.classList.replace('grid', 'list');

        listBtn.setAttribute('aria-pressed', 'true');
        gridBtn.setAttribute('aria-pressed', 'false');

    });

}


// FOOTER DATE SCRIPT (ALL PAGES)
const footerYearEl = document.getElementById('footerYear');
const footerLastModifiedEl = document.getElementById('footerLastModified');

if (footerYearEl) {

    footerYearEl.textContent = new Date().getFullYear();

}

if (footerLastModifiedEl) {

    const lm = document.lastModified
        ? new Date(document.lastModified)
        : new Date();

    footerLastModifiedEl.textContent = lm.toLocaleString();

}


loadMembers();