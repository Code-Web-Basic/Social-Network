import * as httpRequest from '~/utils/httpRequest';

export const searchUser = async (query) => {
    try {
        const res = await httpRequest.get(`user/search/${query}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
