var inputZip = "";
var inputCountryCode = "";
var mood;
var gender;
const data = {};
var tempSelection;

const geoURL= "http://api.openweathermap.org/geo/1.0/zip";
const weatherURL = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = ""
const outputGeoElement = document.getElementById("weather-output");


var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
//output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
// slider.oninput = function() {
//   output.innerHTML = this.value;

// }

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

function getTempSelect(value){
    if(value <=10){
        tempSelection = -10;
        return "Normally Very Cold";
    }else if(value > 10 && value <= 20){
        tempSelection = -8;
        return "Normally Cold";
    }else if(value > 20 && value <= 30){
        tempSelection = -6;
        return "Normally Very Chilly";
    }else if(value > 30 && value <= 40){
        tempSelection = -4;
        return "Normally Chilly";
    }else if(value > 40 && value <= 45){
        tempSelection = -2;
        return "Normally Slightly Chilled"
    }else if(value > 45 && value <= 55){
        tempSelection = 0;
        return "Average";
    }else if(value > 55 && value <= 60){
        tempSelection = 2;
        return "Normally Slightly Warm";
    }else if(value > 60 && value <= 70){
        tempSelection = 4;
        return "Normally Warm";
    }else if(value > 70 && value <= 80){
        tempSelection = 6;
        return "Normally Very Warm";
    }else if(value > 80 && value <= 90){
        tempSelection = 8;
        return "Normally Hot";
    }else if(value > 90 && value <= 100){
        tempSelection = 10;
        return "Normally Very Hot";
    }
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
        //console.log(description);
        var windSpeed = weatherData.wind.speed;
        //outputGeoElement.innerHTML = '<p>Temperature: ${temp}°F</p> <p>Temperature Feels Like: ${feelsLike}</p> <p>Temperature Min: ${min}</p> <p>Temperature Max: ${max}</p> <p>Weather: ${description}</p> ';
        var avgTemp = getTemp(temp,feelsLike,min,max,windSpeed,description, tempSelection);
        //console.log(avgTemp);
        var clothes = chooseOutfit(avgTemp);
        //console.log(avgTemp);
        console.log(clothes);
        //console.log(tempSelection);
        displayOutfit(clothes);
    })
    .catch(error => {
        console.error("Error: ", error)
    });
}

function getToggleState(isChecked){
    //console.log(isChecked);
    if(isChecked == true){
        mood = "business";
        //console.log(mood);
        return mood;
    } 
    else{
        mood = "casual";
       //console.log(mood);
       return mood;
    }
}


