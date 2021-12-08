// function is called when the page loads
window.onload = async function () {

    // returns true if the user is logged in
    if (sessionStorage['jwt'] != null) {
        document.getElementById('logoutPrompt').style.display = 'inline';
        user = await getUserByJWT();
        displayTrips();
    } else {
        document.getElementById('mainTripsMenu').innerHTML = '<h1>Welcome to Amplifire Roadtrip</h1><p>Please log in or create an account.</p>';
        document.getElementById('signinPrompt').style.display = 'inline';

    }
}

var user;
var trip;
var waypoint;

//** 
// TRIP CRUD
// CRUDs the Trip on the current user variable
//** 

function createTrip() {

    var arr = {};

    // Maps tripEditor to a new key-value array which represents a Trip object. The key corresponds
    // to a column name, and value is the value of the field
    $.map($("#tripEditor").serializeArray(), function (n) {
        arr[n["name"]] = n["value"];
    });

    user.trips.push(arr);

    console.log(user);

    updateUser(user);

}

function updateTrip() {

    // Maps tripEditor to a Trip object which already exsits on the User object. The key corresponds
    // to a column name, and value is the value of the field
    $.map($("#tripEditor").serializeArray(), function (n) {
        trip[n["name"]] = n["value"];
    });

    // Adds the array (Trip) to the User
    updateUser(user);
}

function deleteTrip(tripId) {

    trip = user.trips.find(e => e.tripId == tripId);
    user.trips = $.grep(user.trips, function (e) {
        return e != trip;
    });

    updateUser(user);
}

//** 
// Waypoint CRUD
// CRUDs the Waypoints on the current user variable
//** 

function createWaypoint() {
    var arr = {};

    // Maps waypointEditor to a new key-value array which represents a Waypoint object. The key corresponds
    // to a column name, and value is the value of the field
    $.map($("#waypointEditor").serializeArray(), function (n) {
        arr[n["name"]] = n["value"];
    });

    // Adds the array (Waypoint) to the selected trip
    trip.waypoints.push(arr);
    updateUser(user);
}

function updateWaypoint() {

    // Maps waypointEditor to a Waypoint object which already exsits on the User object. The key corresponds
    // to a column name, and value is the value of the field
    $.map($("#waypointEditor").serializeArray(), function (n) {
        waypoint[n["name"]] = n["value"];
    });

    updateUser(user);
}

function deleteWaypoint(waypointId) {

    // set the waypoint that's being deleted to the waypoint that the user selected
    waypoint = trip.waypoints.find(e => e.waypointId == waypointId);

    // Remove the selected waypoint from the trip
    trip.waypoints = $.grep(trip.waypoints, function (e) {
        return e != waypoint;
    });

    updateUser(user);
}

//** 
// Dynamic Element stuff
//** 

// updates the tripEditor form to contain the proper values 
function updateTripEditor(tripId) {
    document.getElementById("tripEditor").style.display = 'inline';

    // true if the user is creating a new trip, so no Id was given
    if (tripId == null) {
        document.getElementById("tripEditor").style.display = 'inline';
        document.getElementById("tripName").value = "";
        document.getElementById("tripSubmit").setAttribute("onclick", "createTrip()");
    } else {

        // set the trip that's being modified to the trip that the user selected
        trip = user.trips.find(e => e.tripId == tripId);
        document.getElementById("tripName").value = trip.tripName;
        document.getElementById("tripSubmit").setAttribute("onclick", "updateTrip()");
    }
}

// updates the waypoint editor form to contain the proper values 
function updateWaypointEditor(waypointId) {

    document.getElementById("waypointEditor").style.display = 'inline';

    // true if the user is creating a new waypoint, so no Id was given
    if (waypointId == null) {
        document.getElementById("waypointName").value = "";
        document.getElementById("latitude").value = "";
        document.getElementById("longitude").value = "";
        document.getElementById("waypointSubmit").setAttribute("onclick", "createWaypoint()");
    } else {

        // set the waypoint that's being modified to the waypoint that the user selected
        waypoint = trip.waypoints.find(e => e.waypointId == waypointId);

        document.getElementById("waypointName").value = waypoint.waypointName;
        document.getElementById("latitude").value = waypoint.latitude;
        document.getElementById("longitude").value = waypoint.longitude;
        document.getElementById("waypointSubmit").setAttribute("onclick", "updateWaypoint()");
    }
}

// Handles all of the logic for dynamically adding and displaying all of the waypoints for a trip to the DOM
function displayWaypoints(tripId) {

    // resets the waypoint list and displays the waypoints
    $("#waypointList").empty();
    document.getElementById("waypoints").style.display = 'inline';

    trip = user.trips.find(e => e.tripId == tripId)

    // true if the number of waypoints is 0
    if (trip.waypoints.length == 0) {
        document.getElementById("waypointList").innerHTML += "<p> There are no waypoints. </p>";
    } else {

        // for each waypoint, create and add a trip element to the DOM
        for (var waypoint of trip.waypoints) {
            $("#waypointList").append(createWaypointElement(waypoint));
        }
    }
}

// Handles all of the logic for dynamically adding and displaying all of the trips to the DOM
function displayTrips() {

    // true if the number of trips is 0
    if (user.trips.length == 0) {
        document.getElementById("tripList").innerHTML += "<p> There are no trips. </p>";
    } else {
        // for each trip, create and add a trip element to the DOM
        for (var trip of user.trips) {
            $("#tripList").append(createTripElement(trip))
        }
    }
}

// Creates an element with all the info/buttons for a trip. Takes in a trip variable and returns the element
function createTripElement(trip) {
    var div = document.createElement("div")

    var tripDetails = document.createElement("p");
    tripDetails.innerText = ("Name: " + trip.tripName);

    var deleteTripButton = document.createElement("button");
    deleteTripButton.setAttribute("onclick", "deleteTrip(" + trip.tripId + ")");
    deleteTripButton.innerText = "Delete Trip";

    var editTripButton = document.createElement("button");
    editTripButton.setAttribute("onclick", "updateTripEditor(" + trip.tripId + ")");
    editTripButton.innerText = "Edit Trip";

    var viewWaypointsButton = document.createElement("button");
    viewWaypointsButton.setAttribute("onclick", "displayWaypoints(" + trip.tripId + ")");
    viewWaypointsButton.innerText = "View Waypoints";

    div.append(tripDetails);
    div.append(deleteTripButton);
    div.append(editTripButton);
    div.append(viewWaypointsButton);

    return div;
}

// Creates an element with all the info/buttons for a waypoint. Takes in a waypoint variable and returns the element
function createWaypointElement(waypoint) {
    var div = document.createElement("div");

    var waypointpDetails = document.createElement("p");
    waypointpDetails.innerText = ("Name: " + waypoint.waypointName);

    var waypointLocation = document.createElement("p");
    waypointLocation.innerText = ("Latitude: " + waypoint.latitude + " Longitude: " + waypoint.longitude);

    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("onclick", "deleteWaypoint(" + waypoint.waypointId + ")")
    deleteButton.innerText = "Delete";

    var editButton = document.createElement("button");
    editButton.setAttribute("onclick", "updateWaypointEditor(" + waypoint.waypointId + ")");
    editButton.innerText = "Edit Waypoint";

    div.append(waypointpDetails);
    div.append(waypointLocation);
    div.append(deleteButton);
    div.append(editButton);
    return div;
}