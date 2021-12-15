export const add_trip = (trip) => {
    return {
        type: "ADD_TRIP",
        payload: trip
    }
}

export const remove_trip = (trip) => {
    return {
        type: "REMOVE_TRIP",
        payload: trip
    }
}

export const add_waypoint = (way) => {
    return {
        type: "ADD_WAYPOINT",
        payload: way
    }
}

export const remove_waypoint = (way) => {
    return {
        type: "REMOVE_WAYPOINT",
        payload: way
    }
}

