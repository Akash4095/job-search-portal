import { call, takeEvery, put, all, select } from 'redux-saga/effects'
import { BASE_URL, getToken } from '../../../store/path'
import { fetchSearchByQuery} from "./actions";
import axios from "axios"



// region for send code

function* fetchSearchByQuery() {
    yield takeEvery('FETCH_SEARCH_BY_QUERY', getQuerySearchFunc);
}

function* getQuerySearchFunc(action) {

    const { response, error } = yield call(getQuerySearchFuncAPI, action.payload)
    if (response) {
        yield put(fetchSearchByQuery(response.data))
    }
    else {
        sagaErrorMessage(error, action)
    }
}

async function getQuerySearchFuncAPI(data) {
    try {
        const response = await axios.post(BASE_URL + '/searchbyquery', data, {headers: { Authorization: getToken()},});
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
    ])
}
