//in this context "state" is a "trip"
const waypointReducer = (state = null,action) => {
    switch(action.type){
        case 'ADD_WAYPOINT':
            return state
        case 'REMOVE_WAYPOINT':
            return state
        default:
            return state;
    }
}