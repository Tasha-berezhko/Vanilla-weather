function displayTemperature(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "e8dec81490f528b6b7847357fa83bb2a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=e8dec81490f528b6b7847357fa83bb2a&units=metric`;

axios.get(apiUrl).then(displayTemperature);
