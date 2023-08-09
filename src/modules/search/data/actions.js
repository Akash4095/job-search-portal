

export function fetchSearchByQuery(props) {
    return {
        type: type.FETCH_SEARCH_BY_QUERY,
        payload: props,
    };
}

export function fetchedSearchByQuery(props) {
    return {
        type: type.FETCHED_SEARCH_BY_QUERY,
        payload: props,
    };
}