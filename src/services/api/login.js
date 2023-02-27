import axios from "axios"
import { baseUrl, headers } from "."

export default async function postLogin(userInfo) {
    return await axios({
        method: 'POST',
        url: `${baseUrl}/auth/login`,
        data: {
            ...userInfo
        },
        headers: {headers}
    })
}