const populateUI = (name, date, icon, temp, humidity, wind, forecast) => {
  populateUICurrentWeatherRight(name, date, icon, temp, humidity, wind);
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
  wind,
  humidity
) => {
  let currentCityName = document.querySelector(".today-city");
  let currentCityDate = document.querySelector(".today-date");
  let currentCityIcon = document.querySelector(".today-weather-icon");
  let currentCityTemp = document.querySelector(".day-temperature");
  let currentCityHumidity = document.querySelector(".day-humidity");
  let currentCityWind = document.querySelector(".day-wind");
  let currentCityUV = document.querySelector(".day-uv");

  currentCityName.innerHTML = name;
  currentCityDate.innerHTML = `(${date[1]}/${date[2]}/${date[0]})`;
  currentCityIcon.innerHTML = `<img src=\"http://openweathermap.org/img/w/${icon}.png">`;
  currentCityTemp.innerHTML = temp;
  currentCityHumidity.innerHTML = humidity;
  currentCityWind.innerHTML = wind;
};

const populateUIForecastRight = forecast => {
  let currentFiveDayForecast = document.querySelector(".weather-forecast");

  currentFiveDayForecast.innerHTML = `${forecast
    .map(forecast => {
      return `<div class="card five-day-forecast col-2">

      <h5 class="card-title">${forecast.dt_txt.slice(0, 10).split("-")[1]}/${
        forecast.dt_txt.slice(0, 10).split("-")[2]
      }/${forecast.dt_txt.slice(0, 10).split("-")[0]}</h5>
    
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
    })
    .join("")}`;
};
