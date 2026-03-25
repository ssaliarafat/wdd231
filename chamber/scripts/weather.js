const apiKey = "64554e70f1fe3fb1d6059a34f736711e";

// CURRENT WEATHER
const currentUrl =
    `https://api.openweathermap.org/data/2.5/weather?q=Kampala&units=metric&appid=${apiKey}`;

// FORECAST
const forecastUrl =
    `https://api.openweathermap.org/data/2.5/forecast?q=Kampala&units=metric&appid=${apiKey}`;


// CURRENT WEATHER 
async function getWeather() {

    const response = await fetch(currentUrl);
    const data = await response.json();

    displayCurrentWeather(data);
}

function displayCurrentWeather(data) {

    const temp = document.querySelector("#temp");
    const desc = document.querySelector("#desc");
    const weatherIcon = document.querySelector("#weather-icon");
    const caption = document.querySelector("figcaption");

    const description = data.weather[0].description;

    temp.textContent = Math.round(data.main.temp);
    desc.textContent = description;

    // ICON
    const iconSrc =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherIcon.src = iconSrc;
    weatherIcon.alt = description;
    caption.textContent = description;
}


// FORECAST
async function getForecast() {

    const response = await fetch(forecastUrl);
    const data = await response.json();

    displayForecast(data);
}

function displayForecast(data) {

    const forecastDiv = document.querySelector("#forecast");

    forecastDiv.innerHTML = "";

    // Getting only one forecast per day
    const daily = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    daily.slice(0, 3).forEach(day => {

        const date = new Date(day.dt_txt);

        const dayName =
            date.toLocaleDateString("en-US", { weekday: "long" });

        const temp =
            Math.round(day.main.temp);

        const card = document.createElement("p");

        card.textContent = `${dayName}: ${temp}°C`;

        forecastDiv.appendChild(card);

    });
}


// CALL FUNCTIONS
getWeather();
getForecast();