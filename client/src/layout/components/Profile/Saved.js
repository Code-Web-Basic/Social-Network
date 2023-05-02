import * as React from 'react';
import * as bookmarksApi from '~/api/bookmarksApi/bookmarksApi'
// mui ui
import { Box, ImageList, ImageListItem, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import * as postApi from '~/api/postApi/postApi'
import * as userApi from '~/api/userApi/userApi'
import CommentPost from '../Home/Posts/CommentPost/CommentPost';
import { ChatCircle, Heart } from 'phosphor-react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewBookmark, removeNewBookmark } from '~/features/bookmark/bookmarkSlice';
function Saved() {
    const [bookMarks, getBookMarks] = useState([])

    // get all bookmark
    const getBookMark = async () => {
        const res = await bookmarksApi.getBookMarks()
        getBookMarks(res)
    }
    useEffect(() => {
        getBookMark()
    }, [])

    return (
        <ImageList sx={{ width: '100%', overflow: 'hidden' }} cols={3} rowHeight={250} variant="quilted">
            {bookMarks.map((bookMark) => (
                <ItemListSaved key={bookMark?.postId} bookMark={bookMark} />
            ))}
        </ImageList >
    );
}

export default Saved;

export const ItemListSaved = ({ bookMark }) => {
    const [post, setPost] = useState([])
    const [user, getUser] = useState([])
    const [hover, setHover] = useState(false);
    const [like, setLike] = useState(null);
    const [bookmark, setBookmark] = useState(null);

    const dispatch = useDispatch();
    const theme = useTheme();
    const currentUser = useSelector((state) => state.auth.currentUser.data);
    const dataBookmark = useSelector((state) => state.bookmark.data);

    // get post by id
    const getPostById = async (postId) => {
        const res = await postApi.getPostById(postId)
        setPost(res)
    }
    const getUserById = async (userId) => {
        const res = await userApi.getFriend(userId)
        getUser(res)
    }

    // get post in bookmark
    useEffect(() => {
        getPostById(bookMark?.postId)
    }, [])
    useEffect(() => {
        if (post?.ownerId)
            getUserById(post?.ownerId)
    }, [post])

    // custom data post
    const createRandom = () => {
        var randomstring = '';
        var characters = 'QWERTYUIOPASDFGHJKLZXCVBNM123456789qwertyuiopasdfghjklzxcvbnm';
        for (var i, i = 0; i < 28; i++) {
            randomstring += characters.charAt(Math.floor(Math.random() * 28));
        }
        return randomstring;
    };
    const itemPost = {
        _id: createRandom(),
        User: user,
        Post: post,
        reactionCount: post?.reaction?.length,
        commentPaging: 1
    }

    // check like and bookmark
    useEffect(() => {
        setLike(itemPost?.Post?.reaction?.includes(currentUser?._id))
        setBookmark(dataBookmark.some((e) => e.postId === itemPost?.Post?._id))
    }, [post])

    // handle like and unlike
    const increaseNumberLike = () => {
        itemPost.Post.reaction = [...itemPost.Post.reaction, currentUser?._id];
        itemPost.reactionCount++;
        setPost(itemPost.Post)
    };

    const decreaseNumberLike = () => {
        const dataReaction = post.reaction.filter((item) => item !== currentUser?._id);
        itemPost.Post.reaction = dataReaction;
        if (itemPost.reactionCount !== 0) {
            itemPost.reactionCount--;
        }
        setPost(itemPost.Post)
    };

    const handleLikePost = async () => {
        try {
            if (itemPost?.Post?.reaction?.includes(currentUser?._id) & like) {
                await postApi.reactionPost({ id: itemPost?.Post?._id });
                setLike(false);
                decreaseNumberLike();
            } else {
                await postApi.reactionPost({ id: itemPost?.Post?._id });
                setLike(true);
                increaseNumberLike();
            }
        } catch (error) {
            console.log(error);
        }
    };

    // handle bookmark
    const handleBookmarkPost = async () => {
        if (bookmark) {
            await dispatch(removeNewBookmark({ idPost: itemPost?.Post?._id }));
            setBookmark(false);
        } else {
            await dispatch(addNewBookmark({ idPost: itemPost?.Post?._id }));
            setBookmark(true);
        }
    };

    return (
        <ImageListItem
            sx={{
                position: 'relative', display: 'flex',
                alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            {!post.isVideo ?
                <img
                    style={{ objectFit: 'cover' }}
                    src={post?._id && post?.source[0].data}
                    alt={post?._id && post?.source[0].filename}
                    loading="lazy"
                /> :
                <video src={post?._id && post?.source[0]?.data} style={{ width: '100%', height: '100%', cursor: 'pointer', objectFit: 'none' }} />
            }
            {hover && (
                <Box
                    sx={{
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        background: 'rgba(0,0,0,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <CommentPost
                        data={itemPost}
                        like={like}
                        handleLikePost={handleLikePost}
                        bookmark={bookmark}
                        handleBookmarkPost={handleBookmarkPost}
                        styles={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px' }}>
                                <Heart size={20} weight="fill" color={theme.palette.common.white} />
                                <Typography
                                    variant="h6"
                                    fontSize={'1.2rem'}
                                    color={theme.palette.common.white}
                                    marginLeft="5px"
                                >
                                    {itemPost?.reactionCount}
                                </Typography>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <ChatCircle size={20} weight="fill" color={theme.palette.common.white} />
                                <Typography
                                    variant="h6"
                                    fontSize={'1.2rem'}
                                    color={theme.palette.common.white}
                                    marginLeft="5px"
                                >
                                    {itemPost?.Post?.commentCount}
                                </Typography>
                            </div>
                        </div>
                    </CommentPost>
                </Box>
            )}
        </ImageListItem>
    );
};



