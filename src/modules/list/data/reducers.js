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

function saveListProfileDetailsPayload(state = {}, action) {
    if (action.type === 'SAVE_LIST_PROFILE_DETAILS_PAYLOAD') {
        return action.payload
    } else {
        return state
    }
}

function fetchedProfileContactDetails(state = {}, action) {
    if (action.type === 'FETCHED_PROFILE_CCONTACTS_DETAILS') {
        return action.payload
    } else {
        return state
    }
}


function addTagsRes(state = {}, action) {
    if (action.type === 'ADD_TAGS_RES') {
        return action.payload
    } if (action.type === 'CLEAR_TAGS_RES') {
        return {}
    }
    else {
        return state
    }
}

function saveSidebarListPayload(state = {}, action) {
    if (action.type === 'SAVE_SIDEBAR_LIST_PAYLOAD') {
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
    saveListProfileDetailsPayload,
    fetchedProfileContactDetails,
    addTagsRes,
    saveSidebarListPayload,
    deleteListProfileRes

})

export default listReducer;