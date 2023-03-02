import axios from "axios";
import { baseUrl } from ".";

export default async function getCountries() {
    return await axios ({
        method: 'GET',
        url: `${baseUrl}/locations/countries`,
        headers: {'accept' : 'application/json'},
    })
}