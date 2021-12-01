
window.onload = function () {
    if (sessionStorage['userId'] == null) {
        document.getElementById('logoutButton').style.display = 'none';
        document.getElementById('currentUser').style.display = 'none';

    } else {
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'none';

    }

    document.getElementById("userId").innerHTML = sessionStorage['userId'];


}

function getFormData(form) {
    var unindexed_array = form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        indexed_array[n["name"]] = n["value"];
    });

    return JSON.stringify(indexed_array);
}

function registerForm() {
    var formData = getFormData($("#registerForm"));
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/register",
        data: formData,
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function (res) {
            console.log(res);
        }
    });


}

function loginForm() {
    var formData = getFormData($("#loginForm"));
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/login",
        data: formData,
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function (res) {
            if (res != null) {

                sessionStorage['userId'] = res.userId;
                sessionStorage['username'] = res.username;

                window.location.replace("../html/account.html");
            }
        },
    });


}


function logout() {
    sessionStorage.clear();
    location.reload();
}