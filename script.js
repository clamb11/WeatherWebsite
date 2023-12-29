const inputZip = "";
const inputCountryCode = "";
const geoURL= "http://api.openweathermap.org/geo/1.0/zip";
const weatherURL = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "4d5bfce61bb0bfcb407e7e53221ed5d0"
const outputGeoElement = document.getElementById("weather-output");
function keyPress(event){
    if (event.key == "Enter"){
        getInput();

    }
}

// add action listener to wait for user input
document.getElementById("inputZip").addEventListener("keyup", keyPress);
document.getElementById("inputCountryCode").addEventListener("keyup", keyPress);   
        
function getInput(){
    //get and log input
    const inputZip =  document.getElementById("inputZip").value;
    const inputCountryCode = document.getElementById("inputCountryCode").value;
    console.log("Input Zip: ", inputZip, "Input Country Code: ", inputCountryCode);
    //Define geo URL
    const geoURLFull = geoURL + "?zip=" + inputZip + "," + inputCountryCode + "&appid=" + apiKey;
}

const getRec = async function(){
    //GET request from API, fetch rerturns promise
    const result = fetch(geoURLFull)
    //then to handle response validity
    .then(response =>{
        if(!response.ok){
            throw new Error("Network response error");
        }
        //parse JSON data
        return response.json();
    })
    .then(data=>{
        //get data from response
        const lat = data.lat;
        const lon = data.lon;
        console.log(lat, "\n");
        console.log(lon, "\n");
        const weatherURLFull = weatherURL + "?lat=" + lat +  "&lon=" + lon + "&limit=1&appid=" + apiKey + "&units=imperial"; 
        console.log(weatherURLFull, "\n");
        //make 2nd call
        return fetch(weatherURLFull) 
    })
    //catch errors
    .catch(error =>{
        console.error("Error: ", error)
    })
    result.then(r=> r.json())
    .then(data2 =>{
        const temp = data2.main.temp;
        const feelsLike = data2.main.feels_like;
        const min = data2.main.temp_min;
        const max = data2.main.temp_max;
        const description = data2.weather[0].description;
        const windSpeed = data2.wind.speed;
        outputGeoElement.innerHTML = '<p>Temperature: ${temp}°F</p> <p>Temperature Feels Like: ${feelsLike}</p> <p>Temperature Min: ${min}</p> <p>Temperature Max: ${max}</p> <p>Weather: ${description}</p> ';
        

    });
}

