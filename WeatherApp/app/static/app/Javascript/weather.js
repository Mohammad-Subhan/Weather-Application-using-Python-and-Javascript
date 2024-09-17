document.addEventListener("DOMContentLoaded", function () {
    const city = window.djangoContext.city;
    const WEATHER_API_KEY = window.djangoContext.weather_api_key;
    getWeatherData(city, WEATHER_API_KEY);
});

function getWeatherData(city, API_KEY) {

    const spinner = document.querySelector("#spinner");
    const content = document.querySelector(".weather-div");
    const errorSpan = document.querySelector("#error-span");

    const currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=[cityName]&appid=[API_KEY]";
    const weatherForecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=[lat]&lon=[lon]&appid=[API_KEY]";

    console.log(API_KEY)
    fetch(currentWeatherURL.replace("[cityName]", city).replace("[API_KEY]", API_KEY))
        .then(response => response.json())
        .then(weatherData => {

            if (weatherData["cod"] === "404") {
                cityNotFoundError()
            }

            let lat = weatherData["coord"]["lat"];
            let lon = weatherData["coord"]["lon"];

            // ================================== CONTINUE FROM HERE =================================
            fetch(weatherForecastURL.replace("[lat]", lat).replace("[lon]", lon).replace("[API_KEY]", API_KEY))
                .then(response => response.json())
                .then(forecastData => {

                    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    let sunriseDate = new Date(weatherData["sys"]["sunrise"] * 1000);
                    let sunsetDate = new Date(weatherData["sys"]["sunset"] * 1000);
                    let currentDate = new Date(weatherData["dt"] * 1000);

                    let currentWeatherData = {
                        "city": weatherData["name"],
                        "country": weatherData["sys"]["country"],
                        "weather": weatherData["weather"][0]["main"],
                        "description": weatherData["weather"][0]["description"],
                        "temperature": Math.round(weatherData["main"]["temp"] - 273.15),
                        "feels_like": Math.round(weatherData["main"]["feels_like"] - 273.15),
                        "wind_speed": weatherData["wind"]["speed"],
                        "humidity": weatherData["main"]["humidity"],
                        "sunrise": `${("0" + sunriseDate.getHours()).slice(-2)}:${("0" + sunriseDate.getMinutes()).slice(-2)}`,
                        "sunset": `${("0" + sunsetDate.getHours()).slice(-2)}:${("0" + sunsetDate.getMinutes()).slice(-2)}`,
                        "current_day": days[currentDate.getDay()],
                        "current_datetime": `${("0" + currentDate.getDate()).slice(-2)} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()} - ${("0" + currentDate.getHours()).slice(-2)}:${("0" + currentDate.getMinutes()).slice(-2)}`,
                        "icon": weatherData["weather"][0]["icon"]
                    };

                    let weatherForecastData = [];

                    for (let i = 5; i < forecastData["list"].length; i += 8) {

                        let data = forecastData["list"][i];

                        let date = new Date(data["dt"] * 1000)

                        weatherForecastData.push({
                            "day": days[date.getDay()],
                            "temperature": Math.round(data["main"]["temp"] - 273.15),
                            "weather": data["weather"][0]["main"],
                            "icon": data["weather"][0]["icon"]
                        });

                    }

                    spinner.style.display = "none";
                    content.style.display = "block";
                    displayData(currentWeatherData, weatherForecastData);

                });

        })
        .catch(error => {
            if (error instanceof CityNotFoundError) {
                console.error('City not found:', error.message);
                errorSpan.innerHTML = "City not found";
                errorSpan.style.display = "block";
                spinner.style.display = "none";

            } else {
                // Handle other errors
                errorSpan.innerHTML = "Failed to load data, please try again";
                errorSpan.style.display = "block";
                spinner.style.display = "none";
            }

        });
}

class CityNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "CityNotFoundError";
    }
}

function cityNotFoundError() {
    throw new CityNotFoundError('City not found');
}

function displayData(weatherData, forecastData) {

    const current_weather_div = document.querySelector(".current-weather-div");
    const detail_forecast_div = document.querySelector(".detail-forecast-div");

    current_weather_div.innerHTML = "";
    detail_forecast_div.innerHTML = "";

    current_weather_div.innerHTML = `
    <div id="date-location-div">
        <p class="day">${weatherData.current_day}</p>
        <p class="date">${weatherData.current_datetime}</p>
        <div class="location-div">
            <img src="/static/app/icons/location.png" class="location-img">
            <p class="location">${weatherData.city}, ${weatherData.country}</p>
        </div>
    </div>
    <div id="weather-condition-div">
        <img src="/static/app/icons/${weatherData.icon}.png" id="weather-icon">
        <p class="temperature">${weatherData.temperature}&deg;C</p>
        <p class="main-weather">${weatherData.weather}</p>
    </div>
    `;

    detail_forecast_div.innerHTML = `
    <div class="details-div">
        <div class="description-div">
            <div class="description">
                <label class="description-label">Description</label>
                <label class="description-value values">${capitalizeFirstLetter(weatherData.description)}</label>
            </div>
            <div class="description">
                <label class="description-label">Feels Like</label>
                <label class="description-value values">${weatherData.feels_like} &deg;C</label>
            </div>
        </div>
        <div class="extra-details-div">
            <div class="details" id="humidity">
                <div class="img-div">
                    <img src="/static/app/icons/humidity.png" id="humidity-img" class="details-img">
                </div>
                <p class="labels" id="humidity-label">Humidity</p>
                <p class="labels values" id="humidity-value">${weatherData.humidity}%</p>
            </div>
            <div class="details" id="wind">
                <div class="img-div">
                    <img src="/static/app/icons/wind.png" class="details-img">
                </div>
                <p class="labels" id="wind-label">Wind</p>
                <p class="labels values" id="wind-value">${Math.round(parseInt(weatherData.wind_speed) * 36) / 10} km/h</p>
            </div>
            <div class="details" id="sun-time">
                <div class="sunrise-div">
                    <div class="img-div">
                        <img src="/static/app/icons/sunrise.png" class="details-img">
                    </div>
                    <p class="labels" id="sunrise-label">Sunrise</p>
                    <p class="labels values" id="sunrise-value">${weatherData.sunrise}</p>
                </div>
                <div class="sunset-div">
                    <div class="img-div">
                        <img src="/static/app/icons/sunset.png" class="details-img">
                    </div>
                    <p class="labels" id="sunset-label">Sunset</p>
                    <p class="labels values" id="sunset-value">${weatherData.sunset}</p>
                </div>
            </div>
        </div>
        <div class="forecast-heading-div">
            <p class="description-label" id="forecast-label">Weather Forecast</p>
        </div>
    </div>
    <div class="forecast-div">
    </div>
    `;

    const forecast_div = document.querySelector(".forecast-div");
    forecast_div.innerHTML = "";

    for (const data of forecastData) {
        forecast_div.insertAdjacentHTML('beforeend', `
        <div class="day-divs">
            <p class="forecast-day forecast-labels">${data.day}</p>
            <div class="img-div">
                <img class="forecast-img" src="/static/app/icons/${data.icon}.png">
            </div>
            <p class="forecast-weather forecast-labels">${data.weather}</p>
            <p class="forecast-temp forecast-labels">${data.temperature}&deg;C</p>
        </div>
        `);
    }
}

function capitalizeFirstLetter(str) {
    return str
        .split(' ')              // Split the string into an array of words
        .map(word =>             // Map each word to its capitalized form
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(' ');              // Join the array back into a single string
}
