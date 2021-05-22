var searchBtn = document.querySelector('.searchBtn');
var weatherInfo = document.querySelector('ul');

const apiKey = 'f8169e98b55ed37f39768cfa32a34da1';


getAPI () =>{
    var requestURL = api.openweathermap.org/data/2.5/weather?q={newyork}&appid={apiKey} ;

    fetch(requestURL)
    .then(
        function (response) {
            return.response.json();
        }
        .then(function (data) {
            for (var i=0; i< data.length; i++)
            {
                var lineItem = document.createElement('li');
            }
        })
    );
}

searchBtn.addEventListener('click', getAPI);