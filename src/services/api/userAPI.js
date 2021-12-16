import axios from "axios";

const urlConnection = "http://localhost:5000/"
// const urlConnection = "http://amplifireroadtripbeanstalk-env.eba-amdewhu5.us-west-2.elasticbeanstalk.com/"

function getUserByToken(jwt) {
    axios.get(urlConnection + "users", {
        headers: {
            'Authorization': "Bearer " + jwt
        }
    }).then(res => {

    })
}

function getTokenFromUser(user) {
    axios.post(urlConnection + "login", JSON.stringify(user), {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {

    })
}


function loginUser(data) {
    axios.post(urlConnection + "login", JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {

    })
}

function updateUser(user) {
    axios.put(urlConnection + "users", JSON.stringify(user), {
        headers: {
            'Authorization': "Bearer " + sessionStorage.getItem('jwt'),
            'Content-Type': 'application/json',
        }
    }).then(res => {

    })
}

function registerUser(user) {
    axios.post(urlConnection + "register", JSON.stringify(user), {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {

    })
}

export {
    getUserByToken,
    getTokenFromUser,
    updateUser,
    loginUser,
    registerUser
}
