window.onload = function () {
    //check if user has key
    if (sessionStorage.getItem('AuthenticationState') === null) {
        window.location.href = "accesdenied.html";
    }
    //check is key hasn't expired
    else if (Date.now > new Date(sessionStorage.getItem('AuthenticationExpires'))) {
        window.location.href = "accesdenied.html";
    }

    document.getElementById("username").innerHTML = sessionStorage.getItem("user");
    let game = document.getElementById("launch_game");
    game.addEventListener("click", () => {
        play();
    })
};

function play() {
    //default settings for singleplayer game
    const data = {
        gridSize: 0,
        allowDeformedShips: true,
        mustReportSunkenShip: true,
        canMoveUndamagedShipsDuringGame: true,
        numberOfTurnsBeforeAShipCanBeMoved: 0
    };

    //request uri
    const uri = 'https://localhost:5001/api/games';

    //make request and check status code
    fetch(uri, {
        method: 'POST',
        headers: {
            'Authorization':'Bearer ' + sessionStorage.getItem('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('status code not 201');
            }
            //return response.json();
        })
        .then(data => {
            //store gameID in session
            sessionStorage.setItem('gameID', data["id"]);

            location.href = "game.html";
        })
        .catch(err => {
            throw new Error(`"game error, ${err.toString()}"`);
        });

}

function updateDifficulty() {
    let sliderValue = document.getElementById("difficultySP-slider").value;

    //change difficulty
    switch (sliderValue) {
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