var searchBtn = document.querySelector('.searchBtn');
var weatherInfo = document.querySelector('ul');

// Moment.JS dates
var currentDate = moment().format('l');
var castDay1 = moment().add(1, 'days').format('l');
var castDay2 = moment().add(2, 'days').format('l');
var castDay3 = moment().add(3, 'days').format('l');
var castDay4 = moment().add(4, 'days').format('l');
var castDay5 = moment().add(5, 'days').format('l');

const apiKey = 'f8169e98b55ed37f39768cfa32a34da1';


function getAPI (cityName) {
    var requestURL = 'https://api.openweathermap.org/data/2.5/weather?q='+ cityName +'&appid=' + apiKey + '&units=imperial';

    fetch(requestURL) 
    .then(
        function (response) {
            console.log(response);
            return response.json();
        })

        // data parameter is the json object from the api
        .then(function (data) {
            console.log (data);
            // calling locationCoord function here lets me use the data paramater
            locationCoord(data.coord.lon, data.coord.lat);
            var cityNamEL = document.querySelector('#cityNameEL');
            cityNamEL.textContent= `${data.name}`

            var currentDateEL = document.querySelector('#currentDate');
            currentDateEL.textContent = `${currentDate}`;

            var weatherIcn = document.querySelector('#weatherIcon');
            weatherIcn.setAttribute('src',`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
            // weatherIcn.setAttribute('src','http://openweathermap.org/img/wn/'+data.weather[0].icon+'.png') <=== This is the concat version

            // current weather api information

        })
}


// using another api from OpenWeather DB because i need the UV info
// 5 day forcast and uv data (this is the ONE CALL API)

function locationCoord (long,lat){
var requestURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat +'&lon='+long+'&exclude=minutely,hourly,alerts&appid='+ apiKey + '&units=imperial';

fetch(requestURL)
.then(
    function (response) {
        console.log(response);
        return response.json();
    }
)
.then(function (data) {
    console.log(data);
    console.log(data.current.uvi);
    var uvEl = document.querySelector('#uvIndex');
    uvEl.textContent = 'Current UV index: '+ data.current.uvi

    // call fiveDayCast here because we are using the data from the requestURL from this function
    fiveDayCast(data);
})

}

function fiveDayCast (data) {
 
    var fiveDays = data.daily.slice(0,5);

    // Day 1
    
    var day1date = document.querySelector('#castDay1');
    day1date.textContent = castDay1;

    var day1icon= document.querySelector('#castDay1icon')
    day1icon.setAttribute('src',`http://openweathermap.org/img/wn/${fiveDays[0].weather[0].icon}.png`);
    
    var day1temp= document.querySelector('#castDay1temp');
    day1temp.textContent= `${fiveDays[0].temp.day} °F`;

    // Day 2
    
    var day2date = document.querySelector('#castDay2');
    day2date.textContent = castDay2;

    var day2icon= document.querySelector('#castDay2icon')
    day2icon.setAttribute('src',`http://openweathermap.org/img/wn/${fiveDays[1].weather[1].icon}.png`);
    
    var day2temp= document.querySelector('#castDay2temp');
    day2temp.textContent= `${fiveDays[1].temp.day} °F`;

    // Day 3
    
    var day3date = document.querySelector('#castDay3');
    day3date.textContent = castDay3;

    var day3icon= document.querySelector('#castDay3icon')
    day3icon.setAttribute('src',`http://openweathermap.org/img/wn/${fiveDays[2].weather[2].icon}.png`);
    
    var day3temp= document.querySelector('#castDay3temp');
    day3temp.textContent= `${fiveDays[2].temp.day} °F`;

    // Day 4
    
    var day4date = document.querySelector('#castDay4');
    day4date.textContent = castDay4;

    var day4icon= document.querySelector('#castDay4icon')
    day4icon.setAttribute('src',`http://openweathermap.org/img/wn/${fiveDays[3].weather[3].icon}.png`);
    
    var day4temp= document.querySelector('#castDay4temp');
    day4temp.textContent= `${fiveDays[3].temp.day} °F`;

    // Day 5
    
    var day5date = document.querySelector('#castDay5');
    day5date.textContent = castDay5;

    var day5icon= document.querySelector('#castDay5icon')
    day5icon.setAttribute('src',`http://openweathermap.org/img/wn/${fiveDays[4].weather[4].icon}.png`);
    
    var day5temp= document.querySelector('#castDay5temp');
    day5temp.textContent= `${fiveDays[4].temp.day} °F`;
}


searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    var userInput = document.querySelector('#textarea1').value;
    console.log(userInput);
    getAPI(userInput);
    
});