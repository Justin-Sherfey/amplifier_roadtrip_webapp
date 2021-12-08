// function is called when the page loads
window.onload = function () {

    // returns true if the user is not logged in
    if (sessionStorage['jwt'] != null) {
        window.location.replace("home.html");
    }
}
