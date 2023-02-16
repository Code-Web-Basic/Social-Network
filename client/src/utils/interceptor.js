import jwtDecode from 'jwt-decode';
import { refetchToken } from '~/features/auth/authSlice';

import instance from '~/utils/httpRequest';

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
const setUpInterceptor = (store) => {
    const handleError = async (error) => {
        return Promise.reject(error);
    };
    function select(state) {
        return state.auth.currentUser;
    }

    instance.interceptors.request.use(async (config) => {
        if (config.url.indexOf('/auth/login') >= 0 || config.url.indexOf('/auth/refresh')) {
            return config;
        }
        const user = select(store.getState());

        console.log(user);
        let date = new Date();

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
                store.dispatch(refetchToken(refreshUser));
                config.headers.Authorization = token ? `Bearer ${token?.accessToken}` : '';
            }
        } else {
            config.cancelToken();
        }
        return config;
    });

    instance.interceptors.response.use((response) => response, handleError);
};

export default setUpInterceptor;
