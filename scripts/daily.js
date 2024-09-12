const apiKey = "2ff960f8f0358d4329ff6891575ec8fe";
const city = "Toronto";
const today = new Date();

//* JSON.parse（）は、（）の中身のJSON型式を解除する。（JSON型式を解除する＝文字列が解除される。）
let selectedDay = JSON.parse(localStorage.getItem("selectedDay")) || 1;

const day1Temp = document.getElementById("day-1-temp");
const day2Temp = document.getElementById("day-2-temp");
const day3Temp = document.getElementById("day-3-temp");
const day4Temp = document.getElementById("day-4-temp");
const day5Temp = document.getElementById("day-5-temp");

const day1Date = document.getElementById("day-1-date");
const day2Date = document.getElementById("day-2-date");
const day3Date = document.getElementById("day-3-date");
const day4Date = document.getElementById("day-4-date");
const day5Date = document.getElementById("day-5-date");

const day1Image = document.getElementById("day-1-image");
const day2Image = document.getElementById("day-2-image");
const day3Image = document.getElementById("day-3-image");
const day4Image = document.getElementById("day-4-image");
const day5Image = document.getElementById("day-5-image");

const day1Section = document.getElementById("day-1-section");
const day2Section = document.getElementById("day-2-section");
const day3Section = document.getElementById("day-3-section");
const day4Section = document.getElementById("day-4-section");
const day5Section = document.getElementById("day-5-section");

const threeImage = document.getElementById("3-oclock");
const sixImage = document.getElementById("6-oclock");
const nineImage = document.getElementById("9-oclock");
const twelveImage = document.getElementById("12-oclock");
const fifteenImage = document.getElementById("15-oclock");
const eighteenImage = document.getElementById("18-oclock");
const twenyOneImage = document.getElementById("21-oclock");
const zeroImage = document.getElementById("0-oclock");

const twotemp = document.getElementById("2-temp");
const fivetemp = document.getElementById("5-temp");
const eighttemp = document.getElementById("8-temp");
const eleventemp = document.getElementById("11-temp");
const fourteentemp = document.getElementById("14-temp");
const seventeentemp = document.getElementById("17-temp");
const twenytemp = document.getElementById("20-temp");
const twenythreetemp = document.getElementById("23-temp");

// console.log(twenythreetemp);
// console.log(twenytemp);

async function fetchWeatherInfo() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
    );
    const data = await response.json();
    const weatherInfo = await data.list;
    // console.log(weatherInfo);
    weatherInfo.forEach((element) => {
      // console.log(element);
      const weather = element.weather[0].main;
      const tempK = element.main.temp;
      const tempC = kelToCel(tempK);
      // console.log(tempC);
      //   console.log(tempC);
      console.log(weather);

      const dt = element.dt;
      const dateTime = convertUnixTime(dt);
      const hour = dateTime.getHours();
      const date = dateTime.getDate();
      const day = dateTime.getDay();
      // console.log(day)te
      const stringDay = dayToString(day);
      const month = dateTime.getMonth();
      const stringMonth = monthToString(month);
      const differenceDays = comparedDates(today, dateTime);
      // console.log(stringMonth);

      // console.log(differenceDays);
      if (hour === 11 && differenceDays === 0) {
        day1Date.innerHTML = `${stringMonth}  ${date}  ${stringDay}`;
        day1Temp.innerHTML = tempC + "°C";
        const weatherImage = weatherimage(weather);
        day1Image.src = weatherImage;
        console.log(tempC);
      } else if (hour === 11 && differenceDays === 1) {
        day2Date.innerHTML = `${stringMonth}  ${date}  ${stringDay}`;
        day2Temp.innerHTML = tempC + "°C";
        const weatherImage = weatherimage(weather);
        day2Image.src = weatherImage;
      } else if (hour === 11 && differenceDays === 2) {
        day3Date.innerHTML = `${stringMonth}  ${date}  ${stringDay}`;
        day3Temp.innerHTML = tempC + "°C";
        const weatherImage = weatherimage(weather);
        day3Image.src = weatherImage;
      } else if (hour === 11 && differenceDays === 3) {
        day4Date.innerHTML = `${stringMonth}  ${date}  ${stringDay}`;
        day4Temp.innerHTML = tempC + "°C";
        const weatherImage = weatherimage(weather);
        day4Image.src = weatherImage;
      } else if (hour === 11 && differenceDays === 4) {
        day5Date.innerHTML = `${stringMonth}  ${date}  ${stringDay}`;
        day5Temp.innerHTML = tempC + "°C";
        const weatherImage = weatherimage(weather);
        day5Image.src = weatherImage;
      }

      // console.log(dateTime.getMonth());
      // const comparedDate = comparedDates(dateTime);
      // console.log(comparedDate);
    });
  } catch {
    console.log("error is happening");
  }
}

