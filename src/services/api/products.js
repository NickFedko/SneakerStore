import axios from "axios";
import { baseUrl, headers } from ".";

export default async function getProducts(max=20) {
    return await axios({
        method: 'GET',
        url: `${baseUrl}/products?offset=0&limit=${max}&sortBy=latest`,
        headers: {headers}
    })
}