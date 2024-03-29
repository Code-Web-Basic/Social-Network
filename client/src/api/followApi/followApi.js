import * as httpRequest from '~/utils/httpRequest';

export const getFollower = async (userid) => {
    try {
        const res = await httpRequest.get(`/follow/getFollowers/${userid}?paging=1`);
        //console.log(res);
        return res?.result;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getFollowing = async (userid) => {
    try {
        const res = await httpRequest.get(`/follow/getFollowing/${userid}?paging=1`);
        //console.log(res);
        return res?.result;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const unFollower = async (userid) => {
    try {
        const res = await httpRequest.post(`follow/unFollow/${userid}`);
        //console.log(res);
        return res?.result;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const follow = async (userid) => {
    try {
        const res = await httpRequest.post(`follow/${userid}`);
        // console.log(res);
        return res?.result;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const unFollowing = async (data) => {
    try {
        const res = await httpRequest.post('follow/deleteFollower', data);
        // console.log(res);
        return res?.result;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const checkUserFollow = async (userId) => {
    try {
        const res = await httpRequest.get(`follow/checkFollow/${userId}`);
        return res?.result;
    } catch (error) {
        return Promise.reject(error);
    }
};
