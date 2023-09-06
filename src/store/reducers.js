import { txns } from './txnMiddleware'
import { combineReducers } from 'redux'
import homepage from '../modules/home/data/reducers'
import searchReducer from '../modules/search/data/reducers'
import listReducer from '../modules/list/data/reducers'
import myteam from '../modules/myteam/data/reducers'


const rootReducer = () => combineReducers({
    txns,
    homepage,
    searchReducer,
    listReducer,
    myteam,
})

export default rootReducer