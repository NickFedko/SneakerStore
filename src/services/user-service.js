import authHeader from "./auth-header";
import getAccount from "./api/account";
import putAccountPassword from "./api/account-password";

const getUserAccount = () => {
    return getAccount(authHeader);
}

const putUserAccountPassword = (oldPassword, password) => {
    return putAccountPassword(authHeader, oldPassword, password)
}
export default {
    getUserAccount,
    putUserAccountPassword,
};