function getAllUsers() {
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/users/",
        success: function (res) {
            console.log("Successfully got all users!")

        },
        error: async function (res) {
            console.log("Failed to get all users!")
        }
    });
}

function getUserById(userId) {
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/users/" + userId,
        success: function (res) {
            console.log("Successfully got user by id!")

        },
        error: async function (res) {
            console.log("Failed to get user by id!")
        }
    });
}

function deleteCurrentUser() {
    return $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/users/" + user.userId,
        success: function (res) {
            console.log("Successfully deleted the user!")
            logout();
        },
        error: async function (res) {
            console.log("Failed to delete the users!")
        }
    });
}

function updateUser() {

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/users/update",
        data: JSON.stringify(user),
        dataType: "json",
        contentType: "application/json",
        success: function (res) {

            location.reload();
            console.log("Successfully updated the user!")

        },
        error: async function (res) {
            user = await getUserById(sessionStorage['userId']);
            console.log("Failed to update the user!")
        }
    });
}

function logout() {
    sessionStorage.clear();
    location.reload();
}

