import axios from "axios";
import { baseUrl } from ".";
import authHeader from "../auth-header";

export default async function putAccountPassword(userPassword) {
    return await axios({
        method: 'PUT',
        url:`${baseUrl}/account/password`,
        headers: authHeader(),
        data: {
            ...userPassword
        }
    })
}