import { call, takeEvery, put, all, select } from 'redux-saga/effects'
import { BASE_URL, getToken } from '../../../store/path'
import { fetchedLinkedinKeys, getResponseOfCode } from "./actions";
import userACL from "../../../store/access";
import { merge } from "lodash";
import axios from "axios";




// region for send code

function* fetchLinkedinKeys() {
    yield takeEvery('FETCH_LINKEDIN_KEYS', getLinkedinKeysFunc);
}

function* getLinkedinKeysFunc(action) {

    const { response, error } = yield call(fetchLinkedInKeysAPI)
    console.log('response', response)
    if (response) {
        // yield put(fetchedLinkedinKeys(response.data))
    }
    else {
        sagaErrorMessage(error, action)
    }
}

async function fetchLinkedInKeysAPI() {
    try {
        const response = await axios.get(BASE_URL + '/user/getlinkedinkeys', {headers: { Authorization: getToken()}, Accept: '*/*',});
        return ({ response });
    } catch (error) {
        return ({ error });
    }
}

// End region

// region for send code

function* sendLinkedInCode() {
    yield takeEvery('SEND_LINKEDIN_CODE', sendCode);
}

function* sendCode(action) {

    const { response, error } = yield call(sendCodeAPI, action.payload)
    if (response) {
        yield put(getResponseOfCode(action.payload, response.data))
    }
    else {
        sagaErrorMessage(error, action)
    }
}

async function sendCodeAPI(data) {
    try {
        const response = await axios.post(BASE_URL + '/sendcode', data, { crossDomain: true });
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

export default function* homesagas() {
    yield all([
        fetchLinkedinKeys(),
        sendLinkedInCode(),
    ])
}
