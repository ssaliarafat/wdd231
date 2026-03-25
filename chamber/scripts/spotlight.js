const spotlightContainer =
document.querySelector("#spotlight-container");

const urlMembers =
"data/members.json";

async function getSpotlights() {

    const response =
    await fetch(urlMembers);

    const data =
    await response.json();

    const filtered =
    data.filter(member =>
    member.level >= 2);

    const shuffled =
    filtered.sort(() =>
    0.5 - Math.random());

    const selected =
    shuffled.slice(0,3);

    selected.forEach(member => {

        const card =
        document.createElement("section");

        card.innerHTML = `
        <h3>${member.name}</h3>
        <img src="images/${member.image}">
        <p>${member.phone}</p>
        <p>${member.address}</p>
        <a href="${member.website}" target="_blank">
        Visit Website
        </a>
        `;

        spotlightContainer.appendChild(card);

    });

}

getSpotlights();