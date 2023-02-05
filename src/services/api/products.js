import axios from "axios";
export default async function getProducts() {
    return await axios({
        method: 'GET',
        url: 'https://demo-api.apiko.academy/api/products?offset=0&limit=20&sortBy=latest',
        headers: {
            'accept': 'application/json'
        }
    })
}