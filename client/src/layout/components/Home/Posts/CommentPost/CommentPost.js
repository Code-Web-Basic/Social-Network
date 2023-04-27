// import { useState } from 'react';
import PropTypes from 'prop-types';

// mui ui
import { Avatar, Box, Grid, Modal, Stack, styled, Typography, useTheme } from '@mui/material';
//icon
import { BookmarkSimple, DotsThreeCircle, Heart, PaperPlaneTilt } from 'phosphor-react';
//components
import ScrollComment from './ScrollComment';
import MenuModal from '~/components/Popper/Menu/MenuModal';
import NewCommentPost from './NewCommentPost';
import { calculateTimePassed } from '~/utils/utils';
import { useState } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

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
                    {/* <Stack
                            sx={style}
                            position="relative"
                            direction="row"
                            maxHeight="calc(100vh - 100px)"
                            minHeight="calc(100vh - 200px)"
                            maxWidth="calc(100% - 100px)"
                            minWidth="calc(100% - 200px)"
                            overflow="hidden"
                        ></Stack> */}
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
                            <Grid2 xs="8">
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
                                    <img
                                        src={`${data?.Post.source[0].data}`}
                                        alt="post"
                                        style={{ objectFit: 'cover', maxHeight: '100%', width: '100%' }}
                                    />
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
                                                <Avatar />
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
                                                        {data?.User?.name}
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

                                                        {/* unlike */}
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
                                                        {data?.reactionCount} likes
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
