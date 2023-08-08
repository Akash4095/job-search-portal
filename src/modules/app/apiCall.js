import { debounce } from "lodash";
import { BASE_URL, getToken } from "../../store/path"
import axios from "axios";


export const fetchLinkedinKeys = debounce(fetchLinkedinKeysAPI, 800)

function fetchLinkedinKeysAPI(setLinkedInKeysRes) {
        axios.get(BASE_URL + 'user/getlinkedinkeys', {headers: { Authorization: getToken()}})
            .then(response => {
                setLinkedInKeysRes(response.data)
                // return response.data.data
            }).catch(error => "")
}


export const fetchLoginAuth = debounce(fetchLoginAuthAPI, 800)

function fetchLoginAuthAPI(obj,setLoginAuthRes) {
        axios.post(BASE_URL + 'user/linkedinauth', obj, {headers: { Authorization: getToken()}})
            .then(response => {
                setLoginAuthRes(response.data)
            }).catch(error => "")
}