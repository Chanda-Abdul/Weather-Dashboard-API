//add classes
const weather = new FetchWeather();
const uv = new FetchUV();

//add event listeners
const inputValue = document.querySelector(".form-control");
const button = document.querySelector(".btn");

button.addEventListener("click", () => {
  const currentCityValue = inputValue.value;

  weather.getWeather(currentCityValue).then(data => {
    let currentLatitude = data.city.coord.lat;
    let currentLongitude = data.city.coord.lon;
    let currentNameValue = data["city"]["name"];
    let currentDateValue = data["list"][0]["dt_txt"].slice(0, 10).split("-");
    let currentIconValue = data["list"][0]["weather"][0]["icon"];
    let currentTempValue = data.list["0"].main.temp;
    let currentHumidityValue = data.list["0"].main.humidity;
    let currentWindValue = data.list["0"].wind.speed;
    let currentForecast = data.list.slice(0, 5);
    let currentUV = uv.getUV(currentLatitude, currentLongitude);

    console.log(currentUV, "app.js");

    populateUI(
      currentNameValue,
      currentDateValue,
      currentIconValue,
      currentTempValue,
      currentHumidityValue,
      currentWindValue,
      currentForecast,
      uv.getUV(currentLatitude, currentLongitude)
    );
    saveCityToLocalStorage(
      currentNameValue,
      currentDateValue,
      currentIconValue,
      currentTempValue,
      currentHumidityValue,
      currentWindValue,
      currentForecast
    );
    populateUICityListLeft(cityWeatherList)
  });
});


//save city data to local storage & display list of 10 most recent cities
const cityWeatherList =
  JSON.parse(localStorage.getItem("cityWeatherList")) || [];

const saveCityToLocalStorage = (
  city,
  date,
  icon,
  temp,
  humidity,
  wind,
  forecast
) => {
  const cityWeather = {
    city: city,
    date: date,
    icon: icon,
    temp: temp,
    humidity: humidity,
    wind: wind,
    // uv: currentUVValue,
    forecast: forecast
  };

  console.log(cityWeather);
  cityWeatherList.unshift(cityWeather);

  cityWeatherList.splice(10);

  localStorage.setItem("cityWeatherList", JSON.stringify(cityWeatherList));
  window.location.assign("/");
};

//populate ui if local storage is not empty
if(cityWeatherList) {
    populateUI(
        cityWeatherList[0].city,
        cityWeatherList[0].date,
        cityWeatherList[0].icon,
        cityWeatherList[0].temp,
        cityWeatherList[0].humidity,
        cityWeatherList[0].wind,
        cityWeatherList[0].forecast,
        0
      );

      populateUICityListLeft(cityWeatherList)
}