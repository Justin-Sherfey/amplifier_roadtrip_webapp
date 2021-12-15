import waypointReducer from './waypointReducer'
import tripReducer from './tripReducer'
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    tripReducer,
    waypointReducer
});

export default allReducers;