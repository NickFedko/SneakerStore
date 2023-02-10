import axios from "axios"
import { baseUrl, headers } from "."

export default async function postRegister(email, password, phone, fullName) {
    return await axios({
        method: 'POST',
        url: `${baseUrl}/auth/register`,
        data: {
            email,
            password,
            phone,
            fullName
        },
        headers: {headers}
    })
}