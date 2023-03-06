// ui
import Tippy from '@tippyjs/react/headless';
import { Avatar, Box, Stack, styled, Typography, useTheme } from '@mui/material';
//icon
import { BookmarkSimple, ChatCircle, DotsThree, Heart, PaperPlaneTilt } from 'phosphor-react';
//components
import NewCommentPost from './CommentPost/NewCommentPost';
import MenuUserFollowing from './MenuUserFollowing/MenuUserFollowing';
import MenuModal from '~/components/Popper/Menu/MenuModal';
import CommentPost from './CommentPost/CommentPost';
import SharePost from './SharePost/SharePost';
import { calculateTimePassed } from '~/utils/utils';

import PropTypes from 'prop-types';

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
function PostItem({ data }) {
    const theme = useTheme();
    return (
        <Box>
            <Stack direction="column" spacing={1.5} marginTop="10px">
                {/* information post */}
                <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Tippy
                            interactive
                            placement="bottom-start"
                            render={(attrs) => (
                                <div className="box" tabIndex="-1" {...attrs}>
                                    <MenuUserFollowing id={data?.User?._id} />
                                </div>
                            )}
                        >
                            <Avatar
                                src={data?.User?.avatar ? `${data?.User?.avatar[0].data}` : ''}
                                sx={{ width: 32, height: 32 }}
                            />
                        </Tippy>
                        <Typography variant="body2" fontWeight="600">
                            {data?.User?.userName}
                        </Typography>
                        <Typography variant="body2" fontSize="400">
                            {calculateTimePassed(data?.Post?.updatedAt)}
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
                        // minHeight: '550px',
                        // height: '550px',

                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <img
                        alt={data?.Post.source[0].filename}
                        src={`${data?.Post.source[0].data}`}
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
                </Box>
                {/* navigate */}
                <Stack direction="column" spacing={0.5}>
                    <Stack direction="row" justifyContent="space-between">
                        <Stack direction="row" spacing={1.5}>
                            {/* heart icon */}
                            <ItemReaction>
                                <Heart size={24} />
                            </ItemReaction>
                            {/* comment icon */}
                            <CommentPost data={data}>
                                <ItemReaction>
                                    <ChatCircle size={24} />
                                </ItemReaction>
                            </CommentPost>
                            {/* share icon */}
                            <SharePost>
                                <ItemReaction>
                                    <PaperPlaneTilt size={24} />
                                </ItemReaction>
                            </SharePost>
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
                            {`${data?.reactionCount} likes`}
                        </Typography>
                    </Stack>
                    {/* body */}
                    <Stack direction="row">
                        <Typography variant="body2">{data?.Post?.caption}</Typography>
                    </Stack>
                    {/* comment */}
                    <CommentPost data={data}>
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
                            {data.Post.commentCount > 0 && (
                                <>
                                    <Typography variant="body2">View all</Typography>
                                    <Typography variant="body2">{data?.Post?.commentCount}</Typography>
                                    <Typography variant="body2"> comments</Typography>
                                </>
                            )}
                        </Stack>
                    </CommentPost>

                    <Stack direction="row">
                        <NewCommentPost postId={data?.Post?._id} />
                    </Stack>
                    {/* comment box */}
                </Stack>
            </Stack>
        </Box>
    );
}

export default PostItem;
PostItem.prototype = {
    data: PropTypes.object,
};
