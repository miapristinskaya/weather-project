//showing current date
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

//reaction to changing city
function showCurrentTemperature(response) {
  console.log(response);
  let temperature = response.data.main.temp;
  console.log(temperature);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${Math.round(temperature)}`;
  let anotherCity = document.querySelector("#choose-city-input");
  let cityFormatted = anotherCity.value.toString().trim().toLowerCase();
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${cityFormatted}`;
}

//changing city
function chooseAnotherCity(event) {
  event.preventDefault();
  let anotherCity = document.querySelector("#choose-city-input");
  let cityFormatted = anotherCity.value.toString().trim().toLowerCase();
  console.log(cityFormatted);
  let apiKey = "6e6ec494746b5229a9f2d526478c924c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityFormatted}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

let chooseCityForm = document.querySelector("#choose-city-form");
chooseCityForm.addEventListener("submit", chooseAnotherCity);

//if to click "My Location" button
function showMyLocationTemperature(response) {
  let temperature = response.data.main.temp;
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${Math.round(temperature)}`;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${response.data.name}`;
}

function getMyLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "6e6ec494746b5229a9f2d526478c924c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showMyLocationTemperature);
}

function myLocationFunction() {
  navigator.geolocation.getCurrentPosition(getMyLocation);
}

let buttonMyLocation = document.querySelector("button");
buttonMyLocation.addEventListener("click", myLocationFunction);
