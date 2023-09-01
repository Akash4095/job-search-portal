import { combineReducers } from "redux";
import { merge } from "lodash";



const defaultSearchParams = {
    isUserListFetched: false,

}

function fetchedSearchedByQuery(state = { status: "", data: [] }, action) {
    if (action.type === 'FETCHED_SEARCH_BY_QUERY') {
        return action.payload

    } if (action.type === 'VIEW_MORE_SEARCH_RES') {
        if (action.payload.data && action.payload.data !== undefined && action.payload.data.length) {
            return {
                ...state,
                status: action.payload.status,
                data: [...state.data, ...action.payload.data]
            };
        } else {
            return {
                ...state,
                status: action.payload.status,
            }
        }
    }
    if (action.type === 'CLEAR_SEARCH_BY_QUERY') {
        return { status: "", data: [] }

    }
    else {
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
    }
    if (action.type === 'CLEAR_PROFILE_DETAILS_RES') {
        return {}
    } else {
        return state
    }
}

function saveProfileDetailsPayload(state = {}, action) {
    if (action.type === 'SAVE_PROFILE_DETAILS_PAYLOAD') {
        return action.payload
    } else {
        return state
    }
}

function addProfileToListRes(state = {}, action) {
    if (action.type === 'ADD_PROFILE_TO_LIST_RES') {
        return action.payload
    }
    if (action.type === 'CLEAR_PROFILE_TO_LIST_RES') {
        return {}
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

function params(state = defaultSearchParams, action) {

    if (action.type === 'GET_USER_LIST_RES') {
        return {
            ...state,
            isUserListFetched: true,
        }
    }
    else {
        return state
    }


}

const searchReducer = combineReducers({
    fetchedSearchedByQuery,
    addUserListRes,
    getUserListRes,
    fetchedProfileDetailsRes,
    saveProfileDetailsPayload,
    addProfileToListRes,
    deleteProfileFromListRes,
    params,

})

export default searchReducer;