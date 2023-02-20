// import { useState } from 'react';
import PropTypes from 'prop-types';

// mui ui
import { Avatar, Box, Grid, Modal, Stack, styled, Typography, useTheme } from '@mui/material';
//icon
import { BookmarkSimple, DotsThreeCircle, Heart, PaperPlaneTilt } from 'phosphor-react';
//components
import ScrollComment from './ScrollComment';
import images from '~/assets/images';
import MenuModal from '~/components/Popper/Menu/MenuModal';
import NewCommentPost from './NewCommentPost';
import { calculateTimePassed } from '~/utils/utils';

// styles
const ItemReaction = styled('div')(({ theme }) => ({
    color: theme.palette.text.primary,
    '&:hover': {
        color: theme.palette.grey[500],
    },
}));
// style css modal
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    background: 'rgb(255, 255, 255)',
    p: 1,
    borderRadius: '10px',
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
function CommentPost({ data = [], children, open = false, handleClose }) {
    const theme = useTheme();
    console.log(data);
    return (
        <>
            {/* <div onClick={handleOpen}>{children}</div> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={style}
                    minWidth="800px"
                    maxWidth="calc(100% - 100px)"
                    maxheight="calc(100vh - 100px)"
                    overflow="hidden"
                >
                    <Grid container direction="row">
                        <Grid item xs={6}>
                            <Box sx={{ position: 'relative', width: '100%', minHeight: 700 }}>
                                <img
                                    src={images.post}
                                    alt="post"
                                    width={'100%'}
                                    height="100%"
                                    style={{ objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{ width: '100%', height: '100%' }}>
                                <Stack direction="column" width="100%" height={'100%'}>
                                    <Stack
                                        direction="row"
                                        height="200"
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
                                    <Stack direction="row" height="100%">
                                        <ScrollComment id={data?.Post?._id} />
                                    </Stack>
                                    <Stack
                                        direction="column"
                                        width="100%"
                                        p={1}
                                        sx={{ borderTop: '1px solid', borderColor: theme.palette.grey[300] }}
                                    >
                                        <Stack direction="row" width="100%" justifyContent="space-between">
                                            <Stack direction="row" spacing={1.5}>
                                                {/* like */}
                                                <ItemReaction>
                                                    <Heart size={24} />
                                                </ItemReaction>

                                                {/* unlike */}
                                                <ItemReaction>
                                                    <PaperPlaneTilt size={24} />
                                                </ItemReaction>
                                            </Stack>
                                            <Stack direction="row">
                                                <ItemReaction>
                                                    <BookmarkSimple size={24} />
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
                                        direction="row"
                                        padding={'0px 10px'}
                                        sx={{ borderTop: '1px solid', borderColor: theme.palette.grey[300] }}
                                    >
                                        <NewCommentPost />
                                    </Stack>
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
}

export default CommentPost;

CommentPost.prototype = {
    data: PropTypes.array,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
};
