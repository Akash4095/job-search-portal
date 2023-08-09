import { combineReducers } from "redux";
import { merge } from "lodash";


const defaultAuthParams = {
    isAuthFetched: false,
    isKeysFetched: false,

}

function fetchedLinkedinKeysReducer(state = {}, action) {
    if (action.type === 'FETCHED_LINKEDIN_KEYS') {
        return action.payload
    } else {
        return state
    }
}


function getLoginAuthResponse(state = {}, action) {
    if (action.type === 'GET_LOGIN_AUTH_RESPONSE') {
        return action.payload
    } else {
        return state
    }
}

function getSearchedText(state = "", action) {
    if (action.type === 'GET_SEARCHED_COMPONENT_TEXT') {
        console.log('action.payload', action.payload)
        return action.payload
    } else {
        return state
    }
}

function fetchedDashBoardDetails(state = {}, action) {
    if (action.type === 'FETCHED_DASHBOARD_DETAILS') {
        return action.payload
    } else {
        return state
    }
}

function params(state = defaultAuthParams, action) {
    if (action.type === 'GET_LOGIN_AUTH_RESPONSE') {
        return {
            ...state,
            isAuthFetched: true,
        }
    }
    if (action.type === 'FETCHED_LINKEDIN_KEYS') {
        return {
            ...state,
            isKeysFetched: true,
        }
    }
    else {
        return state
    }


}

const homepageReducer = combineReducers({
    fetchedLinkedinKeysReducer,
    getLoginAuthResponse,
    getSearchedText,
    fetchedDashBoardDetails,
    params,

})

export default homepageReducer;