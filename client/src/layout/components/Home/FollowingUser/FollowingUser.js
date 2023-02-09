import { Stack } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import FollowingUserItem from './FollowingUserItem';
function FollowingUser() {
    return (
        <Stack direction={'row'} spacing={2} width="100%" alignItems="center">
            <Swiper className="mySwiper" slidesPerView={5} style={{ justifyContent: 'start', width: '100%' }}>
                <SwiperSlide>
                    <FollowingUserItem />
                </SwiperSlide>
                <SwiperSlide>
                    <FollowingUserItem />
                </SwiperSlide>
                <SwiperSlide>
                    <FollowingUserItem />
                </SwiperSlide>
                <SwiperSlide>
                    <FollowingUserItem />
                </SwiperSlide>
                <SwiperSlide>
                    <FollowingUserItem />
                </SwiperSlide>
                <SwiperSlide>
                    <FollowingUserItem />
                </SwiperSlide>
                <SwiperSlide>
                    <FollowingUserItem />
                </SwiperSlide>
            </Swiper>
        </Stack>
    );
}

export default FollowingUser;
