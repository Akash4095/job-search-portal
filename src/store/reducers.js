import { txns } from './txnMiddleware'
import { combineReducers } from 'redux'
import homepage from '../modules/home/data/reducers'
import searchReducer from '../modules/search/data/reducers'
import listReducer from '../modules/list/data/reducers'


const rootReducer = () => combineReducers({
    txns,
    homepage,
    searchReducer,
    listReducer,
})

export default rootReducer