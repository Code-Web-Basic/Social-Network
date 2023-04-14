import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const get = async (path, options = {}) => {
    const response = await instance.get(path, options);

    return response.data;
};

export const post = async (path, options = {}, header) => {
    const response = await instance.post(path, options, {
        headers: header,
    });
    return response.data;
};

export const put = async (path, options = {}, header) => {
    const response = await instance.put(path, options, {
        headers: header,
    });
    return response.data;
};

export default instance;
