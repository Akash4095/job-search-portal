import { sendInvite, updateInitialValues } from "./model"


export const getIsUpdateInitialValues = (state, props) => {
    return updateInitialValues()
}

export const getIsSendInvite = (state, props) => {
    return sendInvite()
}

export const getIsSendInviteRes = (state, prop) => state.myteam.sendInviteRes
export const getIsUpdateProfileRes = (state, prop) => state.myteam.updateProfileRes
