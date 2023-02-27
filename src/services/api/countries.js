import axios from "axios";
import { baseUrl, headers } from ".";

export default async function getCountries() {
    await axios ({
        method: 'GET',
        url: `${baseUrl}/location/countries`,
        headers: {headers},
    })
}