var searchBtn = document.querySelector('.searchBtn');
var weatherInfo = document.querySelector('ul');

// Moment.JS dates
var currentDate = moment().format('L');
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
}


searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    var userInput = document.querySelector('#textarea1').value;
    console.log(userInput);
    getAPI(userInput);
    
});