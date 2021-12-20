import React from 'react'
import { useState } from 'react';
import { StandaloneSearchBox, GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places']

function GoogleMaps(props) {
    const [searchBox, setSearchBox] = useState(undefined);
    const [markers, setMarkers] = useState([]);
    const [center, setCenter] = useState({
        lat: props.waypoint.latitude,
        lng: props.waypoint.longitude
    })

    const mapContainerStyle = {
        height: "400px",
        width: "800px"
    };

    const onLoad = (ref) => setSearchBox(ref);

    const onPlacesChanged = () => {
        let markers = searchBox.getPlaces();
        setMarkers(markers);
        const position = {
            lat: markers[0].geometry.location.lat(),
            lng: markers[0].geometry.location.lng()
        }
        setCenter(position);
    }

    console.log(markers)
    return (
        <LoadScript
            libraries={libraries}
            googleMapsApiKey='AIzaSyD9gatdPpn7zvT2lyXrsHhpf7CODG1Q3U0'
        >
            <GoogleMap
                id="searchbox-example"
                mapContainerStyle={mapContainerStyle}
                zoom={5}
                center={center}
            >
                {markers.map(marker =>
                    <CreateMarkers key={marker.refrence} marker={marker} setPlace={props.setPlace} />)}
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