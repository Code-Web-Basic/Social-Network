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
        return Promise.reject(error);
    }
};

export const getHistorySearch = async () => {
    try {
        const res = await httpRequest.get('searchHistory');
        return res?.result;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getUserFollower = async (params) => {
    try {
        const res = await httpRequest.get(`follow/getFollowers/${params.id}`, {
            params: {
                paging: params?.paging,
            },
        });
        return res?.result;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getFriend = async (idfriend) => {
    try {
        const res = await httpRequest.get(`/user/findById/${idfriend}`);
        //console.log(res);
        return res?.result;
    } catch (error) {
        return Promise.reject(error);
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
        return Promise.reject(error);
    }
};

export const getPostOfUser = async (userid) => {
    try {
        const res = await httpRequest.get(`/user/postOfUser/${userid}`);
        //console.log(res);
        return res?.result;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getNotify = async (paging) => {
    try {
        const res = await httpRequest.get(`user/showNotification?paging=${paging}`);
        //console.log(res);
        return res?.result;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const putUpdateUser = async (param) => {
    try {
        const res = await httpRequest.put('user/update', param, {
            'Content-Type': 'multipart/form-data',
        });
        res.data = res?.result;
        delete res?.result;
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};
export const addSearchUser = async (param) => {
    try {
        const res = await httpRequest.post('searchHistory/create', {
            targetId: param.targetId,
        });
        //console.log(res);
        return res?.result;
    } catch (error) {
        return Promise.reject(error);
    }
};
export const removeSearchHistory = async (param) => {
    try {
        const res = await httpRequest.post(`searchHistory/delete/${param.historyId}`);
        //console.log(res);
        return res?.result;
    } catch (error) {
        return Promise.reject(error);
    }
};
export const removeSearchHistoryAll = async () => {
    try {
        const res = await httpRequest.post(`searchHistory/deleteAll`);
        //console.log(res);
        return res?.result;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const suggestionUser = async () => {
    try {
        const res = await httpRequest.get(`follow/suggestions`);
        return res?.result;
    } catch (error) {
        return Promise.reject(error);
    }
};
