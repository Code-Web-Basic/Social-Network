import { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import FollowingUserItem from './FollowingUserItem';
// api
import * as userApi from '~/api/userApi/userApi';
import { useSelector } from 'react-redux';
import SkeletonLoading from '~/components/SkeletonLoading/SkeletonLoading';

function FollowingUser() {
    const [dataCurrent, setDataCurrent] = useState([]);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const callApi = async () => {
            setLoading(true);
            const res = await userApi.getUserFollower({ id: currentUser?.data?._id, paging: 1 });
            if (res) {
                setLoading(false);
                setDataCurrent(res);
                console.log(res);
            }
        };
        callApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser?.data?.id]);

    const renderItemFollowing = () => {
        return dataCurrent.map((item) => (
            <SwiperSlide key={item._id}>
                <FollowingUserItem data={item} />
            </SwiperSlide>
        ));
    };

    return (
        <Stack direction={'row'} spacing={2} width="100%" alignItems="center" justifyContent="center">
            {loading && <SkeletonLoading type="account" layout="column" />}
            {dataCurrent.length > 0 && (
                <Swiper className="mySwiper" slidesPerView={5} style={{ justifyContent: 'start', width: '100%' }}>
                    {renderItemFollowing()}
                </Swiper>
            )}
            {dataCurrent.length === 0 && !loading && (
                <Typography variant="h6" fontSize="1.2rem">
                    No one is following
                </Typography>
            )}
        </Stack>
    );
}

export default FollowingUser;
