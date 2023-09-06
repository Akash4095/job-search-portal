import * as type from './types'

export function sendInvite(props) {
    return {
        type: type.SEND_INVITE,
        payload: props,
    };
}

export function sendInviteRes(props) {
    return {
        type: type.SEND_INVITE_RES,
        payload: props,
    };
}

export function clearSendInviteRes(props) {
    return {
        type: type.CLEAR_SEND_INVITE_RES,
        payload: props,
    };
}

export function updateProfile(props) {
    return {
        type: type.UPDATE_PROFILE,
        payload: props,
    };
}

export function updateProfileRes(props) {
    return {
        type: type.UPDATE_PROFILE_RES,
        payload: props,
    };
}

export function clearUpdateProfileRes(props) {
    return {
        type: type.CLEAR_UPDATE_PROFILE_RES,
        payload: props,
    };
}