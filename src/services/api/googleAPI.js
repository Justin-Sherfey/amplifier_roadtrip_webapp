import React from 'react'
import {GoogleMap,Marker, LoadScript, InfoWindow} from '@react-google-maps/api';

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

function MyComponent(){

    //Local values:
    //Contains all user selected POI markers
    var markersArray = [];//could probably also be replaced by a useState
    //individual info window per marker
    var infoWindow;
    //Maintain an instance of user input
    const [input, setInput] = React.useState('');
    //Maintain an instance of the map
    const [map,setMap] = React.useState(null);

    //Map utils:
    const onLoad = React.useCallback(function callback(map){
        const bounds = new window.google.maps.LatLngBounds();//This messes w/ init. centering. Don't know the proper way yet. 
        map.fitBounds(bounds);
        setMap(map)
    },[])
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    //POI suggestion utils:
    function clearMarkers(){
        markersArray = []
    }
    function createMarker(place){
        // if not a valid place then return
        if(!place.geometry || !place.geometry.location)return;

        // contentString appears above a waypoint on the map when you hover your mouse over it
        let contentString = place.name + "\n\n" + place.formatted_address;
        
        markersArray.push(<Marker
            position={place.google.location}
            onClick={()=>{
                map.setZoom(8)
                map.setCenter(place.geometry.location)
                //TODO place selector
            }}
            onMouseOver={()=>{
                /*info window is the popup containing contentString*/
                infoWindow = new window.google.maps.InfoWindow({
                    content: contentString
                });
                infoWindow.open(map,this);//Check this 'this'
            }}
            onMouseOut={()=>{
                if(infoWindow){
                    infoWindow.close();
                }
            }}
        />);
    }

    function doTextSearch(){
        let service = new window.google.maps.places.PlacesService(map);
        clearMarkers();
        service.textSearch(input,function(results,status){
            if(status===window.google.maps.places.PlacesServiceStatus.OK){
                //results: a number of places returned by the textSearch. //Would like to drop this number... currently is 20
                for(var result of results){
                    createMarker(result);
                }
                map.setCenter(results[0].geometry.location);
                setMap(map);
            } else {
                console.log("something went wrong w/ Map textSearch");
            }
        });
    }

    /*
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
                <Marker position={start_position}/>
                <Marker position={end_position}/>
                {/* user POI interaction: */}

                {markersArray.map((marker)=>marker)}
                </>
            </GoogleMap>
        </LoadScript>
        <form onSubmit={doTextSearch}>
            <label htmlFor="pointOfInterest">search for a point of interest</label>
            <input id='pointOfInterest' type="text" value={input} onInput={e => setInput(e.target.value)}/>
            <input type="submit" value="Search"/>
        </form>
        </>
    )
}

export default React.memo(MyComponent)