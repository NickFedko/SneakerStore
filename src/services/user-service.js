import authHeader from "./auth-header";
import getAccount from "./api/account";
import putAccountInfo from "./api/account-info";
import putAccountPassword from "./api/account-password";

const getUserAccount = () => {
    return getAccount(authHeader);
}

const putUserAccountInfo = (fullname, email, phone, country, city, address) => {
    return putAccountInfo(authHeader, fullname, email, phone, country, city, address);
}

const putUserAccountPassword = (oldPassword, password) => {
    return putAccountPassword(authHeader, oldPassword, password)
}
const UserService = {
    getUserAccount,
    putUserAccountInfo,
    putUserAccountPassword,
}
export default UserService;