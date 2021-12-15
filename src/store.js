import { createStore } from "redux"

const initialState = {
    currentValue: "100"
};

/**
 * 
 * @param {the previous state of the world} state 
 * @param {current action we want to process} action 
 * @returns {new or old state}
 */
function reducer(state = initialState,action){

    return state;
}

export const store = createStore(reducer);