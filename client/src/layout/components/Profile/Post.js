import './Post.css'
import { useState } from 'react';
// mui ui
import { Avatar, Box, Grid, Modal, Stack, styled, Typography, useTheme } from '@mui/material';
//icon
import { BookmarkSimple, DotsThreeCircle, Heart, PaperPlaneTilt } from 'phosphor-react';
//components
import ScrollComment from '~/layout/components/Home/Posts/CommentPost/ScrollComment';
import images from '~/assets/images';
import MenuModal from '~/components/Popper/Menu/MenuModal';
import NewCommentPost from '~/layout/components/Home/Posts/CommentPost/NewCommentPost';
const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
    }
];
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

function Post() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (<div style={{ width: '100%', height: '100%' }}>
        <div class="wrapper" style={{ width: '100%', height: '100%' }}>
            {itemData.map((item) => (
                <div class="image" key={item.img}>
                    <img
                        src={`${item.img}`}
                        srcSet={`${item.img}`}
                        alt={item.title}
                        loading="lazy"
                        style={{ cursor: 'pointer' }}
                        onClick={handleOpen}
                    />
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
                                                            officialnffc
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            fontWeight={400}
                                                            fontSize="0.7rem"
                                                            color={theme.palette.text.secondary}
                                                        >
                                                            Original audio
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
                                                <ScrollComment />
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
                                                        232,106 likes
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
                                                        12h
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
                </div>
            ))}
        </div>
        <div class="gallery">
            <i class="fas fa-times"></i>
            <div class="inner">
                <img src={itemData[0].img} alt={itemData[0].title} />
            </div>
            <div class="control left">
                <i class='bx bx-chevron-left' ></i>
            </div>
            <div class="control right">
                <i class='bx bxs-chevron-right'></i>
            </div>
        </div>

    </div >);
}

export default Post;