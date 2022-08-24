let weather = {
  Kharkov: {
    temp: 25,
    humidity: 80,
  },
  Lviv: {
    temp: 26,
    humidity: 50,
  },
  Odessa: {
    temp: 27,
    humidity: 20,
  },
  Dnepr: {
    temp: 25,
    humidity: 100,
  },
  Kyiv: {
    temp: 25,
    humidity: 80,
  },
};
let city = "Lviv";
if (weather[city]) {
  let ferenhait = (weather[city].temp * 1.8 + 32).toFixed(0);
  alert(
    `It is currently ${weather[city].temp}°C  (${ferenhait}°F) in ${city} with a humidity of ${weather[city].humidity}`
  );
} else if (city) {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city.toLowerCase()}`
  );
}

let edn = document.querySelector("#celsius-link");
console.log(edn);
edn.addEventListener("click", onclickCelsius);

let and = document.querySelector("#fahrenheit-link");
console.log(and);
and.addEventListener("click", onclickFahrenheit);

let currentTemp = document.querySelector("#current-temp");

function onclickFahrenheit(event) {
  event.preventDefault();
  let ferenhait = (weather[city].temp * 1.8 + 32).toFixed(0);
  currentTemp.textContent = ferenhait;
}
function onclickCelsius(event) {
  event.preventDefault();
  let celsius = weather[city].temp;
  currentTemp.textContent = celsius;
}
/*global axios*/
function formatDay(dayToday) {
  let hours = dayToday.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = dayToday.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = dayToday.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} <br>
  ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Fri", "Sat", "Sun", "Mon", "Tue"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
            <h2>
              Fri<br />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="#EBDB00"
                class="bi bi-sun-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"
                />
              </svg>
              <br />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max"> 26° </span>
                <span class="weather-forecast-temperature-min"> 18° </span>
              </div>
            </h2>
          </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}


function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  let cityName = cityInput.value;
  cityElement.innerHTML = cityName;
  showWeatherForCity(cityName);
}
let dayTodayElement = document.querySelector("#dayToday");
let currentTime = new Date();

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

dayTodayElement.innerHTML = formatDay(currentTime);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 74;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 26;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let message = `Today in ${city}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = message;
  console.log(h1);
  console.log(message);

  let currentTempElement = document.querySelector("#temperature");
  currentTempElement.innerHTML = temperature;
}

function getWeatherForCity(cityName) {
  let apiKey = "b5fdbe7ffc620c1e309259a98257fdc7";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  return axios.get(apiUrl);
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "b5fdbe7ffc620c1e309259a98257fdc7";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function showWeatherForCity(cityName) {
  getWeatherForCity(cityName).then(showTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition, showPosition);
}
function showPosition(position) {
  let h1 = document.querySelector("h1");
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
