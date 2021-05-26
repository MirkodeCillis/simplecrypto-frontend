import axios from "axios";

const {REACT_APP_SERVER_ADDRESS} = process.env;
export let CryptoRepo = {
    getAll: () => {
        return axios.get(`${REACT_APP_SERVER_ADDRESS}/api/crypto/prices`);
    },
    buy: (data, token) => {
        return axios.post(`${REACT_APP_SERVER_ADDRESS}/api/crypto/buy`, data, {
            headers: {
                "X-Auth": token
            }
        });
    },
    sell: (data, token) => {
        return axios.post(`${REACT_APP_SERVER_ADDRESS}/api/crypto/sell`, data, {
            headers: {
                "X-Auth": token
            }
        });
    },
};
