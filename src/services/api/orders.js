import axios from "axios";
import { baseUrl, headers } from ".";
import authHeader from "../auth-header";

export async function getOrders(params) {
    return axios({
        method: 'GET',
        url: `${baseUrl}/orders`,
        params,
        headers: authHeader(),
    })
}
 
export async function postOrder(items, shipment) {
    return axios({
        method: 'POST',
        url: `${baseUrl}/orders`,
        headers: authHeader(),
        data: {
            items,
            shipment,
        }
    })
}

export async function getOrder(id) {
    return axios({
        method: 'GET',
        url: `${baseUrl}/orders/${id}`,
        headers: authHeader(),
    })
}