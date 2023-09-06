import { combineReducers } from "redux";
import { merge } from "lodash";



const defaultMyteamParams = {
    isUserListFetched: false,

}

function sendInviteRes(state = {}, action) {
    if (action.type === 'SEND_INVITE_RES') {
        return action.payload

    }
    if (action.type === 'CLEAR_SEND_INVITE_RES') {
        return {}

    }
    else {
        return state
    }
}

function updateProfileRes(state = {}, action) {
    if (action.type === 'UPDATE_PROFILE_RES') {
        return action.payload

    }
    if (action.type === 'CLEAR_UPDATE_PROFILE_RES') {
        return {}

    }
    else {
        return state
    }
}

const myteam = combineReducers({
    sendInviteRes,
    updateProfileRes,

})

export default myteam;