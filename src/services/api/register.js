import axios from "axios"
import { baseUrl, headers } from "."

export default async function postRegister(userInfo) {
    return await axios({
        method: 'POST',
        url: `${baseUrl}/auth/register`,
        data: {
            ...userInfo
        },
        headers: {headers}
    })
}