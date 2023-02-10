import axios from "axios";
import { baseUrl } from ".";

export default async function putAccountPassword(header, oldPassword, password) {
    return await axios({
        method: 'PUT',
        url:`${baseUrl}/account/password`,
        headers: {header},
        data: {
            oldPassword,
            password
        }
    })
}