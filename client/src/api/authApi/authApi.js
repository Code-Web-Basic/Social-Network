import * as httpRequest from '~/utils/httpRequest';

export const loginPass = async (params) => {
    try {
        const res = await httpRequest.post('/auth/login', {
            email: params.data.email,
            password: params.data.password,
        });
        return res?.result;
    } catch (error) {
        return Promise.reject(error);
    }
};
export const getUserInfo = async () => {
    try {
        const res = await httpRequest.get('/auth/login/success');
        return res?.result;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const logout = async () => {
    try {
        const res = await httpRequest.post('/auth/logout');
        console.log(res?.result);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const registerPassword = async (params) => {
    try {
        const res = await httpRequest.post('/auth/register', {
            Name: params.name,
            userName: params.username,
            password: params.password,
            email: params.email,
            mobile: params.phone,
            authType: 'local',
        });
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};
