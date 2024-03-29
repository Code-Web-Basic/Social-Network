import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// ui
import { Avatar, Box, Stack, styled, Typography, useTheme } from '@mui/material';
//icon
import { BookmarkSimple, ChatCircle, DotsThree, Heart, PaperPlaneTilt } from 'phosphor-react';
//components
import NewCommentPost from './CommentPost/NewCommentPost';
import MenuModal from '~/components/Popper/Menu/MenuModal';
import CommentPost from './CommentPost/CommentPost';
import SharePost from './SharePost/SharePost';
import { calculateTimePassed, timeAgo } from '~/utils/utils';

import { reactionPost } from '~/api/postApi/postApi';

import { decreaseNumberLike, increaseNumberLike } from '~/features/post/postSlice';
import { addNewBookmark, removeNewBookmark } from '~/features/bookmark/bookmarkSlice';
import MediaPost from '~/components/MediaPost/MediaPost';
import { Link } from 'react-router-dom';
import * as routerConfig from '~/config/config';

const ItemReaction = styled('div')(({ theme }) => ({
    color: theme.palette.text.primary,
    '&:hover': {
        color: theme.palette.grey[800],
    },
}));
//data menu setting post

function PostItem({ data }) {
    const MENU_ITEMS = [
        {
            title: 'About this account',
            color: 'text.primary',
            fontWeight: 400,
            component: Link,
            to: routerConfig.router.profile.slice(0, -3) + `${data?.User?._id}`,
        },
    ];

    const currentUser = useSelector((state) => state.auth.currentUser.data);
    const dataBookmark = useSelector((state) => state.bookmark.data);

    const [like, setLike] = useState(data?.Post?.reaction?.includes(currentUser?._id));
    const [bookmark, setBookmark] = useState(dataBookmark.some((e) => e.postId === data?.Post?._id));

    const dispatch = useDispatch();
    const theme = useTheme();
    const heartRef = useRef();
    const bookmarkRef = useRef();

    useEffect(() => {
        if (like) {
            heartRef.current.style.color = 'red';
        } else {
            heartRef.current.style.color = theme.palette.grey[800];
            heartRef.current.style.color = theme.palette.grey[800];
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [like]);
    useEffect(() => {
        if (bookmark || dataBookmark.some((e) => e.postId === data?.Post?._id)) {
            bookmarkRef.current.style.color = 'black';
        } else {
            bookmarkRef.current.style.color = theme.palette.grey[800];
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookmark]);

    const handleLikePost = async () => {
        try {
            if (data?.Post?.reaction?.includes(currentUser?._id)) {
                setLike(false);
                await reactionPost({ id: data.Post._id });
                dispatch(decreaseNumberLike({ idPost: data.Post?._id, idUser: currentUser?._id }));
            } else {
                setLike(true);
                await reactionPost({ id: data.Post._id });
                dispatch(increaseNumberLike({ idPost: data.Post?._id, idUser: currentUser?._id }));
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleBookmarkPost = async () => {
        try {
            if (bookmark) {
                await dispatch(removeNewBookmark({ idPost: data?.Post?._id }));
                setBookmark(false);
            } else {
                await dispatch(addNewBookmark({ idPost: data?.Post?._id }));
                setBookmark(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box>
            <Stack direction="column" spacing={1.5} marginTop="10px">
                {/* information post */}
                <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        {/* <Tippy
                            interactive
                            placement="bottom-start"
                            render={(attrs) => {
                                return (
                                    <div className="box" tabIndex="-1" {...attrs}>
                                        <MenuUserFollowing id={data?.User?._id} data={data?.User} />
                                    </div>
                                );
                            }}
                        > */}
                        <Avatar
                            src={data ? `${data?.User?.avatar?.data}` : ''}
                            style={{ width: 32, height: 32 }}
                            alt="user"
                        />
                        {/* </Tippy> */}
                        <Typography variant="body2" fontWeight="600">
                            {data?.User?.userName}
                        </Typography>
                        <Typography variant="body2" fontSize="400">
                            {calculateTimePassed(data?.Post?.createdAt)}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="center">
                        <MenuModal data={MENU_ITEMS}>
                            <DotsThree size={24} weight="fill" />
                        </MenuModal>
                    </Stack>
                </Stack>
                {/* media */}
                <MediaPost data={data?.Post?.source} isImages={!data?.Post?.isVideo} />
                {/* navigate */}
                <Stack direction="column" spacing={0.5}>
                    <Stack direction="row" justifyContent="space-between">
                        <Stack direction="row" spacing={1.5}>
                            {/* heart icon */}
                            <ItemReaction
                                onClick={handleLikePost}
                                sx={{
                                    color: theme.palette.grey[800],
                                    '&:hover': {
                                        color: theme.palette.grey[600],
                                    },
                                }}
                            >
                                <Heart size={24} ref={heartRef} weight={like ? 'fill' : 'regular'} />
                            </ItemReaction>
                            {/* comment icon */}
                            <CommentPost
                                data={data}
                                like={like}
                                bookmark={bookmark}
                                handleLikePost={handleLikePost}
                                handleBookmarkPost={handleBookmarkPost}
                            >
                                <ItemReaction
                                    sx={{
                                        color: theme.palette.grey[800],
                                        '&:hover': {
                                            color: theme.palette.grey[600],
                                        },
                                    }}
                                >
                                    <ChatCircle size={24} />
                                </ItemReaction>
                            </CommentPost>
                            {/* share icon */}
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
                        <Stack direction="row" onClick={handleBookmarkPost}>
                            <ItemReaction
                                sx={{
                                    color: theme.palette.grey[700],
                                    '&:hover': {
                                        color: theme.palette.grey[600],
                                    },
                                }}
                            >
                                <BookmarkSimple size={24} ref={bookmarkRef} weight={bookmark ? 'fill' : 'regular'} />
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
                    <CommentPost
                        data={data}
                        like={like}
                        bookmark={bookmark}
                        handleLikePost={() => handleLikePost}
                        handleBookmarkPost={() => handleBookmarkPost}
                    >
                        <Stack
                            direction="row"
                            spacing={0.3}
                            sx={{
                                color: theme.palette.grey[800],
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
