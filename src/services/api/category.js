import axios from "axios";
import { baseUrl, headers } from ".";

export default async function getCategory(id) {
    return await axios({
        method: 'GET',
        url:`${baseUrl}/categories/${id}`,
        headers:{headers}
    })
}