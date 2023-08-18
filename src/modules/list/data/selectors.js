import { createSelector } from "@reduxjs/toolkit"


export const getIsFetchedList = (state, prop) => state.listReducer.fetchedList

export const getIsListProfileDetails = (state, prop) => state.listReducer.fetchedListProfileDetails
export const getIsContactDetails = (state, prop) => state.listReducer.fetchedListContactDetails
export const getIsTagsRes = (state, prop) => state.listReducer.addTagsRes

export const getIsListDeletedRes = (state, prop) => state.listReducer.deleteListProfileRes



