import axios from "axios";
import { baseUrl } from ".";
import authHeader from '../auth-header'

export default async function getAccount() {
    return await axios({
        method: 'GET',
        url:`${baseUrl}/account`,
        headers:authHeader()
    })
}