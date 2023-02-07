import axios from "axios";
import { baseUrl } from ".";

export default async function getAccount(header) {
    return await axios({
        method: 'GET',
        url:`${baseUrl}account`,
        headers:{header}
    })
}