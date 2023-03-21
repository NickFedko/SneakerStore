import axios from "axios";
import { baseUrl } from ".";
import authHeader from "../auth-header";

export async function getSingleProduct(id) {
    return await axios ({
        method: 'GET',
        url: `${baseUrl}/products/${id}`,
        headers: authHeader(),
    })
}

export async function getProducts(params) {
    return await axios({
        method: 'GET',
        url: `${baseUrl}/products`,
        params,
        headers: authHeader(),
    })
}

export async function searchProducts(params) {
    return await axios({
        method: 'GET',
        url: `${baseUrl}/products/search`,
        params,
        headers: authHeader(),
    })
}

export async function categoryProducts(params, id) {
    return await axios({
        method: 'GET',
        url: `${baseUrl}/categories/${id}/products`,
        params,
        headers: authHeader(),
    })
}
