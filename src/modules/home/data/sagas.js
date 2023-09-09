import { call, takeEvery, put, all, select } from 'redux-saga/effects'
import { BASE_URL, getToken } from '../../../store/path'
import { fetchedAllNotification, fetchedDashboardDetails, fetchedLinkedinKeys, fetchedNotificationCount, fetchedUserProfileDetails, getLoginAuthRes, updateAllNotificationRes, updateUserProfileDetailsRes, userReactLoginRes } from "./actions";
import axios from "axios"
import { getIsAuthFetched, getIsKeysFetched } from './selectors';



// region for react login

function* userReactLogin() {
    yield takeEvery('USER_REACT_LOGIN', requestReactLogin);
}

function* requestReactLogin(action) {

    const { response, error } = yield call(requestReactLoginAPI, action.payload)
    if (response) {
        yield put(userReactLoginRes(response.data))
    }
    else {
        sagaErrorMessage(error, action)
    }

}

async function requestReactLoginAPI(data) {
    let sessionUserId = data
    try {
        const response = await axios.get(BASE_URL + `/user/reactlogin/${sessionUserId}`, { headers: { Authorization: getToken() }, });
        return ({ response });
    } catch (error) {
        return ({ error });
    }
}

// End region

// region for get linked in keys

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

// region for fetchdashboard details

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
    try {
        const response = await axios.get(BASE_URL + `/get/dashboarddetails/${sessionUserId}`, { headers: { Authorization: getToken() } });
        return ({ response });
    } catch (error) {
        return ({ error });
    }
}

// End region

// region for fetch user Profile details

function* fetchUserProfileUserDetails() {
    yield takeEvery('FETCH_USER_PROFILE_DETAILS', requestProfileDetails);
}

function* requestProfileDetails(action) {

    const { response, error } = yield call(requestProfileDetailsAPI, action.payload)
    if (response) {
        yield put(fetchedUserProfileDetails(response.data))
    }
    else {
        sagaErrorMessage(error, action)
    }

}

async function requestProfileDetailsAPI(data) {
    let sessionUserId = data
    try {
        const response = await axios.get(BASE_URL + `/user/get/profiledetails/${sessionUserId}`, { headers: { Authorization: getToken() }, });
        return ({ response });
    } catch (error) {
        return ({ error });
    }
}

// End region

// region for update user Profile details

function* updateUserProfileUserDetails() {
    yield takeEvery('UPDATE_USER_PROFILE_DETAILS', requestUpdateProfileDetails);
}

function* requestUpdateProfileDetails(action) {
    const { response, error } = yield call(requestUpdateProfileDetailsAPI, action.payload)
    if (response) {
        yield put(updateUserProfileDetailsRes(response.data))
    }
    else {
        sagaErrorMessage(error, action)
    }
}

async function requestUpdateProfileDetailsAPI(data) {
    try {
        const response = await axios.post(BASE_URL + '/user/update/profiledetails', data, { headers: { Authorization: getToken() } });
        return ({ response });
    } catch (error) {
        return ({ error });
    }
}

// End region

// region for notification count

function* fetchNotificationCount() {
    yield takeEvery('FETCH_NOTIFICATION_COUNT', reqNotificationCount);
}

function* reqNotificationCount(action) {

    const { response, error } = yield call(reqNotificationCountAPI, action.payload)
    if (response) {
        yield put(fetchedNotificationCount(response.data))
    }
    else {
        sagaErrorMessage(error, action)
    }

}

async function reqNotificationCountAPI(data) {
    let sessionUserId = data
    try {
        const response = await axios.get(BASE_URL + `/count/notifications/${sessionUserId}`, { headers: { Authorization: getToken() }, });
        return ({ response });
    } catch (error) {
        return ({ error });
    }
}

// End region

// region for notification count

function* fetchAllNotification() {
    yield takeEvery('FETCH_ALL_NOTIFICATION', reqAllNotification);
}

function* reqAllNotification(action) {

    const { response, error } = yield call(reqAllNotificationAPI, action.payload)
    if (response) {
        yield put(fetchedAllNotification(response.data))
    }
    else {
        sagaErrorMessage(error, action)
    }

}

async function reqAllNotificationAPI(data) {
    let sessionUserId = data
    try {
        const response = await axios.get(BASE_URL + `/user/notifications/${sessionUserId}`, { headers: { Authorization: getToken() }, });
        return ({ response });
    } catch (error) {
        return ({ error });
    }
}

// End region

// region for update all notification

function* updateAllNotification() {
    yield takeEvery('UPDATE_ALL_NOTIFICATION', requestupdateNotification);
}

function* requestupdateNotification(action) {
    const { response, error } = yield call(requestupdateNotificationAPI, action.payload)
    if (response) {
        yield put(updateAllNotificationRes(response.data))
    }
    else {
        sagaErrorMessage(error, action)
    }
}

async function requestupdateNotificationAPI(data) {
    try {
        const response = await axios.post(BASE_URL + '/user/update/notifications', data, { headers: { Authorization: getToken() } });
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
        userReactLogin(),
        sendLinkedInCode(),
        fetchDashboardDetail(),
        fetchUserProfileUserDetails(),
        updateUserProfileUserDetails(),
        fetchNotificationCount(),
        fetchAllNotification(),
        updateAllNotification(),
    ])
}
