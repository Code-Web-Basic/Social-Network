// import { useState } from 'react';
import PropTypes from 'prop-types';

// mui ui
import { Avatar, Box, Modal, Stack, styled, Typography, useTheme } from '@mui/material';
//icon
import { BookmarkSimple, DotsThreeCircle, Heart, PaperPlaneTilt } from 'phosphor-react';
//components
import ScrollComment from './ScrollComment';
import MenuModal from '~/components/Popper/Menu/MenuModal';
import NewCommentPost from './NewCommentPost';
import { calculateTimePassed } from '~/utils/utils';
import { useState } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
// swipper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import SharePost from '../SharePost/SharePost';
import VideoMedia from '~/components/VideoMedia/VideoMedia';
// styles
const ItemReaction = styled('div')(({ theme }) => ({
    color: theme.palette.text.primary,
    '&:hover': {
        color: theme.palette.grey[500],
    },
}));
// style css modal
const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};
// menu setting post
const MENU_ITEMS = [
    {
        title: 'Report',
        color: 'error',
        fontWeight: 600,
    },
    {
        title: 'Unfollow',
        color: 'error',
        fontWeight: 600,
    },
    {
        title: 'Add to favorites',
        color: 'text.primary',
        fontWeight: 400,
    },
    {
        title: 'Go to post',
        color: 'text.primary',
        fontWeight: 400,
    },
    {
        title: 'Share to...',
        color: 'text.primary',
        fontWeight: 400,
    },
    {
        title: 'Copy Link',
        color: 'text.primary',
        fontWeight: 400,
    },
    {
        title: 'Embed',
        color: 'text.primary',
        fontWeight: 400,
    },
    {
        title: 'About this account',
        color: 'text.primary',
        fontWeight: 400,
    },
];
//comment post modal
function CommentPost({
    data,
    children,
    like,
    bookmark,
    handleLikePost = () => {},
    handleBookmarkPost = () => {},
    styles,
}) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    // const heartRef = useRef(null);
    // const bookmarkRef = useRef(null);
    // const [dataCurrent, setDataCurrent] = useState(data);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const renderItemImages = () => {
        return data?.Post.source.map((i) => (
            <SwiperSlide
                key={i?.filename}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* <Box
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        maxHeight: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                    }}
                                ></Box> */}
                {i.type.includes('image') ? (
                    <img
                        src={`${i?.data}`}
                        alt="post"
                        style={{ objectFit: 'cover', maxHeight: '100%', width: '100%' }}
                    />
                ) : (
                    <VideoMedia
                        autoPlay={true}
                        style={{
                            objectFit: 'cover',
                            maxHeight: '100%',
                            width: '100%',
                        }}
                        src={`${i?.data}`}
                        type={i?.type}
                    />
                )}
            </SwiperSlide>
        ));
    };
    return (
        <>
            <div onClick={handleOpen} style={styles}>
                {children}
            </div>
            {open && (
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Grid2
                            container
                            position="relative"
                            alignItems="center"
                            justifyContent="center"
                            height="calc(100vh - 130px)"
                            width="calc(100% - 160px)"
                            flexWrap="nowrap"
                            sx={{
                                bgcolor: 'background.paper',
                                background: 'rgb(255, 255, 255)',
                                p: 1,
                                borderRadius: '10px',
                            }}
                        >
                            <Grid2 xs="8" position="relative">
                                <Stack
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    height="calc(100vh - 140px)"
                                    width="100%"
                                    overflow="hidden"
                                    sx={{
                                        aspectRatio: '1 / 1',
                                        flexBasis: '888px',
                                        background: 'black',
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
                                        {renderItemImages()}
                                    </Swiper>
                                </Stack>
                            </Grid2>
                            <Grid2 xs={'auto'}>
                                <Stack
                                    position="relative"
                                    height="calc(100vh - 140px)"
                                    borderLeft="1px solid"
                                    borderColor={theme.palette.grey[300]}
                                    direction="column"
                                >
                                    <Stack
                                        direction="column"
                                        width="400px"
                                        height="100%"
                                        justifyContent="center"
                                        position="relative"
                                        flexGrow={1}
                                    >
                                        {/* info user */}
                                        <Stack
                                            direction="row"
                                            height="60px"
                                            width="400px"
                                            p={1}
                                            alignItems="center"
                                            justifyContent="space-between"
                                            sx={{
                                                width: '100%',
                                                borderBottom: '1px solid',
                                                borderColor: theme.palette.grey[300],
                                            }}
                                        >
                                            <Stack direction="row" spacing={2}>
                                                <Avatar src={`${data?.User?.avatar?.data}`} alt="user" />
                                                <Stack direction="column">
                                                    <Typography
                                                        variant="body2"
                                                        fontWeight={600}
                                                        color={theme.palette.text.primary}
                                                    >
                                                        {data?.User?.userName}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        fontWeight={400}
                                                        fontSize="0.7rem"
                                                        color={theme.palette.text.secondary}
                                                    >
                                                        {data?.User?.Name}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                            <Stack direction="row" spacing={2}>
                                                <MenuModal data={MENU_ITEMS}>
                                                    <ItemReaction>
                                                        <DotsThreeCircle size={24} />
                                                    </ItemReaction>
                                                </MenuModal>
                                            </Stack>
                                        </Stack>
                                        {/* content */}
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                flexDirection: 'column',
                                                height: 'calc(100% - 60px)',
                                                width: '100%',
                                            }}
                                        >
                                            {/* comment */}

                                            <Stack
                                                direction="column"
                                                width="100%"
                                                height="100%"
                                                overflow="auto"
                                                sx={{
                                                    // '&::-webkit-scrollbar-track': {
                                                    //     // backgroundColor: '#F5F5F5',
                                                    // },
                                                    '&::-webkit-scrollbar': {
                                                        width: 5,
                                                        backgroundColor: 'transparent',
                                                    },
                                                    '&::-webkit-scrollbar-thumb': {
                                                        backgroundColor: theme.palette.grey[300],
                                                        borderRadius: '10px',
                                                        display: 'none',
                                                        transition: '0.3s linear',
                                                    },
                                                    '&::hover::-webkit-scrollbar-thumb': {
                                                        display: 'flex',
                                                    },
                                                }}
                                            >
                                                <ScrollComment id={data?.Post?._id} />
                                            </Stack>
                                            {/* post navigate */}
                                            <Stack
                                                direction="column"
                                                width="100%"
                                                // height="100%"
                                                p={1}
                                                sx={{
                                                    borderTop: '1px solid',
                                                    borderColor: theme.palette.grey[300],
                                                }}
                                            >
                                                <Stack direction="row" width="100%" justifyContent="space-between">
                                                    <Stack direction="row" spacing={1.5}>
                                                        {/* like */}
                                                        <ItemReaction
                                                            onClick={handleLikePost}
                                                            sx={{
                                                                color: theme.palette.grey[800],
                                                                '&:hover': {
                                                                    color: theme.palette.grey[600],
                                                                },
                                                            }}
                                                        >
                                                            <Heart
                                                                size={24}
                                                                color={like ? 'red' : theme.palette.grey[800]}
                                                                weight={like ? 'fill' : 'regular'}
                                                            />
                                                        </ItemReaction>

                                                        {/* share */}
                                                        <SharePost idPost={data?.Post?._id}>
                                                            <ItemReaction
                                                                sx={{
                                                                    color: theme.palette.grey[800],
                                                                    '&:hover': {
                                                                        color: theme.palette.grey[600],
                                                                    },
                                                                }}
                                                            >
                                                                <PaperPlaneTilt size={24} />
                                                            </ItemReaction>
                                                        </SharePost>
                                                    </Stack>
                                                    <Stack direction="row">
                                                        <ItemReaction
                                                            onClick={handleBookmarkPost}
                                                            sx={{
                                                                color: theme.palette.grey[800],
                                                                '&:hover': {
                                                                    color: theme.palette.grey[600],
                                                                },
                                                            }}
                                                        >
                                                            <BookmarkSimple
                                                                size={24}
                                                                color={bookmark ? 'black' : theme.palette.grey[800]}
                                                                weight={bookmark ? 'fill' : 'regular'}
                                                            />
                                                        </ItemReaction>
                                                    </Stack>
                                                </Stack>
                                                {/* like */}
                                                <Stack direction="row" p={0.5}>
                                                    <Typography
                                                        variant="body2"
                                                        fontWeight="600"
                                                        color={theme.palette.text.primary}
                                                    >
                                                        {data?.Post?.reaction?.length} likes
                                                    </Typography>
                                                </Stack>
                                                {/* time */}
                                                <Stack direction="row" p={0.5}>
                                                    <Typography
                                                        variant="body2"
                                                        fontWeight="400"
                                                        color={theme.palette.text.secondary}
                                                        fontSize="0.5rem"
                                                    >
                                                        {calculateTimePassed(data?.Post?.updatedAt)}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                            <Stack
                                                // height={'100%'}
                                                direction="row"
                                                width={'100%'}
                                                padding={'0px 10px'}
                                                sx={{
                                                    borderTop: '1px solid',
                                                    borderColor: theme.palette.grey[300],
                                                }}
                                            >
                                                <NewCommentPost postId={data?.Post?._id} />
                                            </Stack>
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </Box>
                </Modal>
            )}
        </>
    );
}

export default CommentPost;

CommentPost.prototype = {
    data: PropTypes.object,
    children: PropTypes.func,
    like: PropTypes.bool,
    bookmark: PropTypes.bool,
    handleLikePost: PropTypes.func,
    handleBookmarkPost: PropTypes.func,
};
