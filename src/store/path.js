import userACL from "./access";

// export const BASE_URL = 'http://app.linkzy.io:8000' 
export const BASE_URL = 'https://getlista.io'

export const getHeader = () => {

    return { headers: { 'accountName': domain, 'Content-Type': 'application/json' } }
}

export const getToken = () => {
    return 'Basic cm9taWwuc2FybmFAZ21haWwuY29tOnJvbWlsMTIz';
}