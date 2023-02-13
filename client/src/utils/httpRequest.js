import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useSelector } from 'react-redux';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});
const refreshToken = async () => {
    try {
        const res = await instance.post('users/refresh', {
            withCredentials: true,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
instance.interceptors.request.use(
    async (config) => {
        if (config.url.indexOf('/auth/login') >= 0 || config.url.indexOf('/auth/refresh')) {
            return config;
        }

        let date = new Date();
        const user = useSelector((state) => state.auth.currentUser);

        const decodedToken = jwtDecode(user?.accessToken);

        if (decodedToken.exp < date.getTime() / 1000) {
            const token = await refreshToken();
            console.log('2 ', token);
            const refreshUser = {
                ...user,
                accessToken: token.accessToken,
            };
            console.log(refreshUser);
            config.headers.Authorization = token ? `Bearer ${token.accessToken}` : '';
        }
        // config.cancelToken();
        return config;
    },
    (err) => {
        // console.log('asc');
        return Promise.reject(err);
    },
);

export const get = async (path, options = {}) => {
    const response = await instance.get(path, options);
    return response.data;
};

export const post = async (path, options = {}) => {
    const response = await instance.post(path, options);
    return response.data;
};
export default instance;
