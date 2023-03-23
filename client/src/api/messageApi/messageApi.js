import * as httpRequest from '~/utils/httpRequest';

export const getShowMessage = async (idfriend) => {
    try {
        const res = await httpRequest.get(`/message/showMessage/${idfriend}`);
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
        const res = await httpRequest.post(`message/sendMessage`, {
            ...data
        });
        //console.log(res);
        console.log(res)

        return res?.result;
    } catch (error) {
        console.log(error);
    }
};