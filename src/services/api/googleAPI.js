import React from 'react'
import {GoogleMap,Marker,StandaloneSearchBox, LoadScript} from '@react-google-maps/api';

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

    const [map,setMap] = React.useState(null)

    const onLoad = ref => this.searchBox = ref;
    /*
    const onLoad = React.useCallback(function callback(map){
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    },[])
    */

    const onPlacesChanged = () => console.log(this.searchBox.getPlaces()); //Triggered when a user selects a query

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    // const waypoints = []; //TODO

    return (
        <LoadScript 
        libraries={['places']}
        googleMapsApiKey='AIzaSyD9gatdPpn7zvT2lyXrsHhpf7CODG1Q3U0'
        >
            <GoogleMap
            id = "map-example"
            mapContainerStyle={containerStyle}
            zoom={5}
            onLoad = {onLoad}
            onUnmount={onUnmount}
            center = {center}
            >
                {/*Child components, such as markers, info windows, etc. */}
                <>
                <StandaloneSearchBox onPlacesChanged={onPlacesChanged} onLoad={onLoad}>
                    <input 
                    type="text" placeholder="Search for a point of interest..."
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

                <Marker position={start_position}/>
                <Marker position={end_position}/>
                </>
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(MyComponent)