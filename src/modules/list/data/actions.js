import * as type from './types'

export function fetchList(props) {
    return {
        type: type.FETCH_LIST,
        payload: props,
    };
}

export function fetchedList(props) {
    return {
        type: type.FETCHED_LIST,
        payload: props,
    };
}

export function fetchedListResSave(props) {
    return {
        type: type.FETCHED_LIST_RES_SAVE,
        payload: props,
    };
}

export function clearFetchedList(props) {
    return {
        type: type.CLEAR_FETCHED_LIST,
        payload: props,
    };
}


export function fetchListProfileDetails(props) {
    return {
        type: type.FETCH_LIST_PROFILE_DETAILS,
        payload: props,
    };
}

export function fetchedListProfileDetails(props) {
    return {
        type: type.FETCHED_LIST_PROFILE_DETAILS,
        payload: props,
    };
}

export function fetchListContactDetails(props) {
    return {
        type: type.FETCHED_LIST_CONTACT_DETAILS,
        payload: props,
    };
}

export function fetchedListContactDetails(props) {
    return {
        type: type.FETCHED_LIST_CONTACT_DETAILS,
        payload: props,
    };
}


export function addTags(props) {
    return {
        type: type.ADD_TAGS,
        payload: props,
    };
}

export function addTagsRes(props) {
    return {
        type: type.ADD_TAGS_RES,
        payload: props,
    };
}

export function deleteListProfile(props) {
    return {
        type: type.DELETE_LIST_PROFILE,
        payload: props,
    };
}

export function deleteListProfileRes(props) {
    return {
        type: type.DELETE_LIST_PROFILE_RES,
        payload: props,
    };
}