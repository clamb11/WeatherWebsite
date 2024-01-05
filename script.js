var inputZip = "";
var inputCountryCode = "";
var mood;
var gender;
const data = {};

const geoURL= "http://api.openweathermap.org/geo/1.0/zip";
const weatherURL = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = ""
const outputGeoElement = document.getElementById("weather-output");

//this saves the input to the name after each letter typed
function handleInput(temp){
    data[temp.name] = temp.value
}

function submitInput(){
    inputZip = data.zip;
    inputCountryCode = data.cCode;
    // console.log(inputCountryCode);
    // console.log(inputZip);
}





function getGeo(){
    //zip and cCode input for URL
    inputZip = data.zip;
    inputCountryCode = data.cCode;
    // console.log(inputCountryCode);
    // console.log(inputZip);
    //console.log("Input Zip: ", inputZip, "Input Country Code: ", inputCountryCode);
    //Define geo URL
    var geoURLFull = geoURL + "?zip=" + inputZip + "," + inputCountryCode + "&appid=" + apiKey;
    //console.log(geoURLFull);
    //make API call for lat and log
    fetch(geoURLFull).then(response =>{
        if(!response.ok){
            throw new Error("Network Response Error");
        }
        return response.json();
    })
    .then(geoData =>{
        //console.log(geoData);
        var lat = geoData.lat;
        var lon = geoData.lon;
        getWeather(lat, lon);
        //console.log(lat, lon);
    })
    .catch(error => {
        console.error("Error: ", error)
    });
}

function getWeather(lat, lon){
    var weatherURLFull = weatherURL + "?lat=" + lat +  "&lon=" + lon + "&limit=1&appid=" + apiKey + "&units=imperial"; 
    //console.log(weatherURLFull);
    fetch(weatherURLFull).then(response2 =>{
        if(!response2.ok){
            throw new Error("Network Response Error");
        }
        return response2.json();
    })
    .then(weatherData =>{
        //console.log(weatherData);
        var temp = weatherData.main.temp;
        var feelsLike = weatherData.main.feels_like;
        //console.log(feelsLike);
        var min = weatherData.main.temp_min;
        var max = weatherData.main.temp_max;
        var description = weatherData.weather[0].description;
        console.log(description);
        var windSpeed = weatherData.wind.speed;
        //outputGeoElement.innerHTML = '<p>Temperature: ${temp}°F</p> <p>Temperature Feels Like: ${feelsLike}</p> <p>Temperature Min: ${min}</p> <p>Temperature Max: ${max}</p> <p>Weather: ${description}</p> ';
        var avgTemp = getTemp(temp,feelsLike,min,max,windSpeed,description);
        //console.log(avgTemp);
        var clothes = chooseOutfit(avgTemp)
    })
    .catch(error => {
        console.error("Error: ", error)
    });
}



