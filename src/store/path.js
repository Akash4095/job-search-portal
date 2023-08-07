import userACL from "./access";

export const BASE_URL = 'http://app.linkzy.io:8000'

export const getHeader = () => {
    let fetchData = userACL.atFetch(),
        domain = fetchData.domain;
        // domain = "DEMOTEST"
    return { headers: { 'accountName': domain, 'Content-Type': 'application/json' } }
}

export const getToken = () => {
    return 'Bearer ' + 'Basic cm9taWwuc2FybmFAZ21haWwuY29tOnJvbWlsMTIz';
  }