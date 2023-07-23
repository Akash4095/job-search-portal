import userACL from "./access";


export const getHeader = () => {
    let fetchData = userACL.atFetch(),
        domain = fetchData.domain;
        // domain = "DEMOTEST"
    return { headers: { 'accountName': domain, 'Content-Type': 'application/json' } }
}