function weatherimage(weather) {
  let weatherPic = "";
  if (weather === "Clear") {
    weatherPic = "../images/clear.jpg";
  } else if (weather === "Rain") {
    weatherPic = "../images/rain.jpg";
  } else if (weather === "Clouds") {
    weatherPic = "../images/cloud.jpg";
  }
  return weatherPic;
}

// function compareDate(xDay) {
//   const month = xDay.getMonth();
//   console.log(month);

//   const date = xDay.getDate();
//   const hour = xDay.getHours();
//   const stringMonth = MonthToString(month);
//   const day = xDay.getDay();
//   console.log(day);
//   day1Date.innerHTML = stringMonth + date;
//   console.log(hour);
//   if (hour === 11 && differenceInDays === 0) {
//     day1Date.innerHTML = stringMonth + date;
//   } else if (hour === 11 && todey.getDate() - date === -1) {
//     day2Date.innerHTML = stringMonth + date;
//   } else if (hour === 11 && todey.getDate() - date === -2) {
//     day3Date.innerHTML = stringMonth + date;
//   } else if (hour === 11 && todey.getDate() - date === -3) {
//     day4Date.innerHTML = stringMonth + date;
//   } else if (hour === 11 && todey.getDate() - date === -4) {
//     day5Date.innerHTML = stringMonth + date;
//   }
//   console.log(today);

// compareDate(1);

function kelToCel(k) {
  const cel = k - 273;
  return Math.trunc(cel);
}

function convertUnixTime(unixTime) {
  let dateTime = new Date(unixTime * 1000);
  return dateTime;
}

function monthToString(num) {
  let month = "";
  if (num === 0) {
    month = "Jan";
  } else if (num === 1) {
    month = "Feb";
  } else if (num === 2) {
    month = "Mar";
  } else if (num === 3) {
    month = "Apr";
  } else if (num === 4) {
    month = "May";
  } else if (num === 5) {
    month = "Jun";
  } else if (num === 6) {
    month = "Jul";
  } else if (num === 7) {
    month = "Aug";
  } else if (num === 8) {
    month = "Sep";
  } else if (num === 9) {
    month = "Oct";
  } else if (num === 10) {
    month = "Nov";
  } else if (num === 11) {
    month = "Dec";
  }
  return month;
}

function dayToString(num) {
  let day = "";
  if (num === 0) {
    day = "Sun";
  } else if (num === 1) {
    day = "Mon";
  } else if (num === 2) {
    day = "Tue";
  } else if (num === 3) {
    day = "Wed";
  } else if (num === 4) {
    day = "Thu";
  } else if (num === 5) {
    day = "Fri";
  } else if (num === 6) {
    day = "Sat";
  }
  return day;
}

fetchWeatherInfo();

