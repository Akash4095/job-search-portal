import { combineReducers } from "redux";
import { merge } from "lodash";


function fetchedLinkedinKeysReducer(state = {}, action) {
    if (action.type === 'FETCHED_LINKEDIN_KEYS') {
        return action.payload
    } else {
        return state
    }
}


function getLinkedinCodeResponse(state = {}, action) {
    if (action.type === 'GET_RESPONSE_OF_CODE') {
        return action.payload
    } else {
        return state
    }
}

function getSearchedText(state = "", action) {
    if (action.type === 'GET_SEARCHED_COMPONENT_TEXT') {
        return action.payload
    } else {
        return state
    }
}


const homepageReducer = combineReducers({
    fetchedLinkedinKeysReducer,
    getLinkedinCodeResponse,
    getSearchedText,

})

export default homepageReducer;