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
function Saved() {
    const [bookMarks, getBookMarks] = useState([])

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
    const [post, getPost] = useState([])
    const [user, getUser] = useState([])
    const getPostById = async (postId) => {
        const res = await postApi.getPostById(postId)
        getPost(res)
    }
    const getUserById = async (userId) => {
        const res = await userApi.getFriend(userId)
        getUser(res)
    }
    useEffect(() => {
        getPostById(bookMark?.postId)
    }, [])
    useEffect(() => {
        if (post?.ownerId)
            getUserById(post?.ownerId)
    }, [post])
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
    const theme = useTheme();
    const [hover, setHover] = useState(false);
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
                        like={false}
                        bookmark={false}
                        handleLikePost={() => { }}
                        handleBookmarkPost={() => { }}
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



