import axios from 'axios';

const WAYPOINTS_REST_API_URL_CREATE = 'http://amplifireroadtripbeanstalk-env.eba-amdewhu5.us-west-2.elasticbeanstalk.com/waypoints';
const WAYPOINTS_REST_API_URL_READ = 'http://amplifireroadtripbeanstalk-env.eba-amdewhu5.us-west-2.elasticbeanstalk.com/waypoints/getAll/';

class WaypointService {

    createWaypoint(waypoint) {
        
        return axios.post(WAYPOINTS_REST_API_URL_CREATE, 
            "{ \"waypointName\": " + JSON.stringify(waypoint.waypointName) + 
            ", \"latitude\": " + JSON.stringify(waypoint.latitude) + 
            ", \"longitude\": " + JSON.stringify(waypoint.longitude) +    
            ", \"trip\": { \"tripId\": " + sessionStorage.getItem('tripId') + "} }" , {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
                "Content-Type": "application/json",
            }
        });

        
        
    }

    
    getAllWaypoints() {
        return axios.get(WAYPOINTS_REST_API_URL_READ + sessionStorage.getItem('tripId'), {
            headers: {
              'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
              "Content-Type": "application/json",
            }
        });
    }

    editWaypoint(waypoint) {}

    deleteWaypoint(waypointId) {}

}

export default new WaypointService();

