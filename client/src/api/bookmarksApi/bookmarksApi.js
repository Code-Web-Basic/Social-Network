import * as httpRequest from '~/utils/httpRequest';

export const getBookMarks = async () => {
    try {
        const res = await httpRequest.get('bookmark/getBookmarks?paging=1');
        //console.log(res);
        return res?.result;
    } catch (error) {
        console.log(error);
    }
};

export const createBookMarks = async (params) => {
    try {
        const res = await httpRequest.post('bookmark/create', {
            postId: params.postId,
        });
        //console.log(res);
        return res?.result;
    } catch (error) {
        console.log(error);
    }
};
export const deleteBookMarks = async (params) => {
    try {
        const res = await httpRequest.post(`bookmark/delete/${params.postId}`, {
            postId: params.postId,
        });
        //console.log(res);
        return res?.result;
    } catch (error) {
        console.log(error);
    }
};

export const deleteAllBookMarks = async () => {
    try {
        const res = await httpRequest.post('bookmark/deleteAll');
        //console.log(res);
        return res?.result;
    } catch (error) {
        console.log(error);
    }
};