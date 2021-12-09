var map;
var service;
var infowindow;

function initMap() {
    var merica = new google.maps.LatLng(40.029, -102.056);

    infowindow = new google.maps.InfoWindow();

    map = new google.maps.Map(
        document.getElementById('map'), {
            center: merica,
            zoom: 6
        }
    );

    // var request = {
    //     query: 'kentucky',
    //     fields: ['name', 'geometry'] //TYPES of place data to return
    // };

    // var service = new google.maps.places.PlacesService(map);

    // //the actual query which also centers our map
    // //also available: 
    // service.findPlaceFromQuery(request, function (results, status) {
    //     console.log(results)
    //     if (status === google.maps.places.PlacesServiceStatus.OK) {
    //         for (var result of results) {
    //             createMarker(result);
    //         }
    //         map.setCenter(results[0].geometry.location);
    //     } else {
    //         console.log("something went wrong");
    //     }
    // });

    const sydney = new google.maps.LatLng(-33.867, 151.195);
    var request = {
        location: sydney,
        radius: '10000',
        type: ['points of intrest']
    };

    var service = new google.maps.places.PlacesService(map);

    //the actual query which also centers our map
    //also available: 
    service.nearbySearch(request, function (results, status) {
        console.log(results);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var result of results) {
                createMarker(result);
            }
            map.setCenter(results[0].geometry.location);
        } else {
            console.log("something went wrong");
        }
    });
}

function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
        map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(place.name || "");
        infowindow.open(map);
    });
}
/* export{ initMap }; */