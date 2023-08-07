import { all } from 'redux-saga/effects'
import homesagas from '../modules/home/data/sagas'



export default function* rootSaga() {
  yield all([
    homesagas()
  ])
} 