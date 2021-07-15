"use strict";

const button = document.querySelector(".btn");
const inputValue = document.querySelector(".form-control");
const cityName = document.querySelector(".name");
const cityDate = document.querySelector(".day");
const cityTemp = document.querySelector(".temperature");
const cityDesc = document.querySelector(".desc");

button.addEventListener('click', function(){
  fetch(`${searchUrl}?appid=${apiKey}&q=${inputValue.value}&units=imperial`)
  .then(res => res.json())
  .then(data => {
    console.log(data.city)
    let nameValue = data['city']['name']
    let dayValue = data['list'][0]['dt_txt']
    let tempValue = data.list['0'].main.temp
    let descValue = data.list['0'].weather['0'].description
    // console.log(nameValue, tempValue, descValue)
    cityName.innerHTML = nameValue
    cityDate.innerHTML = dayValue
    cityTemp.innerHTML = tempValue
    cityDesc.innerHTML = descValue
  })
  // .catch(err => alert("Wrong city name"))
})

const apiKey = "b22dd2a636ebc4ce3bf4c971ba236900";
const searchUrl = "http://api.openweathermap.org/data/2.5/forecast";
//${inputValue.value}
//fetch api
fetch(`${searchUrl}?appid=${apiKey}&q=oakland&units=imperial`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    let nameValue = data['city']['name']
    let dayValue = data['list'][0]['dt_txt']
    let tempValue = data.list['0'].main.temp
    let descValue = data.list['0'].weather['0'].description
    // console.log(nameValue, tempValue, descValue)
    cityName.innerHTML = nameValue
    cityDate.innerHTML = dayValue
    cityTemp.innerHTML = tempValue
    cityDesc.innerHTML = descValue
  })

//save city data to local storage
