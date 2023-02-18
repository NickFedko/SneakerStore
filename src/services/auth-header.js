export default function authHeader() {
    const accessToken = JSON.parse(localStorage.getItem('access_token'));

    if (accessToken) {
        return {
            'accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        };
    } else {
        return {}
    }
}