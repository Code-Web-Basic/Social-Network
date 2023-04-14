import * as httpRequest from '~/utils/httpRequest';

export const getNewFeed = async (params) => {
    try {
        const res = await httpRequest.get(`user/newFeed`, {
            params: {
                paging: params?.paging,
            },
        });

        // const data = await res?.result?.User?.map(async (item) => {
        //     console.log(item);
        //     const res = await httpRequest.get(`user/postOfUser/${item?._id}`);
        //     return {
        //         ...item,
        //         postOfUser: res?.result,
        //     };
        // });
        return res?.result;
    } catch (error) {
        console.log(error);
    }
};
export const createPostImages = async (params) => {
    try {
        const res = await httpRequest.post('post/uploadImage', {
            caption: '',
            ownerId: '',
            isVideo: true,
            array: [],
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const createPostVideo = async (params) => {
    try {
        const res = await httpRequest.post('post/uploadImage', {
            caption: '',
            ownerId: '',
            isVideo: true,
            file: '',
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const deletePost = async (params) => {
    try {
        const res = await httpRequest.post(`post/deletePost/${params.id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const reactionPost = async (params) => {
    try {
        const res = await httpRequest.post(`post/reaction/${params.id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const showUserReactionPost = async (params) => {
    try {
        const res = await httpRequest.post(`post/showReactionOfPost/${params.id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getPostById = async (id) => {
    try {
        const res = await httpRequest.get(`post/getById/${id}`);
        return res?.result;
    } catch (error) {
        console.log(error);
    }
};
