window.onload = function () {
    if (sessionStorage['userId'] == null) {
        document.getElementById('tripMenu').innerHTML = '<p>Please log in or create an account.</p>';
        document.getElementById('logoutPrompt').style.display = 'none';

    } else {
        document.getElementById('signinPrompt').style.display = 'none';
        document.getElementById('waypointEditor').style.display = 'none';

        displayTrips();
    }
}

function logout() {
    sessionStorage.clear();
    location.reload();
}

