import PropTypes from 'prop-types';
import { Box, Stack } from '@mui/material';
// swipper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import VideoMedia from '../VideoMedia/VideoMedia';
import { useEffect, useRef } from 'react';
import useElementOnScreen from '~/hook/useElementOnScreen';
import { useState } from 'react';

export function MediaPostItem({ item }) {
    const [containerRef, isVisible] = useElementOnScreen({ root: null, threshold: 1 });
    const videoRef = useRef();
    useEffect(() => {
        if (videoRef.current) return;
    }, [isVisible]);
    return (
        <>
            <div
                ref={containerRef}
                style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}
            ></div>
            <Stack
                position={'relative'}
                direction="column"
                overflow="hidden"
                alignItems="center"
                justifyContent="center"
                sx={{
                    // aspectRatio: '1 / 1',
                    flexBasis: '888px',
                    // background: 'black',
                }}
            >
                {item.type.includes('image') ? (
                    <img
                        alt={item?.filename}
                        src={`${item?.data}`}
                        style={{
                            width: '100%',
                            maxHeight: '100%',
                            objectFit: 'cover',
                            minHeight: '150px',
                        }}
                    />
                ) : (
                    <VideoMedia
                        autoPlay={false}
                        style={{
                            width: '100%',
                            maxHeight: '100%',
                            objectFit: 'cover',
                            minHeight: '150px',
                        }}
                        src={`${item?.data}`}
                        type={item?.type}
                    />
                )}
            </Stack>
        </>
    );
}

function MediaPost({ data = [], isImages = false }) {
    const renderItemMedia = () => {
        return data.map((i) => {
            return (
                <SwiperSlide
                    key={i.filename}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <MediaPostItem item={i} />
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
                    maxHeight: '850px',
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
