import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import loggerMiddleware from './logger'
import { txnMiddleware } from './txnMiddleware' //logActionDiff
import { loadState } from './localStorage';
import rootSaga from './sagas'
import rootReducer from './reducers'


const sagaMiddleware = createSagaMiddleware();
const reducers = rootReducer();

const preloadedState = loadState();

const store = configureStore(
    {
        reducer: reducers,
        middleware: () => [sagaMiddleware, txnMiddleware, loggerMiddleware],
        preloadedState
    }
)

sagaMiddleware.run(rootSaga)
export default store; 