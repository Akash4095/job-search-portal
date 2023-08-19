import { createSelector } from "@reduxjs/toolkit"


export const getIsFetchedList = (state, prop) => state.listReducer.fetchedList
export const getIsFetchedListResSave = (state, prop) => state.listReducer.fetchedListResSave

export const getIsListProfileDetails = (state, prop) => state.listReducer.fetchedListProfileDetails
export const getIsListProfileDetailsPayload = (state, prop) => state.listReducer.saveListProfileDetailsPayload

export const getIsProfileContactDetails = (state, prop) => state.listReducer.fetchedProfileContactDetails
export const getIsTagsRes = (state, prop) => state.listReducer.addTagsRes
export const getIsSidebarListPayload = (state, prop) => state.listReducer.saveSidebarListPayload

export const getIsListDeletedRes = (state, prop) => state.listReducer.deleteListProfileRes



