var searchBtn = document.querySelector(".searchBtn");
var clearBtn = document.querySelector(".clearBtn");
var historyTitle = document.querySelector(".historyEl");
var userInput = document.querySelector("#textarea1").value;
var weatherInfo = document.querySelector("ul");
var weatherContainer = document.querySelector(".weatherContainer");
var historyBtn = document.querySelector(".historyBtn");
var testBtn = document.querySelector(".testBtn");

// Moment.JS dates
var currentDate = moment().format("l");
var castDay1 = moment().add(1, "days").format("l");
var castDay2 = moment().add(2, "days").format("l");
var castDay3 = moment().add(3, "days").format("l");
var castDay4 = moment().add(4, "days").format("l");
var castDay5 = moment().add(5, "days").format("l");

const apiKey = "f8169e98b55ed37f39768cfa32a34da1";

function getAPI(cityName) {
  var requestURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    apiKey +
    "&units=imperial";

  var userInput = document.querySelector("#textarea1");
  userInput.value = "";

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      locationCoord(data.coord.lon, data.coord.lat);
      var cityNamEL = document.querySelector("#cityNameEL");
      cityNamEL.textContent = `${data.name} `;

      var currentDateEL = document.querySelector("#currentDate");
      currentDateEL.textContent = `(${currentDate})`;

      var currentTempEL = document.querySelector("#currentTemp");
      currentTempEL.textContent = `Current Temp: ${Math.round(
        data.main.temp
      )} °F`;

      var weatherIcn = document.querySelector("#weatherIcon");
      weatherIcn.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      );
    });
}



function locationCoord(long, lat) {
  var requestURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    long +
    "&exclude=minutely,hourly,alerts&appid=" +
    apiKey +
    "&units=imperial";

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var uvEl = document.querySelector("#uvIndex");
      uvEl.textContent = "UV index: " + data.current.uvi;

      var humidityEL = document.querySelector("#humidity");
      humidityEL.textContent = `Humidity: ${data.current.humidity} %`;

      var windSpeedEl = document.querySelector("#windSpeed");
      windSpeedEl.textContent = `Wind Speed: ${Math.round(
        data.current.wind_speed
      )} MPH`;
      fiveDayCast(data);
      uvColors(data);
    });
}

function fiveDayCast(data) {
  var fiveDays = data.daily.slice(0, 5);

  // Day 1

  var day1date = document.querySelector("#castDay1");
  day1date.textContent = castDay1;

  var day1icon = document.querySelector("#castDay1icon");
  day1icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${fiveDays[0].weather[0].icon}.png`
  );

  var day1temp = document.querySelector("#castDay1temp");
  day1temp.textContent = `${Math.round(fiveDays[0].temp.day)} °F`;

  // // Day 2

  var day2date = document.querySelector("#castDay2");
  day2date.textContent = castDay2;

  var day2icon = document.querySelector("#castDay2icon");
  day2icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${fiveDays[1].weather[0].icon}.png`
  );

  var day2temp = document.querySelector("#castDay2temp");
  day2temp.textContent = `${Math.round(fiveDays[1].temp.day)} °F`;

  // Day 3

  var day3date = document.querySelector("#castDay3");
  day3date.textContent = castDay3;

  var day3icon = document.querySelector("#castDay3icon");
  day3icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${fiveDays[2].weather[0].icon}.png`
  );

  var day3temp = document.querySelector("#castDay3temp");
  day3temp.textContent = `${Math.round(fiveDays[2].temp.day)} °F`;

  // Day 4

  var day4date = document.querySelector("#castDay4");
  day4date.textContent = castDay4;

  var day4icon = document.querySelector("#castDay4icon");
  day4icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${fiveDays[3].weather[0].icon}.png`
  );

  var day4temp = document.querySelector("#castDay4temp");
  day4temp.textContent = `${Math.round(fiveDays[3].temp.day)} °F`;

  // Day 5

  var day5date = document.querySelector("#castDay5");
  day5date.textContent = castDay5;

  var day5icon = document.querySelector("#castDay5icon");
  day5icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${fiveDays[4].weather[0].icon}.png`
  );

  var day5temp = document.querySelector("#castDay5temp");
  day5temp.textContent = `${Math.round(fiveDays[4].temp.day)} °F`;
}

function uvColors(data) {
  var currentUv = data.current.uvi;
  var uvStyle = document.querySelector(".uvStyle");

  if (currentUv <= 2) {
    uvStyle.classList.add("uvLow");
    uvStyle.classList.remove("uvModerate");
    uvStyle.classList.remove("uvHigh");
    uvStyle.classList.remove("uvVeryHigh");
  } else if (currentUv > 2 && currentUv <= 5) {
    uvStyle.classList.remove("uvLow");
    uvStyle.classList.add("uvModerate");
    uvStyle.classList.remove("uvHigh");
    uvStyle.classList.remove("uvVeryHigh");
  } else if (currentUv > 5 && currentUv <= 7) {
    uvStyle.classList.remove("uvLow");
    uvStyle.classList.remove("uvModerate");
    uvStyle.classList.remove("uvHigh");
    uvStyle.classList.add("uvHigh");
  } else if (currentUv > 7) {
    uvStyle.classList.remove("uvLow");
    uvStyle.classList.remove("uvModerate");
    uvStyle.classList.remove("uvHigh");
    uvStyle.classList.add("uvVeryHigh");
  }
}

function searchHistoryButton(userInput) {
  var searchHistoryEL = document.querySelector("#searchHistory");
  var createItem = document.createElement("li");
  var buttonText = document.createTextNode(userInput);
  createItem.appendChild(buttonText);
  createItem.setAttribute("class", "btn historyBtn blue darken-3");
  searchHistoryEL.appendChild(createItem);

  createItem.addEventListener("click", function () {
    getAPI(userInput);
    weatherContainer.classList.remove("hide");
  });
}

function localStorageData(userData) {
  let userHistory;
  if (localStorage.getItem("History") === null) {
    userHistory = [];
  } else {
    userHistory = JSON.parse(localStorage.getItem("History"));
  }

  userHistory.push(userData);
  localStorage.setItem("History", JSON.stringify(userHistory));
}

function pageloadFunction() {
  let userHistory;
  if (localStorage.getItem("History") === null) {
    userHistory = [];
  } else {
    userHistory = JSON.parse(localStorage.getItem("History"));
    historyTitle.classList.remove("hide");
    clearBtn.classList.remove("hide");
    weatherContainer.classList.remove("hide");
  }

  userHistory.forEach((userData) => {
    searchHistoryButton(userData);
  });
}

searchBtn.addEventListener("click", function (event) {
  var userInput = document.querySelector("#textarea1").value;
  event.preventDefault();
  weatherContainer.classList.remove("hide");
  clearBtn.classList.remove("hide");
  historyTitle.classList.remove("hide");
  localStorageData(userInput);
  searchHistoryButton(userInput);
  getAPI(userInput);
});

clearBtn.addEventListener("click", function (event) {
  localStorage.clear();
  location.reload();
  event.preventDefault();
});

pageloadFunction();
