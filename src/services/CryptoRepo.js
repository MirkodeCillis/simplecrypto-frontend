import axios from "axios";

const {REACT_APP_SERVER_ADDRESS} = process.env;
export let CryptoRepo = {
    getAll: () => {
        return axios.get(`${REACT_APP_SERVER_ADDRESS}/api/crypto/prices`);
    }
};
