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
        // console.log(res?.result)
        return res?.result;
    } catch (error) {
        console.log(error);
    }
};

export const postSendMessage = async (data) => {
    try {
        // const response = await axios.post('http://localhost:3240/v1/message/sendMessage', data, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJWdVRoYW5oU2FuZyIsInN1YiI6IjYzZTU4ZWU1MDk0MTI3NjA0NjU5YmIwOSIsImlhdCI6MTY4MDM3Mzc0NiwiZXhwIjoxNjgwMzczODY2fQ.WYm31dlPycSTkpBVpz96CqEAk8WrbaZQ0DMhPZ2tfqA`,
        //     },
        // });
        // console.log(data)
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