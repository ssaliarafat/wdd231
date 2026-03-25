// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// Variables for API path - added &units=imperial for Fahrenheit
const myKey = "64554e70f1fe3fb1d6059a34f736711e";
const myLat = "49.75205053823756";
const myLog = "6.637083228597732";
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLog}&appid=${myKey}&units=imperial`;


async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data); // Now we call the display function
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}


function displayResults(data) {
    // 1. Get Temperature (rounded to 0 decimal places)
    currentTemp.innerHTML = `${data.main.temp.toFixed(0)}&deg;F`;

    // 2. Get Icon Code and build the source URL
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // 3. Get Description (and capitalize it for a better look)
    let desc = data.weather[0].description;
    const capitalizedDesc = desc.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    // 4. Update the Image and Caption
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', capitalizedDesc);
    captionDesc.textContent = capitalizedDesc;
}

apiFetch();
