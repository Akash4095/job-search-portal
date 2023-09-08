import { combineReducers } from "redux";
import { merge } from "lodash";


const defaultAuthParams = {
    isAuthFetched: false,
    isKeysFetched: false,
    userProfileFetched: false,

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

function getUserReactLoginRes(state = {}, action) {
    if (action.type === 'USER_REACT_LOGIN_RESPONSE') {
        return action.payload
    }
    if (action.type === 'CLEAR_USER_REACT_LOGIN_RESPONSE') {
        return {}
    } else {
        return state
    }
}

function getSearchedText(state = "", action) {
    if (action.type === 'GET_SEARCHED_COMPONENT_TEXT') {
        return action.payload
    }
    if (action.type === 'CLEAR_SEARCHED_COMPONENT_TEXT') {
        return ""
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

function fetchedUserProfileDetails(state = {}, action) {
    if (action.type === 'FETCHED_USER_PROFILE_DETAILS') {
        return action.payload
    }
    if (action.type === 'CLEAR_FETCHED_USER_PROFILE_DETAILS') {
        return {}
    }
    else {
        return state
    }
}

function updatedUserProfileDetails(state = {}, action) {
    if (action.type === 'UPDATE_USER_PROFILE_DETAILS_RES') {
        return action.payload
    }
    if (action.type === 'CLEAR_UPDATE_USER_PROFILE_DETAILS_RES') {
        return {}
    }
    else {
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
    if (action.type === 'FETCHED_USER_PROFILE_DETAILS') {
        return {
            ...state,
            userProfileFetched: true,
        }
    }
    if (action.type === 'CLEAR_FETCHED_USER_PROFILE_DETAILS') {
        return {
            ...state,
            userProfileFetched: false,
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
    fetchedUserProfileDetails,
    updatedUserProfileDetails,
    getUserReactLoginRes,
    params,

})

export default homepageReducer;