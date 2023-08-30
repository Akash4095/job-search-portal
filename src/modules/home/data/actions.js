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

export function getLoginAuthRes(props, res) {
    return {
        type: type.GET_LOGIN_AUTH_RESPONSE,
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

export function fetchDashboardDetails(props) {
    return {
        type: type.FETCH_DASHBOARD_DETAILS,
        payload: props,
    };
}

export function fetchedDashboardDetails(props, res) {
    return {
        type: type.FETCHED_DASHBOARD_DETAILS,
        payload: props,
    }
}

export function fetchUserProfileDetails(props) {
    return {
        type: type.FETCH_USER_PROFILE_DETAILS,
        payload: props,
    };
}

export function fetchedUserProfileDetails(props) {
    return {
        type: type.FETCHED_USER_PROFILE_DETAILS,
        payload: props,
    }
}

export function clearFetchedUserProfileDetails(props) {
    return {
        type: type.CLEAR_FETCHED_USER_PROFILE_DETAILS,
        payload: props,
    }
}

export function updateUserProfileDetails(props) {
    return {
        type: type.UPDATE_USER_PROFILE_DETAILS,
        payload: props,
    };
}

export function updateUserProfileDetailsRes(props) {
    return {
        type: type.UPDATE_USER_PROFILE_DETAILS_RES,
        payload: props,
    }
}

export function clearUpdateUserProfileDetails(props) {
    return {
        type: type.CLEAR_UPDATE_USER_PROFILE_DETAILS_RES,
        payload: props,
    }
}