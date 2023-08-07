import { combineReducers } from "redux";
import { merge } from "lodash";


function fetchedLinkedinKeysReducer(state = {}, action) {
    if (action.type === 'FETCHED_LINKEDIN_KEYS ') {
        return action.payload
    } else {
        return state
    }
}


function getLinkedinCodeResponse(state = {}, action) {
    if (action.type === 'GET_RESPONSE_OF_CODE ') {
        return action.payload
    } else {
        return state
    }
}



const homepage = combineReducers({
    fetchedLinkedinKeysReducer,
    getLinkedinCodeResponse,

})

export default homepage