// 日付部分だけを抽出する関数
function getDateOnly(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function comparedDates(day1, day2) {
  const date1 = new Date(day1);
  const date2 = new Date(day2);
  const dateOnly1 = getDateOnly(date1);

  // 日付部分を取得
  const date1Only = getDateOnly(date1);
  const date2Only = getDateOnly(date2);

  // 日付の差を計算
  const differenceInDays = Math.abs(
    (date2Only - date1Only) / (1000 * 60 * 60 * 24)
  );
  return differenceInDays;
}

// 判定
// if (differenceInDays === 0) {
//   console.log("同じ日です");
// } else if (differenceInDays === 1) {
//   console.log("1日ずれています");
// } else {
//   console.log("2日以上ずれています");
// }

// console.log(date1);
// console.log(date1Only);

day2Section.addEventListener("click", () => {
  selectedDay = 2;
  localStorage.setItem("selectedDay", JSON.stringify(selectedDay));
  window.location.reload();
});
day1Section.addEventListener("click", () => {
  selectedDay = 1;
  localStorage.setItem("selectedDay", JSON.stringify(selectedDay));
  window.location.reload();
});
day3Section.addEventListener("click", () => {
  selectedDay = 3;
  localStorage.setItem("selectedDay", JSON.stringify(selectedDay));
  window.location.reload();
});
day4Section.addEventListener("click", () => {
  selectedDay = 4;
  localStorage.setItem("selectedDay", JSON.stringify(selectedDay));
  window.location.reload();
});
day5Section.addEventListener("click", () => {
  selectedDay = 5;
  localStorage.setItem("selectedDay", JSON.stringify(selectedDay));
  window.location.reload();
});

const getWeatherInfo = async (city, apiKey) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
  );
  const data = await res.json();
  const weatherInfo = data.list;
  console.log(weatherInfo);

  return weatherInfo;
};

