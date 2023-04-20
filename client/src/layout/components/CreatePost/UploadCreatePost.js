import PropTypes from 'prop-types';
// import Swiper core and required modules
import { Pagination, Navigation } from 'swiper';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// mui
import { Box, Button, Fab, IconButton, Stack, Typography, useTheme } from '@mui/material';
import images from '~/assets/images';
import { CaretRight, PlusCircle } from 'phosphor-react';

function UploadCreatePost({ setSelectedFile, selectedFile = [], handleNextShare = () => {} }) {
    const theme = useTheme();

    const handlerSelectedFile = (e) => {
        const file = e.target.files[0];
        console.log(e.target.files[0]);

        if (!file) return;
        file.isUploading = true;
        setSelectedFile([...selectedFile, file]);

        // upload file
        const formData = new FormData();
        formData.append('newFile', file, file.name);
    };

    return (
        <Stack direction="column" maxWidth={'100%'} sx={{ position: 'relative' }}>
            {/* header create post */}
            <Stack
                direction="row"
                p={1}
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
                // onClick={handleClose}
                sx={{
                    position: 'relative',
                    borderBottom: '1px solid',
                    width: '100%',
                    borderColor: theme.palette.grey[300],
                }}
            >
                <Stack direction={'row'}></Stack>
                <Stack direction={'row'}>
                    <Typography variant="body2" fontWeight={600}>
                        Create new post
                    </Typography>
                </Stack>
                <Stack direction={'row'}>
                    {selectedFile.length > 0 && (
                        <IconButton onClick={handleNextShare}>
                            <CaretRight size={25} weight="bold" />
                        </IconButton>
                    )}
                </Stack>
            </Stack>
            {/* content */}
            <Box
                sx={{
                    position: 'relative',
                    minHeight: 600,
                    maxHeight: 800,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '10px',
                }}
            >
                {selectedFile.length === 0 && (
                    <>
                        <img src={images.uploadIcon} alt="upload" />
                        <Typography variant="h6">Drag photos and videos here</Typography>
                        <input
                            type="file"
                            style={{
                                position: 'absolute',
                                height: '100%',
                                width: '100%',
                                // visibility: 'hidden',
                                opacity: 0,
                                zIndex: 100,
                            }}
                            onChange={handlerSelectedFile}
                        />
                        <Button
                            variant="contained"
                            sx={{
                                fontSize: '0.6rem',
                                background: theme.palette.primary.light,
                                boxShadow: 'none',
                                borderRadius: '10px',
                                '&:hover': {
                                    background: theme.palette.primary.dark,
                                    boxShadow: 'none',
                                },
                                '&:active': {
                                    background: theme.palette.primary.dark,
                                    boxShadow: 'none',
                                },
                            }}
                        >
                            Select from computer
                        </Button>
                    </>
                )}
                {selectedFile.length > 0 && (
                    <>
                        <Swiper
                            pagination={{
                                type: 'fraction',
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            style={{ width: '100%', height: '100%', position: 'relative' }}
                            spaceBetween={10}
                            slidesPerView={1}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                        >
                            {selectedFile.map((i) => {
                                return (
                                    <SwiperSlide
                                        key={i?.lastModified}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Stack
                                            direction="column"
                                            minWidth="450px"
                                            maxHeight="600px"
                                            overflow="hidden"
                                            alignItems="center"
                                            justifyContent="center"
                                            sx={{
                                                aspectRatio: '1 / 1',
                                                flexBasis: '888px',
                                                background: 'black',
                                            }}
                                        >
                                            <img
                                                src={URL.createObjectURL(i)}
                                                alt="post"
                                                style={{ objectFit: 'cover', maxHeight: '100%', maxWidth: '100%' }}
                                            />
                                        </Stack>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </>
                )}
            </Box>
            {selectedFile.length > 0 && (
                <Fab
                    variant="extended"
                    sx={{ position: 'absolute', bottom: 16, right: 16, background: theme.palette.background.default }}
                    type="file"
                >
                    <PlusCircle size={32} weight="bold" />
                    <input
                        type="file"
                        style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            // visibility: 'hidden',
                            opacity: 0,
                            zIndex: 100,
                        }}
                        onChange={handlerSelectedFile}
                    />
                </Fab>
                // <Fab sx={{  }} variant="extended">
                //
                // </Fab>
            )}
        </Stack>
    );
}

export default UploadCreatePost;
UploadCreatePost.prototype = {
    setSelectedFile: PropTypes.func,
    selectedFile: PropTypes.array,
};
