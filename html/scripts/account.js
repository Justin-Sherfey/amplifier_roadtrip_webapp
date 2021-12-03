window.onload = async function () {
    if (sessionStorage['userId'] == null) {
        window.location.replace("home.html");
    } else {
        user = await getUserById(sessionStorage['userId']);
        displayUser();
    }
}

var user;

function editUser() {
    document.getElementById("userEditor").style.display = 'inline';
    document.getElementById("username").value = user.username;
    document.getElementById("password").value = user.password;
}

function updateCurrentUser() {
    $.map($("#userForm").serializeArray(), function (n) {
        user[n["name"]] = n["value"];
    });

    updateUser();
}

function displayUser() {
    document.getElementById("currentUser").innerHTML = "<p> Id: " + user.userId + "<br> Name: " + user.username + "<br> Password: " + user.password + "</p>"
}