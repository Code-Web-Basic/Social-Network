// ui
import Tippy from '@tippyjs/react/headless';
import { Avatar, Box, Stack, styled, Typography, useTheme } from '@mui/material';
//icon
import { BookmarkSimple, ChatCircle, DotsThree, Heart, PaperPlaneTilt } from 'phosphor-react';
//components
import images from '~/assets/images';
import NewCommentPost from './CommentPost/NewCommentPost';
import MenuUserFollowing from './MenuUserFollowing/MenuUserFollowing';
import MenuModal from '~/components/Popper/Menu/MenuModal';
import CommentPost from './CommentPost/CommentPost';

const ItemReaction = styled('div')(({ theme }) => ({
    color: theme.palette.text.primary,
    '&:hover': {
        color: theme.palette.grey[500],
    },
}));
//data menu setting post
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
function PostItem() {
    const theme = useTheme();
    return (
        <Box sx={{ borderBottom: '1px solid', borderColor: theme.palette.grey[300] }}>
            <Stack direction="column" spacing={1.5}>
                {/* information post */}
                <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Tippy
                            interactive
                            placement="bottom-start"
                            render={(attrs) => (
                                <div className="box" tabIndex="-1" {...attrs}>
                                    <MenuUserFollowing />
                                </div>
                            )}
                        >
                            <Avatar src="" sx={{ width: 32, height: 32 }} />
                        </Tippy>
                        <Typography variant="body2" fontWeight="600">
                            Nguyen van tu
                        </Typography>
                        <Typography variant="body2" fontSize="400">
                            6h
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="center">
                        <MenuModal data={MENU_ITEMS}>
                            <DotsThree size={24} weight="fill" />
                        </MenuModal>
                    </Stack>
                </Stack>
                {/* media */}
                <Box
                    sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: 1,
                        maxHeight: '600px',
                        minHeight: '550px',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <img
                        alt="post1"
                        src={images.post}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </Box>
                {/* navigate */}
                <Stack direction="column" spacing={0.5}>
                    <Stack direction="row" justifyContent="space-between">
                        <Stack direction="row" spacing={1.5}>
                            <ItemReaction>
                                <Heart size={24} />
                            </ItemReaction>
                            <CommentPost>
                                <ItemReaction>
                                    <ChatCircle size={24} />
                                </ItemReaction>
                            </CommentPost>

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
                        <Typography variant="body2" fontWeight="600">
                            232,106 likes
                        </Typography>
                    </Stack>
                    {/* body */}
                    <Stack direction="row">
                        <Typography variant="body2">mancity Working hard! ⚔️</Typography>
                    </Stack>
                    {/* comment */}
                    <CommentPost>
                        <Stack
                            direction="row"
                            spacing={0.3}
                            sx={{
                                color: theme.palette.grey[500],
                                cursor: 'pointer',
                                '&:active': {
                                    color: theme.palette.grey[400],
                                },
                            }}
                        >
                            <Typography variant="body2">View all</Typography>
                            <Typography variant="body2">1,033</Typography>
                            <Typography variant="body2"> comments</Typography>
                        </Stack>
                    </CommentPost>
                    <Stack direction="row">
                        <NewCommentPost />
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}

export default PostItem;
