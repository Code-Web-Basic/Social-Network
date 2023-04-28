import PropTypes from 'prop-types';
import { Box, Stack } from '@mui/material';
// swipper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
function MediaPost({ data = [], isImages = false }) {
    const renderItemMedia = () => {
        return data.map((i) => {
            return (
                <SwiperSlide
                    key={i?.filename}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Stack
                        direction="column"
                        overflow="hidden"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            aspectRatio: '1 / 1',
                            flexBasis: '888px',
                            // background: 'black',
                        }}
                    >
                        <img
                            alt={i?.filename}
                            src={`${i?.data}`}
                            style={{
                                // position: 'absolute',
                                // top: 0,
                                // left: 0,
                                // bottom: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                minHeight: '150px',
                            }}
                        />
                    </Stack>
                </SwiperSlide>
            );
        });
    };
    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 1,
                    maxHeight: '600px',
                    // minHeight: '550px',
                    // height: '550px',

                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Swiper
                    pagination={true}
                    modules={[Pagination]}
                    style={{ width: '100%', height: '100%', position: 'relative' }}
                    spaceBetween={10}
                    slidesPerView={1}
                    // onSlideChange={() => console.log('slide change')}
                    // onSwiper={(swiper) => console.log(swiper)}
                >
                    {renderItemMedia()}
                </Swiper>
            </Box>
        </>
    );
}

export default MediaPost;
MediaPost.prototype = {
    data: PropTypes.array,
    isImages: PropTypes.bool,
};
