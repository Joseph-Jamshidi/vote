import axios from "axios";
import {API_BASE_URL} from "../Constants/ApiConstants";
import authedAxios from "./axiosProvider";

const urls = {
    register: API_BASE_URL + 'Users/register',
    login: API_BASE_URL + 'Users/Token',
    Profile: API_BASE_URL + 'Users',
    userDuplicate: API_BASE_URL + 'Users/checkUserDuplicate',
    resetPassword: API_BASE_URL + 'Users/ResetPassword'
}

class UserService {
    Register(userData) {
        return axios
            .post(urls.register, userData)
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                if (err.response) {
                    return Promise.reject(err.response);
                }
            });
    }

    checkUserDuplicate(phoneNumber) {
        return axios
            .get(urls.userDuplicate, `?PhoneNumber=${phoneNumber}`)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                if (err.response) {
                    return Promise.reject(err.response);
                }
            });
    }

    access_token;

    Login(loginInfo) {
        let bodyFormData = new FormData();
        for (let a in loginInfo) {
            bodyFormData.append(a, loginInfo[a]);
        }
        return axios
            .post(urls.login, bodyFormData)
            .then((res) => {

                const token = res.data.access_token;
                localStorage.setItem("token", token);

                const firstName = res.data.firstName;
                localStorage.setItem("firstName", firstName);

                const lastName = res.data.lastName;
                localStorage.setItem("lastName", lastName);

                const userId = res.data.userId;
                localStorage.setItem("userId", userId);

                return res.data;
            })
            .catch((err) => {
                if (err.res) {
                    return Promise.reject(err.res);
                }
            })
    }

    Profile(id) {
        return authedAxios
            .get(urls.Profile + `/${id}`)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                if (error.data) {
                    return Promise.reject(error.data)
                }
            })
    }

    resetPassword(changePassword) {
        return authedAxios
            .post(urls.resetPassword, changePassword)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                if (error.data) {
                    return Promise.reject(error.data)
                }
            })
    }
}

const instance = new UserService();

export default instance;