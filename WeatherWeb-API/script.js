const apiKey = "9191aadb038dca0a515df41a4cd7950e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (response.status == 404) {
            document.querySelector(".erro").style.display="block";
            document.querySelector(".weather").style.display="none";
        }
        const data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update the weather icon based on the weather condition
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "clouds.png";
        } else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "clear.png";
        } else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "rain.png";
        } else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "drizzle.png";
        } else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "mist.png";
        }


        document.querySelector(".weather").style.display = "block";

    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

