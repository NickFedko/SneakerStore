import axios from "axios";
import { baseUrl, headers } from ".";

export default async function getCategories() {
    return await axios({
        method: 'GET',
        url:`${baseUrl}/categories`,
        headers:{headers}
    })
}