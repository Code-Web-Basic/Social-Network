import './Post.css'
import { ImageList, ImageListItem } from '@mui/material';

function Post(props) {
    const { post } = props
    return (
        <ImageList sx={{ width: '100%', overflow: 'hidden' }} cols={3} rowHeight={250}>
            {post.map((item) => (
                <ImageListItem key={item.img} className='post' sx={{ border: '1px solid black', width: '100%', height: '100%', overflow: 'hidden' }}>
                    {!item.isVideo ?
                        <img
                            src={`${item?.source[0]?.data}`}
                            alt={item?.caption}
                            loading="lazy"
                            style={{ width: '100%', height: '100%', cursor: 'pointer', objectFit: 'none' }}
                        /> : <video src={item?.source[0]?.data} style={{ width: '100%', height: '100%', cursor: 'pointer', objectFit: 'none' }} />
                    }
                </ImageListItem>
            ))
            }
        </ImageList >
    );
}
export default Post;
{/* <Modal
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
                                    <ItemReaction>
                                        <Heart size={24} />
                                    </ItemReaction>
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
                            <Stack direction="row" p={0.5}>
                                <Typography
                                    variant="body2"
                                    fontWeight="600"
                                    color={theme.palette.text.primary}
                                >
                                    232,106 likes
                                </Typography>
                            </Stack>
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
</Modal> */}