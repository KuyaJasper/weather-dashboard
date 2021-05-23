var searchBtn = document.querySelector('.searchBtn');
var weatherInfo = document.querySelector('ul');

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
            locationCoord(data.coord.lon, data.coord.lat);
            var cityNamEL =document.querySelector('#cityNameEL');

            cityNamEL.textContent= data.name

            var weatherIcn = document.querySelector('#weatherIcon');
            weatherIcn.setAttribute('src',`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
            // weatherIcn.setAttribute('src','http://openweathermap.org/img/wn/'+data.weather[0].icon+'.png')

            // current weather api information

        })
}

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
// 5 day forcast and uv data

})
}


searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    var userInput = document.querySelector('#textarea1').value;
    console.log(userInput);
    getAPI(userInput);
});