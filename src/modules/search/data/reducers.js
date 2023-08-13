import { combineReducers } from "redux";
import { merge } from "lodash";


function fetchedSearchedByQuery(state = {}, action) {
    if (action.type === 'FETCHED_SEARCH_BY_QUERY') {
        return action.payload
    } else {
        return state
    }
}


function addUserListRes(state = {}, action) {
    if (action.type === 'ADD_USER_LIST_RES') {
        return action.payload
    }
    if (action.type === 'CLEAR_USER_LIST_RES') {
        return {}
    } else {
        return state
    }
}

function getUserListRes(state = {}, action) {
    if (action.type === 'GET_USER_LIST_RES') {
        return action.payload
    } else {
        return state
    }
}

function fetchedProfileDetailsRes(state = {}, action) {
    if (action.type === 'FETCHED_PROFILE_DETAILS_RES') {
        return action.payload
    } else {
        return state
    }
}

function addProfileToListRes(state = {}, action) {
    if (action.type === 'ADD_PROFILE_TO_LIST_RES') {
        return action.payload
    } else {
        return state
    }
}

function deleteProfileFromListRes(state = {}, action) {
    if (action.type === 'DELETE_PROFILE_FROM_LIST_RES') {
        return action.payload
    } else {
        return state
    }
}

const searchReducer = combineReducers({
    fetchedSearchedByQuery,
    addUserListRes,
    getUserListRes,
    fetchedProfileDetailsRes,
    addProfileToListRes,
    deleteProfileFromListRes,

})

export default searchReducer;