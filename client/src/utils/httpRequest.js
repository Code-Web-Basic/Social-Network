import axios from 'axios';
import { useSelector } from 'react-redux';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});
const refreshToken = async () => {
    try {
        const res = await instance.post('users/refresh', {
            withCredentials: true,
        });
        // console.log('3 ', res);
        return res;
    } catch (error) {
        console.log(error);
    }
};
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
instance.interceptors.request.use(async (config) => {
    const token = useSelector((state) => state.auth.currentUser.accessToken);
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    config.cancelToken();
    return config;
});

export const get = async (path, options = {}) => {
    const response = await instance.get(path, options);
    return response.data;
};

export const post = async (path, options = {}) => {
    const response = await instance.get(path, options);
    return response.data;
};
export default instance;