async function showThreeHoursWeather() {
  const weatherInfo = await getWeatherInfo(city, apiKey);
  // console.log(weatherInfo);

  weatherInfo.forEach((element) => {
    const dateTime = convertUnixTime(element.dt);

    const differenceDays = comparedDates(today, dateTime);
    const weather = element.weather[0].main;
    const weatherImage = weatherimage(weather);
    const hour = dateTime.getHours();
    const tempK = element.main.temp;
    const tempC = kelToCel(tempK);

    if (selectedDay === 1 && differenceDays === 0) {
      if (hour === 2) {
        threeImage.src = weatherImage;
        twotemp.innerHTML = tempC + "°C";
      }
      if (hour === 5) {
        sixImage.src = weatherImage;
        fivetemp.innerHTML = tempC + "°C";
      }
      if (hour === 8) {
        nineImage.src = weatherImage;
        eighttemp.innerHTML = tempC + "°C";
      }
      if (hour === 11) {
        twelveImage.src = weatherImage;
        eleventemp.innerHTML = tempC + "°C";
      }
      if (hour === 14) {
        fifteenImage.src = weatherImage;
        fourteentemp.innerHTML = tempC + "°C";
      }
      if (hour === 17) {
        eighteenImage.src = weatherImage;
        seventeentemp.innerHTML = tempC + "°C";
      }
      if (hour === 20) {
        twenyOneImage.src = weatherImage;
        twenytemp.innerHTML = tempC + "°C";
      }
      if (hour === 23) {
        zeroImage.src = weatherImage;
        twenythreetemp.innerHTML = tempC + "°C";
      }
    } else if (selectedDay === 2 && differenceDays === 1) {
      if (hour === 2) {
        threeImage.src = weatherImage;
        twotemp.innerHTML = tempC + "°C";
      }
      if (hour === 5) {
        sixImage.src = weatherImage;
        fivetemp.innerHTML = tempC + "°C";
      }
      if (hour === 8) {
        nineImage.src = weatherImage;
        eighttemp.innerHTML = tempC + "°C";
      }
      if (hour === 11) {
        twelveImage.src = weatherImage;
        eleventemp.innerHTML = tempC + "°C";
      }
      if (hour === 14) {
        fifteenImage.src = weatherImage;
        fourteentemp.innerHTML = tempC + "°C";
      }
      if (hour === 17) {
        eighteenImage.src = weatherImage;
        seventeentemp.innerHTML = tempC + "°C";
      }
      if (hour === 20) {
        twenyOneImage.src = weatherImage;
        twenytemp.innerHTML = tempC + "°C";
      }
      if (hour === 23) {
        zeroImage.src = weatherImage;
        twenythreetemp.innerHTML = tempC + "°C";
      }
    } else if (selectedDay === 3 && differenceDays === 2) {
      if (hour === 2) {
        threeImage.src = weatherImage;
        twotemp.innerHTML = tempC + "°C";
      }
      if (hour === 5) {
        sixImage.src = weatherImage;
        fivetemp.innerHTML = tempC + "°C";
      }
      if (hour === 8) {
        nineImage.src = weatherImage;
        eighttemp.innerHTML = tempC + "°C";
      }
      if (hour === 11) {
        twelveImage.src = weatherImage;
        eleventemp.innerHTML = tempC + "°C";
      }
      if (hour === 14) {
        fifteenImage.src = weatherImage;
        fourteentemp.innerHTML = tempC + "°C";
      }
      if (hour === 17) {
        eighteenImage.src = weatherImage;
        seventeentemp.innerHTML = tempC + "°C";
      }
      if (hour === 20) {
        twenyOneImage.src = weatherImage;
        twenytemp.innerHTML = tempC + "°C";
      }
      if (hour === 23) {
        zeroImage.src = weatherImage;
        twenythreetemp.innerHTML = tempC + "°C";
      }
    } else if (selectedDay === 4 && differenceDays === 3) {
      if (hour === 2) {
        threeImage.src = weatherImage;
        twotemp.innerHTML = tempC + "°C";
      }
      if (hour === 5) {
        sixImage.src = weatherImage;
        fivetemp.innerHTML = tempC + "°C";
      }
      if (hour === 8) {
        nineImage.src = weatherImage;
        eighttemp.innerHTML = tempC + "°C";
      }
      if (hour === 11) {
        twelveImage.src = weatherImage;
        eleventemp.innerHTML = tempC + "°C";
      }
      if (hour === 14) {
        fifteenImage.src = weatherImage;
        fourteentemp.innerHTML = tempC + "°C";
      }
      if (hour === 17) {
        eighteenImage.src = weatherImage;
        seventeentemp.innerHTML = tempC + "°C";
      }
      if (hour === 20) {
        twenyOneImage.src = weatherImage;
        twenytemp.innerHTML = tempC + "°C";
      }
      if (hour === 23) {
        zeroImage.src = weatherImage;
        twenythreetemp.innerHTML = tempC + "°C";
      }
    } else if (selectedDay === 5 && differenceDays === 4) {
      if (hour === 2) {
        threeImage.src = weatherImage;
        twotemp.innerHTML = tempC + "°C";
      }
      if (hour === 5) {
        sixImage.src = weatherImage;
        fivetemp.innerHTML = tempC + "°C";
      }
      if (hour === 8) {
        nineImage.src = weatherImage;
        eighttemp.innerHTML = tempC + "°C";
      }
      if (hour === 11) {
        twelveImage.src = weatherImage;
        eleventemp.innerHTML = tempC + "°C";
      }
      if (hour === 14) {
        fifteenImage.src = weatherImage;
        fourteentemp.innerHTML = tempC + "°C";
      }
      if (hour === 17) {
        eighteenImage.src = weatherImage;
        seventeentemp.innerHTML = tempC + "°C";
      }
      if (hour === 20) {
        twenyOneImage.src = weatherImage;
        twenytemp.innerHTML = tempC + "°C";
      }
      if (hour === 23) {
        zeroImage.src = weatherImage;
        twenythreetemp.innerHTML = tempC + "°C";
      }
    }
  });
}

showThreeHoursWeather();

document.addEventListener("DOMContentLoaded", () => {});
