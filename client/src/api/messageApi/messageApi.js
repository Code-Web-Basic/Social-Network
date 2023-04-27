import * as httpRequest from '~/utils/httpRequest';
export const getShowMessage = async (idfriend, paging) => {
    try {
        const res = await httpRequest.get(`/message/showMessage/${idfriend}?paging=${paging}`);
        //console.log(res);
        return res?.result;
    } catch (error) {
        console.log(error);
    }
};

export const getShowChats = async () => {
    try {
        const res = await httpRequest.get(`/message/showChats`);
        return res?.result;
    } catch (error) {
        console.log(error);
    }
};

export const postSendMessage = async (data) => {
    try {
        const res = await httpRequest.post(`message/sendMessage`, data,
            {
                'Content-Type': 'multipart/form-data',
            }
        );

        return res?.result;
    } catch (error) {
        console.log(error);
    }
};
