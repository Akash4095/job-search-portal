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

const searchReducer = combineReducers({
    fetchedSearchedByQuery,
    addUserListRes,
    getUserListRes,

})

export default searchReducer;