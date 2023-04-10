import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import FollowingUserItem from './FollowingUserItem';
// api
import * as userApi from '~/api/userApi/userApi';
import { useSelector } from 'react-redux';

function FollowingUser() {
    const [dataCurrent, setDataCurrent] = useState([]);
    const currentUser = useSelector((state) => state.auth.currentUser);

    useEffect(() => {
        const callApi = async () => {
            const res = await userApi.getUserFollowing({ id: currentUser?.data?._id, paging: 1 });
            if (res) {
                setDataCurrent(res);
            }
        };
        callApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser?.data?.id]);
    const renderItemFollowing = () => {
        return dataCurrent.map((item, index) => (
            <SwiperSlide key={item._id}>
                <FollowingUserItem data={item} />
            </SwiperSlide>
        ));
    };
    return (
        <Stack direction={'row'} spacing={2} width="100%" alignItems="center">
            <Swiper className="mySwiper" slidesPerView={4} style={{ justifyContent: 'start', width: '100%' }}>
                {renderItemFollowing()}
            </Swiper>
        </Stack>
    );
}

export default FollowingUser;
