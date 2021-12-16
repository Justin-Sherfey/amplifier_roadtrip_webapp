import React, { useState, useEffect } from 'react'
import TripService from '../services/TripService'

function TripComponent() {

    const [trips, setTrips] = useState([])


    useEffect(() => {
        getTrips()
    }, [])



    const getTrips = () => {

        TripService.getTrips().then((response) => {
            setTrips(response.data)
            console.log(response.data);
        });
    }

    return (
        <div className="container">
            <h1 className="text-center">Trips</h1>

            <table className="table table-striped">
                <thead>
                    <th>
                        <tr>
                            <th> Trip name</th>
                            <th> Trip id</th>
                            <th> Waypoints</th>
                        </tr>
                    </th>
                </thead>
                <tbody>
                    {
                        trips.map(
                            trip =>
                                <tr key={trip.tripId}>
                                    <td> {trip.tripName}</td>
                                    <td> {trip.tripId}</td>
                                    <td> {trip.waypoints}</td>
                                </tr>
                        )
                    }
                </tbody>
            </table>

        </div>
    )
}

export default TripComponent
