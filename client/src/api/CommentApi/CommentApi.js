import * as httpRequest from '~/utils/httpRequest';

export const getComment = async (params) => {
    try {
        const res = await httpRequest.get(`comment/showCommentOfPost/${params.id}/${params.paging}`);
        return res?.result;
        // console.log(params.id);
    } catch (error) {
        console.log(error);
    }
};
export const getCommentReply = async (params) => {
    try {
        const res = await httpRequest.get(`comment/showCommentReply/${params.id}/${params.paging}`);
        return res?.result;
    } catch (error) {
        console.log(error);
    }
};
export const createComment = async (data) => {
    try {
        const res = await httpRequest.post(`comment/create`, {
            ...data,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const updateComment = async (params) => {
    try {
        const res = await httpRequest.post(`comment/update/${params.id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const deleteComment = async (params) => {
    try {
        const res = await httpRequest.post(`comment/delete/${params.id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
