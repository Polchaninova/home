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
// if (weather[city]) {
//   let ferenhait = (weather[city].temp * 1.8 + 32).toFixed(0);
//   alert(
//     `It is currently ${weather[city].temp}°C  (${ferenhait}°F) in ${city} with a humidity of ${weather[city].humidity}`
//   );
// } else if (city) {
//   alert(
//     `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city.toLowerCase()}`
//   );
// }

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
let days = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let list = response.data.list;

  let currentDays = {};
  list.forEach((item) => {
    let day = days[new Date(Date.parse(item.dt_txt)).getDay()];
    if (!currentDays[day]) {
      currentDays[day] = {
        tempMax: item.main.temp_max,
        tempMin: item.main.temp_min,
        items: [item],
      };
    } else {
      currentDays[day] = {
        tempMax: Math.max(item.main.temp_max, currentDays[day].tempMax),
        tempMin: Math.min(item.main.temp_min, currentDays[day].tempMax),
        items: currentDays[day].items.concat(item),
      };
    }
  });

  let forecastHTML = `<div class="row">`;
  Object.keys(currentDays).forEach(function (day) {
    let tempMax = Math.round(currentDays[day].tempMax);
    let tempMin = Math.round(currentDays[day].tempMin);
    let items = currentDays[day].items;
    let middleItem = items[Math.round(items.length / 2)];
    let iconCode = middleItem.weather[0].icon;

    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    forecastHTML =
      forecastHTML +
      `
<div class="col-2">
  <div class="weather-forecast-date">${day}</div>
      
      <img src="${iconUrl}"/>
      <br />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">${tempMax}° </span>
        <span class="weather-forecast-temperature-min">${tempMin}° </span>
      </div>
  </h2>
</div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

let apiKey = "12b765e58ad1df7247a7dd8bf64421e7";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kharkiv&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);

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

  getForecast(response.data.coord);
}

function getWeatherForCity(cityName) {
  let apiKey = "12b765e58ad1df7247a7dd8bf64421e7";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  return axios.get(apiUrl);
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "12b765e58ad1df7247a7dd8bf64421e7";
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

function getForecast(coords) {
  let latitude = coords.lat;
  let longitude = coords.lon;
  let units = "metric";
  let apiKey = "12b765e58ad1df7247a7dd8bf64421e7";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/forecast";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
// displayForecast();
