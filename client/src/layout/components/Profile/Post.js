import { useEffect, useState } from 'react';
import { Box, ImageList, ImageListItem, Typography, useTheme } from '@mui/material';
import CommentPost from '../Home/Posts/CommentPost/CommentPost';
import { ChatCircle, Heart } from 'phosphor-react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as userApi from '~/api/userApi/userApi'

function Post(props) {
    const { post } = props
    return (
        <ImageList sx={{ width: '100%', overflow: 'hidden' }} cols={3} rowHeight={250} variant="quilted">
            {post.map((item) => {
                return <ItemListPost item={item} />;
            })
            }
        </ImageList >
    );
}
export default Post;

export const ItemListPost = ({ item }) => {
    const [account, setAccount] = useState([])
    const createRandom = () => {
        var randomstring = '';
        var characters = 'QWERTYUIOPASDFGHJKLZXCVBNM123456789qwertyuiopasdfghjklzxcvbnm';
        for (var i, i = 0; i < 28; i++) {
            randomstring += characters.charAt(Math.floor(Math.random() * 28));
        }
        return randomstring;
    };
    const theme = useTheme();
    const [hover, setHover] = useState(false);
    const currentUser = useSelector((state) => state.auth.currentUser.data);
    const { id } = useParams()
    const getfriend = async () => {
        const res = await userApi.getFriend(id)
        setAccount(res)
    }
    useEffect(() => {
        getfriend()
    }, [id])
    const itemPost = {
        _id: createRandom(),
        User: account,
        Post: item,
        reactionCount: item?.reaction?.length,
        commentPaging: 1
    }
    return (
        <ImageListItem key={item?._id}
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

