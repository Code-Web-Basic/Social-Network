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
