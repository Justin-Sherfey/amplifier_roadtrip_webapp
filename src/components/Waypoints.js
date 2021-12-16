import React, { useState, useEffect } from 'react';
import WaypointService from '../services/api/waypointAPI';
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";


function WaypointComponent() {

    const { register, handleSubmit } = useForm();

    const [waypoints, setWaypoints] = useState([])


    useEffect(() => {
        getWaypoints()
    }, [])


    const onSubmit = (formData) => {

        WaypointService.createWaypoint(formData);

    }

    const getWaypoints = () => {

        WaypointService.getAllWaypoints().then((response) => {
            setWaypoints(response.data)
            console.log(response.data);
        });
    }

    return (
        <>
        <div className="container">
            <h1 className="text-center">Waypoints</h1>

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
                                <tr key={waypoint.waypointId}>
                                    <td> {waypoint.waypointName}</td>
                                    <td> {waypoint.tripId}</td>
                                    <td> {waypoint.latitude}</td>
                                    <td> {waypoint.longitude}</td>
                                </tr>
                        )
                    }
                </tbody>
            </table>

        </div>
        
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Label>Waypoint Name:</Form.Label>
            <Form.Control {...register("waypointName")}></Form.Control>
            <Form.Label>Longitude:</Form.Label>
            <Form.Control {...register("Longitude")}></Form.Control>
            <Form.Label>Latitude:</Form.Label>
            <Form.Control {...register("Latitude")}></Form.Control>
            <Button variant="primary" type="submit"> Submit </Button>
        </Form>
        
        </>
    )
}

export default WaypointComponent
