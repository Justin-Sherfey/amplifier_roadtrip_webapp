function getUserById() {
    return $.ajax({
        type: "GET",
        url: "http://localhost:5000",
        headers: {
        "Authorization": "Bearer " + sessionStorage.getItem('jwt')
        },
        success: function (res) {
            console.log("Successfully got user by id!")

        },
        error: async function (res) {
            console.log("Failed to get user by token: " + sessionStorage.getItem('jwt'))
        }
    });
}

function deleteCurrentUser() {

    return $.ajax({
        type: "DELETE",
        url: "http://localhost:5000/users/",
        headers: {
        "Authorization": "Bearer " + sessionStorage.getItem('jwt')
        },
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
        url: "http://localhost:5000/users/update",
        data: JSON.stringify(user),
        headers: {
        "Authorization": "Bearer " + sessionStorage.getItem('jwt')
        },
        dataType: "json",
        contentType: "application/json",
        success: function (res) {

            location.reload();
            console.log("Successfully updated the user!")

        },
        error: async function (res) {
            user = await getUserById();
            console.log("Failed to update the user!")
        }
    });
}

function logout() {
    //sessionStorage.clear();
    location.reload();
}

