import axios from "axios";
import { baseUrl, headers } from ".";

export async function getProducts(params) {
    return await axios({
        method: 'GET',
        url: `${baseUrl}/products`,
        params,
        headers: {headers}
    })
}

export async function searchProducts(params) {
    return await axios({
        method: 'GET',
        url: `${baseUrl}/products/search`,
        params,
        headers: {headers}
    })
}

export async function categoryProducts(params, id) {
    return await axios({
        method: 'GET',
        url: `${baseUrl}/categories/${id}/products`,
        params,
        headers: {headers}
    })
}
