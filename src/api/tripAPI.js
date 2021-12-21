import axios from "axios";

//const urlConnection = "http://localhost:5000/"
const urlConnection = "http://amplifireroadtripbeanstalk-env.eba-amdewhu5.us-west-2.elasticbeanstalk.com/";

const TRIPS_REST_API_URL_CREATE_UPDATE = urlConnection + "trips";
const TRIPS_REST_API_URL_READ_ALL = urlConnection + "trips/getAll/";
const TRIPS_REST_API_URL_DELETE = urlConnection + "trips/";
const TRIPS_REST_API_URL_READ = urlConnection + "trips/";

class TripService {
    createTrip(trip) {
        return axios.post(TRIPS_REST_API_URL_CREATE_UPDATE, trip, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("jwt"),
                "Content-Type": "application/json",
            },
        });
    }

    getAllTrips(userId) {
        return axios.get(TRIPS_REST_API_URL_READ_ALL + userId, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("jwt"),
                "Content-Type": "application/json",
            },
        });
    }

    getTrip() {
        return axios.get(
            TRIPS_REST_API_URL_READ + sessionStorage.getItem("tripId"),
            {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("jwt"),
                    "Content-Type": "application/json",
                },
            }
        );
    }

    editTrip(trip) {
        return axios.put(TRIPS_REST_API_URL_CREATE_UPDATE, JSON.stringify(trip), {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("jwt"),
                "Content-Type": "application/json",
            },
        });
    }

    deleteTrip(tripId) {
        console.log(tripId);
        console.log(TRIPS_REST_API_URL_DELETE + tripId);
        return axios.delete(TRIPS_REST_API_URL_DELETE + tripId, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("jwt"),
                "Content-Type": "application/json",
            },
        });
    }
}

export default new TripService();
