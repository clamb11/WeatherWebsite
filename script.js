const inputZip = "";
const inputCountryCode = "";
var mood;
var gender;
var tops = {
    longSleeve: "Long Sleeve",
    shortSleeve: "Short Sleeve",
    warmSweater: "Warm Sweater",
    lightSweater: "Light Sweater",
    tankTop: "Tank Top"
};
var bottoms = {
    shorts: "Shorts",
    skirt: "Skirt",
    leggings: "Leggings",
    swatpants: "Sweatpants",
    jeans: "Jeans",
    dressPants: "Dress Pants",
    cargo: "Cargo Pants"

};
var coats = {
    lightJacket: "Light Jacket",
    heavyJacket: "Heavy Jacket",
    sweatshirt: "Sweatshirt",
    hoodie: "Hoodie",
    winterCoat: "Winter Coat",
    rainJacket: "Rain Jacket"
};
var accesories = {
    winterHat: "Winter Hat",
    sunHat: "Sun Hat",
    scarf: "Scarf",
    gloves: "Gloves"
};
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
        
// functions to add prefrences 
function choose(choice){
    mood = choice;
}
function choose2(choice){
    gender = choice;
}



function getInput(){
    //get and log input
    const inputZip =  document.getElementById("inputZip").value;
    const inputCountryCode = document.getElementById("inputCountryCode").value;
    console.log("Input Zip: ", inputZip, "Input Country Code: ", inputCountryCode);
    //Define geo URL
    const geoURLFull = geoURL + "?zip=" + inputZip + "," + inputCountryCode + "&appid=" + apiKey;
}

const getRec = async function(){
    getInput()
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
        const avgTemp = getTemp(temp,feelsLike,min,max,windSpeed,description);
        const clothes = chooseOutfit(avgTemp)
        

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

