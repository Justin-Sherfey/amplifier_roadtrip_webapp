import axios from "axios";

const urlConnection = "http://localhost:5000/"
//const urlConnection = "http://amplifireroadtripbeanstalk-env.eba-amdewhu5.us-west-2.elasticbeanstalk.com/";

const WAYPOINTS_REST_API_URL_CREATE_UPDATE = urlConnection + "waypoints";
const WAYPOINTS_REST_API_URL_READ = urlConnection + "waypoints/getAll/";
const WAYPOINTS_REST_API_URL_DELETE = urlConnection + "waypoints/";

class WaypointService {
  createWaypoint(waypoint) {
    return axios.post(WAYPOINTS_REST_API_URL_CREATE_UPDATE, waypoint, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    });
  }

  getAllWaypoints(tripId) {
    return axios.get(WAYPOINTS_REST_API_URL_READ + tripId, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    });
  }

  editWaypoint(waypoint) {
    return axios.put(WAYPOINTS_REST_API_URL_CREATE_UPDATE, waypoint, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    });
  }

  deleteWaypoint(waypointId) {
    console.log(WAYPOINTS_REST_API_URL_DELETE + waypointId);
    return axios.delete(WAYPOINTS_REST_API_URL_DELETE + waypointId, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    });
  }
}

export default new WaypointService();
