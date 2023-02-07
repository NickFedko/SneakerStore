import postRegister from './api/register'
import postLogin from './api/login'

const register = (email, password, phone, fullName) => {
    return postRegister(email, password, phone, fullName);
};

const login = (email, password) => {
    return postLogin(email, password)
    .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem('user')
};

export default {
    register,
    login,
    logout
};