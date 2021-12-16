function Waypoints(props) {
    const waypoints = props.selectedTrip.waypoints;
    return (
        <div className="container">

            <h1>Waypoints:</h1>

            <table className="table table-striped">
                <th>
                    <tr>
                        <th>Waypoint Name</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                    </tr>
                </th>
                {
                    waypoints.map(waypoint =>
                        <tr>
                            <th>Waypoint Name: {waypoint.waypointName}</th>
                            <th>Waypoint Latitude: {waypoint.latitude}</th>
                            <th>Waypoint Longitude: {waypoint.longitude}</th>
                        </tr>
                    )
                }
            </table>

            <div id="GoogleMapGoesHere"></div>
        </div>
    );
}

export default Waypoints;