function getUserByJWT() {
    return $.ajax({
        type: "GET",
        url: "http://localhost:5000/users/",
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

function deleteCurrentUser() {

    return $.ajax({
        type: "DELETE",
        url: "http://localhost:5000/users/" + user.userId,
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

function updateUser() {

    console.log(user);
    $.ajax({
        type: "PUT",
        url: "http://localhost:5000/users/",
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

function refreshToken(user) {
    return $.ajax({
        type: "POST",
        url: "http://localhost:5000/login",
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

function logout() {
    sessionStorage.clear();
    location.reload();
}