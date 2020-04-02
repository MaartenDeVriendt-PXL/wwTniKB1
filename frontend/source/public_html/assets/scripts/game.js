window.onload = function () {
    //check if user has key
    if (sessionStorage.getItem('AuthenticationState') === null) {
        window.location.href = "accesdenied.html";
    }
    //check is key hasn't expired
    else if (Date.now > new Date(sessionStorage.getItem('AuthenticationExpires'))) {
        window.location.href = "accesdenied.html";
    }
}