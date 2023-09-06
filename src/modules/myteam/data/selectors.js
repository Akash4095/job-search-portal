import { sendInvite } from "./model"


export const getIsSendInvite = (state, props) => {
    return sendInvite()
}

export const getIsSendInviteRes = (state, prop) => state.myteam.sendInviteRes
export const getIsUpdateProfileRes = (state, prop) => state.myteam.updateProfileRes
