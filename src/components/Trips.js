import React, { useState, useEffect } from "react";
import TripService from "../services/TripService";
import { Button } from "react-bootstrap";

function TripComponent(props) {
  const [trips, setTrips] = useState([]);
  console.log(props.authUser);

  let tripss = props.authUser.trips;
  return (
    <div className="container">
      <h1 className="text-center">Trips</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th></th>
            <th> Trip name</th>
            <th> Trip id</th>
          </tr>
        </thead>
        <tbody>
          {tripss.map((trip) => (
            <Trip key={trip.tripId} trip={trip} />
          ))}
        </tbody>
      </table>
      <Button variant="primary">Create New Trip</Button>
    </div>
  );
}
function Trip(props) {
  return (
    <tr key={props.trip.tripId}>
      <td>
        <Button variant="primary">Edit Trip</Button>
        <Button variant="danger">Delete Trip</Button>
      </td>
      <td> {props.trip.tripName}</td>
      <td> {props.trip.tripId}</td>
    </tr>
  );
}
export default TripComponent;
