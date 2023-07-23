import { txns } from './txnMiddleware'
import { combineReducers } from 'redux'


const rootReducer = () => combineReducers({
    txns,
})

export default rootReducer