function chooseOutfit(temp, description){
    console.log(tempSelection)
    mood = getToggleState(document.getElementById("switchValue").checked);
    //even numbers are business and odd are casual
    var tops = {
        0: "Turtle Neck and Sweater",
        1: "Long Sleeve and Hoodie",
        2: "Button up and Blazer",
        3: "Long Sleeve and Sweatshirt",
        4: "Warm Sweater",
        5: "Short Sleeve and Sweatshirt",
        6: "Turtle Neck and Cardigan",
        7: "Short Sleeve and Hoodie", 
        8: "Light Sweater", 
        9: "Long Sleeve",     
        10: "Long Sleeve",
        11: "Short Sleeve",
        12: "Short Sleeve",
        13: "Tank Top",
        14: "Dress"
        
    };
    //even numbers are business odd are casual
    var bottoms = {
        0: "Chinos",
        1: "Sweatpants",
        2: "Slacks",
        3: "Cargo Pants",
        4: "Khaki",
        5: "Jeans",
        6: "Dress Pants",
        7: "Leggings",
        8: "Skirt with Tights",
        9: "Shorts",
        10: "Light Long Pants",
        11: "Jean Shorts",
        12: "Skirt",
        13: "Biker Shorts",
        14: "No Pants"
    };
    //even numbers are business odd are casual
    var coats = {
        0: "Winter Coat",
        1: "Winter Coat",
        2: "Heavy Jacket",
        3: "Heavy Jacket",
        4: "Trench Coat",
        5: "Leather Jacket",
        6: "Light Jacket",
        7: "Light Jacket",
        8: "Blazer",
        9: "Denim Jacket",
        10: "No Jacket",
        11: "Rain Jacket"
    };
    var accesories = {
        0: "Winter Hat",
        1: "Scarf",
        2: "Gloves",
        3: "Sun Hat",
        4: "Sunglasses",
        5: "None"
    };
    //even numbers are casual odd are business
    var shoes = {
        0: "Boots",
        1: "Boots",
        2: "Combat Boots",
        3: "Loafers",
        4: "Sneakers",
        5: "Heels",
        6: "Sandals",
        7: "Flats",
    };



    //absolutley freezing
    if(temp < 20 && mood == "business"){
        var absFrezTop = getRandEvenNum(0,4);
        var absFrezTopValue = tops[absFrezTop];
        //console.log(absFrezTopValue);
        var absFrezBottom = getRandEvenNum(0,7);
        var absFrezBottomValue = bottoms[absFrezBottom];
        //console.log(absFrezBottomValue);
        var absFrezCoat = getRandNum(0,1);
        var absFrezCoatValue = coats[absFrezCoat];
        //console.log(absFrezCoatValue);
        var absFrezAccesories = getRandNum(0,1);
        var absFrezAccesoriesValue1 = accesories[absFrezAccesories];
        var absFrezAccesoriesValue2 = accesories[2];
        var absFrezShoesValue = shoes[1];
        return "Coat: " + absFrezCoatValue + "\nTop: " + absFrezTopValue + "\nBottom: " + absFrezBottomValue + "\nAccesories: " + absFrezAccesoriesValue1 + ", " + absFrezAccesoriesValue2 + "\nShoes: " + absFrezShoesValue;
    } 
    else if(temp < 20 && mood == "casual"){
        var absFrezTop = getRandOddNum(0,4);
        //console.log(absFrezTop);
        var absFrezTopValue = tops[absFrezTop];
        //console.log(absFrezTopValue);
        var absFrezBottom = getRandOddNum(0,7);
        var absFrezBottomValue = bottoms[absFrezBottom];
        //console.log(absFrezTopValue);
        var absFrezCoat = getRandNum(0,1);
        var absFrezCoatValue = coats[absFrezCoat];
        console.log(absFrezCoatValue);
        var absFrezAccesories = getRandNum(0,1);
        var absFrezAccesoriesValue1 = accesories[absFrezAccesories];
        var absFrezAccesoriesValue2 = accesories[2];
        var absFrezShoesValue = shoes[0];
        return "Coat: " + absFrezCoatValue + "\nTop: " + absFrezTopValue + "\nBottom: " + absFrezBottomValue + "\nAccesories: " + absFrezAccesoriesValue1 + ", " + absFrezAccesoriesValue2 + "\nShoes: " + absFrezShoesValue;
    } 
    //freezing
    else if(temp >= 20 && temp < 32 && mood == "business"){
        var FrezTop = getRandEvenNum(0,4);
        var FrezTopValue = tops[FrezTop];
        //console.log(FrezTopValue);
        var FrezBottom = getRandEvenNum(0,7);
        var FrezBottomValue = bottoms[FrezBottom];
        //console.log(FrezTopValue);
        var FrezCoat = getRandNum(0,5);
        var FrezCoatValue = coats[FrezCoat];
        //console.log(FrezCoatValue);
        var FrezAccesories = getRandNum(0,1);
        var FrezAccesoriesValue1 = accesories[FrezAccesories];
        var FrezAccesoriesValue2 = accesories[2];
        var FrezShoes = getRandOddNum(0,4);
        var FrezShoesValue = shoes[FrezShoes];
        return "Coat: " + FrezCoatValue + "\nTop: " + FrezTopValue + "\nBottom: " + FrezBottomValue + "\nAccesories: " + FrezAccesoriesValue1 + ", " + FrezAccesoriesValue2 + "\nShoes: " + FrezShoesValue;
    
    }
    else if(temp >= 20 && temp < 32 && mood == "casual"){
        var FrezTop = getRandOddNum(0,4);
        var FrezTopValue = tops[FrezTop];
        //console.log(FrezTopValue);
        var FrezBottom = getRandOddNum(0,7);
        var FrezBottomValue = bottoms[FrezBottom];
        //console.log(FrezTopValue);
        var FrezCoat = getRandNum(0,5);
        var FrezCoatValue = coats[FrezCoat];
        //console.log(FrezCoatValue);
        var FrezAccesories = getRandNum(0,1);
        var FrezAccesoriesValue1 = accesories[FrezAccesories];
        var FrezAccesoriesValue2 = accesories[2];
        var FrezShoes = getRandEvenNum(0,4);
        var FrezShoesValue = shoes[FrezShoes];
        return "Coat: " + FrezCoatValue + "\nTop: " + FrezTopValue + "\nBottom: " + FrezBottomValue + "\nAccesories: " + FrezAccesoriesValue1 + ", " + FrezAccesoriesValue2 + "\nShoes: " + FrezShoesValue;
    }
    //cold
    else if(temp >= 32 && temp < 47 && mood == "business"){
        var coldTop = getRandEvenNum(0,7);
        var coldTopValue = tops[coldTop];
        //console.log(FrezTopValue);
        var coldBottom = getRandEvenNum(0,7);
        var coldBottomValue = bottoms[coldBottom];
        //console.log(FrezTopValue);
        var coldCoat = getRandNum(2,9);
        var coldCoatValue = coats[coldCoat];
        //console.log(FrezCoatValue);
        var coldShoes = getRandOddNum(0,4);
        var coldShoesValue = shoes[coldShoes];
        return "Coat: " + coldCoatValue + "\nTop: " + coldTopValue + "\nBottom: " + coldBottomValue + "\nShoes: " + coldShoesValue;
    }
    else if(temp >= 32 && temp < 47 && mood == "casual"){
        var coldTop = getRandOddNum(0,7);
        var coldTopValue = tops[coldTop];
        console.log(coldTopValue);
        var coldBottom = getRandOddNum(0,7);
        var coldBottomValue = bottoms[coldBottom];
        //console.log(coldTopValue);
        var coldCoat = getRandNum(2,9);
        var coldCoatValue = coats[coldCoat];
        //console.log(coldCoatValue);
        var coldShoes = getRandEvenNum(0,4);
        var coldShoesValue = shoes[coldShoes];
        return "Coat: " + coldCoatValue + "\nTop: " + coldTopValue + "\nBottom: " + coldBottomValue + "\nShoes: " + coldShoesValue;
    }
     //mild
     else if(temp >= 47 && temp < 55 && mood == "business"){
        var mildTop = getRandEvenNum(5,13);
        var mildTopValue = tops[mildTop];
        //console.log(FrezTopValue);
        var mildBottom = getRandEvenNum(0,7);
        var mildBottomValue = bottoms[mildBottom];
        //console.log(FrezTopValue);
        var mildCoat = getRandNum(4,9);
        if(mildTop == 6){
            mildCoatValue = 10;
        }
        var mildCoatValue = coats[mildCoat];
        if(description.includes("rain") || description.includes("thunderstorm")){
            mildCoatValue = coats[11];
        }
        //console.log(FrezCoatValue);
        var mildShoes = getRandOddNum(0,5);
        var mildShoesValue = shoes[mildShoes];
        return "Jacket: " + mildCoatValue + "\nTop: " + mildTopValue + "\nBottom: " + mildBottomValue + "\nShoes: " + mildShoesValue;
    }
    else if(temp >= 47 && temp < 55 && mood == "casual"){
        var mildTop = getRandOddNum(5,13);
        var mildTopValue = tops[mildTop];
        //console.log(FrezTopValue);
        var mildBottom = getRandOddNum(0,7);
        var mildBottomValue = bottoms[mildBottom];
        //console.log(FrezTopValue);
        var mildCoat = getRandNum(4,9);
        if(mildTop == 5 || mildTop == 7){
            mildCoatValue = 10;
        }
        var mildCoatValue = coats[mildCoat];
        if(description.includes("rain") || description.includes("thunderstorm")){
            mildCoatValue = coats[11];
        }
        //console.log(FrezCoatValue);
        var mildShoes = getRandEvenNum(0,5);
        var mildShoesValue = shoes[mildShoes];
        return "Jacket: " + mildCoatValue + "\nTop: " + mildTopValue + "\nBottom: " + mildBottomValue + "\nShoes: " + mildShoesValue;
    }
    //moderate
    else if(temp >= 55 && temp < 64 && mood == "business"){
        var modTop = getRandEvenNum(7,13);
        var modTopValue = tops[modTop];
        //console.log(FrezTopValue);
        var modBottom = getRandEvenNum(2,8);
        var modBottomValue = bottoms[modBottom];
        //console.log(FrezTopValue);
        var modCoat = getRandNum(6,9);
        var modCoatValue = coats[modCoat];
        if(description.includes("rain") || description.includes("thunderstorm")){
            modCoatValue = coats[11];
        }
        //console.log(FrezCoatValue);
        var modShoes = getRandOddNum(0,5);
        var modShoesValue = shoes[modShoes];
        return "Jacket: " + modCoatValue + "\nTop: " + modTopValue + "\nBottom: " + modBottomValue + "\nShoes: " + modShoesValue;
   

    }
    else if(temp >= 55 && temp < 64 && mood == "casual"){
        var modTop = getRandOddNum(5,13);
        var modTopValue = tops[modTop];
        //console.log(FrezTopValue);
        var modBottom = getRandOddNum(2,8);
        var modBottomValue = bottoms[modBottom];
        //console.log(FrezTopValue);
        var modCoat = getRandNum(2,9);
        if(modTop == 5 || modTop == 7){
            modCoatValue = 10;
        }
        var modCoatValue = coats[modCoat];
        if(description.includes("rain") || description.includes("thunderstorm")){
            modCoatValue = coats[11];
        }
        //console.log(FrezCoatValue);
        var modShoes = getRandEvenNum(0,5);
        var modShoesValue = shoes[modShoes];
        var modAccesories = getRandNum(3,4);
        var modAccesoriesValue = accesories[modAccesories];
        
        return "Jacket: " + modCoatValue + "\nTop: " + modTopValue + "\nBottom: " + modBottomValue + "\nShoes: " + modShoesValue + "\nAccesories: " + modAccesoriesValue;
   

    }
     //warm
     else if(temp >= 64 && temp < 75 && mood == "business"){
        var warmTop = getRandEvenNum(9,14);
        var warmTopValue = tops[warmTop];
        //console.log(FrezTopValue);
        if(warmTop == 14){
            warmBottom == 14;
        }
        if(warmTop == 10){
           var warmBottom = getRandEvenNum(8,13);
        }
        else{
            var warmBottom = getRandEvenNum(2,13);
        }
        var warmBottomValue = bottoms[warmBottom];
        //console.log(FrezTopValue);
        var warmCoat = 10;
        var warmCoatValue = coats[warmCoat];
        if(description.includes("rain") || description.includes("thunderstorm")){
            warmCoatValue = coats[11];
        }
        //console.log(FrezCoatValue);
        var warmShoes = getRandOddNum(0,7);
        var warmShoesValue = shoes[warmShoes];
        return "Jacket: " + warmCoatValue + "\nTop: " + warmTopValue + "\nBottom: " + warmBottomValue + "\nShoes: " + warmShoesValue;
   
 
     }
    else if(temp >= 64 && temp < 75 && mood == "casual"){
        var warmTop = getRandOddNum(9,14);
        var warmTopValue = tops[warmTop];
        if(warmTop == 14){
            warmBottom == 14;
        }
        if(warmTop == 10){
           var warmBottom = getRandOddNum(8,13);
        }
        else{
            var warmBottom = getRandOddNum(2,13);
        }
        var warmBottomValue = bottoms[warmBottom];
        var warmCoat = 10;
        var warmCoatValue = coats[warmCoat];
        if(description.includes("rain") || description.includes("thunderstorm")){
            warmCoatValue = coats[11];
        }
        var warmShoes = getRandEvenNum(0,7);
        var warmShoesValue = shoes[warmShoes];
        var warmAccesories = getRandNum(3,4);
        var warmAccesoriesValue = accesories[warmAccesories];
        return "Jacket: " + warmCoatValue + "\nTop: " + warmTopValue + "\nBottom: " + warmBottomValue + "\nShoes: " + warmShoesValue + "\nAccesories: " + warmAccesoriesValue;
   
 
    }
    //very warm
    else if(temp >= 75 && temp < 86 && mood == "business"){

    }
    else if(temp >= 75 && temp < 86 && mood == "casual"){

    }
     //hot
     else if(temp >= 86 && temp < 99 && mood == "business"){
       
    }
    else if(temp >= 86 && temp < 99 && mood == "casual"){
       
    }
     //very hot
     else if(temp >= 99 && mood == "business"){
        
    }
     //very hot
     else if(temp >= 99 && mood == "casual"){
        
     }

}

