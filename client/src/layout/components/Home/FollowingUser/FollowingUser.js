import { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
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
        <Stack direction={'row'} spacing={2} width="100%" alignItems="center" justifyContent="center">
            {dataCurrent.length > 0 ? (
                <Swiper className="mySwiper" slidesPerView={5} style={{ justifyContent: 'start', width: '100%' }}>
                    {renderItemFollowing()}
                </Swiper>
            ) : (
                <Typography variant="h6" fontSize="1.2rem">
                    No one is following
                </Typography>
            )}
        </Stack>
    );
}

export default FollowingUser;
