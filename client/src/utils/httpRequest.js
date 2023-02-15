import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { refetchToken } from '~/features/auth/authSlice';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
const RefreshToken = async () => {
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
        const dispatch = useDispatch();
        if (config.url.indexOf('/auth/login') >= 0 || config.url.indexOf('/auth/refresh')) {
            return config;
        }

        let date = new Date();
        const user = useSelector((state) => state.auth.currentUser);
        if (user.accessToken) {
            config.headers.Authorization = user ? `Bearer ${user?.accessToken}` : '';
            const decodedToken = jwtDecode(user?.accessToken);
            if (decodedToken.exp < date.getTime() / 1000) {
                const token = await RefreshToken();
                console.log('refetch token', token);

                const refreshUser = {
                    ...user.result,
                    accessToken: token.accessToken,
                };
                console.log('user refetch data', refreshUser);
                dispatch(refetchToken(refreshUser));
                config.headers.Authorization = token ? `Bearer ${token?.accessToken}` : '';
            }
        } else {
            config.cancelToken();
        }

        return config;
    },
    (err) => {
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
