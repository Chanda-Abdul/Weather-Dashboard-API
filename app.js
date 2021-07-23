"use strict";

const button = document.querySelector(".btn");
const inputValue = document.querySelector(".form-control");
let currentCityName = document.querySelector(".today-city");
let currentCityDate = document.querySelector(".today-date");
let currentCityIcon = document.querySelector(".today-weather-icon");
let currentCityTemp = document.querySelector(".day-temperature");
let currentCityHumidity = document.querySelector(".day-humidity");
let currentCityWind = document.querySelector(".day-wind");
let currentCityUV = document.querySelector(".day-uv");
let currentFiveDayForecast = document.querySelector(".weather-forecast");
let cityList = document.querySelector(".city-list")

const apiKey = "b22dd2a636ebc4ce3bf4c971ba236900";
const searchUrl = "http://api.openweathermap.org/data/2.5/forecast";


//save city data to local storage & display list of 10 most recent cities
const cityWeatherList = JSON.parse(localStorage.getItem("cityWeatherList")) || []

//fetch to api on button click
//add functionality for button enter
button.addEventListener("click", function () {
  fetch(`${searchUrl}?appid=${apiKey}&q=${inputValue.value}&units=imperial`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      // set current weather values
      let currentNameValue = data["city"]["name"];
      let currentDateValue = data["list"][0]["dt_txt"].slice(0, 10).split("-");
      let currentIconValue = data["list"][0]["weather"][0]["icon"];
      let currentTempValue = data.list["0"].main.temp;
      let currentHumidityValue = data.list["0"].main.humidity;
      let currentWindValue = data.list["0"].wind.speed;
      // where's UV value???
      let currentUVValue = "n/a";
      let currentForecast = data.list.slice(0, 5);

      //add current values to localStorage
     const saveCityWeather = () => {
      //  event.preventDefault()

       const cityWeather = {
         city: currentNameValue,
         date: currentDateValue,
         icon: currentIconValue,
         temp: currentTempValue,
         humidity: currentHumidityValue,
         wind: currentWindValue,
         uv: currentUVValue,
         forecast: currentForecast 
       };

       cityWeatherList.unshift(cityWeather)

       cityWeatherList.splice(5)

       localStorage.setItem("cityWeatherList", JSON.stringify(cityWeatherList))
       window.location.assign('/')
     }
      // console.log(currentUVValue)
      // update DOM with current weather values
      currentCityName.innerHTML = currentNameValue;
      currentCityDate.innerHTML = `(${currentDateValue[1]}/${currentDateValue[2]}/${currentDateValue[0]})`;
      currentCityIcon.innerHTML = `<img src=\"http://openweathermap.org/img/w/${currentIconValue}.png">`;
      currentCityTemp.innerHTML = currentTempValue;
      currentCityHumidity.innerHTML = currentHumidityValue;
      currentCityWind.innerHTML = currentWindValue;
      currentCityUV.innerHTML = currentUVValue;
      currentFiveDayForecast.innerHTML = `${currentForecast.map(forecast => {
        return `<div class="card five-day-forecast col-2">
      
            <h5 class="card-title">${
              forecast.dt_txt.slice(0, 10).split("-")[1]
            }/${forecast.dt_txt.slice(0, 10).split("-")[2]}/${
          forecast.dt_txt.slice(0, 10).split("-")[0]
        }</h5>
          
      <img src="http://openweathermap.org/img/w/${
        forecast.weather[0].icon
      }.png" class="card-img-icon" alt="..."/>
      <div class="card-body">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <p class="forecast-details">Temp: <span class="day-temperature">${
              forecast.main.temp
            }</span>°F</p>
          </li>
          <li class="list-group-item">
            <p>Humidity: <span class="day-humidity">${
              forecast.main.humidity
            }</span>%</p>
          </li>
        </ul>
      </div>
    </div>`;
      }).join("")}`;
      saveCityWeather()
    })
    
    .catch(err => alert("Wrong city name, Try again"));
});

// display first city in localStorage
const displayCurrentWeatherData = () => {
  currentCityName.innerHTML = cityWeatherList[0].city;
  currentCityDate.innerHTML = `(${cityWeatherList[0].date[1]}/${cityWeatherList[0].date[2]}/${cityWeatherList[0].date[0]})`;
  currentCityIcon.innerHTML = `<img src=\"http://openweathermap.org/img/w/${cityWeatherList[0].icon}.png">`;
  currentCityTemp.innerHTML = cityWeatherList[0].temp;
  currentCityHumidity.innerHTML = cityWeatherList[0].humidity;
  currentCityWind.innerHTML = cityWeatherList[0].wind;
  currentCityUV.innerHTML = cityWeatherList[0].uv;
  currentFiveDayForecast.innerHTML = cityWeatherList[0].forecast.map(day => {
    return `<div class="card five-day-forecast col-2">
            <h5 class="card-title">${
              day.dt_txt.slice(0, 10).split("-")[1]
            }/${day.dt_txt.slice(0, 10).split("-")[2]}/${
          day.dt_txt.slice(0, 10).split("-")[0]
        }</h5>
          
      <img src="http://openweathermap.org/img/w/${
        day.weather[0].icon
      }.png" class="card-img-icon" alt="..."/>
      <div class="card-body">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <p class="forecast-details">Temp: <span class="day-temperature">${
              day.main.temp
            }</span>°F</p>
          </li>
          <li class="list-group-item">
            <p>Humidity: <span class="day-humidity">${
              day.main.humidity
            }</span>%</p>
          </li>
        </ul>
      </div>
    </div>`;
}).join("")
cityList.innerHTML = cityWeatherList.map(city => {
  //add onClick for each city to display that city's weather
  return `<li class="list-group-item">${city.city}</li>`
}).join("")


}

//format temperature
//format month & date
//remove hidden class when there is no data to start with

//fetch from one call api to get UV Index


displayCurrentWeatherData()