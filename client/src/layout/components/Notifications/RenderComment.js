import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import * as postApi from '~/api/postApi/postApi'
import CommentPost from "../Home/Posts/CommentPost/CommentPost"
function RenderComment(props) {
    const { notify } = props
    const [post, setPost] = useState([])
    const getPostById = async (id) => {
        const res = await postApi.getPostById(id)
        console.log(res)
        setPost(res)
    }
    useEffect(() => {
        getPostById(notify?.type?.id)
    }, [notify?.type?.id])
    const createRandom = () => {
        var randomstring = '';
        var characters = 'QWERTYUIOPASDFGHJKLZXCVBNM123456789qwertyuiopasdfghjklzxcvbnm';
        for (var i, i = 0; i < 28; i++) {
            randomstring += characters.charAt(Math.floor(Math.random() * 28));
        }
        return randomstring;
    };
    const currentUser = useSelector((state) => state.auth.currentUser.data);
    const itemPost = {
        _id: createRandom(),
        User: currentUser,
        Post: post,
        reactionCount: post?.reaction?.length,
        commentPaging: 1
    }
    return (

        <div style={{ display: 'flex', alignItems: 'center' }} >
            <p><Link to={`/profile/${notify?.User[0]?._id}`} style={{ fontWeight: '600' }}>{notify?.User[0]?.Name}</Link> commented on this post</p>

            <CommentPost
                data={itemPost}
                like={false}
                bookmark={false}
                handleLikePost={() => { }}
                handleBookmarkPost={() => { }}
            >
                <div style={{ width: '30px', height: '50px', border: '1px solid black' }}>
                    {post?.isVideo ? (<video src={post?.caption && post?.source[0]?.data} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />) : (<img src={post?.caption && post?.source[0]?.data} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />)}
                </div>
            </CommentPost>
        </div>
    );
}

export default RenderComment;