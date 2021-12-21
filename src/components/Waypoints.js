import { useEffect, useState } from 'react';
import { Dropdown, Button, Form, Container, Row, Col, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import TripService from '../api/tripAPI';
import WaypointService from '../api/waypointAPI';
import GoogleMaps from './GoogleMaps';
import tripPlan from "../assets/imgs/tripPlan.png";


function WaypointComponent() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [waypoints, setWaypoints] = useState([]);
    const [selectedWaypoint, setSelectedWaypoint] = useState();
    const [trip, setTrip] = useState([]);
    const [toggleMap, setToggleMap] = useState(false);
    const [directions, setDirections] = useState();


    useEffect(() => {
        !state ? navigate("/Trips") :
            WaypointService.getAllWaypoints(state.trip.tripId).then((res) => {
                if (res.status === 200) {
                    setTrip(state.trip);
                    setWaypoints(res.data)
                }
            })
    }, [navigate, state])

    useEffect(() => {
        if (!toggleMap) {
            setToggleMap(true);
        }
    }, [toggleMap])


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
        tempWaypoint['waypointId'] = selectedWaypoint.waypointId;
        WaypointService.editWaypoint(tempWaypoint).then((res) => {
            if (res.status === 200) {
                let tempWaypoints = waypoints;
                tempWaypoints[tempWaypoints.findIndex(waypoint => waypoint.waypointId === res.data.waypointId)] = res.data;
                setWaypoints([...tempWaypoints])
            }
        });
    }

    const createWaypoint = () => {
        let newWaypoint = {
            "waypointName": "The Gateway Arch",
            "placeId": "ChIJteVBdWDwwIcRNKiWxoko7Xk",
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
        <Container >
            <div className="text-center">
                <img src={tripPlan} height="100px" />
            </div>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <td> Waypoint name</td>
                                <td> Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {waypoints.map(waypoint => {
                                if (waypoints[0] === waypoint || waypoints[waypoints.length - 1] === waypoint) {
                                    return <Waypoint key={waypoint.waypointId} waypoint={waypoint}
                                        setSelectedWaypoint={setSelectedWaypoint} />

                                } else {
                                    return <Waypoint key={waypoint.waypointId} waypoint={waypoint}
                                        setSelectedWaypoint={setSelectedWaypoint} deleteWaypoint={deleteWaypoint} />
                                }
                            }
                            )}
                        </tbody>
                    </Table>
                    <Button variant="dark" onClick={createWaypoint}>Create Waypoint</Button>
                </Col>
            </Row>
            <br />
            <Row>

                {!!toggleMap && <WaypointEditor waypoints={waypoints} selectedWaypoint={selectedWaypoint}
                    editWaypoint={editWaypoint} setToggleMap={setToggleMap} />}

            </Row>
        </Container>
    )
}

function RenameTrip(props) {
    const { register, handleSubmit } = useForm();

    const renameTrip = (formData) => {
        let tempTrip = props.trip
        tempTrip["user"] = { "userId": props.authUser.userId }

        Object.entries(formData).map(([key, value]) => tempTrip[key] = value);

        TripService.editTrip(tempTrip).then((res) => {
            if (res.status === 200) {
                props.setTrip(res.data);
            }
        });
    }

    return (
        <Form onSubmit={handleSubmit(renameTrip)}>
            <Form.Label>Edit Trip name:</Form.Label>
            <Form.Control {...register("tripName")}></Form.Control>
            <Button variant="primary" type="submit"> Rename </Button>
        </Form>
    )
}

function Waypoint(props) {
    return (
        <tr>
            <td>
                {props.waypoint.waypointName}
            </td>
            <td>
                <Button variant="dark" onClick={() => props.setSelectedWaypoint(props.waypoint)}>Edit</Button>
                {!!props.deleteWaypoint && <Button variant="danger" onClick={() => props.deleteWaypoint(props.waypoint)}>Delete</Button>}
            </td>

        </tr>
    );
}

function WaypointEditor(props) {
    const [place, setPlace] = useState();
    const [travelMode, setTravelMode] = useState("DRIVING");

    const changeTravelMode = (mode) => setTravelMode(mode)

    const refreshMap = () => {
        props.setToggleMap(false);
    }

    return (
        <>
            <Col>
                <GoogleMaps setPlace={setPlace} waypoints={props.waypoints} selectedWaypoint={props.selectedWaypoint} travelMode={travelMode} />
                <br />
                <Dropdown className="d-inline">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" >
                        Travel Mode: {travelMode}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => changeTravelMode("DRIVING")}>Driving</Dropdown.Item>
                        <Dropdown.Item onClick={() => changeTravelMode("BICYCLING")}>Bicycling</Dropdown.Item>
                        <Dropdown.Item onClick={() => changeTravelMode("WALKING")}>Walking</Dropdown.Item>
                        <Dropdown.Item onClick={() => changeTravelMode("TRANSIT")}>Transit</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Button variant="primary" onClick={refreshMap}>Generate Trip</Button>
            </Col>
            <Col>
                {!!place && <PlaceInformation place={place} waypoint={props.selectedWaypoint} editWaypoint={props.editWaypoint} />}
            </Col>
        </>
    )
}


function PlaceInformation(props) {
    const { register, handleSubmit } = useForm();

    const saveTrip = (formData) => {
        let tempWaypoint = props.waypoint;
        Object.entries(formData).map(([key, value]) => tempWaypoint[key] = value);
        tempWaypoint["placeId"] = props.place["place_id"];
        props.editWaypoint(tempWaypoint);
    }

    return (
        <Container>
            <h1>{props.waypoint.waypointName}</h1>
            <hr />
            <h2>{props.place.name}</h2>
            {!!props.place.photos && <img src={props.place.photos[0].getUrl()} alt="Not Found!" width="100%" />}
            <Form onSubmit={handleSubmit(saveTrip)}>
                <Form.Label>Waypoint Name:</Form.Label>
                <Form.Control placeholder="Trip Name" {...register("waypointName")}></Form.Control>
                <br />
                <Button variant="primary" type="submit">Save Waypoint</Button>
            </Form>
        </Container>
    )
}

export default WaypointComponent
