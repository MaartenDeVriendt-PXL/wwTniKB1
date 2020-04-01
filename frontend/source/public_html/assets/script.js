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
//registratie
function validateReg() {
    //get var
    let email = document.getElementById("emailregister").value;
    let user = document.getElementById("user").value;
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

    //bind var to cookie
    document.cookie = `email=${email}`;
    //bind var to data arr
    const data = {email: email, password: password, nickName: user};
    //request uri
    const uri = 'https://localhost:5001/api/Authentication/register';
    //make & check request code
    fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data); //delete me 
                location.reload();
            })
            .catch(err => {
                document.getElementById("error").innerHTML = `"Backend error, is the API running?"`; // \n ${err.toString()}
                return false;
            });
    //should always be last
    return false;
}

//login
function validateLog() {
//get var
    let email = document.getElementById("login_email").value;
    let password = document.getElementById("login_password").value;
    //bind var to data arr
    const data = {email: email, password: password};
    //request uri
    const uri = 'https://localhost:5001/api/Authentication/token';
    //make & check request code
    fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
            .then(response => {
                if (!response.ok) {
                    throw new Error('status code not 200');
                    document.getElementById("error").innerHTML = `login error, password or email incorrect`;
                }
                return response.json();
            })
            .then(data => {
                console.log(data); //delete me

                //store values in cookies
                document.cookie = `token=${data["token"]}`;
                location.href = "lobby.html";
            })
            .catch(err => {
                document.getElementById("error").innerHTML =
                        `Backend error, is the API running?   ${
                        err.toString()}
                            `;
                return false;
            });
    //should always be last
    return false;
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
