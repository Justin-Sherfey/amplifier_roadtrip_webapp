function getWaypoints(tripId) {
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/waypoints/getAll/" + tripId,

    });
}

function getWaypointById(waypointId) {
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/waypoints/" + waypointId,
    });
}

function getTrips() {
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/trips/getAllTripsByUserId/" + sessionStorage['userId'],
    });
}

function updateWaypoint() {
    var formData = getFormData($("#waypointForm"));
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/waypoints/update",
        data: formData,
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            document.getElementById('status').innerText = "Status: Updated Successfully!"
            displayWaypoints(res.tripId)
        },
        error: function (res) {

        }
    });
}

async function displayWaypoints(tripId) {
    document.getElementById('waypointEditor').style.display = 'none';

    $('#waypointList').empty();
    var waypoints = await getWaypoints(tripId);
    for (var waypoint of waypoints) {
        document.getElementById("waypointList").append(getWaypointDetails(waypoint));
    }
}


async function displayTrips() {
    $('#viewTrips').empty();
    var trips = await getTrips()
    for (var trip of trips) {
        document.getElementById("viewTrips").append(getTripDetails(trip))
    }
}

function getTripDetails(trip) {
    var div = document.createElement("div")

    var tripDetails = document.createElement("p");
    tripDetails.innerText = ("Id: " + trip.tripId + " Name: " + trip.tripName)

    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("onclick", "deleteTrip(" + trip.tripId + ")")
    deleteButton.innerText = "Delete";

    var editButton = document.createElement("button");
    editButton.setAttribute("onclick", "displayWaypoints(" + trip.tripId + ")")
    editButton.innerText = "Edit";

    div.append(tripDetails)
    div.append(deleteButton)
    div.append(editButton)

    return div;
}

function getWaypointDetails(waypoint) {
    var div = document.createElement("div");

    var waypointpDetails = document.createElement("p");
    waypointpDetails.innerText = ("Id: " + waypoint.waypointId + " Name: " + waypoint.waypointName);

    var waypointLocation = document.createElement("p");
    waypointLocation.innerText = ("Latitude: " + waypoint.latitude + " Longitude: " + waypoint.longitude);

    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("onclick", "deleteWaypoint(" + waypoint.waypointId + ")")
    deleteButton.innerText = "Delete";

    var editButton = document.createElement("button");
    editButton.setAttribute("onclick", "editWaypoint(" + waypoint.waypointId + ")")
    editButton.innerText = "Edit";

    div.append(waypointpDetails)
    div.append(waypointLocation)
    div.append(deleteButton)
    div.append(editButton)

    return div;
}

async function editWaypoint(waypointId) {
    var waypoint = await getWaypointById(waypointId);
    document.getElementById('waypointEditor').style.display = 'inline';
    document.getElementById('waypointForm').setAttribute("waypointId", waypointId)
    document.getElementById('waypointName').value = waypoint.waypointName;
    document.getElementById('latitude').value = waypoint.latitude;
    document.getElementById('longitude').value = waypoint.longitude;

}

function getFormData(form) {
    var unindexed_array = form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n) {
        indexed_array[n["name"]] = n["value"];
    });
    indexed_array["waypointId"] = parseInt(document.getElementById('waypointForm').getAttribute("waypointId"));

    return JSON.stringify(indexed_array);
}