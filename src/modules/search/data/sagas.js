import { call, takeEvery, put, all, select } from 'redux-saga/effects'
import { BASE_URL, getToken } from '../../../store/path'
import { addUserListRes, fetchedSearchByQuery, getUserListRes } from "./actions";
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
        const response = await axios.post(BASE_URL + `/get/userlist/${userId}`, data, { headers: { Authorization: getToken() }, });
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
    ])
}
