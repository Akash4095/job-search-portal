import { combineReducers } from "redux";
import { merge } from "lodash";


function fetchedSearchedByQuery(state = {}, action) {
    if (action.type === 'FETCHED_SEARCH_BY_QUERY') {
        return action.payload
    } else {
        return state
    }
}


const searchReducer = combineReducers({
    fetchedSearchedByQuery,

})

export default searchReducer;