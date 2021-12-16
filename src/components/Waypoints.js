import React, { useState, useEffect } from 'react';
import WaypointService from '../services/api/waypointAPI';
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function WaypointComponent() {

    const { register, handleSubmit } = useForm();

    const [waypoints, setWaypoints] = useState([])


    const navigate = useNavigate();


    useEffect(() => {
        getWaypoints()
    }, [])


    const onSubmit = (formData) => {

        WaypointService.createWaypoint(formData).then((res) => {
            if(res.status === 200) {
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
            <Form.Label>Latitude:</Form.Label>
            <Form.Control {...register("latitude")}></Form.Control>
            <Form.Label>Longitude:</Form.Label>
            <Form.Control {...register("longitude")}></Form.Control>
            <Button variant="primary" type="submit"> Submit </Button>
        </Form>
        
        </>
    )
}

export default WaypointComponent
