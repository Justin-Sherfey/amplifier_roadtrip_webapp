window.onload = function () {
    if (sessionStorage['userId'] == null) {
        window.location.replace("../html/home.html");
    } else {

        document.getElementById("userId").innerHTML = "Welcome, " + sessionStorage['username'];

    }
}

function logout() {
    sessionStorage.clear();
    location.reload();
}