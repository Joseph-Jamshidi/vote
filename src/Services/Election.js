import authedAxios from "./axiosProvider";
import {API_BASE_URL} from "../Constants/ApiConstants";

const urls = {
    election: API_BASE_URL + 'Election'
}

class ElectionService {
    addElection(createElection) {
        return authedAxios
            .post(urls.election, createElection)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                if (err.data) {
                    return Promise.reject(err.res)
                }
            })
    }

    takeElection() {
        return authedAxios
            .get(urls.election)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                if (error.data) {
                    return Promise.reject(error.data)
                }
            })
    }

    deleteElection(id) {
        return authedAxios
            .delete(urls.election + `/${id}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                if (error.data) {
                    return Promise.reject(error.data)
                }
            })
    }

    chosenElection(id) {
        return authedAxios
            .get(urls.election + `/${id}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                if (error.data) {
                    return Promise.reject(error.data)
                }
            })
    }

    editElection(id, editData) {
        return authedAxios
            .put(urls.election + `/${id}`, editData)
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

const instance = new ElectionService();
export default instance;