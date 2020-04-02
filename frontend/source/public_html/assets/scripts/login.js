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

//login
function validate_login(e) {
    e.preventDefault();
    try {
        login();
    } catch (e) {
        throw new Error(e.message);
    }
    return false;
}
function login() {
    //create & bind var
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
                    document.getElementById("confirmation").innerHTML = `login error, password or email incorrect`;
                    throw new Error('status code not 200');
                    return false;
                }
                return response.json();
            })
            .then(data => {
                console.log(data);

                //store values in cookies
                document.cookie = `email=${email}`;
                document.cookie = `token=${data["token"]}`;
                document.cookie = `user=${data["player"]["nickName"]}`;

                //store this information to prevent people from skipping to lobby.html
                sessionStorage.setItem("AuthenticationState", "Authenticated");

                //expire key in 1hour
                sessionStorage.setItem("AuthenticationExpires", Date.now.addHours(1));

                //if all done refresh
                window.location.href = "lobby.html";
            })
            .catch(err => {
                document.getElementById("error").innerHTML =
                        `"Backend error, is the API running? \n" ${
                        err.toString()}
     `;
                return false;
            });
    //should always be last
    return false;
}


//registration
function validate_signup(e) {
    e.preventDefault();
    try {
        signup();
    } catch (e) {
        throw new Error(e.message);
    }
    return false;
}
function signup(){
    //get & bind variable
    let email = document.getElementById("emailregister").value;
    let user = document.getElementById("user").value;

    //check password conf
    let password = document.getElementById("passregister").value;
    let confpassword = document.getElementById("confpass").value;

    if (password !== confpassword) {
        document.getElementById("error").innerHTML = "Passwords do not match";
        return false;
    }

    //bind var to data arr
    const data = {email: email, password: password, nickName: user};

    //request uri
    const uri = 'https://localhost:5001/api/Authentication/register';

    //make & check request code
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data),
    })
            .then(response => {
                if (!response.ok) {
                    document.getElementById("error").innerHTML = `backend error, is the API running?`;
                    throw new Error('status code not 200');
                    return false;
                }
                //return response.json();
            })
            .then(data => {
                //bind var to cookie
                document.cookie = `email=${email}`;
                document.cookie = `user=${user}`;

                console.log('succes:', data);

                location.reload();
            })
            .catch(err => {
                console.log('Error:', err.toString());
                document.getElementById("error").innerHTML = "Backend error, is the API running?"; // \n ${err.toString()}
                return false;
            });
    //should always be last
    return false;
}

//add houres to date
Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
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
