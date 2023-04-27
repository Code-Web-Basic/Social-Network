import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import * as postApi from '~/api/postApi/postApi'
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
    return (<div style={{ display: 'flex', alignItems: 'center' }} >
        <p><Link to={`/profile/${notify?.User[0]?._id}`} style={{ fontWeight: '600' }}>{notify?.User[0]?.Name}</Link> commented on this post</p>
        <div style={{ width: '30px', height: '50px', border: '1px solid black' }}>
            {post?.isVideo ? (<video src={post?.caption && post?.source[0]?.data} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />) : (<img src={post?.caption && post?.source[0]?.data} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />)}
        </div>
    </div>);
}

export default RenderComment;