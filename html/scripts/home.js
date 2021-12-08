window.onload = async function () {
    if (sessionStorage['jwt'] == null) {
        document.getElementById('tripMenu').innerHTML = '<p>Please log in or create an account.</p>';
        document.getElementById('signinPrompt').style.display = 'inline';
    } else {
        document.getElementById('logoutPrompt').style.display = 'inline';
        user = await getUserByJWT();
        displayTrips();
    }
}

var user;
var trip;
var waypoint;

// DISPLAYS

function displayWaypoints(tripId) {

    $("#waypointList").empty();

    document.getElementById("waypointList").innerHTML = "<h2>Waypoints:<h2>";
    document.getElementById("waypointEditor").style.display = 'none';


    trip = user.trips.find(e => e.tripId == tripId)


    if (trip.waypoints.length == 0) {
        document.getElementById("waypointList").innerHTML += "<p> There are no waypoints. </p>";
    } else {
        for (var waypoint of trip.waypoints) {
            $("#waypointList").append(getWaypointDetails(waypoint));
        }
    }

    var createWaypointButton = document.createElement("button");
    createWaypointButton.setAttribute("onclick", "createWaypoint()");
    createWaypointButton.innerText = "Create New Waypoint";
    $("#waypointList").append(document.createElement("br"));
    $("#waypointList").append(document.createElement("br"));

    $("#waypointList").append(createWaypointButton);

}

function displayTrips() {
    document.getElementById("tripMenu").style.display = "inline";

    if (user.trips.length == 0) {
        document.getElementById("tripList").innerHTML += "<p> There are no trips. </p>";
    } else {
        for (var trip of user.trips) {
            $("#tripList").append(getTripDetails(trip))
        }
    }
}

// TRIP CRUD

function newTrip() {

    var arr = {};
    $.map($("#tripForm").serializeArray(), function (n) {
        arr[n["name"]] = n["value"];
    });

    user.trips.push(arr);
    updateUser();

}

function createTrip() {
    document.getElementById("tripEditor").style.display = 'inline';
    document.getElementById("tripName").value = "";
    document.getElementById("tripSubmit").setAttribute("onclick", "newTrip()");
}

function editTrip(tripId) {
    trip = user.trips.find(e => e.tripId == tripId);
    document.getElementById("tripEditor").style.display = 'inline';

    document.getElementById("tripName").value = trip.tripName;

    document.getElementById("tripSubmit").setAttribute("onclick", "updateTrip()");
}

function updateTrip() {
    $.map($("#tripForm").serializeArray(), function (n) {
        trip[n["name"]] = n["value"];
    });

    updateUser();
}

function deleteTrip(tripId) {

    trip = user.trips.find(e => e.tripId == tripId);
    user.trips = $.grep(user.trips, function (e) {
        return e != trip;
    });

    updateUser();
}

// WAYPOINT CRUD

function newWaypoint() {
    var arr = {};
    $.map($("#waypointForm").serializeArray(), function (n) {
        arr[n["name"]] = n["value"];
    });

    trip.waypoints.push(arr);
    updateUser();
}

function createWaypoint() {
    document.getElementById("waypointEditor").style.display = 'inline';
    document.getElementById("waypointName").value = "";
    document.getElementById("latitude").value = "";
    document.getElementById("longitude").value = "";
    document.getElementById("waypointSubmit").setAttribute("onclick", "newWaypoint()");
}

function editWaypoint(waypointId) {
    waypoint = trip.waypoints.find(e => e.waypointId == waypointId);
    document.getElementById("waypointEditor").style.display = 'inline';

    document.getElementById("waypointName").value = waypoint.waypointName;
    document.getElementById("latitude").value = waypoint.latitude;
    document.getElementById("longitude").value = waypoint.longitude;
    document.getElementById("waypointSubmit").setAttribute("onclick", "updateWaypoint()");
}

function updateWaypoint() {
    $.map($("#waypointForm").serializeArray(), function (n) {
        waypoint[n["name"]] = n["value"];
    });

    updateUser();
}

function deleteWaypoint(waypointId) {
    waypoint = trip.waypoints.find(e => e.waypointId == waypointId);
    trip.waypoints = $.grep(trip.waypoints, function (e) {
        return e != waypoint;
    });

    updateUser();
}


// DETAILS

function getTripDetails(trip) {
    var div = document.createElement("div")

    var tripDetails = document.createElement("p");
    tripDetails.innerText = ("Name: " + trip.tripName);

    var deleteTripButton = document.createElement("button");
    deleteTripButton.setAttribute("onclick", "deleteTrip(" + trip.tripId + ")");
    deleteTripButton.innerText = "Delete Trip";

    var editTripButton = document.createElement("button");
    editTripButton.setAttribute("onclick", "editTrip(" + trip.tripId + ")");
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

function getWaypointDetails(waypoint) {
    var div = document.createElement("div");

    var waypointpDetails = document.createElement("p");
    waypointpDetails.innerText = ("Name: " + waypoint.waypointName);

    var waypointLocation = document.createElement("p");
    waypointLocation.innerText = ("Latitude: " + waypoint.latitude + " Longitude: " + waypoint.longitude);

    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("onclick", "deleteWaypoint(" + waypoint.waypointId + ")")
    deleteButton.innerText = "Delete";

    var editButton = document.createElement("button");
    editButton.setAttribute("onclick", "editWaypoint(" + waypoint.waypointId + ")");
    editButton.innerText = "Edit Waypoint";

    div.append(waypointpDetails);
    div.append(waypointLocation);
    div.append(deleteButton);
    div.append(editButton);
    return div;
}

async function printAllUsers() {

    for (var user of await getAllUsers()) {

        $.map(user, function (value, key) {
            $("#allUsers").append(key + ": " + value + "<br>");
        });
        $("#allUsers").append("<br><br>");

    }
}