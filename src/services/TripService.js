import axios from 'axios';

const TRIPS_REST_API_URL_CREATE = 'localhost:5000/trips';
const TRIPS_REST_API_URL_READ = 'http://localhost:5000/trips/getAll/1';

class TripService {

    createTrip() {

    }

    getTrips() {
        return axios.get(TRIPS_REST_API_URL_READ, {
            headers: {
              'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
            }
        });
    }


}

export default new TripService();