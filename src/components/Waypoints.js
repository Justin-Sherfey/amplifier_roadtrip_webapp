import WaypointService from '../services/api/waypointAPI';
import TripService from '../services/api/tripAPI'
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap4-modal';

function WaypointComponent() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [waypoints, setWaypoints] = useState([]);
    const [waypoint, setWaypoint] = useState([]);
    const [trip, setTrip] = useState([]);
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        !state ? navigate("/Trips") :
            WaypointService.getAllWaypoints(state.trip.tripId).then((res) => {
                if (res.status === 200) {
                    setTrip(state.trip);
                    setWaypoints(res.data)
                }
            })
    }, [navigate, state])

    const toggleWaypointEditor = (waypoint) => {
        setWaypoint(waypoint);
        setIsOpen(!isOpen);
    }

    const renameTrip = (formData) => {
        //let tempTrip = trip
        // let tempTrip = {
        //     "tripName": "Test",
        //     "tripId": 3,
        //     "user": { "userId": 1 }

        // };
        // //Object.entries(formData).map(([key, value]) => tempTrip[key] = value);

        // console.log(tempTrip);
        // TripService.editTrip(tempTrip).then((res) => {
        //     if (res.status === 200) {
        //         setTrip(res.data);
        //     }
        // });
    }

    const deleteWaypoint = (waypoint) => {
        WaypointService.deleteWaypoint(waypoint.waypointId).then((response) => {
            if (response.status === 200) {
                let tempWaypoints = waypoints.filter(e => { return e !== waypoint; });
                setWaypoints([...tempWaypoints]);
            }
        });
    }

    const editWaypoint = (tempWaypoint) => {
        tempWaypoint['trip'] = { "tripId": trip.tripId }
        tempWaypoint['waypointId'] = waypoint.waypointId;
        WaypointService.editWaypoint(tempWaypoint).then((res) => {
            if (res.status === 200) {
                let tempWaypoints = waypoints;
                tempWaypoints[tempWaypoints.findIndex(waypoint => waypoint.waypointId === res.data.waypointId)] = res.data;
                setWaypoints([...tempWaypoints])
                toggleWaypointEditor();
            }
        });
    }

    const createWaypoint = () => {
        let newWaypoint = {
            "waypointName": "New Waypoint",
            "latitude": 0,
            "longitude": 0,
            "trip": trip
        }
        WaypointService.createWaypoint(newWaypoint).then((res) => {
            if (res.status === 200) {
                let tempWaypoints = waypoints;
                tempWaypoints.push(res.data);
                setWaypoints([...tempWaypoints])
            }
        });
    }

    return (
        <>
            <h1 className="text-center">{trip.tripName}</h1>
            {isOpen && <WaypointEditor toggleWaypointEditor={toggleWaypointEditor} editWaypoint={editWaypoint} waypoint={waypoint} />}
            <div className="container">

                <h4 className="text-center">Waypoints</h4>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td> Waypoint name</td>
                            <td> Action</td>
                            <td> Waypoint id</td>
                            <td> Latitude</td>
                            <td> Longitude</td>
                        </tr>
                    </thead>
                    <tbody>
                        {waypoints.map(waypoint =>
                            <Waypoint key={waypoint.waypointId} waypoint={waypoint} deleteWaypoint={deleteWaypoint} toggleWaypointEditor={toggleWaypointEditor} />)}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <Button variant="primary" onClick={createWaypoint}>Create Waypoint</Button>
                            </td>
                            <td />
                            <td />
                            <td />
                            <td />
                        </tr>
                    </tfoot>
                </table>

            </div>
            <Form onSubmit={handleSubmit(renameTrip)}>
                <Form.Label>Edit Trip name:</Form.Label>
                <Form.Control {...register("tripName")}></Form.Control>
                <Button variant="primary" type="submit"> Rename </Button>
            </Form>
        </>
    )
}

function WaypointEditor(props) {
    const { register, handleSubmit } = useForm();

    return (
        <Modal visible={true} onClickBackdrop={props.toggleWaypointEditor}>
            <div className="modal-header">
                {/* <h5 className="modal-title">{props.waypoint.waypointName}</h5> */}
            </div>
            <div className="modal-body">
                <Form onSubmit={handleSubmit(props.editWaypoint)}>
                    <Form.Label>Waypoint Name:</Form.Label>
                    <Form.Control {...register("waypointName")}></Form.Control>
                    <Form.Label>Latitude:</Form.Label>
                    <Form.Control {...register("latitude")}></Form.Control>
                    <Form.Label>Longitude:</Form.Label>
                    <Form.Control {...register("longitude")}></Form.Control>
                    <br />
                    <Button variant="primary" type="submit"> Save Changes</Button>
                    <Button variant="secondary" onClick={props.toggleWaypointEditor}>Cancel</Button>
                </Form>
            </div>
        </Modal>
    )
}

function Waypoint(props) {

    return (
        <tr>
            <td>
                {props.waypoint.waypointName}
            </td>
            <td>
                <Button variant="primary" onClick={() => props.toggleWaypointEditor(props.waypoint)}>Edit Waypoint</Button>
                <Button variant="danger" onClick={() => props.deleteWaypoint(props.waypoint)}>Delete Waypoint</Button>
            </td>
            <td> {props.waypoint.waypointId}</td>
            <td> {props.waypoint.latitude}</td>
            <td> {props.waypoint.longitude}</td>
        </tr>
    );
}

export default WaypointComponent
