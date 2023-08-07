import { txns } from './txnMiddleware'
import { combineReducers } from 'redux'
import homepage from '../modules/home/data/reducers'


const rootReducer = () => combineReducers({
    txns,
    homepage,
})

export default rootReducer