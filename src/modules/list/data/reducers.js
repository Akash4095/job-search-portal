import { combineReducers } from "redux";
import { merge } from "lodash";


function fetchedList(state = {}, action) {
    if (action.type === 'FETCHED_LIST') {
        return action.payload
    } else {
        return state
    }
}

function fetchedListResSave(state = {}, action) {
    if (action.type === 'FETCHED_LIST_RES_SAVE') {
        return action.payload
    }
    if (action.type === 'CLEAR_FETCHED_LIST') {
        return {}
    } else {
        return state
    }
}

function fetchedListProfileDetails(state = {}, action) {
    if (action.type === 'FETCHED_LIST_PROFILE_DETAILS') {
        return action.payload
    }
    else {
        return state
    }
}

function fetchedListContactDetails(state = {}, action) {
    if (action.type === 'FETCHED_LIST_CONTACT_DETAILS') {
        return action.payload
    } else {
        return state
    }
}


function addTagsRes(state = {}, action) {
    if (action.type === 'ADD_TAGS_RES') {
        return action.payload
    } else {
        return state
    }
}

function deleteListProfileRes(state = {}, action) {
    if (action.type === 'DELETE_LIST_PROFILE_RES') {
        return action.payload
    } else {
        return state
    }
}

const listReducer = combineReducers({
    fetchedList,
    fetchedListResSave,
    fetchedListProfileDetails,
    fetchedListContactDetails,
    addTagsRes,
    deleteListProfileRes

})

export default listReducer;