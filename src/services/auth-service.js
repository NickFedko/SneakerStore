import postRegister from './api/register'
import postLogin from './api/login'

const register = (userInfo) => {
    return postRegister(userInfo);
};

const login = (email, password) => {
    return postLogin(email, password)
    .then(response => {
        localStorage.setItem('access_token', JSON.stringify(response.data.token));
        return response.data.account;
    });
};

const logout = () => {
    localStorage.removeItem('access_token')
};

const AuthService = {
    register,
    login,
    logout
};

export default AuthService;