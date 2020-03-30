function toggleRegister() {
    document.getElementById("login").style.display="none";
    document.getElementById("register").style.display="block";
}

function toggleLogin() {
    document.getElementById("register").style.display="none";
    document.getElementById("login").style.display="block";
}

function check() {
    let password = document.getElementById("pass").value;
    let confpass = document.getElementById("confpass").value;

    if(password.length <= 6){
        document.getElementById("error").innerHTML = "Provided password is too short!";
    }

    if(password != confpass){
        document.getElementById("error").innerHTML = "Passwords do not match";
    }

    if(password.length >= 6 && password == confpass){
        document.getElementById("register").style.display="none";
        document.getElementById("login").style.display="block";
        document.getElementById("confirmation").innerHTML = "Registration was succesfull";
    }
}