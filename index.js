const day = document.querySelector(".day h1");
const date = document.querySelector(".date h2");
const place = document.querySelector(".place");
const temperature = document.querySelector(".temperature h1");
const humidity = document.querySelector(".humidity span");
const wind = document.querySelector(".wind span");
const pressure = document.querySelector(".precipitate span");
const airQuality = document.querySelector(".air-quality span");
const description = document.querySelector(".road-status span");
const search = document.querySelector(".search");
const searchInput = document.querySelector(".search input");
const searchBtn = document.getElementById("search-btn");
const container = document.querySelector(".container");
const details = document.querySelector(".details");
const temperatureDescription = document.querySelector(".temperature-description"); 
const contents = document.querySelector(".content");

const day1 = document.querySelector(".tommorow h2");
const day1Img = document.querySelector(".tommorow img");
const day1Deg = document.querySelector(".tommorow h3");

const day2 = document.querySelector(".oneDayAfter h2");
const day2Img = document.querySelector(".oneDayAfter img");
const day2Deg = document.querySelector(".oneDayAfter h3");

const day3 = document.querySelector(".twoDayAfter h2");
const day3Img = document.querySelector(".twoDayAfter img");
const day3Deg = document.querySelector(".twoDayAfter h3");

const todayDate = new Date();
const today = todayDate.toLocaleString( "en-US" , {weekday : 'long'});
const todayDateNumeric = todayDate.toLocaleString("en-US" , {day : "numeric"});
const month = todayDate.toLocaleString("en-US" , { month : 'long' ,year : 'numeric'});

day.innerHTML = `<h1> ${today} </h1> `;
date.innerHTML = `<h2> ${todayDateNumeric} ${month} </h2> `;

var API_KEY = config.API_KEY ;

searchBtn.addEventListener("click", ()=>{

    var userValue = searchInput.value;

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userValue}&limit=5&appid=${API_KEY}`)
    .then( response => response.json())
    .then(data => {
        var lat = data[0].lat;
        var long = data[0].lon;
        search.classList.add("scale");
        container.classList.add("container-expand");
        // container.style.transition = "height 0.4s";
        // details.classList.add("non-scale");
        // temperatureDescription.classList.add("non-scale");
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)
        .then(result => result.json())
        .then(data =>{
            details.classList.add("non-scale");
            temperatureDescription.classList.add("non-scale");
            var degree = data.main.temp;
            var currenthumitidy = data.main.humidity;
            var windSpeed = data.wind.speed;
            var currentPressure = data.main.pressure;
            var currentCondition = data.weather[0].description;
            var firstLetter = currentCondition.charAt(0);
            var capitalFirstLetter = firstLetter.toUpperCase();
            var newCondition = capitalFirstLetter + currentCondition.slice(1);
            place.innerHTML = `<h2>${data.name}</h2>`;
            temperature.innerHTML = `<h1>${Math.round(degree)}°c</h1>`;
            humidity.innerHTML = `<span> ${currenthumitidy} </span>`;
            wind.innerHTML = `<span> ${windSpeed} m/s </span>`;
            pressure.innerHTML = `<span> ${currentPressure} N/m2 </span>`;
            description.innerHTML = `<span> ${newCondition} </span>`;
            document.querySelector(".weather-details").style.width = "400px";
            contents.classList.add("non-scale");

            fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${API_KEY}`)
            .then(result => result.json())
            .then(data =>{
                var airQualityAqi= data.list[0].main.aqi;

                if(airQualityAqi == 1){
                    airQuality.innerHTML = `<span> Good </span>`;
                }else if(airQualityAqi == 2){
                    airQuality.innerHTML = `<span> Fair </span>`;
                }else if(airQualityAqi == 3){
                    airQuality.innerHTML = `<span> Moderate </span>`;
                }else if(airQualityAqi == 4){
                    airQuality.innerHTML = `<span> Poor </span>`;
                }else{
                    airQuality.innerHTML = `<span> Very Poor </span>`;
                }
             

                fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&cnt=4&units=metric&appid=${API_KEY}`)
                .then(response => response.json())
                .then(data =>{
                    var tommorow = new Date(data.list[1].dt * 1000);
                    var tommorowDay = tommorow.toLocaleString("en-US", {weekday: "short"})
                    var tommorowTemp = data.list[1].temp.day;
                    var iconcodeTom = data.list[1].weather[0].icon;
                    day1.innerHTML = `<h2> ${tommorowDay} </h2> `;
                    day1Deg.innerHTML = `<h3> ${Math.round(tommorowTemp)}°c </h3>`;
                    var iconurlTom = "http://openweathermap.org/img/w/" + iconcodeTom + ".png";
                    day1Img.src = iconurlTom;

                    var dayAfterTommorow = new Date(data.list[2].dt * 1000);
                    var datAfterTommorowDay = dayAfterTommorow.toLocaleString("en-US", {weekday: "short"});
                    var dayAfterTemp = data.list[2].temp.day;
                    var iconcodeDayAfter = data.list[2].weather[0].icon;
                    day2.innerHTML = `<h2> ${datAfterTommorowDay} </h2> `;
                    day2Deg.innerHTML = `<h3> ${Math.round(dayAfterTemp)}°c </h3>`;
                    var iconurlDayAfter = "http://openweathermap.org/img/w/" + iconcodeDayAfter + ".png";
                    day2Img.src = iconurlDayAfter;

                    var twoDaysAfter = new Date(data.list[3].dt * 1000);
                    var twoDaysAfterDay = twoDaysAfter.toLocaleString("en-US", {weekday: "short"});
                    var twodayAfterTemp = data.list[3].temp.day;
                    var iconcodeTwoDayAfter = data.list[3].weather[0].icon;
                    day3.innerHTML = `<h2> ${twoDaysAfterDay} </h2> `;
                    day3Deg.innerHTML = `<h3> ${Math.round(twodayAfterTemp)}°c </h3>`;
                    var iconurlTwoDayAfter = "http://openweathermap.org/img/w/" + iconcodeTwoDayAfter + ".png";
                    day3Img.src = iconurlTwoDayAfter;
                })
            })
        })
    }).catch(error => alert("Enter a Valid Input! (or) Check your spelling"));
})
 
const changeLocation = document.querySelector(".btn button");
changeLocation.onclick = () =>{
    window.location.reload();
}


