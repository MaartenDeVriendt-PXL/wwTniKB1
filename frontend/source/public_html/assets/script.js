window.onload = function () {
    //toggles between login and register form
    let toggle_register = document.getElementById("toggleform");
    let toggle_login = document.getElementById("togglelogin");

    toggle_register.addEventListener("click", () => {
        document.getElementById("formlogin").style.display = "none";
        document.getElementById("formregister").style.display = "block";
    });

    toggle_login.addEventListener("click", () => {
        document.getElementById("formlogin").style.display = "block";
        document.getElementById("formregister").style.display = "none";
    });
    //end

    //load cookie
    if (getCookie("email") !== null || getCookie("email") !== "") {
        document.getElementById("login_email").value = getCookie("email");
    }
};

function validateMyForm() {
    //get var
    let email = document.getElementById("emailregister").value;

    //check password length and conf 
    let password = document.getElementById("passregister").value;
    let confpassword = document.getElementById("confpass").value;

    if (password.length < 6) {
        document.getElementById("error").innerHTML = "Provided password is too short!";
        return false;
    }

    if (password !== confpassword) {
        document.getElementById("error").innerHTML = "Passwords do not match";
        return false;
    }
    document.cookie = `email=${email}`;
    return true;
}

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
