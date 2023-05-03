import { useState } from "react";
import * as userApi from '~/api/userApi/userApi'
import * as postApi from '~/api/postApi/postApi'
import { useEffect } from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import CommentPost from "../../Home/Posts/CommentPost/CommentPost";
import { useDispatch, useSelector } from "react-redux";
import { addNewBookmark, removeNewBookmark } from "~/features/bookmark/bookmarkSlice";
function RenderPostMess({ mess }) {
    // console.log(mess)
    const [post, setPost] = useState([])
    const [user, setUser] = useState([])
    const [like, setLike] = useState(null);
    const [bookmark, setBookmark] = useState(null);
    const currentUser = useSelector((state) => state.auth.currentUser.data);
    const dataBookmark = useSelector((state) => state.bookmark.data);
    const dispatch = useDispatch();
    // get post by id
    const getPostById = async (postId) => {
        const res = await postApi.getPostById(postId)
        setPost(res)
    }
    const getUserById = async (userId) => {
        const res = await userApi.getFriend(userId)
        setUser(res)
    }

    // get post in bookmark
    useEffect(() => {
        getPostById(mess?.postId)
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

    // handle add bookmark
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
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CommentPost
                    data={itemPost}
                    like={like}
                    handleLikePost={handleLikePost}
                    bookmark={bookmark}
                    handleBookmarkPost={handleBookmarkPost}
                >{
                        !post?.isVideo ? (
                            <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={post?.length > 0 && post?.source[0]?.data} />
                        ) : (
                            <video src={post?.source[0]?.data} style={{ width: '100%', height: '100%', cursor: 'pointer', objectFit: 'none' }} />
                        )
                    }</CommentPost>
                <CardContent>
                    <Typography gutterBottom variant="h6" fontSize='15px' component="div">
                        <b>{user?._id && user?.Name}</b> create new post
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {post?.caption}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>);
}

export default RenderPostMess;