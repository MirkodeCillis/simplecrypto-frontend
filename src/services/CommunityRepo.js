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
    getLatestPosts: (params, token) => {
        return axios.get(`${REACT_APP_SERVER_ADDRESS}/api/post/getlist?page=${params.page}`, {
            headers: {
                "X-Auth": token
            }
        });
    },
    getHotPosts: (params, token) => {
        return axios.get(`${REACT_APP_SERVER_ADDRESS}/api/post/getlist?page=${params.page}&sort=comments.size,desc`, {
            headers: {
                "X-Auth": token
            }
        });
    },
    getPost: (id, token) => {
        return axios.get(`${REACT_APP_SERVER_ADDRESS}/api/post/get?id=${id}`, {
            headers: {
                "X-Auth": token
            }
        });
    },
    submitComment: (data, token) => {
        return axios.post(`${REACT_APP_SERVER_ADDRESS}/api/comment/submit`, data, {
            headers: {
                "X-Auth": token
            }
        });
    },
};
