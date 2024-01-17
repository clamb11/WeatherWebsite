//used to hold user input 
var inputZip = "";
var inputCountryCode = "";
//used to hold zip and cCode from user
const data = {};
//business or casual == mood
var mood;
// not used yet -> may use different pages for each gender
var gender;
//used to hold the choosen outfit numbers and get pictures
const tempValues = {};
// used for normall hot/cold -> needs to be initialized at 0
var tempSelection = 0;
// api url that needs zip and cCode
const geoURL= "http://api.openweathermap.org/geo/1.0/zip";
// api url that needs lat and lon
const weatherURL = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "4d5bfce61bb0bfcb407e7e53221ed5d0"
//Not used??? 
const outputGeoElement = document.getElementById("weather-output");
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");



//called by html and saves the input to the name after each letter typed
function handleInput(temp){
    data[temp.name] = temp.value
}

//this gets the entire input of zip and cCode -> not used???
function submitInput(){
    inputZip = data.zip;
    inputCountryCode = data.cCode;
    // console.log(inputCountryCode);
    // console.log(inputZip);
}

// called by html to get if user runs hot or cold
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


//called by html to make first api call and get lat and lon using user input
function getGeo(){
    //zip and cCode input for URL
    inputZip = data.zip;
    inputCountryCode = data.cCode;
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
        var cityName = geoData.name;
        //use these to get weather info and rec
        getWeather(lat, lon, cityName);
        //console.log(lat, lon);
    })
    .catch(error => {
        console.error("Error: ", error)
    });
}

//called by getGeo to get weather info and outfit rec
function getWeather(lat, lon, name){
    var weatherURLFull = weatherURL + "?lat=" + lat +  "&lon=" + lon + "&limit=1&appid=" + apiKey + "&units=imperial"; 
    //console.log(weatherURLFull);
    //getting the weather info
    fetch(weatherURLFull).then(response2 =>{
        if(!response2.ok){
            throw new Error("Network Response Error");
        }
        return response2.json();
    })
    .then(weatherData =>{
        console.log(weatherData);
        //saving the important info returned from api
        var temp = weatherData.main.temp;
        //to display temp on website
        var currentTemp = document.getElementById("currTemp");
        currentTemp.textContent = "Current Tempature: " + weatherData.main.temp + "°F for " + name;
        var feelsLike = weatherData.main.feels_like;
        //console.log(feelsLike);
        var min = weatherData.main.temp_min;
        var max = weatherData.main.temp_max;
        var windSpeed = weatherData.wind.speed;
        var description = weatherData.weather[0].description;
        //console.log(description);
        //get the text under images that will be changed
        var shoeRec = document.getElementById("shoeRec");
        var topRec = document.getElementById("topRec");
        var coatRec = document.getElementById("coatRec");
        var bottomRec = document.getElementById("bottomRec");
        var acc1Rec = document.getElementById("acc1Rec");
        var acc2Rec = document.getElementById("acc2Rec");
        //getTemp returns the temp to base the outfit off of -> this is not the actual temp 
        var avgTemp = getTemp(temp,feelsLike,min,max,windSpeed,description, tempSelection);
        //console.log(avgTemp);
        //returns object that contains clothes choosen
        var clothes = chooseOutfit(avgTemp, description);
        //console.log(clothes);
        // change the text under the images to the choosen variable 
        shoeRec.textContent = "Shoe Recommendation: "  + clothes.Shoes;
        topRec.textContent = "Top Recommendation: "  + clothes.Top;
        coatRec.textContent = "Coat Recommendation: "  + clothes.Coat;
        bottomRec.textContent = "Bottom Recommendation: "  + clothes.Bottom;
        acc1Rec.textContent = "Accessories Recommendation: "  + clothes.Accesories1;
        acc2Rec.textContent = "Accessories Recommendation: "  + clothes.Accesories2;

        //console.log(tempSelection);
    })
    .catch(error => {
        console.error("Error: ", error)
    });
}

//called by chooseOutfit -> checks if toggle checkbox is checked and sets mood 
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

