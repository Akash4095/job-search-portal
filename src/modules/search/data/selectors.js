

export const getIsFetchedSearchByQuery = (state, prop) => state.searchReducer.fetchedSearchedByQuery

export const getIsAddUserList = (state, prop) => state.searchReducer.addUserListRes
export const getIsUserList = (state, prop) => state.searchReducer.getUserListRes
export const getIsProfileDetails = (state, prop) => state.searchReducer.fetchedProfileDetailsRes

export const getIsAddProfileToListRes = (state, prop) => state.searchReducer.addProfileToListRes
export const getIsDeleteProfileFromListRes = (state, prop) => state.searchReducer.deleteProfileFromListRes