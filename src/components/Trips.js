import React, { useState, useEffect } from 'react';
import TripService from '../services/api/tripAPI';
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function TripComponent(props) {

    const { register, handleSubmit } = useForm();
    const [trips, setTrips] = useState([]);
    useEffect(() => {
        TripService.getAllTrips(props.authUser.userId).then((response) => {
            setTrips(response.data)
        });
    }, [props.authUser])

    const onSubmit = (formData) => {
        formData["user"] = props.authUser;
        TripService.createTrip(formData).then((res) => {
            if (res.status === 200) {
                sessionStorage["tripId"] = res.data.tripId;
                //navigate("/Waypoints");
            }
        });
    };

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
                        {trips.map(trip => <Trip key={trip.tripId} trip={trip} />)}
                    </tbody>
                </table>
            </div >
            <><h3>CREATE A NEW TRIP</h3></>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Label>Trip Name:</Form.Label>
                <Form.Control {...register("tripName")}></Form.Control>
                <Button variant="primary" type="submit"> Submit </Button>
            </Form>
        </>
    )
}

function Trip(props) {

    const navigate = useNavigate();

    const editTrip = () => {
        navigate('/Waypoints', { state: { trip: props.trip } });
    }

    // TODO - figure out how to properly refresh page to update deleted element
    // TODO - I second this TODO, but I can't figure it out - Noah
    const deleteTrip = () => {
        TripService.deleteTrip(props.trip.tripId).then((response) => {
            if (response.data === true) {
                navigate("/Account");
                navigate("/Trips");
                console.log("deleted");
            }
        });
    }

    return (
        <tr>
            <td>
                <Button variant="primary" onClick={editTrip}>Edit Trip</Button>
                <Button variant="danger" onClick={deleteTrip}>Delete Trip</Button>
            </td>
            <td> {props.trip.tripName}</td>
            <td> {props.trip.tripId}</td>
        </tr>
    );
}

export default TripComponent
