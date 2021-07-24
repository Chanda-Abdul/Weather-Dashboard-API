const populateUI = (name, date, icon, temp, humidity, wind, uv, forecast) => {
  populateUICurrentWeatherRight(name, date, icon, temp, humidity, wind, uv);
  populateUIForecastRight(forecast);
};

const populateUICityListLeft = cityWeatherList => {
  let cityList = document.querySelector(".city-list");

  cityList.innerHTML = cityWeatherList
    .map(city => {
      //TO-DO => add onClick for each city to display that city's weather
      return `<li class="list-group-item">${city.city}</li>`;
    })
    .join("");
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
  currentCityDate.innerHTML = `(${Number(date[1])}/${Number(date[2])}/${
    date[0]
  })`;
  currentCityIcon.innerHTML = `<img src=\"http://openweathermap.org/img/w/${icon}.png">`;
  currentCityTemp.innerHTML = temp;
  currentCityHumidity.innerHTML = humidity;
  currentCityWind.innerHTML = Math.round(wind);
  currentCityUV.innerHTML = Number(uv);

  //A UV Index reading of 0 to 2 means low danger from the sun's UV rays for the average person.
  //A UV Index reading of 3 to 5 means moderate risk of harm from unprotected sun exposure.
  // A UV Index reading of 6 to 7 means high risk of harm from unprotected sun exposure. Protection against skin and eye damage is needed.

  if (uv <= 2) {
    currentCityUV.classList.add("bg-success");
  } else if (uv >= 6) {
    currentCityUV.classList.add("bg-danger");
  } else {
    currentCityUV.classList.add("bg-warning");
    currentCityUV.classList.add("text-dark");
  }
};

const populateUIForecastRight = forecast => {
  let currentFiveDayForecast = document.querySelector(".weather-forecast");

  currentFiveDayForecast.innerHTML = `${forecast
    .map(forecast => {
      return `<div class="card five-day-forecast col-2">

      <h5 class="card-title">${Number(
        forecast.dt_txt.slice(0, 10).split("-")[1]
      )}/${Number(forecast.dt_txt.slice(0, 10).split("-")[2])}/${
        forecast.dt_txt.slice(0, 10).split("-")[0]
      }</h5>
    
<img src="http://openweathermap.org/img/w/${
        forecast.weather[0].icon
      }.png" class="card-img-icon" alt="..."/>
<div class="card-body">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">
      <p class="forecast-details">Temp: <span class="day-temperature">${Math.round(
        forecast.main.temp
      )}</span>&#8457;</p>
    </li>
    <li class="list-group-item">
      <p>Humidity: <span class="day-humidity">${
        forecast.main.humidity
      }</span>%</p>
    </li>
  </ul>
</div>
</div>`;
    })
    .join("")}`;
};
