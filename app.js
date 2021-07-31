"use strict";

//add classes
const weather = new FetchWeather();
const uv = new FetchUV();

//save city data to local storage & display list of 10 most recent cities
const cityWeatherList =
  JSON.parse(localStorage.getItem("cityWeatherList")) || [];

let cityList = document.querySelector(".search-display");
let weatherDisplay = document.querySelector(".weather-display");

//populate ui with localStorage
const updateUI = () => {
  if (cityWeatherList.length > 0) {
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
    cityList.classList.add("hidden");
    weatherDisplay.classList.add("hidden");
  }
};

function removeHidden() {
  // Get all the elements that match the selector into an Array
  const hidden = Array.prototype.slice.call(
    document.querySelectorAll(".hidden")
  );
  hidden.forEach(function (item) {
    item.classList.remove("hidden");
  });
}

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

  //prevent duplicate cities from being added to the cityWeatherList
  let addCityToList = true;

  for (let i = 0; i < cityWeatherList.length; i++) {
    if (cityWeatherList[i].city === cityWeather.city) {
      addCityToList = false;
    }
  }

  if (addCityToList) {
    cityWeatherList.unshift(cityWeather);
    cityWeatherList.splice(10);
    localStorage.setItem("cityWeatherList", JSON.stringify(cityWeatherList));
    window.location.assign("/");
  }
};


//add search button event listener
const inputValue = document.querySelector(".form-control");
const button = document.querySelector(".btn");

button.addEventListener("click", event => {
  event.preventDefault();
  const currentCityValue = inputValue.value;

  weather.getWeather(currentCityValue).then(data => {
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

const removeCity = cityToRemove => {
  let index = cityWeatherList.findIndex(i => i.city === cityToRemove);
  cityWeatherList.splice(index, 1)
  updateUI(cityWeatherList);
}

const updateWeather = cityToUpdate => {
  let index = cityWeatherList.findIndex(i => i.city === cityToUpdate);
  let updatedCity = cityWeatherList.splice(index, 1)[0];
  cityWeatherList.unshift(updatedCity);
  updateUI(cityWeatherList);
};

const deleteCityList = () => {
 cityWeatherList.length = 0
 updateUI(cityWeatherList)
}

updateUI();
