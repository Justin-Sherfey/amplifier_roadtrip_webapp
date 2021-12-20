import React, { useState, useEffect } from 'react';
import TripService from '../api/tripAPI';
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import WaypointService from '../api/waypointAPI';

function TripComponent(props) {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [trips, setTrips] = useState([]);
    useEffect(() => {
        TripService.getAllTrips(props.authUser.userId).then((response) => {
            setTrips(response.data)
        });
    }, [props.authUser])

    const createTrip = (formData) => {
        formData["user"] = props.authUser;
        TripService.createTrip(formData).then((res) => {
            if (res.status === 200) {
                let tempTrips = trips;
                tempTrips.push(res.data);
                setTrips([...tempTrips])

                let originWaypoint = {
                    "waypointName": "New Waypoint",
                    "latitude": 40.73774326345345,
                    "longitude": -73.99344767530195,
                    "trip": res.data
                }

                let destinationWaypoint = {
                    "waypointName": "New Waypoint",
                    "latitude": 34.09139749043789,
                    "longitude": -118.30667633529931,
                    "trip": res.data
                }

                createWaypoint(originWaypoint);
                createWaypoint(destinationWaypoint);
            }
        });
    };

    const createWaypoint = (newWaypoint) => {
        WaypointService.createWaypoint(newWaypoint).then((res) => {
            if (res.status === 200) {

            }
        });
    }


    const editTrip = (trip) => {
        navigate('/Waypoints', { state: { trip: trip, authUser: props.authUser } });
    }

    const deleteTrip = (trip) => {
        TripService.deleteTrip(trip.tripId).then((response) => {
            if (response.data === true) {
                let tempTrips = trips.filter(e => { return e !== trip; });
                setTrips([...tempTrips]);
            }
        });
    }

    return (
        <div className="container">
            <h1 className="text-center">Trips</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <td>Trip name</td>
                        <td>Action</td>
                        <td>Trip ID</td>
                    </tr>
                </thead>
                <tbody>
                    {trips.map(trip => <Trip key={trip.tripId} editTrip={editTrip} deleteTrip={deleteTrip} trip={trip} />)}
                </tbody>
            </table>
            <h3>CREATE A NEW TRIP</h3>
            <Form onSubmit={handleSubmit(createTrip)}>
                <Form.Label>Trip Name:</Form.Label>
                <Form.Control {...register("tripName")}></Form.Control>
                <br />
                <Button variant="primary" type="submit"> Submit </Button>
            </Form>
        </div >
    )
}

function Trip(props) {
    return (
        <tr>
            <td> {props.trip.tripName}</td>
            <td>
                <Button variant="primary" onClick={() => props.editTrip(props.trip)}>Edit Trip</Button>
                <Button variant="danger" onClick={() => props.deleteTrip(props.trip)}>Delete Trip</Button>
            </td>
            <td> {props.trip.tripId}</td>
        </tr>
    );
}

export default TripComponent
