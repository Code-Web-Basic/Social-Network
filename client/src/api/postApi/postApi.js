import * as httpRequest from '~/utils/httpRequest';

export const getNewFeed = async (params) => {
    try {
        const res = await httpRequest.get(`user/newFeed`, {
            params: {
                paging: params?.paging,
            },
        });
        return res?.result;
    } catch (error) {
        return Promise.reject(error);
    }
};
export const createPostImages = async (params) => {
    try {
        const res = await httpRequest.post('post/uploadImage', params.data, {
            'Content-Type': 'multipart/form-data',
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};
export const createPostVideo = async (params) => {
    try {
        console.log(params.data?.getAll('files'));
        const res = await httpRequest.post('post/uploadVideo', params.data, {
            'Content-Type': 'multipart/form-data',
        });
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};
export const deletePost = async (params) => {
    try {
        const res = await httpRequest.post(`post/deletePost/${params.id}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};
export const reactionPost = async (params) => {
    try {
        const res = await httpRequest.post(`post/reaction/${params.id}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};
export const showUserReactionPost = async (params) => {
    try {
        const res = await httpRequest.post(`post/showReactionOfPost/${params.id}`);
        return res;
    } catch (error) {
        return Promise.reject(error);
    }
};
export const getPostById = async (id) => {
    try {
        const res = await httpRequest.get(`post/getById/${id}`);
        return res?.result;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getExplore = async (params) => {
    try {
        const res = await httpRequest.get(`post/explore`, {
            params: {
                paging: params?.paging,
            },
        });
        return res?.result;
    } catch (error) {
        return Promise.reject(error);
    }
};
