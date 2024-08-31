// todo reset local storage for test
// localStorage.clear();

const apiKey = "3b2df1883208190d986bcd1b1e48eff4";
let defaultCity = "Toronto";
let selectedCity = localStorage.getItem("selectedCity") || "";
let favCities = JSON.parse(localStorage.getItem("favCity")) || [];

//* for fav city dropdown's default
let selectIndexNum = JSON.parse(localStorage.getItem("selectIndexNum")) || 0;

//* there are 3 types of weather in weather api
const weathers = ["Clear", "Rain", "Clouds"];

//* fav city select & form element
const favCityForm = document.getElementById("fav-cities-form");
const favCitySelect = document.getElementById("fav-cities");

//* search city input & form element
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

//* fav button element and star icon element
const favButton = document.getElementById("fav-button");
const icon = favButton.querySelector("i");

//* check the city is default or selected
const isDefaultCity = () => {
  if (selectedCity === "") {
    return defaultCity;
  } else {
    return selectedCity;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  if (favCities.length !== 0) {
    favCities.forEach((favCity) => {
      const newOption = document.createElement("option");
      newOption.value = favCity;
      newOption.innerHTML = favCity;
      favCitySelect.appendChild(newOption);
    });
  }
  favCitySelect.selectedIndex = selectIndexNum;

  //* select a city from favorites
  favCityForm.addEventListener("change", (e) => {
    e.preventDefault();
    selectedCity = favCitySelect.value;
    localStorage.setItem("selectedCity", selectedCity);

    //* uodate selectIndexNum
    const selectIndexOf = setDefaultInSelectTag(selectedCity);
    localStorage.setItem("selectIndexNum", selectIndexOf);

    //* reload the page
    window.location.reload();
  });

  //* get city from city search input
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    selectedCity = searchInput.value;
    localStorage.setItem("selectedCity", selectedCity);
    localStorage.removeItem("selectIndexNum");

    window.location.reload();
  });
});

//* get 3 hours range weather info * 5 days
const getWeatherInfo = async (city, apiKey) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
  );
  const data = await res.json();
  const weatherInfo = data.list;
  return weatherInfo;
};

//* convert kelvin to celcius
const kelvinToCelcius = (k) => {
  let celcius = k - 273;
  return Math.floor(celcius);
};

//* add city or remove from favorite
favButton.addEventListener("click", () => {
  const city = isDefaultCity();

  if (icon.classList.contains("fa-regular")) {
    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid");
    favCities.push(city);

    localStorage.setItem("favCity", JSON.stringify(favCities));
    localStorage.setItem(
      "selectIndexNum",
      JSON.stringify(favCities.length - 1)
    );

    window.location.reload();
  } else if (icon.classList.contains("fa-solid")) {
    icon.classList.remove("fa-solid");
    icon.classList.add("fa-regular");
    favCities = favCities.filter((element) => element !== city);
    localStorage.setItem("favCity", JSON.stringify(favCities));
    localStorage.removeItem("selectIndexNum");

    window.location.reload();
  }
});

//* check if a city is already added to favorite
const isFavorite = (city) => {
  if (favCities.includes(city)) {
    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid");
  } else {
    icon.classList.remove("fa-solid");
    icon.classList.add("fa-regular");
  }
};

//* set the default in select tag for fav cities
const setDefaultInSelectTag = (city) => {
  return favCities.indexOf(city);
};

//* get weather pic according to weather
const getWeatherPic = () => {};

//* excute functions
window.onload = async () => {
  const currentTemp = document.getElementById("current-temp");
  if (selectedCity === "") {
    await isFavorite(defaultCity);
    const weather = await getWeatherInfo(defaultCity, apiKey);
    const cityName = document.getElementById("city-name");
    cityName.innerHTML = defaultCity;
    const cel = await kelvinToCelcius(weather[0].main.temp);
    currentTemp.innerHTML = cel + "°C";
  } else {
    await isFavorite(selectedCity);
    const weather = await getWeatherInfo(selectedCity, apiKey);
    const cityName = document.getElementById("city-name");
    cityName.innerHTML = selectedCity;
    const cel = await kelvinToCelcius(weather[0].main.temp);
    currentTemp.innerHTML = cel + "°C";
  }
};
