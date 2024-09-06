// todo reset local storage for test
// localStorage.clear();

const apiKey = "3b2df1883208190d986bcd1b1e48eff4";
const defaultCity = "Toronto";
let selectedCity = localStorage.getItem("selectedCity") || "";
let favCities = JSON.parse(localStorage.getItem("favCity")) || [];
let selectedDay = JSON.parse(localStorage.getItem("selectedDay")) || 1;

console.log(selectedDay);

//* for fav city dropdown's default
let selectIndexNum = JSON.parse(localStorage.getItem("selectIndexNum")) || 0;

//* fav city select & form element
const favCityForm = document.getElementById("fav-cities-form");
const favCitySelect = document.getElementById("fav-cities");

//* search city input & form element
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

//* fav button element and star icon element
const favButton = document.getElementById("fav-button");
const icon = favButton.querySelector("i");

//* daily elemnts
const day1Div = document.getElementById("day-1-dev");
const day2Div = document.getElementById("day-2-dev");
const day3Div = document.getElementById("day-3-dev");
const day4Div = document.getElementById("day-4-dev");
const day5Div = document.getElementById("day-5-dev");

const day1Date = document.getElementById("day-1-date");
const day2Date = document.getElementById("day-2-date");
const day3Date = document.getElementById("day-3-date");
const day4Date = document.getElementById("day-4-date");
const day5Date = document.getElementById("day-5-date");

const day1Img = document.getElementById("day-1-img");
const day2Img = document.getElementById("day-2-img");
const day3Img = document.getElementById("day-3-img");
const day4Img = document.getElementById("day-4-img");
const day5Img = document.getElementById("day-5-img");

const day1Temp = document.getElementById("day-1-temp");
const day2Temp = document.getElementById("day-2-temp");
const day3Temp = document.getElementById("day-3-temp");
const day4Temp = document.getElementById("day-4-temp");
const day5Temp = document.getElementById("day-5-temp");

//* 3 hours elemnts
const twoImg = document.getElementById("2-img");
const fiveImg = document.getElementById("5-img");
const eightImg = document.getElementById("8-img");
const elevenImg = document.getElementById("11-img");
const fourteenImg = document.getElementById("14-img");
const seventeenImg = document.getElementById("17-img");
const twentyImg = document.getElementById("20-img");
const twentyThreeImg = document.getElementById("23-img");

const twoTemp = document.getElementById("2-temp");
const fiveTemp = document.getElementById("5-temp");
const eightTemp = document.getElementById("8-temp");
const elevenTemp = document.getElementById("11-temp");
const fourteenTemp = document.getElementById("14-temp");
const seventeenTemp = document.getElementById("17-temp");
const twentyTemp = document.getElementById("20-temp");
const twentyThreeTemp = document.getElementById("23-temp");

//* change selected day to show 3 hourn range weather
day1Div.addEventListener("click", () => {
  selectedDay = 1;
  localStorage.setItem("selectedDay", selectedDay);
  window.location.reload();
});

day2Div.addEventListener("click", () => {
  selectedDay = 2;
  localStorage.setItem("selectedDay", selectedDay);
  window.location.reload();
});

day3Div.addEventListener("click", () => {
  selectedDay = 3;
  localStorage.setItem("selectedDay", selectedDay);
  window.location.reload();
});

day4Div.addEventListener("click", () => {
  selectedDay = 4;
  localStorage.setItem("selectedDay", selectedDay);
  window.location.reload();
});

day5Div.addEventListener("click", () => {
  selectedDay = 5;
  localStorage.setItem("selectedDay", selectedDay);
  window.location.reload();
});

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

