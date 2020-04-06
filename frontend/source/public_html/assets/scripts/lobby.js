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

    let sp_easy = document.getElementById("sp-easy");
    let sp_medium = document.getElementById("sp-medium");
    let sp_hard = document.getElementById("sp-hard");

    sp_easy.addEventListener("click", () => {
        sp_easy.classList.add("active");
        sp_easy.classList.remove("inactive");

        sp_medium.classList.remove("active");
        sp_medium.classList.add("inactive");

        sp_hard.classList.remove("active");
        sp_hard.classList.add("inactive");
    });

    sp_medium.addEventListener("click", () => {
        sp_medium.classList.add("active");
        sp_medium.classList.remove("inactive");

        sp_easy.classList.remove("active");
        sp_easy.classList.add("inactive");

        sp_hard.classList.remove("active");
        sp_hard.classList.add("inactive");
    });

    sp_hard.addEventListener("click", () => {
        sp_hard.classList.add("active");
        sp_hard.classList.remove("inactive");

        sp_easy.classList.remove("active");
        sp_easy.classList.add("inactive");

        sp_medium.classList.remove("active");
        sp_medium.classList.add("inactive");
    });
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