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

const apiKey = "b22dd2a636ebc4ce3bf4c971ba236900";
const searchUrl = "http://api.openweathermap.org/data/2.5/forecast";

//fetch to api on button click
//add functionality for button enter
button.addEventListener("click", function () {
  fetch(`${searchUrl}?appid=${apiKey}&q=${inputValue.value}&units=imperial`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      let currentNameValue = data["city"]["name"];
      let currentDateValue = data["list"][0]["dt_txt"].slice(0, 10).split("-");
      let currentIconValue = data["list"][0]["weather"][0]["icon"];
      let currentTempValue = data.list["0"].main.temp;
      let currentHumidityValue = data.list["0"].main.humidity;
      let currentWindValue = data.list["0"].wind.speed;
      // where's UV value???
      // let currentUVValue = data
      let currentForecast = data.list.slice(0, 5);

      // console.log(currentUVValue)

      currentCityName.innerHTML = currentNameValue;
      currentCityDate.innerHTML = `(${currentDateValue[1]}/${currentDateValue[2]}/${currentDateValue[0]})`;
      currentCityIcon.innerHTML = `<img src=\"http://openweathermap.org/img/w/${currentIconValue}.png">`;
      currentCityTemp.innerHTML = currentTempValue;
      currentCityHumidity.innerHTML = currentHumidityValue;
      currentCityWind.innerHTML = currentWindValue;
      currentFiveDayForecast.innerHTML = `${currentForecast.map(forecast => {
        console.log(forecast.main.humidity);
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
      })}`;
    })
    .catch(err => alert("Wrong city name"));
});

//save city data to local storage

//${inputValue.value}
//fetch api
// fetch(`${searchUrl}?appid=${apiKey}&q=oakland&units=imperial`)
//   .then(res => res.json())
// .then(data => {
//   console.log(data)
//   let currentNameValue = data['city']['name']
//   let currentDateValue = data['list'][0]['dt_txt'].slice(0,10).split("-")
//   let currentIconValue = data['list'][0]['weather'][0]['icon']
//   let currentTempValue = data.list['0'].main.temp
//   let currentHumidityValue = data.list['0'].main.humidity
//   let currentWindValue = data.list['0'].wind.speed
//   // let currentUVValue = data
//   let currentForecast = data.list.slice(0,5)

//   // console.log(currentUVValue)

//   currentCityName.innerHTML = currentNameValue
//   currentCityDate.innerHTML = `(${currentDateValue[1]}/${currentDateValue[2]}/${currentDateValue[0]})`
//   currentCityIcon.innerHTML = `<img src=\"http://openweathermap.org/img/w/${currentIconValue}.png">`
//   currentCityTemp.innerHTML = currentTempValue
//   currentCityHumidity.innerHTML = currentHumidityValue
//   currentCityWind.innerHTML = currentWindValue
//   currentFiveDayForecast.innerHTML = `${currentForecast.map(forecast => {
//     console.log(forecast.main.humidity)
//     return `<div class="card five-day-forecast col-2">

//           <h5 class="card-title">${forecast.dt_txt.slice(0,10).split("-")[1]}/${forecast.dt_txt.slice(0,10).split("-")[2]}/${forecast.dt_txt.slice(0,10).split("-")[0]}</h5>

//     <img src="http://openweathermap.org/img/w/${forecast.weather[0].icon}.png" class="card-img-icon" alt="..."/>
//     <div class="card-body">
//       <ul class="list-group list-group-flush">
//         <li class="list-group-item">
//           <p class="forecast-details">Temp: <span class="day-temperature">${forecast.main.temp}</span>°F</p>
//         </li>
//         <li class="list-group-item">
//           <p>Humidity: <span class="day-humidity">${forecast.main.humidity}</span>%</p>
//         </li>
//       </ul>
//     </div>
//   </div>`
//   }) }`
// })