//* show daily weather info
const showDaily = (weather) => {
  weather.forEach(async (element) => {
    const { dateTime, hour, day, date, month } = await getDateFromUnix(
      element.dt
    );

    const differenceInDays = await compareDates(dateTime);

    // TODO because of API for this project, we can get 3 hours range * 5 days, which means can't get the weather info which already has past, so show the last weather info of the day
    if (hour === 23 && differenceInDays === 0) {
      const { stringDay, stringMonth } = dayAndMonthToString(day, month);
      day1Date.innerHTML = `${stringMonth} ${date} ${stringDay}`;
      const cel = kelvinToCelcius(element.main.temp);
      day1Temp.innerHTML = `${cel}°C`;
      const img = getWeatherImg(element.weather[0].main);
      day1Img.src = img;
    } else if (hour === 23 && differenceInDays === 1) {
      const { stringDay, stringMonth } = dayAndMonthToString(day, month);
      day2Date.innerHTML = `${stringMonth} ${date} ${stringDay}`;
      const cel = kelvinToCelcius(element.main.temp);
      day2Temp.innerHTML = `${cel}°C`;
      const img = getWeatherImg(element.weather[0].main);
      day2Img.src = img;
    } else if (hour === 23 && differenceInDays === 2) {
      const { stringDay, stringMonth } = dayAndMonthToString(day, month);
      day3Date.innerHTML = `${stringMonth} ${date} ${stringDay}`;
      const cel = kelvinToCelcius(element.main.temp);
      day3Temp.innerHTML = `${cel}°C`;
      const img = getWeatherImg(element.weather[0].main);
      day3Img.src = img;
    } else if (hour === 23 && differenceInDays === 3) {
      const { stringDay, stringMonth } = dayAndMonthToString(day, month);
      day4Date.innerHTML = `${stringMonth} ${date} ${stringDay}`;
      const cel = kelvinToCelcius(element.main.temp);
      day4Temp.innerHTML = `${cel}°C`;
      const img = getWeatherImg(element.weather[0].main);
      day4Img.src = img;
    } else if (hour === 23 && differenceInDays === 4) {
      const { stringDay, stringMonth } = dayAndMonthToString(day, month);
      day5Date.innerHTML = `${stringMonth} ${date} ${stringDay}`;
      const cel = kelvinToCelcius(element.main.temp);
      day5Temp.innerHTML = `${cel}°C`;
      const img = getWeatherImg(element.weather[0].main);
      day5Img.src = img;
    }
  });
};

