import React, { useState, useEffect } from 'react';
import WaypointService from '../services/api/waypointAPI';
import TripService from '../services/api/tripAPI';
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function WaypointComponent(props) {

    const { register, handleSubmit } = useForm();

    const [waypoints, setWaypoints] = useState([])


    const navigate = useNavigate();


    useEffect(() => {
        getWaypoints()
    }, [])


    const onSubmit = (formData) => {

        WaypointService.createWaypoint(formData).then((res) => {
            if (res.status === 200) {
                navigate("/Trips");
                navigate("/Waypoints");
            }
        });

    }

    const rename = (formData) => {
        let trip = props.trip
        Object.entries(formData).map(([key, value]) => { trip[key] = value });
        TripService.editTrip(trip).then((res) => {
            if (res.status === 200) {
                props.setTrip(trip);
                navigate("/Trips");
                navigate("/Waypoints");
            }
        });
    }

    const getWaypoints = () => {

        WaypointService.getAllWaypoints().then((response) => {
            setWaypoints(response.data)
            console.log(response.data);
        });
    }

    // probably a less sloppy way to retrieve value later
    TripService.getTrip().then((response) => {
        sessionStorage["tripName"] = response.data.tripName;
    });

    return (
        <>
            <h1>{sessionStorage["tripName"]}</h1>

            <div className="container">
                <h3 className="text-center">Waypoints</h3>

                <table className="table table-striped">
                    <thead>
                        <th>
                            <tr>
                                <th> Waypoint name</th>
                                <th> Waypoint id</th>
                                <th> Latitude</th>
                                <th> Longitude</th>
                            </tr>
                        </th>
                    </thead>
                    <tbody>
                        {
                            waypoints.map(
                                waypoint =>
                                    <Waypoint key={waypoint.waypointId} waypoint={waypoint} />
                            )
                        }
                    </tbody>
                </table>

            </div>

            <Form onSubmit={handleSubmit(rename)}>
                <Form.Label>Edit New Trip name:</Form.Label>
                <Form.Control {...register("tripName")}></Form.Control>
                <Button variant="primary" type="submit"> Rename </Button>
            </Form>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Label>Waypoint Name:</Form.Label>
                <Form.Control {...register("waypointName")}></Form.Control>
                <Form.Label>Latitude:</Form.Label>
                <Form.Control {...register("latitude")}></Form.Control>
                <Form.Label>Longitude:</Form.Label>
                <Form.Control {...register("longitude")}></Form.Control>
                <Button variant="primary" type="submit"> Submit </Button>
            </Form>

        </>
    )
}

function Waypoint(props) {

    const navigate = useNavigate();

    const editWaypoint = () => {

    }

    // TODO - figure out how to properly refresh page to update deleted element
    const deleteWaypoint = () => {
        WaypointService.deleteWaypoint(props.waypoint.waypointId).then((response) => {
            if (response.data === true) {
                navigate("/Trips");
                navigate("/Waypoints");
                console.log("deleted");
            }
        });
    }

    return (
        <tr key={props.waypoint.waypointId}>
            <td>
                <Button variant="danger" onClick={deleteWaypoint}>Delete Waypoint</Button>
            </td>
            <td> {props.waypoint.waypointName}</td>
            <td> {props.waypoint.latitude}</td>
            <td> {props.waypoint.longitude}</td>
        </tr>
    );
}

export default WaypointComponent
