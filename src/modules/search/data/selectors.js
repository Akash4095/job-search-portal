import { createSelector } from "@reduxjs/toolkit"


export const getIsFetchedSearchByQuery = (state, prop) => state.searchReducer.fetchedSearchedByQuery

export const getIsAddUserList = (state, prop) => state.searchReducer.addUserListRes
export const getIsUpdateUserList = (state, prop) => state.searchReducer.updateUserListRes
export const getIsDeleteUserList = (state, prop) => state.searchReducer.deleteUserListRes
export const getIsUserList = (state, prop) => state.searchReducer.getUserListRes
export const getIsProfileDetails = (state, prop) => state.searchReducer.fetchedProfileDetailsRes 
export const getIsProfileDetailsPayload = (state, prop) => state.searchReducer.saveProfileDetailsPayload 

export const getIsAddProfileToListRes = (state, prop) => state.searchReducer.addProfileToListRes
export const getIsDeleteProfileFromListRes = (state, prop) => state.searchReducer.deleteProfileFromListRes

export const getIsUserListFetched = (state, prop) => state.searchReducer.params.isUserListFetched

export const selectUserListOptions = createSelector(
    getIsUserList,
    userProfile => {
        let list = userProfile.list ? userProfile.list : []
        const keys = Object.keys(list)
        const obj = keys.map((key) => {
            return { key: key, value: list[key].id, text: list[key].listname }

        })
        return obj
    }
)