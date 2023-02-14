import postRegister from './api/register'
import postLogin from './api/login'

const register = (email, password, phone, fullName) => {
    return postRegister(email, password, phone, fullName);
};

const login = (email, password) => {
    return postLogin(email, password)
    .then(response => {
        localStorage.setItem('access_token', JSON.stringify(response.data.token));
        return response.data.account;
    });
};

const logout = () => {
    localStorage.removeItem('user')
};

const AuthService = {
    register,
    login,
    logout
};

export default AuthService;