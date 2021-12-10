// function is called when the page loads
window.onload = async function () {

    // returns true if the user is logged in
    if (sessionStorage['jwt'] != null) {
        user = await getUserByJWT();
        displayUser();
    } else {
        window.location.replace("home.html");
    }
}

var user;

// User CRUD

function updateCurrentUser() {

    // Maps tripEditor to to the current user object. The key corresponds
    // to a column name, and value is the value of the field
    $.map($("#userEditor").serializeArray(), function (n) {
        user[n["name"]] = n["value"];
    });

    updateUser(user);
}

// Dyanamic Element Stuff

// updates the userEditor form to contain the proper values 
function updateUserEditor() {
    document.getElementById("userEditor").style.display = 'inline';
    document.getElementById("username").value = user.username;
    document.getElementById("password").value = user.password;
}

// displays infromation about the current user
function displayUser() {
    document.getElementById("userInfo").innerHTML = "<p> Id: " + user.userId + "<br> Name: " + user.username + "<br> Password: " + user.password + "</p>"
}