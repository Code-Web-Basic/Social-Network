import { useEffect, useState } from 'react';
import { Box, ImageList, ImageListItem, Typography, useTheme } from '@mui/material';
import CommentPost from '../Home/Posts/CommentPost/CommentPost';
import { ChatCircle, Heart } from 'phosphor-react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as postApi from '~/api/postApi/postApi'
import * as userApi from '~/api/userApi/userApi'
import { addNewBookmark, removeNewBookmark } from '~/features/bookmark/bookmarkSlice';

function Post(props) {
    const { post, setPost } = props
    return (
        <ImageList sx={{ width: '100%', overflow: 'hidden' }} cols={3} rowHeight={250} variant="quilted">
            {post.map((item) => {
                return <ItemListPost key={item?._id} item={item} post={post} setPost={setPost} />;
            })
            }
        </ImageList >
    );
}
export default Post;

export const ItemListPost = ({ item, post, setPost }) => {
    const [account, setAccount] = useState([])
    const [hover, setHover] = useState(false);
    const [like, setLike] = useState(null);
    const [bookmark, setBookmark] = useState(null);

    const theme = useTheme();
    const { id } = useParams()
    const dispatch = useDispatch()

    const dataBookmark = useSelector((state) => state.bookmark.data);
    const currentUser = useSelector((state) => state.auth.currentUser.data);

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
        User: account,
        Post: item,
        reactionCount: item?.reaction?.length,
        commentPaging: 1
    }

    // get friend
    const getfriend = async () => {
        const res = await userApi.getFriend(id)
        setAccount(res)
    }
    useEffect(() => {
        getfriend()
    }, [id])

    // check like and bookmark
    useEffect(() => {
        setLike(itemPost?.Post?.reaction?.includes(currentUser?._id))
        setBookmark(dataBookmark.some((e) => e.postId === item?._id))
    }, [item])

    // handle like and unlike
    const increaseNumberLike = () => {
        const arrTmp = post;
        const index = arrTmp.findIndex((obj) => obj?._id === item._id);
        if (arrTmp[index]) {
            arrTmp[index].reaction = [...arrTmp[index].reaction, currentUser?._id];
            arrTmp[index].reactionCount++;
        }
        setPost(arrTmp);
    };
    const decreaseNumberLike = () => {
        const arrTmp = post;
        const index = arrTmp.findIndex((obj) => obj?._id === item._id);
        if (arrTmp[index]) {
            const dataReaction = arrTmp[index].reaction.filter((item) => item !== currentUser?._id);
            arrTmp[index].reaction = dataReaction;
            if (arrTmp[index].reactionCount !== 0) {
                arrTmp[index].reactionCount--;
            }
        }
        setPost(arrTmp);
    };

    const handleLikePost = async () => {
        try {
            if (item?.reaction?.includes(currentUser?._id) & like) {
                await postApi.reactionPost({ id: item._id });
                setLike(false);
                decreaseNumberLike();
            } else {
                await postApi.reactionPost({ id: item._id });
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
            await dispatch(removeNewBookmark({ idPost: item?._id }));
            setBookmark(false);
        } else {
            await dispatch(addNewBookmark({ idPost: item?._id }));
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
            {!item.isVideo ?
                <img
                    style={{ objectFit: 'cover' }}
                    src={item?.source[0].data}
                    alt={item?.source[0].filename}
                    loading="lazy"
                /> :
                <video src={item?.source[0]?.data} style={{ width: '100%', height: '100%', cursor: 'pointer', objectFit: 'none' }} />
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
                        bookmark={bookmark}
                        handleLikePost={handleLikePost}
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