//* show 3 hours weather info
const showThreeHours = (weather) => {
  weather.forEach(async (element) => {
    const { dateTime, hour } = await getDateFromUnix(element.dt);
    const differenceInDays = await compareDates(dateTime);
    const cel = kelvinToCelcius(element.main.temp);
    const img = getWeatherImg(element.weather[0].main);

    if (selectedDay === 1 && differenceInDays === 0) {
      if (hour === 2) {
        twoTemp.innerHTML = `${cel}°C`;
        twoImg.src = img;
      } else if (hour === 5) {
        fiveTemp.innerHTML = `${cel}°C`;
        fiveImg.src = img;
      } else if (hour === 8) {
        eightTemp.innerHTML = `${cel}°C`;
        eightImg.src = img;
      } else if (hour === 11) {
        elevenTemp.innerHTML = `${cel}°C`;
        elevenImg.src = img;
      } else if (hour === 14) {
        fourteenTemp.innerHTML = `${cel}°C`;
        fourteenImg.src = img;
      } else if (hour === 17) {
        seventeenTemp.innerHTML = `${cel}°C`;
        seventeenImg.src = img;
      } else if (hour === 20) {
        twentyTemp.innerHTML = `${cel}°C`;
        twentyImg.src = img;
      } else if (hour === 23) {
        twentyThreeTemp.innerHTML = `${cel}°C`;
        twentyThreeImg.src = img;
      }
    } else if (selectedDay === 2 && differenceInDays === 1) {
      if (hour === 2) {
        twoTemp.innerHTML = `${cel}°C`;
        twoImg.src = img;
      } else if (hour === 5) {
        fiveTemp.innerHTML = `${cel}°C`;
        fiveImg.src = img;
      } else if (hour === 8) {
        eightTemp.innerHTML = `${cel}°C`;
        eightImg.src = img;
      } else if (hour === 11) {
        elevenTemp.innerHTML = `${cel}°C`;
        elevenImg.src = img;
      } else if (hour === 14) {
        fourteenTemp.innerHTML = `${cel}°C`;
        fourteenImg.src = img;
      } else if (hour === 17) {
        seventeenTemp.innerHTML = `${cel}°C`;
        seventeenImg.src = img;
      } else if (hour === 20) {
        twentyTemp.innerHTML = `${cel}°C`;
        twentyImg.src = img;
      } else if (hour === 23) {
        twentyThreeTemp.innerHTML = `${cel}°C`;
        twentyThreeImg.src = img;
      }
    } else if (selectedDay === 3 && differenceInDays === 2) {
      if (hour === 2) {
        twoTemp.innerHTML = `${cel}°C`;
        twoImg.src = img;
      } else if (hour === 5) {
        fiveTemp.innerHTML = `${cel}°C`;
        fiveImg.src = img;
      } else if (hour === 8) {
        eightTemp.innerHTML = `${cel}°C`;
        eightImg.src = img;
      } else if (hour === 11) {
        elevenTemp.innerHTML = `${cel}°C`;
        elevenImg.src = img;
      } else if (hour === 14) {
        fourteenTemp.innerHTML = `${cel}°C`;
        fourteenImg.src = img;
      } else if (hour === 17) {
        seventeenTemp.innerHTML = `${cel}°C`;
        seventeenImg.src = img;
      } else if (hour === 20) {
        twentyTemp.innerHTML = `${cel}°C`;
        twentyImg.src = img;
      } else if (hour === 23) {
        twentyThreeTemp.innerHTML = `${cel}°C`;
        twentyThreeImg.src = img;
      }
    } else if (selectedDay === 4 && differenceInDays === 3) {
      if (hour === 2) {
        twoTemp.innerHTML = `${cel}°C`;
        twoImg.src = img;
      } else if (hour === 5) {
        fiveTemp.innerHTML = `${cel}°C`;
        fiveImg.src = img;
      } else if (hour === 8) {
        eightTemp.innerHTML = `${cel}°C`;
        eightImg.src = img;
      } else if (hour === 11) {
        elevenTemp.innerHTML = `${cel}°C`;
        elevenImg.src = img;
      } else if (hour === 14) {
        fourteenTemp.innerHTML = `${cel}°C`;
        fourteenImg.src = img;
      } else if (hour === 17) {
        seventeenTemp.innerHTML = `${cel}°C`;
        seventeenImg.src = img;
      } else if (hour === 20) {
        twentyTemp.innerHTML = `${cel}°C`;
        twentyImg.src = img;
      } else if (hour === 23) {
        twentyThreeTemp.innerHTML = `${cel}°C`;
        twentyThreeImg.src = img;
      }
    } else if (selectedDay === 5 && differenceInDays === 4) {
      if (hour === 2) {
        twoTemp.innerHTML = `${cel}°C`;
        twoImg.src = img;
      } else if (hour === 5) {
        fiveTemp.innerHTML = `${cel}°C`;
        fiveImg.src = img;
      } else if (hour === 8) {
        eightTemp.innerHTML = `${cel}°C`;
        eightImg.src = img;
      } else if (hour === 11) {
        elevenTemp.innerHTML = `${cel}°C`;
        elevenImg.src = img;
      } else if (hour === 14) {
        fourteenTemp.innerHTML = `${cel}°C`;
        fourteenImg.src = img;
      } else if (hour === 17) {
        seventeenTemp.innerHTML = `${cel}°C`;
        seventeenImg.src = img;
      } else if (hour === 20) {
        twentyTemp.innerHTML = `${cel}°C`;
        twentyImg.src = img;
      } else if (hour === 23) {
        twentyThreeTemp.innerHTML = `${cel}°C`;
        twentyThreeImg.src = img;
      }
    }
  });
};

