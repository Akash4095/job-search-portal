import * as type from './types'

export function fetchLinkedinKeys(props) {
    return {
        type: type.FETCH_LINKEDIN_KEYS,
        payload: props,
    };
}

export function fetchedLinkedinKeys(props, res) {
    return {
        type: type.FETCHED_LINKEDIN_KEYS,
        payload: props,
    }
}

export function sendLinkedInCode(props) {
    return {
        type: type.SEND_LINKEDIN_CODE,
        payload: props,
    };
}

export function getResponseOfCode(props, res) {
    return {
        type: type.GET_RESPONSE_OF_CODE,
        payload: props,
    }
}


export function saveSearchedComponentText(props) {
    return {
        type: type.SAVE_SEARCHED_COMPONENT_TEXT,
        payload: props,
    };
}

export function getSearchedComponentText(props) {
    return {
        type: type.GET_SEARCHED_COMPONENT_TEXT,
        payload: props,
    };
}