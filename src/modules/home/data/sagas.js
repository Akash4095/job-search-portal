import { call, takeEvery, put, all, select } from 'redux-saga/effects'
import { BASE_URL, getToken } from '../../../store/path'
import { fetchedDashboardDetails, fetchedLinkedinKeys, getLoginAuthRes } from "./actions";
import axios from "axios"
import { getIsAuthFetched, getIsKeysFetched } from './selectors';



// region for send code

function* fetchLinkedinKeys() {
    yield takeEvery('FETCH_LINKEDIN_KEYS', getLinkedinKeysFunc);
}

function* getLinkedinKeysFunc(action) {
    const isKeysFetched = yield select(getIsKeysFetched);
    if (!isKeysFetched) {
        const { response, error } = yield call(fetchLinkedInKeysAPI)
        if (response) {
            yield put(fetchedLinkedinKeys(response.data))
        }
        else {
            sagaErrorMessage(error, action)
        }
    }

}

async function fetchLinkedInKeysAPI() {
    try {
        const response = await axios.get(BASE_URL + '/user/getlinkedinkeys', { headers: { Authorization: getToken() }, });
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

    const isAuthFetched = yield select(getIsAuthFetched);
    if (!isAuthFetched) {
        const { response, error } = yield call(sendCodeAPI, action.payload)
        if (response) {
            yield put(getLoginAuthRes(response.data))
        }
        else {
            sagaErrorMessage(error, action)
        }
    }

}

async function sendCodeAPI(data) {
    try {
        const response = await axios.post(BASE_URL + '/user/linkedinauth', data, { headers: { Authorization: getToken() } });
        return ({ response });
    } catch (error) {
        return ({ error });
    }
}

// End region

// region for send code

function* fetchDashboardDetail() {
    yield takeEvery('FETCH_DASHBOARD_DETAILS', callDashboardDetails);
}

function* callDashboardDetails(action) {

    const { response, error } = yield call(callDashboardDetailsAPI, action.payload)
    if (response) {
        yield put(fetchedDashboardDetails(response.data))
    }
    else {
        sagaErrorMessage(error, action)
    }
}

async function callDashboardDetailsAPI(data) {
    let sessionUserId = data
    console.log('sessionUserId', sessionUserId)
    try {
        const response = await axios.get(BASE_URL + `/get/dashboarddetails/${sessionUserId}`, { headers: { Authorization: getToken() } });
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
        fetchDashboardDetail(),
    ])
}
