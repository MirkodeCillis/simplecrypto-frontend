import axios from "axios";

const {REACT_APP_SERVER_ADDRESS} = process.env;

export let CommunityRepo = {
    submitPost: (data, token) => {
        return axios.post(`${REACT_APP_SERVER_ADDRESS}/api/post/submit`, data, {
            headers: {
                "X-Auth": token
            }
        });
    },
    update: (data, id, token) => {
        return axios.put(`${REACT_APP_SERVER_ADDRESS}/api/user/${id}`, data, {
            headers: {
                "X-Auth": token
            }
        });
    },
    validatePassword: (data, token) => {
        return axios.post(`${REACT_APP_SERVER_ADDRESS}/api/user/validate-password`, data, {
            headers: {
                "X-Auth": token
            }
        });
    },
    login: (data) => {
        return axios.post(`${REACT_APP_SERVER_ADDRESS}/api/auth/login`, data);
    }
};
