//Showing date and time
let now = new Date();
let weekDay = now.getDay();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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

//Showing current weather
function showCurrentWeather(response) {
  console.log(response.data);

  let temperature = response.data.main.temp;
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${Math.round(temperature)}`;

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
  console.log(icon);
  document.querySelector(
    "#current-icon"
  ).src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  currentCity.innerHTML = `${response.data.name}`;
}

//If to fill "Another city" form
function chooseAnotherCity(event) {
  event.preventDefault();
  let anotherCity = document.querySelector("#choose-city-input");
  let cityFormatted = anotherCity.value.toString().trim().toLowerCase();
  let apiKey = "6e6ec494746b5229a9f2d526478c924c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityFormatted}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}

let chooseCityForm = document.querySelector("#choose-city-form");
chooseCityForm.addEventListener("submit", chooseAnotherCity);

//if to click "My Location" button
function getMyLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "6e6ec494746b5229a9f2d526478c924c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function myLocationFunction() {
  navigator.geolocation.getCurrentPosition(getMyLocation);
}

let buttonMyLocation = document.querySelector("button");
buttonMyLocation.addEventListener("click", myLocationFunction);
