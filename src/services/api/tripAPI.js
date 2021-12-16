import axios from 'axios';

const TRIPS_REST_API_URL_CREATE = 'http://amplifireroadtripbeanstalk-env.eba-amdewhu5.us-west-2.elasticbeanstalk.com/trips';
const TRIPS_REST_API_URL_READ = 'http://amplifireroadtripbeanstalk-env.eba-amdewhu5.us-west-2.elasticbeanstalk.com/trips/getAll/';

class TripService {

    createTrip(trip) {
        console.log(JSON.stringify(trip.tripName));
        console.log("{ \"tripName\": " + JSON.stringify(trip.tripName) + ", \"user\": { \"userId\": " + sessionStorage.getItem('userId') + "} }");
        
        return axios.post(TRIPS_REST_API_URL_CREATE, 
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

}

export default new TripService();