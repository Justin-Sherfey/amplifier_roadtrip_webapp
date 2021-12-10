//Globals
// const urlConnection = "https://localhost:5000/"
const urlConnection = "http://amplifireroadtripbeanstalk-env.eba-amdewhu5.us-west-2.elasticbeanstalk.com/"

function logout() {
    sessionStorage.clear();
    location.reload();
}

// gets the entire user object based on the current JWT stored in session storage
function getUserByJWT() {
    return $.ajax({
        type: "GET",
        url: urlConnection,
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem('jwt')
        },
        success: function (res) {
            console.log("Successfully got User by JWT!")

        },
        error: async function (res) {
            console.log("Failed to get User by JWT!")
        }
    });
}

function deleteUser() {

    return $.ajax({
        type: "DELETE",
        url: urlConnection + user.userId,
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem('jwt')
        },
        success: function (res) {
            console.log("Successfully deleted the User!")
            logout();
        },
        error: async function (res) {
            console.log("Failed to delete the User!")
        }
    });
}

function updateUser(user) {

    $.ajax({
        type: "PUT",
        url: urlConnection,
        data: JSON.stringify(user),
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem('jwt')
        },
        dataType: "json",
        contentType: "application/json",
        success: async function (res) {

            user = await refreshToken(res);
            location.reload();
            console.log("Successfully updated the User!")

        },
        error: async function (res) {
            console.log("Failed to update the User!")
        }
    });
}

//refreshes the JWT. Used for when the username and password is changed
function refreshToken(user) {
    return $.ajax({
        type: "POST",
        url: urlConnection+"login",
        data: JSON.stringify(user),
        dataType: "json",
        contentType: "application/json",
        success: function (res) {

            sessionStorage['jwt'] = res.jwt;
            console.log("Successfully refreshed the JWT!");

        },
        error: function (res) {
            console.log("Could not refresh the JWT!");

        }
    });
}

function registerForm() {
    $.ajax({
        type: "POST",
        url: urlConnection+"register",
        data: getFormData($("#registerForm")),
        dataType: "json",
        contentType: "application/json",
        success: function (res) {

            window.location.replace("login.html");
        },
        error: function (res) {
            document.getElementById("statusCode").innerText = "Username already taken!";

        }
    });
}

function loginForm() {
    $.ajax({
        type: "POST",
        url: urlConnection +"login",
        data: getFormData($("#loginForm")),
        dataType: "json",
        contentType: "application/json",
        success: function (res) {

            sessionStorage['jwt'] = res.jwt;

            window.location.replace("home.html");
        },
        error: function (res) {
            document.getElementById("statusCode").innerText = "Password or Username is incorrect!";

        }
    });
}

// Converts a from into JSON to send to the API
function getFormData(form) {
    var unindexed_array = form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n) {
        indexed_array[n["name"]] = n["value"];
    });

    return JSON.stringify(indexed_array);
}