//called by getWeather -> takes in info and reyruns an outfir object 
function chooseOutfit(temp, description){
    console.log(temp)
    mood = getToggleState(document.getElementById("switchValue").checked);
    //even numbers are business and odd are casual; lower nums for colder weather & higher for hotter
    var tops = {
        0: "Turtle Neck and Blazer",
        1: "Long Sleeve and Hoodie",
        2: "Button up and Sweater",
        3: "Long Sleeve and Sweatshirt",
        4: "Sweater",
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
    //even numbers are business odd are casual; lower nums for colder weather & higher for hotter
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
        14: "Tights",
        15: "None"
    };
    //even numbers are business odd are casual; lower nums for colder weather & higher for hotter
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
    // lower nums for colder weather & higher for hotter
    var accesories = {
        0: "Winter Hat",
        1: "Scarf",
        2: "Gloves",
        3: "Sun Hat",
        4: "Sunglasses",
        5: "None"
    };
    //even numbers are casual odd are business; lower nums for colder weather & higher for hotter
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

    //absolutley freezing & business
    if(temp < 20 && mood == "business"){
        var tempTop = getRandEvenNum(0,4);
        //console.log(TopValue);
        var tempBottom = getRandEvenNum(0,7);
        //console.log(BottomValue);
        var tempCoat = getRandEvenNum(0,1);
        //console.log(CoatValue);
        var tempAccesories = getRandNum(0,1);
        var tempAccesories2 = 2;
        var tempShoes = 1;
        console.log(tempAccesories);
        } 

    //absolutley freezing & casual    
    else if(temp < 20 && mood == "casual"){
        var tempTop = getRandOddNum(0,4);
        //console.log(Top);
        //console.log(TopValue);
        var tempBottom = getRandOddNum(0,7);
        //console.log(TopValue);
        var tempCoat = getRandNum(0,1);
        //console.log(CoatValue);
        var tempAccesories = getRandNum(0,1);
        var tempAccesories2 = 2;
        var tempShoes = 0;
        console.log(tempAccesories);
        } 

    //freezing & business
    else if(temp >= 20 && temp < 32 && mood == "business"){
        var tempTop = getRandEvenNum(0,4);
        //console.log(TopValue);
        var tempBottom = getRandEvenNum(0,7);
        //console.log(TopValue);
        var tempCoat = getRandEvenNum(0,5);
        //console.log(CoatValue);
        var tempAccesories = getRandNum(0,1);
        var tempAccesories2 = 2;
        var tempShoes = getRandOddNum(0,4);
       
    }
    //freezing & casual
    else if(temp >= 20 && temp < 32 && mood == "casual"){
        var tempTop = getRandOddNum(0,4);
        //console.log(TopValue);
        var tempBottom = getRandOddNum(0,7);
        //console.log(TopValue);
        var tempCoat = getRandNum(0,5);
        //console.log(CoatValue);
        var tempAccesories = getRandNum(0,1);
        var tempAccesories2 = 2;
        var tempShoes = getRandEvenNum(0,4);
        }
    //very cold & business
    else if(temp >= 32 && temp < 47 && mood == "business"){
        var tempTop = getRandEvenNum(0,7);
        //console.log(TopValue);
        var tempBottom = getRandEvenNum(0,7);
        //console.log(TopValue);
        var tempCoat = getRandNum(2,9);
        //console.log(CoatValue);
        var tempShoes = getRandOddNum(0,4);
        var tempAccesories = 5;
        var tempAccesories2 = 5;
    }
    //very cold & casual
    else if(temp >= 32 && temp < 47 && mood == "casual"){
        var tempTop = getRandOddNum(0,7);
        //console.log(TopValue);
        var tempBottom = getRandOddNum(0,7);
        //console.log(TopValue);
        var tempCoat = getRandNum(2,9);
        //console.log(CoatValue);
        var tempShoes = getRandEvenNum(0,4);
        var tempAccesories = 5;
        var tempAccesories2 = 5;
    }
     //cold & business
     else if(temp >= 47 && temp < 55 && mood == "business"){
        var tempTop = getRandEvenNum(5,13);
        //console.log(TopValue);
        var tempBottom = getRandEvenNum(0,7);
        //console.log(TopValue);
        //if top is turtle neck and cardigan no coat needed
        if(tempTop == 6){
            tempCoat = 10;
        }else{
            var tempCoat = getRandEvenNum(4,9);
        }
        //if raining, need raincoat
        if(description.includes("rain") || description.includes("thunderstorm")){
            tempCoat = 11;
        }
        //console.log(CoatValue);
        var tempShoes = getRandOddNum(0,5);
        var tempAccesories = 5;
        var tempAccesories2 = 5;
    }
    // cold & casual
    else if(temp >= 47 && temp < 55 && mood == "casual"){
        var tempTop = getRandOddNum(5,13);
        //console.log(TopValue);
        var tempBottom = getRandOddNum(0,7);
        //console.log(TopValue);
        //if top has hoodie or sweatshirt no coat needed 
        if(tempTop == 5 || tempTop == 7){
            tempCoat = 10;
        }else{
            var tempCoat = getRandOddNum(4,9);
        }
        //if raining, need raincoat
        if(description.includes("rain") || description.includes("thunderstorm")){
            tempCoat = 11;
        }
        //console.log(CoatValue);
        var tempShoes = getRandEvenNum(0,5);
        var tempAccesories = 5;
        var tempAccesories2 = 5;
    }
    //moderate & business
    else if(temp >= 55 && temp < 64 && mood == "business"){
        var tempTop = getRandEvenNum(7,13);
        //console.log(TopValue);
        var tempBottom = getRandEvenNum(2,8);
        //console.log(TopValue);
        var tempCoat = getRandEvenNum(6,9);
        //if raining, need raincoat
        if(description.includes("rain") || description.includes("thunderstorm")){
            tempCoat = 11;
        }
        //console.log(CoatValue);
        var tempShoes = getRandOddNum(0,5);
        var tempAccesories = 5;
        var tempAccesories2 = 5;

    }
    //moderate & casual
    else if(temp >= 55 && temp < 64 && mood == "casual"){
        var tempTop = getRandOddNum(5,13);
        //console.log(TopValue);
        var tempBottom = getRandOddNum(2,8);
        //console.log(TopValue);
        //if top has hoodie or sweatshirt no coat needed 
        if(tempTop == 5 || tempTop == 7){
            tempCoat = 10;
        }else{
            var tempCoat = getRandOddNum(2,9);
        }
        //if raining, need raincoat
        if(description.includes("rain") || description.includes("thunderstorm")){
            tempCoat = 11;
        }
        //console.log(CoatValue);
        var tempShoes = getRandEvenNum(0,5);
        var tempAccesories = getRandNum(3,4);
        var tempAccesories2 = 5;
        
       
    }
     //warm & business
     else if(temp >= 64 && temp < 75 && mood == "business"){
        var tempTop = getRandEvenNum(9,14);
        //console.log(TopValue);
        //if top is dress them bottoms are tights
        if(tempTop == 14){
            tempBottom == 14;
        }
        //if top is long sleeve choose lighter bottoms 
        if(tempTop == 10){
           var tempBottom = getRandEvenNum(8,13);
        }
        else{
            var tempBottom = getRandEvenNum(2,13);
        }
        //console.log(TopValue);
        //no coat needed 
        var tempCoat = 10;
        //if raining, need raincoat
        if(description.includes("rain") || description.includes("thunderstorm")){
            tempCoat = 11;
        }
        //console.log(CoatValue);
        var tempShoes = getRandOddNum(0,7);
        var tempAccesories = 5;
        var tempAccesories2 = 5;
 
     }
     //warm & casual
    else if(temp >= 64 && temp < 75 && mood == "casual"){
        var tempTop = getRandOddNum(9,14);
        //if top is long sleeve choose lighter bottoms 
        if(tempTop == 9){ 
           var tempBottom = getRandOddNum(8,13);
        }
        else{
            var tempBottom = getRandOddNum(2,13);
        }
        //no coat needed 
        var tempCoat = 10;
        //if raining, need raincoat
        if(description.includes("rain") || description.includes("thunderstorm")){
            tempCoat = 11;
        }
        var tempShoes = getRandEvenNum(0,7);
        var tempAccesories = getRandNum(3,4);
        var tempAccesories2 = 5;
 
    }
    //very warm & business
    else if(temp >= 75 && temp < 86 && mood == "business"){
        var tempTop = getRandEvenNum(11,14);
        //if top is dress them bottoms are tights
        if(tempTop == 14){
            tempBottom == 14;
        }else{
            var tempBottom = getRandEvenNum(2,13);
        }
        //no coat needed 
        var tempCoat = 10;
        //if raining, need raincoat
        if(description.includes("rain") || description.includes("thunderstorm")){
            tempCoat = 11;
        }
        var tempShoes = getRandOddNum(0,7);
        var tempAccesories = 5;
        var tempAccesories2 = 5;
    }
    //very warm & casual
    else if(temp >= 75 && temp < 86 && mood == "casual"){
        var tempTop = getRandOddNum(11,14);
        var tempBottom = getRandOddNum(9,13);
        //no coat needed 
        var tempCoat = 10;
        //if raining, need raincoat
        if(description.includes("rain") || description.includes("thunderstorm")){
            tempCoat = 11;
        }
        var tempShoes = getRandEvenNum(2,7);
        var tempAccesories = getRandNum(3,5);
        var tempAccesories2 = 5;

    }
     //hot & business
     else if(temp >= 86 && temp < 99 && mood == "business"){
        var tempTop = getRandEvenNum(11,14);
        //if top is dress them bottoms are tights
        if(tempTop == 14){
            tempBottom == 15;
        }else{
            var tempBottom = getRandEvenNum(8,13);
        }
        //no coat needed 
        var tempCoat = 10;
        var tempShoes = getRandOddNum(0,7);
        var tempAccesories = 5;
        var tempAccesories2 = 5;
       
    }
    //hot & casual
    else if(temp >= 86 && temp < 99 && mood == "casual"){
        var tempTop = getRandOddNum(11,14);
        var tempBottom = getRandOddNum(9,13);
        //no coat needed 
        var tempCoat = 10;
        var tempShoes = getRandEvenNum(2,7);
        var tempAccesories = getRandNum(3,5);
        if(tempAccesories == 3){
            var tempAccesories2 = getRandNum(4,5);
        }
        else{
            var tempAccesories2 = 5;
        }
    }
     //very hot & business
     else if(temp >= 99 && mood == "business"){
        var tempTop = getRandEvenNum(11,14);
        //if top is dress them bottoms are tights
        if(tempTop == 14){
            tempBottom == 15;
        }else{
            var tempBottom = getRandEvenNum(8,13);
        }
        //no coat needed 
        var tempCoat = 10;
        var tempShoes = getRandOddNum(0,7);
        var tempAccesories = 5;
        var tempAccesories2 = 5;
        
    }
     //very hot & casual
     else if(temp >= 99 && mood == "casual"){
        
     }
     //used in the returned clothes object
     var TopValue = tops[tempTop];
     var BottomValue = bottoms[tempBottom];
     var CoatValue = coats[tempCoat];
     var AccesoriesValue1 = accesories[tempAccesories];
     var AccesoriesValue2 = accesories[tempAccesories2];
     var ShoesValue = shoes[tempShoes];

     //what is returned 
     var clothes = {
        Coat: CoatValue,
        Top: TopValue,
        Bottom: BottomValue,
        Accesories1: AccesoriesValue1, 
        Accesories2: AccesoriesValue2,
        Shoes: ShoesValue
    }
    
    //saves numbers of each clothes obj to use for image
    tempValues.top = tempTop;
    tempValues.bottom = tempBottom;
    tempValues.coat = tempCoat;
    tempValues.acc1 = tempAccesories;
    tempValues.acc2 = tempAccesories2;
    tempValues.shoes = tempShoes;

    console.log(TopValue);
    console.log(tempAccesories);

    
    return clothes;


}



