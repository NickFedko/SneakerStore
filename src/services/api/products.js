import axios from "axios";
import { baseUrl, headers } from ".";

export default async function getProducts(max=20, category='', search) {
    const sort = search ? '' : '&sortBy=latest'
    const categories = search ? '' : `${category}`
    const searchText = search ? '&': '?'
    return await axios({
        method: 'GET',
        url: `${baseUrl}${categories}/products${search}${searchText}offset=0&limit=${max}${sort}`,
        headers: {headers}
    })
}