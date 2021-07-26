//add classes
const weather = new FetchWeather();
const uv = new FetchUV();

//save city data to local storage & display list of 10 most recent cities
const cityWeatherList =
  JSON.parse(localStorage.getItem("cityWeatherList")) || [];

  console.log(cityWeatherList)

//populate ui if local storage is not empty
let cityList = document.querySelector(".city-list");
let weatherDisplay = document.querySelector(".today-weather-headline");

const updateUI = cityWeatherList => {
    console.log(cityWeatherList)
  if (cityWeatherList) {
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
    cityList.parentElement.classList.remove("hidden");
    weatherDisplay.parentElement.classList.remove("hidden");

    populateUICityListLeft(cityWeatherList);
  } else {
    // cityList.parentElement.classList.add("hidden");
    // weatherDisplay.parentElement.classList.add("hidden");
  }
};

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
    // index,
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

//add event listeners
const inputValue = document.querySelector(".form-control");
const button = document.querySelector(".btn");

button.addEventListener("click", () => {
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
    let currentForecast = data.list.slice(0, 5);

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


updateUI(cityWeatherList);


// console.log(cityWeatherList.indexOf("Oakland"));
