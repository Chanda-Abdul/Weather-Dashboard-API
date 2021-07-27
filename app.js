"use strict";

//add classes
const weather = new FetchWeather();
const uv = new FetchUV();

//save city data to local storage & display list of 10 most recent cities
const cityWeatherList =
  JSON.parse(localStorage.getItem("cityWeatherList")) || [];

//populate ui with localStorage
const updateUI = cityWeatherList => {
  if (cityWeatherList.length > 0) {
    function removeHidden() {
      // Get all the elements that match the selector into an Array
      var hidden = Array.prototype.slice.call(
        document.querySelectorAll(".hidden")
      );
      hidden.forEach(function (item) {
        item.classList.remove("hidden");
      });
    }

    removeHidden();
    populateUI(
      cityWeatherList[0].city,
      cityWeatherList[0].date,
      cityWeatherList[0].icon,
      cityWeatherList[0].temp,
      cityWeatherList[0].humidity,
      cityWeatherList[0].wind,
      cityWeatherList[0].uv,
      cityWeatherList[0].forecast
    );
    populateUICityListLeft(cityWeatherList);
  } else {
    localStorage.setItem("cityWeatherList", JSON.stringify(cityWeatherList));
    window.location.assign("/");
    cityList.parentElement.classList.add("hidden");
    weatherDisplay.parentElement.classList.add("hidden");
  }
};

let cityList = document.querySelector(".city-list");
let weatherDisplay = document.querySelector(".today-weather-headline");

const saveCityToLocalStorage = (
  city,
  date,
  icon,
  temp,
  humidity,
  wind,
  uv,
  forecast
) => {
  const cityWeather = {
    city: city,
    date: date,
    icon: icon,
    temp: temp,
    humidity: humidity,
    wind: wind,
    uv: uv,
    forecast: forecast
  };

  cityWeatherList.unshift(cityWeather);

  cityWeatherList.splice(10);

  localStorage.setItem("cityWeatherList", JSON.stringify(cityWeatherList));
  window.location.assign("/");
};

//add search button event listener
const inputValue = document.querySelector(".form-control");
const button = document.querySelector(".btn");

button.addEventListener("click", event => {
  event.preventDefault();
  const currentCityValue = inputValue.value;

  weather.getWeather(currentCityValue).then(data => {
    console.log(data, "app.js");
    let currentLatitude = data.city.coord.lat;
    let currentLongitude = data.city.coord.lon;
    let currentNameValue = data["city"]["name"];
    let currentDateValue = data["list"][0]["dt_txt"].slice(0, 10).split("-");
    let currentIconValue = data["list"][0]["weather"][0]["icon"];
    let currentTempValue = Math.round(data.list["0"].main.temp);
    let currentHumidityValue = data.list["0"].main.humidity;
    let currentWindValue = data.list["0"].wind.speed;
    let currentForecast = [];
    for (let i = 0; i < data.list.length; i++) {
      if (i === 0 || i % 8 === 0) {
        currentForecast.push(data.list[i]);
      }
    }

    uv.getUV(currentLatitude, currentLongitude).then(data => {
      let currentUVValue = data.current.uvi;
      populateUI(
        currentNameValue,
        currentDateValue,
        currentIconValue,
        currentTempValue,
        currentHumidityValue,
        currentWindValue,
        currentUVValue,
        currentForecast
      );
      saveCityToLocalStorage(
        currentNameValue,
        currentDateValue,
        currentIconValue,
        currentTempValue,
        currentHumidityValue,
        currentWindValue,
        currentUVValue,
        currentForecast
      );
    });
    populateUICityListLeft(cityWeatherList);
  });
});

const updateWeather = cityName => {
  let newCity = cityName;
  let index = cityWeatherList.findIndex(i => i.city === newCity);
  updateCityWeatherList(index);
};

const updateCityWeatherList = index => {
  let temp = cityWeatherList[0];
  cityWeatherList[0] = cityWeatherList[index];
  cityWeatherList[index] = temp;
  updateUI(cityWeatherList);
};

updateUI(cityWeatherList);
