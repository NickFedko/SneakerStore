import axios from "axios";
import { baseUrl, headers } from ".";

export default async function getSearchProducts(searchWord, max=20) {
    return await axios({
        method: 'GET',
        url:`${baseUrl}/products/search?keywords=${searchWord}&offset=0&limit=${max}`,
        headers:{headers}
    })
}