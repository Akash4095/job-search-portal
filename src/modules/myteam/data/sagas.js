import { call, takeEvery, put, all, select } from 'redux-saga/effects'
import { BASE_URL, getToken } from '../../../store/path'
import { sendInviteRes } from "./actions";
import axios from "axios"



// region for send invite 

function* sendInvite() {
    yield takeEvery('SEND_INVITE', reqSendInvite);
}

function* reqSendInvite(action) {

    const { response, error } = yield call(reqSendInviteAPI, action.payload)
    if (response) {
        yield put(sendInviteRes(response.data))
    }
    else {
        sagaErrorMessage(error, action)
    }
}

async function reqSendInviteAPI(data) {
    try {
        const response = await axios.post(BASE_URL + '/sendinvite', data, { headers: { Authorization: getToken() } });
        return ({ response });
    } catch (error) {
        return ({ error });
    }
}

// End region

// region for send invite 

function* updatePofile() {
    yield takeEvery('SEND_INVITE', reqUpdateProfile);
}

function* reqUpdateProfile(action) {

    const { response, error } = yield call(reqUpdateProfileAPI, action.payload)
    if (response) {
        yield put(sendInviteRes(response.data))
    }
    else {
        sagaErrorMessage(error, action)
    }
}

async function reqUpdateProfileAPI(data) {
    try {
        const response = await axios.post(BASE_URL + '/updateprofile', data, { headers: { Authorization: getToken() } });
        return ({ response });
    } catch (error) {
        return ({ error });
    }
}

// End region


const sagaErrorMessage = (error, action) => {
    console.group("Saga Error:" + action.type);
    console.log(error);
    console.groupEnd();
}

export default function* myteamSagas() {
    yield all([
        sendInvite(),
        updatePofile(),
    ])
}