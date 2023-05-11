import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { refetchToken, resetStoreAuth } from '~/features/auth/authSlice';

import instance from '~/utils/httpRequest';

const refreshAccessToken = async () => {
    try {
        const res = await instance.post('auth/refresh', {
            withCredentials: true,
        });
        // console.log('refetch api call', res);
        return res.data?.accessToken;
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
        if (
            config?.url.includes('auth/login') ||
            config?.url.includes('auth/refresh') ||
            config?.url.includes('auth/login/success')
        ) {
            return config;
        }
        const user = select(store.getState());
        const date = new Date();
        const formattedDate = date.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });

        const convertedDate = new Date(formattedDate);
        if (user?.data?.accessToken) {
            const decodedToken = jwtDecode(user?.data?.accessToken);
            if (decodedToken.exp < convertedDate.getTime() / 1000) {
                const access_token = await refreshAccessToken();
                console.log('refetch token before');
                if (access_token) {
                    const refreshUser = {
                        data: { ...user?.data, accessToken: access_token },
                        status: 'true',
                        message: 'successfully',
                    };
                    store.dispatch(refetchToken(refreshUser));
                    // config.headers['token'] = user?.data?.accessToken ? `Bearer ${user?.data?.accessToken}` : '';
                }
                // console.log('call refetch user', refreshUser, user);
                return config;
            }
        }

        // return config;
        if (user?.data?.accessToken) {
            config.headers['token'] = user?.data?.accessToken ? `Bearer ${user?.data?.accessToken}` : '';
        }
        return config;
    }, handleError);

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        async function (error) {
            const user = select(store.getState());
            const originalRequest = error.config;
            if (
                (error?.response?.status === 403 &&
                    !originalRequest?._retry &&
                    !error.request.responseURL.includes('auth/refresh') &&
                    !error.request.responseURL.includes('auth/login')) ||
                (error?.response?.status === 401 &&
                    !error.request.responseURL.includes('auth/refresh') &&
                    !error.request.responseURL.includes('auth/login'))
            ) {
                originalRequest._retry = true;
                const access_token = await refreshAccessToken();

                console.log('access token after', access_token);
                if (access_token) {
                    axios.defaults.headers.common['token'] = `Bearer ${access_token}`;
                    const refreshUser = {
                        data: { ...user?.data, accessToken: access_token },
                        status: 'true',
                        message: 'successfully',
                    };
                    store.dispatch(refetchToken(refreshUser));
                }
                // console.log('call refetch user', refreshUser, user);
                return instance(originalRequest);
            } else if (
                (error?.response?.status === 403 && error.request.responseURL.includes('auth/refresh')) ||
                (error?.response?.status === 401 && error.request.responseURL.includes('auth/refresh'))
            ) {
                console.log(error.request.responseURL.includes('auth/refresh'));
                localStorage.removeItem('persist:root');
                store.dispatch(resetStoreAuth());
                console.log('refetch token het han');
                // return ;
            }
            return Promise.reject(error);
        },
    );
};

export default setUpInterceptor;
