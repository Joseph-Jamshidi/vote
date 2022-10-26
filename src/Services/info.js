import {setAuthToken} from "./token";

export const token = localStorage.getItem("token");
if (token) {
    setAuthToken(token);
}
export const fName = localStorage.getItem("fName");
if (fName) {
    setAuthToken(fName);
}
export const lName = localStorage.getItem("lName");
if (lName) {
    setAuthToken(lName);
}
