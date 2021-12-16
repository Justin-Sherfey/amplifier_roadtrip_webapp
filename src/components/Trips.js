import React, { useState, useEffect } from 'react';
import TripService from '../services/api/tripAPI';
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


function TripComponent() {

    const navigate = useNavigate();
    

    const { register, handleSubmit } = useForm();

    const [trips, setTrips] = useState([])

    const onSubmit = (formData) =>  {
        TripService.createTrip(formData).then((res) => {
            if(res.status === 200) {
                sessionStorage["tripId"] = res.data.tripId;
                navigate("/Waypoints");
            }
        });
    };

    useEffect(() => {
        getTrips()
    }, [])



    const getTrips = () => {

        TripService.getAllTrips().then((response) => {
            setTrips(response.data)
            console.log(response.data);
        });
    }

    return (
        <>
        <div className="container">
            <h1 className="text-center">Trips</h1>

            <table className="table table-striped">
                <thead>
                    <th>
                        <tr>
                            <th> Trip name</th>
                            <br></br>
                            <th> Trip id</th>
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
                                </tr>
                        )
                    }
                </tbody>
            </table>

        </div>
        
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Label>Trip Name:</Form.Label>
            <Form.Control {...register("tripName")}></Form.Control>
            <Button variant="primary" type="submit"> Submit </Button>
        </Form>
        
        </>
    )
}

export default TripComponent
