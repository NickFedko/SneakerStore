import axios from "axios";
import { baseUrl } from ".";

export default async function putAccountInfo(header, fullName, email, phone, country, city, address) {
    return await axios({
        method: 'PUT',
        url:`${baseUrl}/account`,
        headers: {header},
        data: {
            fullName,
            email,
            phone,
            country,
            city,
            address
        }
    })
}