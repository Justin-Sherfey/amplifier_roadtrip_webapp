import React, { Component } from 'react'
import {DirectionsRenderer,DirectionsService} from '@react-google-maps/api';

//Directions util | will need to be used INSIDE a <GoogleMap> component
class Directions extends Component{
    constructor(props){
        super(props)
        this.state = {
            response: null,
            travelMode: 'DRIVING',
            origin:'',
            destination:''
        }

        this.directionsCallback = this.directionsCallback.bind(this)
        this.getOrigin = this.getOrigin.bind(this)
        this.getDestination = this.getDestination.bind(this)
        this.onClick = this.onClick.bind(this)
        this.onMapClick = this.onMapClick.bind(this)
    }

  directionsCallback (response) {
    console.log(response)

    if (response !== null) {
      if (response.status === 'OK') {
        this.setState(
          () => ({
            response
          })
        )
      } else {
        console.log('response: ', response)
      }
    }
  }

  getOrigin (ref) {
    this.origin = ref
  }

  getDestination (ref) {
    this.destination = ref
  }

  onClick () {
    if (this.origin.value !== '' && this.destination.value !== '') {
      this.setState(
        () => ({
          origin: this.origin.value,
          destination: this.destination.value
        })
      )
    }
  }
  
  onMapClick (...args) {
    console.log('onClick args: ', args)
  }

  render(){
      return(
        {
            (
              this.state.destination !== '' &&
              this.state.origin !== ''
            ) && (
              <DirectionsService
                // required
                options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                  destination: this.state.destination,
                  origin: this.state.origin,
                  travelMode: this.state.travelMode
                }}
                // required
                callback={this.directionsCallback}
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
                this.state.response !== null && (
                <DirectionsRenderer
                    // required
                    options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                    directions: this.state.response
                    }}
                />
                )
            }
      );
  }
}

export default Directions;