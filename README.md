# Server-Side APIs: Weather Dashboard

## Your Task

Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Your task is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that provides basic setup and usage instructions. You will use `localStorage` to store any persistent data.

## User Story

```
AS A traveler
    I WANT to see the weather outlook for multiple cities
    SO THAT I can plan a trip accordingly
```

## Mock-up

[Mock-up](https://ucarecdn.com/5b0ef48a-550d-4938-9ac2-3ab39a5ce347/)

## Deployed App

[Weather Dashboard](https://pensive-payne-78e3c8.netlify.app/)

## Acceptance Criteria

GIVEN a weather dashboard with form inputs

- [x] WHEN I search for a city
  - [x] THEN I am presented with current and future conditions for that city and that city is added to the search history
- [x] WHEN I view current weather conditions for that city
  - [x] THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
- [x] WHEN I view the UV index
  - [x] THEN I am presented with a color that indicates whether the conditions are 
    - favorable(A UV Index reading of 0 to 2 means low danger from the sun's UV rays for the average person), 
    - moderate(A UV Index reading of 3 to 5 means moderate risk of harm from unprotected sun exposure), 
    - or severe(A UV Index reading of 6 to 7 means high risk of harm from unprotected sun exposure. Protection against skin and eye damage is needed.)
- [x] WHEN I view future weather conditions for that city
  - [x] THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
- [x] WHEN I click on a city in the search history
  - [x] THEN I am again presented with current and future conditions for that city

## Programmer
Chanda Abdul

## Technologies Used
- HTML
- CSS
- Bootstrap
- JavaScript
    - Fetch API
- [OpenWeather API](https://openweathermap.org/api) 

## To-do
- [ ] search when "enter" key event
- [ ] error alert for invalid city
- [ ] update css stylings


