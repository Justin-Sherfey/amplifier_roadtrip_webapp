import React, { useState, useEffect } from 'react';
import TripService from '../services/api/tripAPI';
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function TripComponent() {

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [trips, setTrips] = useState([]);

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
                        </tr>
                    </th>
                </thead>
                <tbody>
                    {
                        trips.map(
                            trip =>
                                <Trip key={trip.tripId} trip={trip} />
                        )
                    }
                </tbody>
            </table>

        </div>
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
        sessionStorage["tripId"] = props.trip.tripId;
        navigate("/Waypoints");
    }

    // TODO - figure out how to properly refresh page to update deleted element
    const deleteTrip = () => {
        TripService.deleteTrip(props.trip.tripId).then((response) => {
            if(response.data === true) {
                navigate("/Account");
                navigate("/Trips");
                console.log("deleted");
            }
        });
    }

    return (
      <tr key={props.trip.tripId}>
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
