import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import * as postApi from '~/api/postApi/postApi'
import CommentPost from "../Home/Posts/CommentPost/CommentPost"
import { addNewBookmark, removeNewBookmark } from "~/features/bookmark/bookmarkSlice"
function RenderComment(props) {
    const { notify } = props
    const [post, setPost] = useState([])
    const [like, setLike] = useState(null);
    const [bookmark, setBookmark] = useState(null);
    const currentUser = useSelector((state) => state.auth.currentUser.data);
    const dataBookmark = useSelector((state) => state.bookmark.data);
    const dispatch = useDispatch();
    // get post
    const getPostById = async (id) => {
        const res = await postApi.getPostById(id)
        setPost(res)
    }
    useEffect(() => {
        getPostById(notify?.type?.id)
    }, [notify?.type?.id])

    // check like and bookmark
    useEffect(() => {
        setLike(itemPost?.Post?.reaction?.includes(currentUser?._id))
        setBookmark(dataBookmark.some((e) => e.postId === itemPost?.Post?._id))
    }, [post])

    // random and create data post
    const createRandom = () => {
        var randomstring = '';
        var characters = 'QWERTYUIOPASDFGHJKLZXCVBNM123456789qwertyuiopasdfghjklzxcvbnm';
        for (var i, i = 0; i < 28; i++) {
            randomstring += characters.charAt(Math.floor(Math.random() * 28));
        }
        return randomstring;
    };

    let itemPost = {
        _id: createRandom(),
        User: currentUser,
        Post: post,
        reactionCount: post?.reaction?.length,
        commentPaging: 1
    }

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
        // display notify for comment
        <div style={{ display: 'flex', alignItems: 'center' }} >
            {
                notify?.type?.typeName === 'Comment' && <p><Link to={`/profile/${notify?.User[0]?._id}`} style={{ fontWeight: '600' }}>{notify?.User[0]?.Name}</Link> commented on this post</p>
            }
            {
                notify?.type?.typeName === 'post' && <p><Link to={`/profile/${notify?.User[0]?._id}`} style={{ fontWeight: '600' }}>{notify?.User[0]?.Name}</Link> reaction on this post</p>
            }
            {
                notify?.type?.typeName === 'replyComment' && <p><Link to={`/profile/${notify?.User[0]?._id}`} style={{ fontWeight: '600' }}>{notify?.User[0]?.Name}</Link> Reply commented on this post</p>
            }
            <CommentPost
                data={itemPost}
                like={like}
                handleLikePost={handleLikePost}
                bookmark={bookmark}
                handleBookmarkPost={handleBookmarkPost}
            >
                <div style={{ width: '30px', height: '50px', border: '1px solid black', cursor: 'pointer' }}>
                    {post?.isVideo ? (<video src={post?.caption && post?.source[0]?.data} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />)
                        :
                        (<img src={post?.caption && post?.source[0]?.data} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />)}
                </div>
            </CommentPost>
        </div>
    );
}

export default RenderComment;