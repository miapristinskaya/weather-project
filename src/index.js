let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//Showing date and time
let now = new Date();
let weekDay = now.getDay();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${weekDays[weekDay]} ${hours}:${minutes}`;

let apiKey = "6e6ec494746b5229a9f2d526478c924c";

//Showing the day of the week in forecast
function formatDay(timecode) {
  let date = new Date(timecode * 1000);
  let day = date.getDay();
  return weekDays[day];
}

//Forecast for several days
function showForecastWeather(response) {
  let forecastData = response.data.daily;
  console.log(forecastData);
  let forecastResult = `<div class="row">`;
  forecastData.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastResult =
        forecastResult +
        `
            <div class="card-group">
              <div class="card" style="width: 12.5rem">
                <ul class="list-group list-group-flush">
                <li class="list-group-item">${formatDay(forecastDay.dt)}</li>
                <li class="list-group-item"><img src="img/${
                  forecastDay.weather[0].icon
                }.png" class="card-img-top" alt=${
          forecastDay.weather[0].description
        } /></li>
                  <li class="list-group-item"><img src="img/day0.png" width="18%" alt="day" /> ${Math.round(
                    forecastDay.temp.day
                  )}°C <sup>like ${Math.round(
          forecastDay.feels_like.day
        )}°C</sup></li>
                  <li class="list-group-item"><img src="img/night0.png" width="15%" alt="night" /> ${Math.round(
                    forecastDay.temp.night
                  )}°C <sup>like ${Math.round(
          forecastDay.feels_like.night
        )}°C</sup></li>
                  <li class="list-group-item"><img src="img/wind0.png" width="15%" alt="wind" /> ${Math.round(
                    forecastDay.wind_speed
                  )} m/s <sup>gust ${Math.round(
          forecastDay.wind_gust
        )} m/s</sup></li>
                </ul>
              </div>
            </div>
          `;
    }
  });
  forecastResult = forecastResult + `</div>`;
  let forecastBlock = document.querySelector("#forecast");
  forecastBlock.innerHTML = forecastResult;
}

function getWeatherForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecastWeather);
}

//Start city is Kyiv
axios
  .get(
    `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&&units=metric`
  )
  .then(showCurrentWeather);

//Showing current weather
function showCurrentWeather(response) {
  console.log(response.data);

  temperature = response.data.main.temp;
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${Math.round(temperature)}`;

  let temperatureLike = response.data.main.feels_like;
  let currentTemperatureLike = document.querySelector(
    "#current-temperature-like"
  );
  currentTemperatureLike.innerHTML = `${Math.round(temperatureLike)}`;

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `${Math.round(humidity)}`;

  let description = response.data.weather[0].description;
  currentDescription = document.querySelector("#current-description");
  currentDescription.innerHTML = `${description}`;

  let wind = response.data.wind.speed;
  let currentWind = document.querySelector("#current-wind");
  currentWind.innerHTML = `${Math.round(wind)}`;

  let icon = response.data.weather[0].icon;
  document.querySelector("#current-icon").src = `img/${icon}.png`;
  document.querySelector("#current-icon").alt = description;

  let city = response.data.name;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${city}`;

  let country = response.data.sys.country;
  let currentCountry = document.querySelector("#current-country");
  currentCountry.innerHTML = `${country}`;

  getWeatherForecast(response.data.coord);
}

//If to fill "Another city" form
function getCurrentWeather(event) {
  event.preventDefault();
  let anotherCity = document.querySelector("#choose-city-input");
  let cityFormatted = anotherCity.value.toString().trim().toLowerCase();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityFormatted}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}

let chooseCityForm = document.querySelector("#choose-city-form");
chooseCityForm.addEventListener("submit", getCurrentWeather);

//if to click "My Location" button
function getMyLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function myLocationFunction() {
  navigator.geolocation.getCurrentPosition(getMyLocation);
}

let buttonMyLocation = document.querySelector("button");
buttonMyLocation.addEventListener("click", myLocationFunction);

let temperature = null;

/*
function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("current-unit");
  fahrenheitLink.classList.add("current-unit");
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(temperature * 1.8 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("current-unit");
  fahrenheitLink.classList.remove("current-unit");
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(temperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);
*/
