

export const getIsLikedinKeysResponse = (state, prop) => state.homepage.fetchedLinkedinKeysReducer
export const getIsCodeSendResponse = (state, prop) => state.homepage.getLoginAuthResponse
export const getIsSearchedText = (state, prop) => state.homepage.getSearchedText
export const getIsDashboardDetails = (state, prop) => state.homepage.fetchedDashBoardDetails

export const getIsAuthFetched = (state, props) => state.homepage.params.isAuthFetched;
export const getIsKeysFetched = (state, props) => state.homepage.params.isKeysFetched;