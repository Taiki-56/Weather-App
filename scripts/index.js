const apiKey = "3b2df1883208190d986bcd1b1e48eff4";
let defaultCity = "Toronto";
let selectedCity = localStorage.getItem("selectedCity") || "";
console.log(selectedCity);
// localStorage.clear();
let favCities = JSON.parse(localStorage.getItem("favCity")) || [];
console.log("local strage: " + favCities);

//* fav city select and form element
const favCityForm = document.getElementById("fav-cities-form");
const favCitySelect = document.getElementById("fav-cities");

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

//* get city from city search input
document.addEventListener("DOMContentLoaded", () => {
  favCities.forEach((favCity) => {
    const newOption = document.createElement("option");
    newOption.value = favCity;
    newOption.innerHTML = favCity;
    favCitySelect.appendChild(newOption);
  });

  const searchForm = document.getElementById("search-form");
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchInput = document.getElementById("search-input");
    selectedCity = searchInput.value;
    localStorage.setItem("selectedCity", selectedCity);
    console.log(selectedCity);

    //* reload the page
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

    window.location.reload();
  } else if (icon.classList.contains("fa-solid")) {
    icon.classList.remove("fa-solid");
    icon.classList.add("fa-regular");
    favCities = favCities.filter((element) => element !== city);
    localStorage.setItem("favCity", JSON.stringify(favCities));

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

// //* add city to favorite
// const addFavoriteCity = (city) => {
//   favoriteCities = localStorage.getItem("favoriteCities");
//   console.log("Before adding: ", favoriteCities);

//   favoriteCities.push(city);
//   console.log("After adding: ", favoriteCities);
//   localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
// };

//* get weather pic according to weather
const getWeatherPic = () => {
  const weathers = ["Clear", "Rain", "Clouds"];
};

// //* remove city from favorite
// const removeFavoriteCity = (city) => {
//   favoriteCities = localStorage.getItem("favoriteCities");
//   console.log("Before removing: ", favoriteCities);

//   favoriteCities = favoriteCities.filter((element) => element !== city);
//   console.log("After removing: ", favoriteCities);
//   localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
// };

//* find all fav cities and show them in select tag
const showFavoriteCities = () => {};

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
    console.log(selectedCity);
    const cityName = document.getElementById("city-name");
    cityName.innerHTML = selectedCity;
    const cel = await kelvinToCelcius(weather[0].main.temp);
    currentTemp.innerHTML = cel + "°C";

    // console.log(weather);
  }
};
