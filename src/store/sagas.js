import { all } from 'redux-saga/effects'
import homesagas from '../modules/home/data/sagas'
import searchsagas from '../modules/search/data/sagas'
import listsagas from '../modules/list/data/sagas'



export default function* rootSaga() {
  yield all([
    homesagas(),
    searchsagas(),
    listsagas()
  ])
} 