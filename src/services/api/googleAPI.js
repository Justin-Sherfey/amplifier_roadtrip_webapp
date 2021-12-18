import React from 'react'
import {GoogleMap,Marker, LoadScript} from '@react-google-maps/api';

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

//hard coded for now. will eventually need to pull them from trip init. process. probably through props
const start_position = {
    lat: 40.714,
    lng: -73.999
}
const end_position = {
    lat: 34.051,
    lng: -118.243
}

function searchForm(){ //TODO
    const [input, setInput] = React.useState('');

    return(
        <form onSubmit={doTextSearch}>
            <label for="pointOfInterest">search for a point of interest</label>
            <input id='pointOfInterest' type="text" value={input} onInput={e => setInput(e.target.value)}/>
            <input type="submit" value="Search"/>
        </form>
    );
}

function MyComponent(){

    //Maintain an instance of the map
    const [map,setMap] = React.useState(null)

    // const onLoad = ref => this.searchBox = ref;
    const onLoad = React.useCallback(function callback(map){
        const bounds = new window.google.maps.LatLngBounds();//This messes w/ init. centering. Don't know the proper way yet. 
        map.fitBounds(bounds);
        setMap(map)
    },[])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    //POI suggestion utils:
    var markersArray = []; //Contains all user selected POI markers

    function clearMarkers(){
        for(var marker of markersArray){
            marker.setMap(null);
        }
        markersArray.length=0;
    }
    function createMarker(place){
        // if not a valid place then return
        if(!place.geometry || !place.geometry.location)return;

        var marker = new google.maps.Marker({
            map,
            position: place.google.location
        });

        let contentString = place.name + "\n\n" + place.formatted_address;
        //TODO
        
        markersArray.push(marker);
    }

    function doTextSearch(){
        let service = new google.maps.places.PlacesService(map);
        clearMarkers();
        service.textSearch(,function(results,status){
            if(status===google.maps.places.PlacesServiceStatus.OK){
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

    return (
        <>
        <LoadScript 
        libraries={['places']}
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
                {/* user chosen POI: */}
                <searchForm/>
                {markersArray.map(())}
                </>
            </GoogleMap>
        </LoadScript>
        </>
    )
}

export default React.memo(MyComponent)