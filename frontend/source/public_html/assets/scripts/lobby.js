/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

window.onload = function () {
//    document.getElementById("cookie").innerHTML = getCookie("email") + "\n" + getCookie("token") + "\n\n" + getCookie("user");
   console.log("Logged in as: " + getCookie("user") +"\nEmail: " + getCookie("email") + "\ntoken: " + getCookie("token"));
   document.getElementById("username").innerHTML = getCookie("user");
};

//work with cookie function
function getCookie(name) {
// Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");
    // Loop through the array elements
    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        /* Removing whitespace at the beginning of the cookie name
         and compare it with the given string */
        if (name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }

// Return null if not found
    return null;
}

function updateDifficulty(){
    let sliderValue = document.getElementById("difficultySP-slider").value;
    

    switch(sliderValue) {
        case "1":
          document.getElementById("difficulty-display").innerHTML = "EASY";
          break;
        case "2":
          document.getElementById("difficulty-display").innerHTML = "MEDIUM";
          break;
        case "3":
          document.getElementById("difficulty-display").innerHTML = "HARD";
          break;
        default:
          document.getElementById("difficulty-display").innerHTML = "EASY";
      }
}
