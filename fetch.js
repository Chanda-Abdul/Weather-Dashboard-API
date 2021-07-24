class FetchWeather {
  async getWeather(input) {
    const apiKey = "b22dd2a636ebc4ce3bf4c971ba236900";
    const searchUrl = "http://api.openweathermap.org/data/2.5/forecast";

    //make request to url
    const response = await fetch(
      `${searchUrl}?appid=${apiKey}&q=${input}&units=imperial`
    );

    const data = await response.json();
    
    return data;
  }
}

class FetchUV {
    //TO-DO => wtf, figure out how to return value from this promise
  async getUV(latitude, longitude) {
    const apiKey = "b22dd2a636ebc4ce3bf4c971ba236900";
    const uvSearchUrl = "https://api.openweathermap.org/data/2.5/onecall?";
console.log(latitude, longitude, "latitude")

    //make request to url
    const response = await fetch(`${uvSearchUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}`)

    const data = await response.json();
    console.log(data, "fetch")
    return data;
  }
}