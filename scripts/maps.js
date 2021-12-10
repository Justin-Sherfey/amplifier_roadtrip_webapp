var map;
var infowindow;
var selectedPlace;
var directionsService;
var directionsRenderer;
var markersArray = [];

//intilalizes the map on the page and sets a few global variables
function initMap() {

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();

    map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 6
        }
    );
}

// do a google places textSearch on a user generated query. 
// Examples of text searches: "nearest mcdonalds" "yosemite" "pizza in new york city" "noah"
function doTextSearch() {

    let service = new google.maps.places.PlacesService(map);

    // remove any markers on the map from previous searches or directions
    clearMarkers()

    // create the request to sent to google places api
    var request = {
        // get user generated query
        query: document.getElementById("query").value,
    };

    // execute the textSearch (call to places API)
    service.textSearch(request, function (results, status) {
        // if the request was successful
        if (status === google.maps.places.PlacesServiceStatus.OK) {

            // results is a list of places returned by textSearch
            for (var result of results) {
                createMarker(result);
            }
            map.setCenter(results[0].geometry.location);

        } else {
            console.log("something went wrong");
        }
    });
}

// creates a marker from a given place
function createMarker(place) {

    // if not a valid place then return
    if (!place.geometry || !place.geometry.location) return;

    var marker = new google.maps.Marker({
        map,
        position: place.geometry.location
    });

    // add the marker to the global array of markers
    markersArray.push(marker);

    // contentString appears above a waypoint on the map when you hover your mouse over it
    let contentString = place.name + "\n\n" + place.formatted_address;

    marker.addListener("click", () => {
        map.setZoom(8);
        map.setCenter(marker.getPosition());
        selectedPlace = place;

        // create and add the place to the "Select a place:"
        document.getElementById("placeSelector").innerHTML = "";
        document.getElementById("placeSelector").append(createPlaceSelector(place));
    });

    // when you hover over a waypoint on the map, create the popup with the place name
    // and address
    google.maps.event.addListener(marker, "mouseover", () => {
        // info window is the popup, contains contentString
        infowindow = new google.maps.InfoWindow({
            content: contentString,
        });
        infowindow.open(map, marker);
    });

    // when you hover out of the waypoint, destroy the popup
    google.maps.event.addListener(marker, "mouseout", () => {
        if (infowindow) {
            infowindow.close();
        }
    });
}

// goes through markersArray, nulls out all of the markers on the maps and resets the array 
// size to 0, effectively removing all the markers from the map
function clearMarkers() {
    for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null);
    }
    markersArray.length = 0;
}

// dynamically creates the "Select a place" onto the webpage
function createPlaceSelector(place) {
    var div = document.createElement("div");

    div.setAttribute("placeId", place.place_id)

    // if the place doesn't have any photos then place.photos will return undefined, thowing an error
    // when you try to get place.photos[0].getUrl()
    if (place.photos != undefined) {
        var placeImage = document.createElement("img");
        placeImage.setAttribute("src", place.photos[0].getUrl());
        placeImage.setAttribute("height", "200px");
        placeImage.setAttribute("width", "200px");
        div.append(placeImage);

    }

    var placeName = document.createElement("p");
    placeName.innerText = (place.name);

    var placeAddress = document.createElement("p");
    placeAddress.innerText = (place.formatted_address);

    var addPlaceButton = document.createElement("button");
    addPlaceButton.setAttribute("onclick", "addPlaceAsAWaypoint()")
    addPlaceButton.innerText = "Add to Trip";

    div.append(placeName);
    div.append(placeAddress);
    div.append(addPlaceButton);

    return div;

}

// dynamically adds any "Select a place" as a """waypoint"""
function addPlaceAsAWaypoint() {
    var div = document.createElement("div");

    // these attributes are used later in generateDirections()
    div.setAttribute("longitude", selectedPlace.geometry.location.lng())
    div.setAttribute("latitude", selectedPlace.geometry.location.lat())

    var placeLongitude = document.createElement("p");
    placeLongitude.innerText = ("Longitude: " + selectedPlace.geometry.location.lng());

    var placeLatitude = document.createElement("p");
    placeLatitude.innerText = ("Latitude: " + selectedPlace.geometry.location.lat());

    var placeName = document.createElement("p");
    placeName.innerText = ("Name: " + selectedPlace.name);

    var placeAddress = document.createElement("p");
    placeAddress.innerText = ("Address: " + selectedPlace.formatted_address);

    div.append(placeLongitude);
    div.append(placeLatitude);
    div.append(placeName);
    div.append(placeAddress);

    document.getElementById("waypoints").append(div);

    // clears the placeSelector
    document.getElementById("placeSelector").innerHTML = "";
}

function generateDirections() {
    const waypts = [];

    // an array of all the waypoints
    const checkboxArray = document.getElementById("waypoints").children;

    // clear any markers from previous directions or textSearches
    clearMarkers()
    directionsRenderer.setMap(map);

    // for each waypoint, save the lat and lng of the destination as "location", and add it
    // to a seperate array (need to do this for google maps api). waypts is used in .route() later in this function
    for (let i = 0; i < checkboxArray.length; i++) {
        waypts.push({
            location: {
                "lat": parseFloat(checkboxArray[i].getAttribute("latitude")),
                "lng": parseFloat(checkboxArray[i].getAttribute("longitude"))
            },
            stopover: true,
        });
    }

    // start point hardcoded as NYC
    startGeometry = {
        "lat": 40.7140602454639,
        "lng": -73.99960088599195
    }

    // end point hardcoded as LA
    endGeometry = {
        "lat": 34.0519467480441,
        "lng": -118.24338472537207
    }

    // roadtrip coast to coast babbbyyyyyyyyy

    directionsService
        .route({
            origin: startGeometry,
            destination: endGeometry,
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING,
        })
        .then((response) => {
            document.getElementById("directions").append(displayDirections(response.routes[0].legs[0]));
            directionsRenderer.setDirections(response);
        })
        .catch((e) => console.log(e));
}

function displayDirections(directions) {
    console.log(directions);
    var div = document.createElement("div");

    var startPoint = document.createElement("p");
    startPoint.innerText = ("Begin at: " + directions.start_address);
    div.append(startPoint);

    directions.steps.forEach(e => {
        var step = document.createElement("p");
        step.innerHTML = e.instructions + " for " + e.duration.text + ". Distance: " + e.distance.text;
        div.append(step);
    })

    var endPoint = document.createElement("p");
    endPoint.innerText = ("End at: " + directions.end_address);
    div.append(endPoint);

    return div;
}