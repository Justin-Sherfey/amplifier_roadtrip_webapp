import React, { useState, useEffect } from 'react';
import TripService from '../api/tripAPI';
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
            }
        });
    };

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
        <>
            <div className="container">
                <h1 className="text-center">Trips</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>Trip name</td>
                        </tr>
                    </thead>
                    <tbody>
                        {trips.map(trip => <Trip key={trip.tripId} editTrip={editTrip} deleteTrip={deleteTrip} trip={trip} />)}
                    </tbody>
                </table>
            </div >
            <><h3>CREATE A NEW TRIP</h3></>
            <Form onSubmit={handleSubmit(createTrip)}>
                <Form.Label>Trip Name:</Form.Label>
                <Form.Control {...register("tripName")}></Form.Control>
                <Button variant="primary" type="submit"> Submit </Button>
            </Form>
        </>
    )
}

function Trip(props) {
    return (
        <tr>
            <td>
                <Button variant="primary" onClick={() => props.editTrip(props.trip)}>Edit Trip</Button>
                <Button variant="danger" onClick={() => props.deleteTrip(props.trip)}>Delete Trip</Button>
            </td>
            <td> {props.trip.tripName}</td>
            <td> {props.trip.tripId}</td>
        </tr>
    );
}

export default TripComponent
