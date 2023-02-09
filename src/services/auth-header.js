export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return {
            'accept': 'application/json',
            'Authorization': `Bearer ${user.token}`
        };
    } else {
        return {}
    }
}