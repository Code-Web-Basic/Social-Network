import * as httpRequest from '~/utils/httpRequest';

export const searchUser = async (query) => {
    try {
        const res = await httpRequest.get(`user/search`, {
            params: {
                query,
            },
        });
        return res?.result;
    } catch (error) {
        console.log(error);
    }
};

export const getHistorySearch = async () => {
    try {
        const res = await httpRequest.get('searchHistory');
        return res?.result;
    } catch (error) {
        console.log(error);
    }
};


export const getUserFollowing = async (params) => {
    try {
        const res = await httpRequest.get(`follow/getFollowing/${params.id}`, {
            params: {
                paging: params?.paging,
            },
        });
        return res?.result;
    } catch (error) {
        console.log(error);
    }
};

