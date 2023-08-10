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