import axios from "axios";
import userObj from "../../utils/IsAuthContext";
import { useContext } from "react";

const urlConnection = "http://localhost:5000/"
// const urlConnection = "http://amplifireroadtripbeanstalk-env.eba-amdewhu5.us-west-2.elasticbeanstalk.com/"

function getUserByToken(jwt) {
    return axios.get(urlConnection + "users", {
        headers: {
            'Authorization': "Bearer " + jwt
        }
    })
}

function getTokenFromUser(user) {
    return axios.post(urlConnection + "login", JSON.stringify(user), {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

function updateUser(user) {
    return axios.put(urlConnection + "users", JSON.stringify(user), {
        headers: {
            'Authorization': "Bearer " + sessionStorage.getItem('jwt'),
            'Content-Type': 'application/json',
        }
    })
}

function registerUser(user) {
    return axios.post(urlConnection + "register", JSON.stringify(user), {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export {
    getUserByToken,
    getTokenFromUser,
    updateUser,
    registerUser
}
