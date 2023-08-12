import * as type from './types'

export function fetchSearchByQuery(props) {
    return {
        type: type.FETCH_SEARCH_BY_QUERY,
        payload: props,
    };
}

export function fetchedSearchByQuery(props) {
    return {
        type: type.FETCHED_SEARCH_BY_QUERY,
        payload: props,
    };
}

export function addUserList(props) {
    return {
        type: type.ADD_USER_LIST,
        payload: props,
    };
}

export function addUserListRes(props) {
    return {
        type: type.ADD_USER_LIST_RES,
        payload: props,
    };
}

export function getUserList(props) {
    return {
        type: type.GET_USER_LIST,
        payload: props,
    };
}

export function getUserListRes(props) {
    return {
        type: type.GET_USER_LIST_RES,
        payload: props,
    };
}

export function fetchProfileDetails(props) {
    return {
        type: type.FETCH_PROFILE_DETAILS,
        payload: props,
    };
}

export function fetchedProfileDetails(props) {
    return {
        type: type.FETCHED_PROFILE_DETAILS_RES,
        payload: props,
    };
}

export function addProfileToList(props) {
    return {
        type: type.ADD_PROFILE_TO_LIST,
        payload: props,
    };
}

export function addProfileToListRes(props) {
    return {
        type: type.ADD_PROFILE_TO_LIST_RES,
        payload: props,
    };
}

export function deleteProfileFromList(props) {
    return {
        type: type.DELETE_PROFILE_FROM_LIST,
        payload: props,
    };
}

export function deleteProfileFromListRes(props) {
    return {
        type: type.DELETE_PROFILE_FROM_LIST_RES,
        payload: props,
    };
}