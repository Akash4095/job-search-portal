

export const getIsLikedinKeysResponse = (state, prop) => state.homepage.fetchedLinkedinKeysReducer
export const getIsCodeSendResponse = (state, prop) => state.homepage.getLoginAuthResponse
export const getIsSearchedText = (state, prop) => state.homepage.getSearchedText
export const getIsDashboardDetails = (state, prop) => state.homepage.fetchedDashBoardDetails
export const getIsUserProfileDetailsFetched = (state, prop) => state.homepage.fetchedUserProfileDetails 
export const getIsUserProfileDetailsUpdated = (state, prop) => state.homepage.updatedUserProfileDetails

export const getIsAuthFetched = (state, props) => state.homepage.params.isAuthFetched;
export const getIsKeysFetched = (state, props) => state.homepage.params.isKeysFetched;
export const getIsUserProfileFetchedFetched = (state, props) => state.homepage.params.userProfileFetched;

export const getIsReactLoginResponse = (state, prop) => state.homepage.getUserReactLoginRes

export const getIsNotificationCount = (state, prop) => state.homepage.fetchedNotificationCount 
export const getIsAllNotification = (state, prop) => state.homepage.fetchedAllNotification 
export const getIsUpdateAllNotification = (state, prop) => state.homepage.updateAllNotification 


export const getIsShowSidebar = (state, prop) => state.homepage.setShowSidebar