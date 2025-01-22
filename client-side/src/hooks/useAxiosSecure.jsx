import axios from "axios";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

const useAxiosSecure = () => {
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, (error) => {
        const status = error.response.status;
        console.log("status error:", status)
        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxiosSecure;
