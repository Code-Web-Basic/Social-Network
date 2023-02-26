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
import { useEffect, useState } from 'react';

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
    maxHeight: 'calc(100vh - 100px)',
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
function CommentPost({ data, children }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [dataCurrent, setDataCurrent] = useState(data);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <div onClick={handleOpen}>{children}</div>
            {open && (
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} minWidth="800px" maxWidth="calc(100% - 100px)">
                        <Grid container direction="row" maxHeight="calc(100vh - 116px)">
                            <Grid item xs={6} height="100%">
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
                            <Grid item xs={6} maxHeight="calc(100vh - 116px)">
                                <Stack
                                    direction="column"
                                    width="100%"
                                    height="100%"
                                    justifyContent="center"
                                    position="relative"
                                    flexGrow={1}
                                >
                                    {/* info user */}
                                    <Stack
                                        direction="row"
                                        height="60px"
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
                                                    {dataCurrent?.User?.userName}
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
                                            // height={'100%'}
                                            direction="row"
                                            width={'100%'}
                                            padding={'0px 10px'}
                                            sx={{ borderTop: '1px solid', borderColor: theme.palette.grey[300] }}
                                        >
                                            <NewCommentPost postId={data?.Post?._id} />
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>
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
};
