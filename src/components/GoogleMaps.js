import React from 'react'
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

const libraries = ['places']
const apiKey = "AIzaSyD9gatdPpn7zvT2lyXrsHhpf7CODG1Q3U0";

function GoogleMaps(props) {

    const [searchBox, setSearchBox] = useState(undefined);
    const [markers, setMarkers] = useState([]);
    const [response, setResponse] = useState();
    const [center, setCenter] = useState();
    const [origin, setOrigin] = useState();
    const [toggleDirections, setToggleDirections] = useState(false);
    const [destination, setDestination] = useState();
    const [service, setService] = useState();
    const [travelMode, setTravelMode] = useState(props.travelMode);
    const [locations, setLocations] = useState();

    const onLoad = (ref) => setSearchBox(ref);

    const directionsCallback = (response) => {
        //props.setDirections(response);
        toggleOffDirections();
        setMarkers([])
        if (response !== null && response.status === 'OK') {
            setResponse(response)
        }
    }

    useEffect(() => {

        if (!props.selectedWaypoint || !service) {
            toggleOnDirections();
        } else {
            let request = { placeId: props.selectedWaypoint.placeId, fields: ["name", "geometry", "photos", "formatted_address"] };

            service.getDetails(request, (res, status) => {

                if (status === window.google.maps.places.PlacesServiceStatus.OK) {

                    let arr = [res]
                    res["place_id"] = props.selectedWaypoint.placeId;
                    setResponse(null)
                    setMarkers(arr)
                    setCenter({
                        "lat": res.geometry.location.lat(),
                        "lng": res.geometry.location.lng()
                    });

                    props.setPlace(res[0]);
                } else {
                    console.log("Unable to query for a place. The selected waypoint likely has a bad Lat/Lng")
                }
            });
        };

    }, [props.selectedWaypoint, service])



    const onMapLoad = (map) => {
        let service = new window.google.maps.places.PlacesService(map);

        setService(new window.google.maps.places.PlacesService(map));
        if (props.waypoints.length > 1) {

            let waypoints = [];
            for (let i = 1; i < props.waypoints.length - 1; i++) {

                let request = { placeId: props.waypoints[i].placeId, fields: ["geometry"] };

                service.getDetails(request, (res, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                        waypoints.push({
                            location: {
                                "lat": res.geometry.location.lat(),
                                "lng": res.geometry.location.lng()
                            }
                        })
                    } else { }
                });

            }
            setLocations(waypoints);

            let reqOrigin = { placeId: props.waypoints[0].placeId, fields: ["geometry"] };
            let reqDestination = { placeId: props.waypoints[props.waypoints.length - 1].placeId, fields: ["geometry"] };


            service.getDetails(reqOrigin, (res, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {

                    const startingPoint = {
                        "lat": res.geometry.location.lat(),
                        "lng": res.geometry.location.lng()
                    }

                    setCenter(startingPoint);
                    setOrigin(startingPoint);
                    return res;
                } else {
                    console.log("Unable to query for a place. The selected waypoint likely has a bad Lat/Lng")
                }
            });

            service.getDetails(reqDestination, (res, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    const endingPoint = {
                        "lat": res.geometry.location.lat(),
                        "lng": res.geometry.location.lng()
                    }

                    setDestination(endingPoint);
                } else {
                    console.log("Unable to query for a place. The selected waypoint likely has a bad Lat/Lng")
                }
            });
        }
    };

    const toggleOnDirections = () => {
        setToggleDirections(true);
    }

    const toggleOffDirections = () => {
        setToggleDirections(false);
    }

    const onPlacesChanged = () => {
        let markers = searchBox.getPlaces();
        const position = {
            lat: markers[0].geometry.location.lat(),
            lng: markers[0].geometry.location.lng()
        }
        setResponse(null);
        setMarkers(markers);
        setCenter(position);
    }

    const mapContainerStyle = {
        height: "600px",
        width: "600px"
    };

    return (
        <>
            <LoadScript libraries={libraries} googleMapsApiKey={apiKey}>
                <GoogleMap
                    id="searchbox-example"
                    mapContainerStyle={mapContainerStyle}
                    zoom={7}
                    center={center}
                    onLoad={onMapLoad}
                >
                    {markers.map(marker => <CreateMarkers key={marker.geometry.location.lat()} marker={marker} setPlace={props.setPlace} />)}

                    {(!!destination && !!origin && !!center && toggleDirections === true) && <DirectionsService
                        options={{
                            destination: destination,
                            origin: origin,
                            travelMode: travelMode,
                            waypoints: locations
                        }}

                        callback={directionsCallback}
                    />}

                    {(!!response) && (<DirectionsRenderer options={{ directions: response }} />)}

                    <StandaloneSearchBox
                        onLoad={onLoad}
                        onPlacesChanged={onPlacesChanged}>
                        <input
                            type="text"
                            placeholder="Search..."
                            style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `240px`,
                                height: `32px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                                position: "absolute",
                                left: "50%",
                                marginLeft: "-120px"
                            }}
                        />
                    </StandaloneSearchBox>
                </GoogleMap>

            </LoadScript>
        </>
    )
}

function CreateMarkers(props) {

    const position = {
        lat: props.marker.geometry.location.lat(),
        lng: props.marker.geometry.location.lng()
    }

    return (
        <Marker position={position}
            onClick={() => props.setPlace(props.marker)}
        />
    )
}

export default GoogleMaps