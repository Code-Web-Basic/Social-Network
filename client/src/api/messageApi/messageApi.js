import * as httpRequest from '~/utils/httpRequest';

export const getShowMessage = async (params) => {
    try {
        const res = await httpRequest.get(`/message/showMessage/${params.id}`);
        console.log(res);
        return res?.result;
    } catch (error) {
        console.log(error);
    }
};
