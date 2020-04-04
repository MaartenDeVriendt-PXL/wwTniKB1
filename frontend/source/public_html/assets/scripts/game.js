window.onload = function () {
    //check if user has key
    if (sessionStorage.getItem('AuthenticationState') === null) {
        window.location.href = "accesdenied.html";
    }
    //check is key hasn't expired
    else if (Date.now > new Date(sessionStorage.getItem('AuthenticationExpires'))) {
        window.location.href = "accesdenied.html";
    }
    //but also check if player in lobby has a game-id
    if(sessionStorage.getItem('gameID') === null) {
        window.location.href = "lobby.html";
    }
};