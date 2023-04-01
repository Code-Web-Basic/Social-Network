import * as httpRequest from '~/utils/httpRequest';

export const getFollower = async (userid) => {
    try {
        const res = await httpRequest.get(`/follow/getFollowers/${userid}?paging=1`);
        //console.log(res);
        return res?.result;
    } catch (error) {
        console.log(error);
    }
};

export const getFollowing = async (userid) => {
    try {
        const res = await httpRequest.get(`/follow/getFollowing/${userid}?paging=1`);
        //console.log(res);
        return res?.result;
    } catch (error) {
        console.log(error);
    }
};