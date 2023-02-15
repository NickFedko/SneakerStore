import axios from "axios";
import { baseUrl } from ".";
import authHeader from "../auth-header";

export default function putAccountInfo(userInfo) {
    return axios({
        method: 'PUT',
        url:`${baseUrl}/account`,
        headers: authHeader(),
        data: {
            ...userInfo
        }
    }).then(response => {
        return response.data
    })
}