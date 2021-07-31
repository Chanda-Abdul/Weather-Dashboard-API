"use strict";

class FetchWeather {
  async getWeather(input) {
    const apiKey = "b22dd2a636ebc4ce3bf4c971ba236900";
    const searchUrl = "http://api.openweathermap.org/data/2.5/forecast";
    const response = await fetch(
      `${searchUrl}?appid=${apiKey}&q=${input}&units=imperial`
    );

    const data = await response.json();
    
    return data;
  }
}

class FetchUV {
  async getUV(latitude, longitude) {
    const apiKey = "b22dd2a636ebc4ce3bf4c971ba236900";
    const uvSearchUrl = "https://api.openweathermap.org/data/2.5/onecall?";

    const response = await fetch(`${uvSearchUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}`)

    const data = await response.json();
    
    return data;
  }
}
