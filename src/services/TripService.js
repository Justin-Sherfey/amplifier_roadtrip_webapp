import axios from "axios";

const TRIPS_REST_API_URL_CREATE = "localhost:5000/trips";
const TRIPS_REST_API_URL_READ = "http://localhost:5000/trips/getAll/1";
const urlConnection =
  "http://amplifireroadtripbeanstalk-env.eba-amdewhu5.us-west-2.elasticbeanstalk.com/";

class TripService {
  createTrip() {
    return axios.post(urlConnection + "trips", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getTrips(tripId) {
    return axios.get(urlConnection + "trips/getAll/" + tripId, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
      },
    });
  }
}

export default new TripService();
