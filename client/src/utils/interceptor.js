import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { refetchToken, resetStoreAuth } from '~/features/auth/authSlice';

import instance from '~/utils/httpRequest';

const refreshAccessToken = async () => {
    try {
        const res = await instance.post('auth/refresh', {
            withCredentials: true,
        });
        console.log('refetch api call', res);
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
            // console.log('call login and refetch');
            return config;
        }
        const user = select(store.getState());
        // if (refetchToken) {
        //     const decodedToken = jwtDecode(user?.data?.accessToken);
        //     if (decodedToken.exp < Date.now().getTime() / 1000) {
        //     }
        // } else
        if (user?.data?.accessToken) {
            // console.log('call api');

            // const decodedToken = jwtDecode(user?.data?.accessToken);
            // if (decodedToken.exp < date.getTime() / 1000) {
            // const token = await RefreshToken();
            // console.log('refetch api', token);
            // config.headers['token'] = token ? `Bearer ${token}` : '';
            // const refreshUser = {
            //     data: { ...user?.data, accessToken: token },
            //     status: 'true',
            //     message: 'successfully',
            // };
            // store.dispatch(refetchToken(refreshUser));
            // console.log('update token user', refreshUser);
            // } else {
            //     // config.headers['token'] = user?.data?.accessToken ? `Bearer ${user?.data?.accessToken}` : '';
            // }
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
            if (error?.response?.status === 403 && !originalRequest?._retry) {
                originalRequest._retry = true;
                const access_token = await refreshAccessToken();
                // console.log('refetch token', access_token);
                axios.defaults.headers.common['token'] = `Bearer ${access_token}`;
                const refreshUser = {
                    data: { ...user?.data, accessToken: access_token },
                    status: 'true',
                    message: 'successfully',
                };
                // console.log('call refetch user', refreshUser, user);
                store.dispatch(refetchToken(refreshUser));
                return instance(originalRequest);
            } else if (error?.response?.status === 400) {
                store.dispatch(resetStoreAuth());
            }
            return Promise.reject(error);
        },
    );
};

export default setUpInterceptor;
