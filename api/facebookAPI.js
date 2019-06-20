import axios from "axios";
import config from './../config'

let customAxiosForFacebook = axios.create({
    baseURL: config.facebookBaseURL
});

customAxiosForFacebook.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

customAxiosForFacebook.interceptors.response.use(
    (response) => {
        return response;
    },
    error => {
        if (error.response.data.error) {
            alert(error.response.data.error.message);
        }
        return Promise.reject(error);
    }
);
const facebookAPI = {
    getDataUsingFacebookAPI: (url, key) => {
        let urlWithToken = url + '&access_token=' + key;//localStorage.getItem('authToken');
        return customAxiosForFacebook.get(urlWithToken);
    },
};

export default facebookAPI;