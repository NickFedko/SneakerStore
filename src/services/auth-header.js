export default function authHeader() {
    const access_token = JSON.parse(localStorage.getItem('access_token'));

    if (access_token.token) {
        return {
            'accept': 'application/json',
            'Authorization': `Bearer ${access_token}`
        };
    } else {
        return {}
    }
}