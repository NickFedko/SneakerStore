import axios from "axios";
import { baseUrl, headers } from ".";

export default async function getProducts() {
    return await axios({
        method: 'GET',
        url: `${baseUrl}/products?offset=0&limit=20&sortBy=latest`,
        headers: {headers}
    })
}