function chooseOutfit(temp, description){
    //absolutley freezing
    if(temp < 20){
        var tops = {
            longSleeve1: "Long Sleeve and Hoodie",
            longSleeve2: "Long Sleeve and Sweatshirt",
            warmSweater: "Warm Sweater"
        };
        var tempTop = getRandNum(3);
        var topValue = tops[tempTop];
        var bottoms = {
            leggings: "Leggings",
            swatpants: "Sweatpants",
            jeans: "Jeans",
            dressPants: "Dress Pants",
            cargo: "Cargo Pants"
        };
        var tempBottom = getRandNum(5);
        var bottomValue = bottoms[tempBottom];
        var coats = {
            winterCoat: "Winter Coat"
        };
        var tempCoat = getRandNum(1);
        var coatValue = coats[tempCoat];
        var accesories = {
            winterHat: "Winter Hat",
            scarf: "Scarf",
            gloves: "Gloves"
        };
        var tempAccesories = getRandNum(2);
        var accesoriesValue1 = accesories[tempAccesories];
        var accesoriesValue2 = accesories[2];
        return "Coat: " + coatValue + "Top: " + topValue + "Bottom: " + bottomValue + "Accesories: " + accesoriesValue1 + accesoriesValue2;
    }
    //freezing
    else if(temp >= 20 && temp < 32){
        var tops = {
            longSleeve1: "Long Sleeve and Hoodie",
            longSleeve2: "Long Sleeve and Sweatshirt",
            warmSweater: "Warm Sweater"
        };
        var tempTop = getRandNum(3);
        var topValue = tops[tempTop];
        var bottoms = {
            leggings: "Leggings",
            swatpants: "Sweatpants",
            jeans: "Jeans",
            dressPants: "Dress Pants",
            cargo: "Cargo Pants"
        };
        var tempBottom = getRandNum(5);
        var bottomValue = bottoms[tempBottom];
        var coats = {
            winterCoat: "Winter Coat",
            heavyJacket: "Heavy Jacket"
        };
        var tempCoat = getRandNum(2);
        var coatValue = coats[tempCoat];
        var accesories = {
            winterHat: "Winter Hat",
            scarf: "Scarf",
            gloves: "Gloves"
        };
        var tempAccesories = getRandNum(2);
        var accesoriesValue1 = accesories[tempAccesories];
        var accesoriesValue2 = accesories[2];
        return "Coat: " + coatValue + "Top: " + topValue + "Bottom: " + bottomValue + "Accesories: " + accesoriesValue1 + accesoriesValue2;
    }
    //cold
    else if(temp >= 32 && temp < 47){
        var tops = {
            longSleeve: "Long Sleeve",
            sweater: "Light Sweater",
            shortSleeve1: "Short Sleeve and Sweatshirt",
            shortSleeve2: "Short Sleeve and Hoodie"
        };
        var tempTop = getRandNum(4);
        var topValue = tops[tempTop];
        var bottoms = {
            jeans: "Jeans",
            dressPants: "Dress Pants",
            cargo: "Cargo Pants",
            leggings: "Leggings"
        };
        var tempBottom = getRandNum(4);
        var bottomValue = bottoms[tempBottom];
        var coats = {
            lightJacket: "Light Jacket",
            heavyJacket: "Heavy Jacket"
        };
        var tempCoat = getRandNum(2);
        var coatValue = coats[tempCoat];
        if(description.includes("rain") || description.includes("thunderstorm")){
            coatValue = "Rain Jacket";
        }
        
        return "Jacket: " + coatValue + "Top: " + topValue + "Bottom: " + bottomValue;
    }
     //mild
     else if(temp >= 47 && temp < 55){
        var tops = {
            longSleeve: "Long Sleeve",
            sweater: "Light Sweater",
            shortSleeve: "Short Sleeve",
            tanktop: "Tank Top"
        };
        var tempTop = getRandNum(4);
        var topValue = tops[tempTop];
        var bottoms = {
            jeans: "Jeans",
            dressPants: "Dress Pants",
            cargo: "Cargo Pants",
            leggings: "Leggings",
            skirt: "Skirt with Tights"
        };
        var tempBottom = getRandNum(5);
        var bottomValue = bottoms[tempBottom];
        var coats = {
            lightJacket: "Light Jacket",
            heavyJacket: "Heavy Jacket",
            noJacket: "No Jacket"
        };
        var tempCoat = 0;
        if(tempTop == 0 || tempTop == 1){
            tempCoat = 2;
        }else if(tempTop == 2 || tempTop == 3){
            var tempCoat = getRandNum(2);
        }
        var coatValue = coats[tempCoat];
        if(description.includes("rain") || description.includes("thunderstorm")){
            coatValue = "Rain Jacket";
        }
        
        return "Jacket: " + coatValue + "Top: " + topValue + "Bottom: " + bottomValue;
    }
    //moderate
    else if(temp >= 55 && temp < 64){
        var tops = {
            longSleeve: "Long Sleeve",
            sweater: "Light Sweater",
            shortSleeve: "Short Sleeve",
            tanktop: "Tank Top"
        };
        var tempTop = getRandNum(4);
        var topValue = tops[tempTop];
        var bottoms = {
            jeans: "Jeans",
            dressPants: "Dress Pants",
            cargo: "Cargo Pants",
            leggings: "Leggings",
            skirt: "Skirt with Tights"
        };
        var tempBottom = getRandNum(5);
        var bottomValue = bottoms[tempBottom];
        var coats = {
            lightJacket: "Light Jacket",
            noJacket: "No Jacket"
        };
        var tempCoat = 0;
        if(tempTop == 0 || tempTop == 1){
            tempCoat = 1;
        }else if(tempTop == 2 || tempTop == 3){
            var tempCoat = 0;
        }
        var coatValue = coats[tempCoat];
        if(description.includes("rain") || description.includes("thunderstorm")){
            coatValue = "Rain Jacket";
        }
        
        return "Jacket: " + coatValue + "Top: " + topValue + "Bottom: " + bottomValue;
    }
     //warm
     else if(temp >= 64 && temp < 75){
        var tops = {
            longSleeve: "Long Sleeve",
            shortSleeve: "Short Sleeve",
            tanktop: "Tank Top"
        };
        var tempTop = getRandNum(3);
        var topValue = tops[tempTop];
        var bottoms = {
            jeans: "Jeans",
            dressPants: "Dress Pants",
            cargo: "Cargo Pants",
            shorts: "Shorts",
            leggings: "Leggings",
            skirt: "Skirt"
        };
        if(tempTop == 1 || tempTop == 2){
            tempBottom = getRandNum(6);
        }else if(tempTop == 0){
            var tempBottom = Math.random() < .5 ? 3 : 5;
        }
        var bottomValue = bottoms[tempBottom];
        if(description.includes("rain") || description.includes("thunderstorm")){
            coatValue = "Rain Jacket";
        }else{
            coatValue = "No Jacket Needed"
        }
        var accesories = {
            sunHat: "Sun Hat",
            sunglasses: "Sunglasses",
            noAcc: "None"
        };
        if(description.includes("clear")){
            var tempAccesories = getRandNum(2); 
        }else{
            var tempAccesories = 2;
        }
        var accesoriesValue = accesories[tempAccesories];
        
        return "Jacket: " + coatValue + "Top: " + topValue + "Bottom: " + bottomValue + "Accesories: " + accesoriesValue;
    }
    //very warm
    else if(temp >= 75 && temp < 86){
        var tops = {
            shortSleeve: "Short Sleeve",
            tanktop: "Tank Top"
        };
        var tempTop = getRandNum(2);
        var topValue = tops[tempTop];
        var bottoms = {
            shorts: "Shorts",
            longPants: "Light Long Pants",
            skirt: "Skirt"
        };
        tempBottom = getRandNum(3);
        var bottomValue = bottoms[tempBottom];
        if(description.includes("rain") || description.includes("thunderstorm")){
            coatValue = "Rain Jacket";
        }else{
            coatValue = "No Jacket Needed"
        }
        var accesories = {
            sunHat: "Sun Hat",
            sunglasses: "Sunglasses",
            noAcc: "None"
        };
        if(description.includes("clear")){
            var tempAccesories = getRandNum(2); 
        }else{
            var tempAccesories = 2;
        }
        var accesoriesValue = accesories[tempAccesories];
        
        return "Jacket: " + coatValue + "Top: " + topValue + "Bottom: " + bottomValue + "Accesories: " + accesoriesValue;
    }
     //hot
     else if(temp >= 86 && temp < 99){
        var tops = {
            shortSleeve: "Short Sleeve",
            tanktop: "Tank Top"
        };
        var tempTop = getRandNum(2);
        var topValue = tops[tempTop];
        var bottoms = {
            shorts: "Shorts",
            skirt: "Skirt"
        };
        tempBottom = getRandNum(2);
        var bottomValue = bottoms[tempBottom];
        var accesories = {
            sunHat: "Sun Hat",
            sunglasses: "Sunglasses",
            noAcc: "None"
        };
        if(description.includes("clear")){
            var tempAccesories = getRandNum(2); 
        }else{
            var tempAccesories = 2;
        }
        var accesoriesValue = accesories[tempAccesories];
        
        return "Top: " + topValue + "Bottom: " + bottomValue + "Accesories: " + accesoriesValue;
    }
     //very hot
     else if(temp >= 99){
        var tops = {
            shortSleeve: "Short Sleeve",
            tanktop: "Tank Top"
        };
        var tempTop = getRandNum(2);
        var topValue = tops[tempTop];
        var bottoms = {
            shorts: "Shorts",
            skirt: "Skirt"
        };
        tempBottom = getRandNum(2);
        var bottomValue = bottoms[tempBottom];
    
        var accesories = {
            sunHat: "Sun Hat",
            sunglasses: "Sunglasses",
            noAcc: "None"
        };
        if(description.includes("clear")){
            var tempAccesories = getRandNum(2); 
        }else{
            var tempAccesories = 2;
        }
        var accesoriesValue = accesories[tempAccesories];
        
        return "Top: " + topValue + "Bottom: " + bottomValue + "Accesories: " + accesoriesValue;
    }

}

function getTemp(temp, feelsLike, min, max, windSpeed, description){
    const firstAvg = (min + max)/2;
    const tempAvg = (firstAvg + feelsLike + temp)/3;
    const windtemp = 35.74 + .6215 * tempAvg - 35.75 * Math.pow(windSpeed, .16) + .4275 * tempAvg * Math.pow(windSpeed, .16);
    if(description.includes("thunderstorm")){
        windtemp -= 3; 
    }else if(description.includes("rain")){
        windtemp -= 2;
    }else if(description.includes("clear")){
        windtemp += 5;
    }
    return windtemp;    

}

function getRandNum(max){
    return Math.floor(Math.random() * max);
}

