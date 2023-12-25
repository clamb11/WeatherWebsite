const inputZip = "";
const inputCountryCode = "";

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
}

const getRec = async function(){
    //request from API
    
}

