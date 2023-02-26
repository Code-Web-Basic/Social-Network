import * as httpRequest from '~/utils/httpRequest';

export const loginPass = async (params) => {
    try {
        const res = await httpRequest.post('/auth/login', {
            email: params.data.email,
            password: params.data.password,
        });
        return res?.result;
    } catch (error) {
        console.log(error);
    }
};
export const getUserInfo = async () => {
    try {
        const res = await httpRequest.get('/auth/login/success');
        return res?.result;
    } catch (error) {
        console.log(error);
    }
};

export const logout = async () => {
    try {
        const res = await httpRequest.post('/auth/logout');
        console.log(res?.result);
    } catch (error) {
        console.log(error);
    }
};

export const registerPassword = async (params) => {
    try {
        const res = await httpRequest.post('/auth/register', {
            Name: params.name,
            userName: params.username,
            password: params.password,
            email: params.email,
            authType: 'local',
        });
        return res?.result;
    } catch (error) {
        console.log(error);
    }
};
