import axios from "axios";

const {REACT_APP_SERVER_ADDRESS} = process.env;
export let User = {
    signup: (data) => {
        return axios.post(`${REACT_APP_SERVER_ADDRESS}/users/make`, data);
    },
    update: (data, id, token) => {
        return axios.put(`${REACT_APP_SERVER_ADDRESS}/users/${id}`, data, {
            headers: {
                authorization: token
            }
        });
    },
    validatePassword: (data, token) => {
        return axios.post(`${REACT_APP_SERVER_ADDRESS}/users/validate-password`, data, {
            headers: {
                authorization: token
            }
        });
    },
    login: (data) => {
        return axios.post(`${REACT_APP_SERVER_ADDRESS}/auth/login`, data);
    }
};
