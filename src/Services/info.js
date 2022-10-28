import {setAuthToken} from "./token";

export const token = localStorage.getItem("token");
if (token) {
    setAuthToken(token);
}

export const firstName = localStorage.getItem("firstName");
export const lastName = localStorage.getItem("lastName");

export const UserInfo = {firstName:firstName,lastName:lastName}