//* check on what day it is
const compareDates = (comparedDate) => {
  const today = new Date();

  const todayWithoutTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const comparedDateWithoutTime = new Date(
    comparedDate.getFullYear(),
    comparedDate.getMonth(),
    comparedDate.getDate()
  );

  const diffInMilliseconds = Math.abs(
    comparedDateWithoutTime.getTime() - todayWithoutTime.getTime()
  );
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
  return Math.floor(diffInDays);
};

//* get hour, day, date, month from unix time
const getDateFromUnix = (dt) => {
  const dateTime = new Date(dt * 1000);
  const hour = dateTime.getHours();
  const day = dateTime.getDay();
  const date = dateTime.getDate();
  const month = dateTime.getMonth();

  return { dateTime, hour, day, date, month };
};

//* convert day & month to string
const dayAndMonthToString = (day, month) => {
  let stringDay = "";
  let stringMonth = "";
  if (day === 0) {
    stringDay = "Mon";
  } else if (day === 1) {
    stringDay = "Tue";
  } else if (day === 2) {
    stringDay = "Wed";
  } else if (day === 3) {
    stringDay = "Thu";
  } else if (day === 4) {
    stringDay = "Fri";
  } else if (day === 5) {
    stringDay = "Sat";
  } else if (day === 6) {
    stringDay = "Sun";
  }

  if (month === 0) {
  } else if (month === 0) {
    stringMonth = "Jan";
  } else if (month === 1) {
    stringMonth = "Feb";
  } else if (month === 2) {
    stringMonth = "Mar";
  } else if (month === 3) {
    stringMonth = "Apr";
  } else if (month === 4) {
    stringMonth = "May";
  } else if (month === 5) {
    stringMonth = "Jun";
  } else if (month === 6) {
    stringMonth = "July";
  } else if (month === 7) {
    stringMonth = "Aug";
  } else if (month === 8) {
    stringMonth = "Sep";
  } else if (month === 9) {
    stringMonth = "Oct";
  } else if (month === 10) {
    stringMonth = "Nov";
  } else if (month === 11) {
    stringMonth = "Dec";
  }

  return { stringDay, stringMonth };
};

//* convert kelvin to celcius
const kelvinToCelcius = (k) => {
  let celcius = k - 273;
  return Math.floor(celcius);
};

//* get weather img
//* there are 3 types of weather in weather api
const weathers = ["Clear", "Rain", "Clouds"];
const getWeatherImg = (weather) => {
  let img = "";
  if (weather === "Clear") {
    img = "../images/clear.png";
  } else if (weather === "Rain") {
    img = "../images/rain.png";
  } else if (weather === "Clouds") {
    img = "../images/clouds.png";
  }

  return img;
};

//* excute functions
window.onload = async () => {
  const currentTemp = document.getElementById("current-temp");
  const currentImg = document.getElementById("current-img");
  if (selectedCity === "") {
    await isFavorite(defaultCity);
    const weather = await getWeatherInfo(defaultCity, apiKey);
    const cityName = document.getElementById("city-name");
    cityName.innerHTML = defaultCity;
    const cel = await kelvinToCelcius(weather[0].main.temp);
    currentTemp.innerHTML = cel + "°C";
    const img = getWeatherImg(weather[0].weather[0].main);
    currentImg.src = img;

    showDaily(weather);
    showThreeHours(weather);
  } else {
    await isFavorite(selectedCity);
    const weather = await getWeatherInfo(selectedCity, apiKey);
    console.log(weather);

    const cityName = document.getElementById("city-name");
    cityName.innerHTML = selectedCity;
    const cel = await kelvinToCelcius(weather[0].main.temp);
    currentTemp.innerHTML = cel + "°C";
    const img = getWeatherImg(weather[0].weather[0].main);
    currentImg.src = img;

    showDaily(weather);
    showThreeHours(weather);
  }
};
