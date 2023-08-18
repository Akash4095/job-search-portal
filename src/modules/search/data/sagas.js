import { call, takeEvery, put, all, select } from 'redux-saga/effects'
import { BASE_URL, getToken } from '../../../store/path'
import { addProfileToListRes, addUserListRes, deleteProfileFromListRes, fetchedProfileDetails, fetchedSearchByQuery, getUserListRes } from "./actions";
import axios from "axios"



// region for send code

function* fetchSearchByQuery() {
    yield takeEvery('FETCH_SEARCH_BY_QUERY', getQuerySearchFunc);
}

function* getQuerySearchFunc(action) {

    const { response, error } = yield call(getQuerySearchFuncAPI, action.payload)
    if (response) {
        yield put(fetchedSearchByQuery(response.data))
    }
    else {
        sagaErrorMessage(error, action)
    }
}

async function getQuerySearchFuncAPI(data) {
    try {
        const response = await axios.post(BASE_URL + '/searchbyquery', data, { headers: { Authorization: getToken() }, });
        return ({ response });
    } catch (error) {
        return ({ error });
    }
}

// End region

// region for add user

function* addUserList() {
    yield takeEvery('ADD_USER_LIST', addUserListFunc);
}

function* addUserListFunc(action) {

    const { response, error } = yield call(addUserListAPI, action.payload)
    if (response) {
        yield put(addUserListRes(response.data))
    }
    else {
        sagaErrorMessage(error, action)
    }
}

async function addUserListAPI(data) {
    try {
        const response = await axios.post(BASE_URL + '/add/list', data, { headers: { Authorization: getToken() }, });
        return ({ response });
    } catch (error) {
        return ({ error });
    }
}

// End region


// region for add user

function* getUserList() {
    yield takeEvery('GET_USER_LIST', getUserListFunc);
}

function* getUserListFunc(action) {

    const { response, error } = yield call(getUserListAPI, action.payload)
    if (response) {
        yield put(getUserListRes(response.data))
    }
    else {
        sagaErrorMessage(error, action)
    }
}

async function getUserListAPI(data) {
    let userId = data.userid
    try {
        const response = await axios.get(BASE_URL + `/get/userlist/${userId}`,  { headers: { Authorization: getToken() }, });
        return ({ response });
    } catch (error) {
        return ({ error });
    }
}

// End region

// region for fetch profile details

function* fetchProfileDetails() {
    yield takeEvery('FETCH_PROFILE_DETAILS', requestProfileDetails);
}

function* requestProfileDetails(action) {

    const { response, error } = yield call(profileDetailsAPI, action.payload)
    if (response) {
        yield put(fetchedProfileDetails(response.data))
    }
    else {
        sagaErrorMessage(error, action)
    }
}

async function profileDetailsAPI(data) {
    try {
        const response = await axios.post(BASE_URL + '/fetchprofiledetail', data, { headers: { Authorization: getToken() }, });
        return ({ response });
    } catch (error) {
        return ({ error });
    }
}

// End region

// region for add user  to list

function* addUserToList() {
    yield takeEvery('ADD_PROFILE_TO_LIST', requestAddUserToList);
}

function* requestAddUserToList(action) {

    const { response, error } = yield call(addUserToListAPI, action.payload)
    if (response) {
        yield put(addProfileToListRes(response.data))
    }
    else {
        sagaErrorMessage(error, action)
    }
}

async function addUserToListAPI(data) {
    try {
        const response = await axios.post(BASE_URL + '/add/profiletolist', data, { headers: { Authorization: getToken() }, });
        return ({ response });
    } catch (error) {
        return ({ error });
    }
}

// End region

// region for delete user from list

function* deleteUserFromList() {
    yield takeEvery('DELETE_PROFILE_FROM_LIST', requestdeleteUserFromList);
}

function* requestdeleteUserFromList(action) {

    const { response, error } = yield call(deleteUserFromListAPI, action.payload)
    if (response) {
        yield put(deleteProfileFromListRes(response.data))
    }
    else {
        sagaErrorMessage(error, action)
    }
}

async function deleteUserFromListAPI(data) {
    try {
        const response = await axios.post(BASE_URL + '/delete/profilefrmlist', data, { headers: { Authorization: getToken() }, });
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

export default function* searchsagas() {
    yield all([
        fetchSearchByQuery(),
        addUserList(),
        getUserList(),
        fetchProfileDetails(),
        addUserToList(),
        deleteUserFromList(),
    ])
}
