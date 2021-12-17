import axios from 'axios';

const TRIPS_REST_API_URL_CREATE_UPDATE = 'http://amplifireroadtripbeanstalk-env.eba-amdewhu5.us-west-2.elasticbeanstalk.com/trips';
const TRIPS_REST_API_URL_READ = 'http://amplifireroadtripbeanstalk-env.eba-amdewhu5.us-west-2.elasticbeanstalk.com/trips/getAll/';
const TRIPS_REST_API_URL_DELETE = 'http://amplifireroadtripbeanstalk-env.eba-amdewhu5.us-west-2.elasticbeanstalk.com/trips/';

class TripService {

    createTrip(trip) {
        return axios.post(TRIPS_REST_API_URL_CREATE_UPDATE, 
            "{ \"tripName\": " + JSON.stringify(trip.tripName) + ", \"user\": { \"userId\": " + sessionStorage.getItem('userId') + "} }" , {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
                "Content-Type": "application/json",
            }
        }); 
    }

    getAllTrips() {
        return axios.get(TRIPS_REST_API_URL_READ + sessionStorage.getItem('userId'), {
            headers: {
              'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
              "Content-Type": "application/json",
            }
        });
    }

    
    editTrip(trip) {
        return axios.put(TRIPS_REST_API_URL_CREATE_UPDATE + 
            "{ \"tripId\": " + JSON.stringify(trip.tripId) + 
            ", \"tripName\": " + JSON.stringify(trip.tripName) +
            ", \"user\": { \"userId\": " + sessionStorage.getItem("userId"), {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
                    "Content-Type": "application/json",
                }
            });
    }

    deleteTrip(trip) {
        return axios.delete(TRIPS_REST_API_URL_DELETE + JSON.stringify(trip.tripId), {
            headers: {
                'Authorization:': 'Bearer ' + sessionStorage.getItem('jwt'),
            }
        })
    }

}

export default new TripService();