function getTemp(temp, feelsLike, min, max, windSpeed, description, tempSelection){
    //console.log(temp);
    const firstAvg = (min + max)/2;
    //console.log(firstAvg);
    //console.log(feelsLike);
    const tempAvg = (firstAvg + feelsLike + temp)/3;
    const windtemp = 35.74 + .6215 * tempAvg - 35.75 * Math.pow(windSpeed, .16) + .4275 * tempAvg * Math.pow(windSpeed, .16);
    const returnVal = windtemp + tempSelection;
    // if(description.includes("thunderstorm")){
    //     windtemp -= 3; 
    // }else if(description.includes("rain")){
    //     windtemp -= 2;
    // }else if(description.includes("clear")){
    //     windtemp += 5;
    // }
    return returnVal;    

}

function getRandEvenNum(min, max){
    var num = Math.floor(Math.random() * (max - min +1)) + min;
    //console.log(num);
    if((num % 2) != 0){
        return getRandEvenNum(min, max);
    }else {
        //console.log(num);
        return num;
    }
}


function getRandOddNum(min, max){
    var num = Math.floor(Math.random() * (max - min +1)) + min;
    //console.log(num);
    if((num % 2) == 0){

        return getRandOddNum(min, max);
    
        }
    else {
        //console.log(num);
        return num;
    }
}


function getRandNum(min, max){
    return Math.floor(Math.random() * (max - min +1)) + min;
}

function displayOutfit(data){
    // const top = data.tops;
    // const topDiv = document.getElementById("Top");
    // const heading = document.createElement("h1");
    // heading.innerHTML = top;
    // topDiv.appendChild(heading);
    // const topImg = document.createElement("img");
    // topImg.src = top;
    // topDiv.appendChild(topImg);
    // document.body.style.backgroundImage = "url()";

}
