import { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const libraries = ['places']

function Directions() {
    const [travelMode, setTravelMode] = useState("");
    const [response, setResponse] = useState("");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");

    const directionsCallback = (response) => {
        console.log(response)

        if (response !== null && response.status === 'OK') {

            setResponse(response)
        } else {
            console.log('response: ', response)
        }
    }

    const checkDriving = ({ target: { checked } }) => {
        checked && setTravelMode('DRIVING')
    }

    const checkBicycling = ({ target: { checked } }) => {
        checked && setTravelMode('BICYCLING')
    }

    const checkTransit = ({ target: { checked } }) => {
        checked && setTravelMode('TRANSIT')
    }

    const checkWalking = ({ target: { checked } }) => {
        checked && setTravelMode('WALKING')
    }

    const getOrigin = (ref) => {
        setOrigin(ref)
    }

    const getDestination = (ref) => {
        setDestination(ref)
    }

    const onClick = () => {
        if (origin.value !== '' && destination.value !== '') {
            console.log(origin.value)
            setDestination(destination.value)
            setOrigin(origin.value)
        }
    }

    const onMapClick = (...args) => {
        console.log('onClick args: ', args)
    }

    return (
        <div className='map' >
            <div className='map-settings'>
                <hr className='mt-0 mb-3' />

                <div className='row'>
                    <div className='col-md-6 col-lg-4'>
                        <div className='form-group'>
                            <label htmlFor='ORIGIN'>Origin</label>
                            <br />
                            <input id='ORIGIN' className='form-control' type='text' ref={getOrigin} />
                        </div>
                    </div>

                    <div className='col-md-6 col-lg-4'>
                        <div className='form-group'>
                            <label htmlFor='DESTINATION'>Destination</label>
                            <br />
                            <input id='DESTINATION' className='form-control' type='text' ref={getDestination} />
                        </div>
                    </div>
                </div>

                <div className='d-flex flex-wrap'>
                    <div className='form-group custom-control custom-radio mr-4'>
                        <input
                            id='DRIVING'
                            className='custom-control-input'
                            name='travelMode'
                            type='radio'
                            checked={travelMode === 'DRIVING'}
                            onChange={checkDriving}
                        />
                        <label className='custom-control-label' htmlFor='DRIVING'>Driving</label>
                    </div>

                    <div className='form-group custom-control custom-radio mr-4'>
                        <input
                            id='BICYCLING'
                            className='custom-control-input'
                            name='travelMode'
                            type='radio'
                            checked={travelMode === 'BICYCLING'}
                            onChange={checkBicycling}
                        />
                        <label className='custom-control-label' htmlFor='BICYCLING'>Bicycling</label>
                    </div>

                    <div className='form-group custom-control custom-radio mr-4'>
                        <input
                            id='TRANSIT'
                            className='custom-control-input'
                            name='travelMode'
                            type='radio'
                            checked={travelMode === 'TRANSIT'}
                            onChange={checkTransit}
                        />
                        <label className='custom-control-label' htmlFor='TRANSIT'>Transit</label>
                    </div>

                    <div className='form-group custom-control custom-radio mr-4'>
                        <input
                            id='WALKING'
                            className='custom-control-input'
                            name='travelMode'
                            type='radio'
                            checked={travelMode === 'WALKING'}
                            onChange={checkWalking}
                        />
                        <label className='custom-control-label' htmlFor='WALKING'>Walking</label>
                    </div>
                </div>

                <button className='btn btn-primary' type='button' onClick={onClick}>
                    Build Route
                </button>
            </div>

            <div className='map-container'>

                <LoadScript
                    libraries={libraries}
                    googleMapsApiKey='AIzaSyD9gatdPpn7zvT2lyXrsHhpf7CODG1Q3U0'
                >
                    <GoogleMap
                        // required
                        id='direction-example'
                        // required
                        mapContainerStyle={{
                            height: '400px',
                            width: '100%'
                        }}
                        // required
                        zoom={2}
                        // required
                        center={{
                            lat: 0,
                            lng: -180
                        }}
                        // optional
                        onClick={onMapClick}
                        // optional
                        onLoad={map => {
                            console.log('DirectionsRenderer onLoad map: ', map)
                        }}
                        // optional
                        onUnmount={map => {
                            console.log('DirectionsRenderer onUnmount map: ', map)
                        }}
                    >
                        {
                            (
                                destination !== '' &&
                                origin !== ''
                            ) && (
                                <DirectionsService
                                    // required
                                    options={{
                                        destination: destination,
                                        origin: origin,
                                        travelMode: travelMode
                                    }}
                                    // required
                                    callback={directionsCallback}
                                    // optional
                                    onLoad={directionsService => {
                                        console.log('DirectionsService onLoad directionsService: ', directionsService)
                                    }}
                                    // optional
                                    onUnmount={directionsService => {
                                        console.log('DirectionsService onUnmount directionsService: ', directionsService)
                                    }}
                                />
                            )
                        }

                        {
                            response !== null && (
                                <DirectionsRenderer
                                    // required
                                    options={{
                                        directions: response
                                    }}
                                    // optional
                                    onLoad={directionsRenderer => {
                                        console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                                    }}
                                    // optional
                                    onUnmount={directionsRenderer => {
                                        console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                                    }}
                                />
                            )
                        }
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    )
}

export default Directions;