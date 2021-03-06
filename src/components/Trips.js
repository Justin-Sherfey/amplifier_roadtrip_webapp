import React, { useState, useEffect } from 'react';
import TripService from '../api/tripAPI';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import WaypointService from '../api/waypointAPI';
import myTrips from "../assets/imgs/myTrips.png";
import newTrip from "../assets/imgs/newTrip.png";

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
                    "waypointName": "Empire State Building",
                    "placeId": "ChIJtcaxrqlZwokRfwmmibzPsTU",
                    "trip": res.data
                }
                let destinationWaypoint = {
                    "waypointName": "Walt Disney Concert Hall",
                    "placeId": "ChIJ0xG7n03GwoARsDH_OyyMcrM",
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
        <Container className="text-center">
            <img src={myTrips} height="100px" />

            <Row>
                <Col></Col>

                <Col>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <td>Trip name</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {trips.map(trip => <Trip key={trip.tripId} editTrip={editTrip} deleteTrip={deleteTrip} trip={trip} />)}
                        </tbody>
                    </table>
                </Col>
                <Col></Col>
            </Row>

            <Row>
                <Col></Col>

                <Col>
                    <Form onSubmit={handleSubmit(createTrip)}>
                        <img src={newTrip} height="50px" />
                        <br />
                        <Form.Control placeholder="Trip Name" {...register("tripName")}></Form.Control>
                        <br />
                        <Button variant="dark" type="submit"> Submit </Button>
                    </Form>
                </Col>
                <Col></Col>
            </Row>

        </Container>
    )
}

function Trip(props) {
    return (
        <tr>
            <td> {props.trip.tripName}</td>
            <td>
                <Button variant="dark" onClick={() => props.editTrip(props.trip)}>Edit</Button>
                <Button variant="danger" onClick={() => props.deleteTrip(props.trip)}>Delete</Button>
            </td>
        </tr>
    );
}

export default TripComponent
