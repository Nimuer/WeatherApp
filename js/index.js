let tempValueCelsius = 18;
let tempValueFahrenheit = 64;
// let cityInput = ;
// let normalizedInput = cityInput.toLowerCase().trim();
// -------------------------------------------------Current Time
function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let currentDate = `${currentDay} ${currentHour}:${currentMinutes}`;
  let formateDate = document.querySelector("#current-date");
  formateDate.innerHTML = currentDate;
}
formatDate(new Date());
// ---------------------------------------------------Current City Search
// function citySearch(event) {
//   event.preventDefault();
//   let inputCity = document.querySelector("#input-city");
//   let formatedCity = inputCity.value;
//   let changedNameCity = document.querySelector("#city-name-chng");
//   changedNameCity.innerHTML = formatedCity;
// }
// let formInput = document.querySelector("#input-form");
// formInput.addEventListener("submit", citySearch);
// // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// function currentCity(event) {
//   let changedNameCity = document.querySelector("#city-name-chng");
//   changedNameCity.innerHTML = "Odessa";
// }

// -------------------------------------Change °F|°C
function changeToFahrenheit(event) {
  event.preventDefault();
  let changedCurrentTemp = document.querySelector("#temperature-current");
  changedCurrentTemp.innerHTML = `${Math.round(
    (tempValueCelsius * 9) / 5 + 32
  )}°`;
}
let changeFahrenheit = document.querySelector("#fahrenheit-temp");
changeFahrenheit.addEventListener("click", changeToFahrenheit);

function changeToCelsius(event) {
  event.preventDefault();
  let changedCurrentTemp = document.querySelector("#temperature-current");
  changedCurrentTemp.innerHTML = `${Math.round(
    ((tempValueFahrenheit - 32) * 5) / 9
  )}°`;
}
let changeCelsius = document.querySelector("#celsius-temp");
changeCelsius.addEventListener("click", changeToCelsius);

// ---------------------------------Home work 5
function displayWeatherCondition(response) {
  let currentLocation = document.querySelector(".current-location");
  currentLocation.innerHTML = response.data.name;
  let currentTemperature = document.querySelector("#temperature-current");
  currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}°`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
  let description = document.querySelector("#description");
  descCapitalize = response.data.weather[0].description;
  description.innerHTML =
    descCapitalize[0].toUpperCase() + descCapitalize.slice(1);

  // ---------------------------------Temp min/max
  let tempMin = document.querySelector("#temp-min");
  tempMin.innerHTML = `Night ${Math.round(response.data.main.temp_min)}°`;
  let tempMax = document.querySelector("#temp-max");
  tempMax.innerHTML = `Day ${Math.round(response.data.main.temp_max)}°`;
}

// -------------------------------Current Location--------------
function searchLocation(position) {
  let apiKey = "869348f1707fd9d1adc61e806e5c3732";
  let unit = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getGeolocation(event) {
  navigator.geolocation.getCurrentPosition(searchLocation);
}
getGeolocation();
let geolocation = document.querySelector("#current-location");
geolocation.addEventListener("click", getGeolocation);

// -------------------------------Search Location--------------
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-city");

  if (searchInput.value) {
    let units = "metric";
    let apiKey = "db7d2e78c779a2432fadef0082ebe3e7";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
  } else {
    alert("Please type a city");
  }
}

function showTemperature(response) {
  let currentLocation = document.querySelector(".current-location");
  currentLocation.innerHTML = response.data.name;
  let currentTemperature = document.querySelector("#temperature-current");
  currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}°`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
  // ---------------------------------Temp min/max
  let tempMin = document.querySelector("#temp-min");
  tempMin.innerHTML = `Night ${Math.round(response.data.main.temp_min)}°`;
  let tempMax = document.querySelector("#temp-max");
  tempMax.innerHTML = `Day ${Math.round(response.data.main.temp_max)}°`;
  let description = document.querySelector("#description");
  descCapitalize = response.data.weather[0].description;
  description.innerHTML =
    descCapitalize[0].toUpperCase() + descCapitalize.slice(1);
}
let button = document.querySelector("#search-button");
button.addEventListener("click", search);
