window.onload = function () {
    if (sessionStorage['userId'] == null) {
        window.location.replace("home.html");
    } else {

        document.getElementById("userId").innerHTML = "Welcome, " + sessionStorage['username'];

    }
}

