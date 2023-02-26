// mui
import { IconButton, Stack, Typography, useTheme } from '@mui/material';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper';

// components
import SuggestionsUserItem from './SuggestionsUserItem';
import { useRef } from 'react';
import { CaretLeft, CaretRight } from 'phosphor-react';

function SuggestionsUser({ data, typeLayout = 'column' }) {
    const theme = useTheme();
    const swiperRef = useRef();
    const renderItemColumn = () => {
        return <SuggestionsUserItem />;
    };
    const renderItemRow = () => {
        const data = [1, 2, 3, 4, 5];
        return data.map((item) => {
            return (
                <SwiperSlide key={item}>
                    <SuggestionsUserItem typeLayout="column" data={item} />
                </SwiperSlide>
            );
        });
    };
    return typeLayout === 'column' ? (
        <Stack direction="column" width="100%" p={1} spacing={2} margin="10px 0px">
            <Stack direction="row" justifyContent="space-between" width="100%">
                <Typography variant="body1" fontSize="0.8rem" fontWeight={500} color={theme.palette.text.secondary}>
                    Suggestions for you
                </Typography>
                <Typography variant="body2" fontWeight={400} fontSize="0.6rem" color={theme.palette.text.primary}>
                    See All
                </Typography>
            </Stack>
            <Stack direction="column" width="100%">
                {renderItemColumn()}
            </Stack>
        </Stack>
    ) : (
        <Stack direction="column" width="100%" p={1} spacing={2} margin="10px 0px">
            <Stack direction="row" justifyContent="space-between" width="100%">
                <Typography variant="body1" fontSize="0.8rem" fontWeight={500} color={theme.palette.text.secondary}>
                    Suggestions for you
                </Typography>
                <Typography variant="body2" fontWeight={400} fontSize="0.6rem" color={theme.palette.primary.light}>
                    See All
                </Typography>
            </Stack>
            <Stack direction="row" width="100%" sx={{ position: 'relative' }} alignItems="center">
                <Swiper
                    className="mySwiper"
                    slidesPerView={2}
                    spaceBetween={10}
                    style={{ position: 'relative', justifyContent: 'start', width: '100%', alignItems: 'center' }}
                    // navigation={true}
                    modules={[Navigation]}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                >
                    {renderItemRow()}

                    {/* <button ref={navigationNextRef}>Next</button>
                    <button ref={navigationPrevRef}>Prev</button> */}
                </Swiper>

                <IconButton
                    sx={{ position: 'absolute', left: '-40px', zIndex: 10 }}
                    onClick={() => swiperRef.current?.slidePrev()}
                >
                    <CaretLeft size={24} />
                </IconButton>
                <IconButton
                    sx={{ position: 'absolute', right: '-10px', zIndex: 10 }}
                    onClick={() => swiperRef.current?.slideNext()}
                >
                    <CaretRight size={24} />
                </IconButton>
            </Stack>
        </Stack>
    );
}

export default SuggestionsUser;
