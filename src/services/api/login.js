import axios from "axios"
import { baseUrl, headers } from "."

export default async function postLogin(email, password) {
    return await axios({
        method: 'POST',
        url: `${baseUrl}/auth/login`,
        data: {
            email,
            password
        },
        headers: {headers}
    })
}