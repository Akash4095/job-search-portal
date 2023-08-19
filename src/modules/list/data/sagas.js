import { call, takeEvery, put, all, select } from 'redux-saga/effects'
import { BASE_URL, getToken } from '../../../store/path'
import { addProfileToListRes, fetchedList, fetchedListProfileDetails, fetchedProfileContactDetails, addTagsRes, deleteListProfileRes, fetchedListResSave } from "./actions";
import axios from "axios"



// region for fetch list

function* fetchList() {
    yield takeEvery('FETCH_LIST', requestList);
}

function* requestList(action) {

    const { response, error } = yield call(requestListAPI, action.payload)
    if (response) {
        yield put(fetchedList(response.data))
        yield put(fetchedListResSave(response.data))
    }
    else {
        sagaErrorMessage(error, action)
    }
}

async function requestListAPI(data) {
    try {
        const response = await axios.post(BASE_URL + '/get/profilevialistid', data, { headers: { Authorization: getToken() }, });
        return ({ response });
    } catch (error) {
        return ({ error });
    }
}

// End region

// region for profile details

function* fetchListProfileDetails() {
    yield takeEvery('FETCH_LIST_PROFILE_DETAILS', requestListProfileDetails);
}

function* requestListProfileDetails(action) {

    const { response, error } = yield call(requestListProfileDetailsAPI, action.payload)
    if (response) {
        yield put(fetchedListProfileDetails(response.data))
    }
    else {
        sagaErrorMessage(error, action)
    }
}

async function requestListProfileDetailsAPI(data) {
    try {
        const response = await axios.post(BASE_URL + '/fetchprofiledetailvialist', data, { headers: { Authorization: getToken() }, });
        return ({ response });
    } catch (error) {
        return ({ error });
    }
}

// End region


// region for add user

function* fetchListContactDetails() {
    yield takeEvery('FETCH_PROFILE_CCONTACTS_DETAILS', fetchListContactDetailsFunc);
}

function* fetchListContactDetailsFunc(action) {

    const { response, error } = yield call(fetchListContactDetailsAPI, action.payload)
    if (response) {
        yield put(fetchedProfileContactDetails(response.data))
    }
    else {
        sagaErrorMessage(error, action)
    }
}

async function fetchListContactDetailsAPI(data) {
    let userId = data.userid
    try {
        const response = await axios.post(BASE_URL + `/fetchprofilecontactdetailsvialist`, data, { headers: { Authorization: getToken() }, });
        return ({ response });
    } catch (error) {
        return ({ error });
    }
}

// End region

// region for fetch profile details

function* addTags() {
    yield takeEvery('ADD_TAGS', requestAddTags);
}

function* requestAddTags(action) {

    const { response, error } = yield call(requestAddTagsAPI, action.payload)
    if (response) {
        yield put(addTagsRes(response.data))
    }
    else {
        sagaErrorMessage(error, action)
    }
}

async function requestAddTagsAPI(data) {
    try {
        const response = await axios.post(BASE_URL + '/add/tags', data, { headers: { Authorization: getToken() }, });
        return ({ response });
    } catch (error) {
        return ({ error });
    }
}

// End region

// region for add user  to list

// function* addUserToList() {
//     yield takeEvery('ADD_PROFILE_TO_LIST', requestAddUserToList);
// }

// function* requestAddUserToList(action) {

//     const { response, error } = yield call(addUserToListAPI, action.payload)
//     if (response) {
//         yield put(addProfileToListRes(response.data))
//     }
//     else {
//         sagaErrorMessage(error, action)
//     }
// }

// async function addUserToListAPI(data) {
//     try {
//         const response = await axios.post(BASE_URL + '/add/profiletolist', data, { headers: { Authorization: getToken() }, });
//         return ({ response });
//     } catch (error) {
//         return ({ error });
//     }
// }

// // End region

// region for delete user from list

function* deleteProfileFromList() {
    yield takeEvery('DELETE_LIST_PROFILE', requestdeleteProfileFromList);
}

function* requestdeleteProfileFromList(action) {

    const { response, error } = yield call(deleteProfileFromListAPI, action.payload)
    if (response) {
        yield put(deleteListProfileRes(response.data))
    }
    else {
        sagaErrorMessage(error, action)
    }
}

async function deleteProfileFromListAPI(data) {
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

export default function* listsagas() {
    yield all([
        fetchList(),
        fetchListProfileDetails(),
        fetchListContactDetails(),
        addTags(),
        deleteProfileFromList(),
    ])
}
