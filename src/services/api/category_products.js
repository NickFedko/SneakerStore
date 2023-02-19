import axios from "axios";
import { baseUrl, headers } from ".";

export default async function getCategoryProducts(id = 1, max = 20) {
    return await axios({
        method: 'GET',
        url:`${baseUrl}/categories/${id}/products?offset=0&limit${max}sortBy=latest`,
        headers:{headers}
    })
}