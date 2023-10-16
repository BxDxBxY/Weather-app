const APIKey = "7b2c509f2f394991c0e5c521ec5b2009";
const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const form = document.querySelector(".search-box");
const cityName = document.querySelector("#city_name");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

search.addEventListener("click", (e) => {
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }
      error404.style.display = "none";
      error404.classList.remove("fadeIn");
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");
      switch (data.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;
        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Snow":
          image.src = "images/snow.png";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          break;

        case "Haze":
          image.src = "images/mist.png";
          break;

        default:
          image.src = "";
      }
      temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
      description.innerHTML = `${data.weather[0].description}`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;
      cityName.innerHTML = data.name;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "680px";
    });
});

function fetchDataFromAPI() {
  // Check if the Geolocation API is available in the browser
  if ("geolocation" in navigator) {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Define the API endpoint and construct the URL with latitude and longitude
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKey}`;

      // Make a fetch request to the API
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            container.style.height = "400px";
            weatherBox.style.display = "none";
            weatherDetails.style.display = "none";
            error404.style.display = "block";
            error404.classList.add("fadeIn");
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          error404.style.display = "none";
          error404.classList.remove("fadeIn");
          const image = document.querySelector(".weather-box img");
          const temperature = document.querySelector(
            ".weather-box .temperature"
          );
          const description = document.querySelector(
            ".weather-box .description"
          );
          const humidity = document.querySelector(
            ".weather-details .humidity span"
          );
          const wind = document.querySelector(".weather-details .wind span");
          switch (data.weather[0].main) {
            case "Clear":
              image.src = "images/clear.png";
              break;
            case "Rain":
              image.src = "images/rain.png";
              break;

            case "Snow":
              image.src = "images/snow.png";
              break;

            case "Clouds":
              image.src = "images/cloud.png";
              break;

            case "Haze":
              image.src = "images/mist.png";
              break;

            default:
              image.src = "";
          }
          temperature.innerHTML = `${Math.abs(
            parseInt(data.main.temp - 273.15)
          )}<span>°C</span>`;
          description.innerHTML = `${data.weather[0].description}`;
          humidity.innerHTML = `${data.main.humidity}%`;
          wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;
          cityName.innerHTML = data.name;

          weatherBox.style.display = "";
          weatherDetails.style.display = "";
          weatherBox.classList.add("fadeIn");
          weatherDetails.classList.add("fadeIn");
          container.style.height = "680px";
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    });
  } else {
    console.log("Geolocation is not available in this browser.");
  }
}

// Call the function when the site is opened
fetchDataFromAPI();
