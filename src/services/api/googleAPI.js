import React from 'react'
import {GoogleMap,useJsApiLoader,Marker} from '@react-google-maps/api';

//Just testing so far

//TODO: make this full page. Height set to 100% doesn't work for some reason
const containerStyle = {
    width: '100%',
    height: '700px'
};

const center = {
    lat: 40.008,
    lng: -102.049
}

//hard coded for now. will eventually need to pull them from trip init. process
const start_position = {
    lat: 40.714,
    lng: -73.999
}
const end_position = {
    lat: 34.051,
    lng: -118.243
}

function MyComponent(){
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD9gatdPpn7zvT2lyXrsHhpf7CODG1Q3U0",
    })

    const [map,setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map){
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    },[])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
        mapContainerStyle={containerStyle}
        center = {center}
        zoom={5}
        onLoad = {onLoad}
        onUnmount={onUnmount}
        >
            {/*Child components, such as markers, info windows, etc. */}
            <>
            <Marker position={start_position}/>
            <Marker position={end_position}/>
            </>
        </GoogleMap>
    ): <></>
}

export default React.memo(MyComponent)