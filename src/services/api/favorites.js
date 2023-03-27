import axios from "axios";
import { baseUrl } from ".";
import authHeader from '../auth-header';

export async function postFavorite(id) {
    return axios({
        method: 'POST',
        url: `${baseUrl}/products/${id}/favorite`,
        headers: authHeader(),
    })
}

export async function deleteFavorite(id) {
    return axios({
        method: 'DELETE',
        url: `${baseUrl}/products/${id}/favorite`,
        headers: authHeader(),
    })
}

export async function getFavorites(params) {
    return await axios({
        method: 'GET',
        url: `${baseUrl}/products/favorites`,
        params,
        headers: authHeader(),
    })
}

export async function postFavorites(ids) {
    return axios({
        method: 'POST',
        url: `${baseUrl}/products/favorites`,
        data: {
            ...ids
        },
        headers: authHeader(),
    })
}