function getTemp(temp, feelsLike, min, max, windSpeed, description, tempSelection){
    var windtemp = temp;
    console.log("temp: " + temp);
    const firstAvg = (min + max)/2;
    console.log(firstAvg);
    const tempAvg = (firstAvg + feelsLike + temp)/3;
    console.log(tempAvg);
    console.log(windSpeed);
    if(windSpeed != 0){
        windtemp = 35.74 + (.6215 * tempAvg)- (35.75 * Math.pow(windSpeed, .16)) + (.4275 * tempAvg * Math.pow(windSpeed, .16)); 
    }else{
        windtemp = tempAvg;
    }
    console.log(windtemp);
    const returnVal = windtemp + tempSelection;
    console.log(returnVal);
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


function changeTopImg(img){
    var tempNum = tempValues.top;
    document.getElementById("TopImg").src = img.src.replace("blank.JPG", "top" + tempNum + ".jpg");  
}

function changeCoatImg(img){
    var tempNum = tempValues.coat;
    document.getElementById("CoatImg").src = img.src.replace("blank.JPG", "coat" + tempNum + ".jpg");
}
function changeBottomImg(img){
    var tempNum = tempValues.bottom;
    document.getElementById("BottomImg").src = img.src.replace("blank.JPG", "bottom"+ tempNum + ".jpg");
}
function changeShoesImg(img){
    var tempNum = tempValues.shoes;
    document.getElementById("ShoesImg").src = img.src.replace("blank.JPG", "shoes" + tempNum + ".jpg");
}
function changeAcc1Img(img){
    var tempNum = tempValues.acc1;
    document.getElementById("Acc1Img").src = img.src.replace("blank.JPG", "acc1"+ tempNum + ".jpg");
}
function changeAcc2Img(img){
    var tempNum = tempValues.acc2;
    document.getElementById("Acc2Img").src = img.src.replace("blank.JPG", "acc2" + tempNum + ".jpg");
}
