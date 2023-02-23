function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

document.addEventListener("DOMContentLoaded", function () {
  function displayForecast() {
    let forecastElement = document.querySelector("#forecast");

    let days = ["Thu", "Fri", "Sat", "Sun"];

    let forecastHTML = ` <div class="row">`;
    days.forEach(function (day) {
      forecastHTML =
        forecastHTML +
        `
    
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png"
          alt=""
        />
        <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-max">18º</span>
          <span class="weather-forecast-temperature-min">23</span>
        </div>
      </div>
    
  `;
    });

    forecastHTML = forecastHTML + `</div>`;

    forecastElement.innerHTML = forecastHTML;
  }
  displayForecast();
});

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "e8dec81490f528b6b7847357fa83bb2a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  let city = cityInputElement.value;
  search(city);
}

function displayFahrenhaitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

document.addEventListener("DOMContentLoaded", function () {
  let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);
});

document.addEventListener("DOMContentLoaded", function () {
  let fahrenhaitLink = document.querySelector("#fahrenhait-link");
  fahrenhaitLink.addEventListener("click", displayFahrenhaitTemperature);
});

document.addEventListener("DOMContentLoaded", function () {
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", displayCelsiusTemperature);
});

search("Kyiv");
