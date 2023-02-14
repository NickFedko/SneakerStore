import axios from "axios";
import { baseUrl, headers } from ".";

export default async function getCategoryProducts(id, limit) {
    return await axios({
        method: 'GET',
        url:`${baseUrl}/categories/${id}/products?offset=0&limit${limit}sortBy=latest`,
        headers:{headers}
    })
}