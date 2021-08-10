"use strict";

const populateUI = (name, date, icon, temp, humidity, wind, uv, forecast) => {
  populateUICurrentWeatherRight(name, date, icon, temp, humidity, wind, uv);
  populateUIForecastRight(forecast);
};

const populateUICityListLeft = cityWeatherList => {
  let cityList = document.querySelector(".search-display");
  cityList.innerHTML = `<ul class="list-group city-list">
  </ul>
  ${cityWeatherList
    .map(city => {
      return `<li class="list-group-item">
      <p id="${city.city}" class="city-name" onclick="updateWeather(this.id)">
      ${city.city}</p>
      
      <i class="bi-trash" id="${city.city}" onclick="removeCity(this.id)"></i> 
      </li>`;
    })
    .join("")}

  <button type="button" class="btn btn-primary container-fluid" onclick="deleteCityList()">
    Remove All <i class="bi-trash"></i>
  </button>`;
};

const populateUICurrentWeatherRight = (
  name,
  date,
  icon,
  temp,
  humidity,
  wind,
  uv
) => {
  let currentCityName = document.querySelector(".today-city");
  let currentCityDate = document.querySelector(".today-date");
  let currentCityIcon = document.querySelector(".today-weather-icon");
  let currentCityTemp = document.querySelector(".day-temperature");
  let currentCityHumidity = document.querySelector(".day-humidity");
  let currentCityWind = document.querySelector(".day-wind");
  let currentCityUV = document.querySelector(".day-uv");

  currentCityName.innerHTML = name;
  currentCityDate.innerHTML = `${months[Number(date[1])]} ${Number(date[2])}, ${
    date[0]
  }`;
  currentCityIcon.innerHTML = `<img src=\"http://openweathermap.org/img/w/${icon}.png" alt="weather-icon" width="75em">`;
  currentCityTemp.innerHTML = `${temp} &#8457;`;
  currentCityHumidity.innerHTML = humidity;
  currentCityWind.innerHTML = Math.round(wind);
  currentCityUV.innerHTML = Number(uv);

  const updateUVBadgeColor = uv => {
    if (uv <= 2) {
      // A UV Index reading of 0 to 2 means low danger from the sun's UV rays for the average person.
      currentCityUV.className = "day-uv badge bg-success";
    } else if (uv >= 6) {
      // A UV Index reading of 3 to 5 means moderate risk of harm from unprotected sun exposure.
      currentCityUV.className = "day-uv badge bg-danger";
    } else {
      // A UV Index reading of 6 to 7 means high risk of harm from unprotected sun exposure. Protection against skin and eye damage is needed.
      currentCityUV.className = "day-uv bg-warning text-dark";
    }
  };
  updateUVBadgeColor(uv);
};

const populateUIForecastRight = forecast => {
  let currentFiveDayForecast = document.querySelector(".weather-forecast");

  currentFiveDayForecast.innerHTML = `${forecast
    .map(forecast => {
      return `<div class="card five-day-forecast col-2">
      <h5 class="card-header forecast-card-header">${
        months[Number(forecast.dt_txt.slice(0, 10).split("-")[1])]
      } ${Number(forecast.dt_txt.slice(0, 10).split("-")[2])}
     
      </h5>

<div class="card-body">
<img src="http://openweathermap.org/img/w/${
        forecast.weather[0].icon
      }.png" class="card-img-icon" alt="forecast-weather-icon-${forecast.weather[0].icon}"/>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">
      <p class="forecast-details">Temp:<h3> <span class="day-temperature">${Math.round(
        forecast.main.temp
      )}</span>&#8457;</h3></p>
    </li>
    <li class="list-group-item">
      <p>Humidity: <h3><span class="day-humidity">${
        forecast.main.humidity
      }</span>%</h3></p>
    </li>
  </ul>
</div>
</div>`;
    })
    .join("")}`;
};

const months = [
  undefined,
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
