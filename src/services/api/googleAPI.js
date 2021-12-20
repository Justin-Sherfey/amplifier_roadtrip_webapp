import React, { useState } from 'react'

import {GoogleMap, Marker, LoadScript, StandaloneSearchBox, DirectionsRenderer,DirectionsService} from '@react-google-maps/api';

const libraries = ['places']

//TODO: make this full page. Height set to 100% doesn't work for some reason
const containerStyle = {
    width: '100%',
    height: '700px'
};

const center = {
    lat: 40.008,
    lng: -102.049
}

//hard coded for now. will eventually need to pull them from trip init. process. probably through props
const start_position = {
    lat: 40.714,
    lng: -73.999
}
const end_position = {
    lat: 34.051,
    lng: -118.243
}

//POI suggestion utils:
function CreateMarkers(props){
    // const [isOpen,setIsOpen] = useState(false)
    const position = {
        lat: props.marker.geometry.location.lat(),
        lng: props.marker.geometry.location.lng() 
    }

    return (
        <>
            <Marker position={position}/>
        </>
    )
}

function MyComponent(){

    //Local values:
    //Maintain given instances
    const [map,setMap] = React.useState(null);
    const [searchBox, setSearchBox] = useState(undefined)
    const [markers,setMarkers] = useState([])

    //SearchBox util
    const onSearchBoxLoad = (ref) => setSearchBox(ref)
    //triggered when you apply a search
    const onPlacesChanged = () => {
        setMarkers(searchBox.getPlaces());
        map.setCenter(searchBox.getPlaces()[0].geometry.location)
    }

    //Map utils:
    const onLoad = React.useCallback(function callback(map){
        const bounds = new window.google.maps.LatLngBounds();//This messes w/ init. centering. Don't know the proper way yet. 
        map.fitBounds(bounds);
        setMap(map)
    },[])
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    /* TODO
    • createPlaceSlector
    • addPlaceAsAWaypoint
    • generateDirections
    • displayDirections
    */

    //The actual displays
    return (
        <>
        <LoadScript 
        libraries={libraries}
        googleMapsApiKey='AIzaSyD9gatdPpn7zvT2lyXrsHhpf7CODG1Q3U0'
        >
            <GoogleMap
            id = "map-example"
            mapContainerStyle={containerStyle}
            zoom={4}
            onLoad = {onLoad}
            onUnmount={onUnmount}
            center = {center}
            >
                {/*Child components, such as markers, info windows, etc.: */}
                <> 

                <StandaloneSearchBox
                    onLoad={onSearchBoxLoad}
                    onPlacesChanged={onPlacesChanged}>
                       <input
                        type="text"
                        placeholder="Customized your placeholder"
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

                {/* markers */}
                <Marker position={start_position}/>
                <Marker position={end_position}/>
                {markers.map(marker=><CreateMarkers key={marker.reference} marker={marker}/>)}
                {/* user POI interaction: */}
                </>
            </GoogleMap>
        </LoadScript>
        </>
    )
}

export default React.memo(MyComponent)