import { Avatar, Box, Stack, Typography, useTheme } from '@mui/material';
import { HeartStraight } from 'phosphor-react';
import SuggestionsUserItem from '../Home/SuggestionsUser/SuggestionsUserItem';
import * as userApi from '~/api/userApi/userApi'
import * as postApi from '~/api/postApi/postApi'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RenderComment from './RenderComment';

function Notifications() {
    const theme = useTheme();
    const [notifys, setNotifys] = useState([])
    const [post, setPost] = useState([])
    const getNotify = async () => {
        const res = await userApi.getNotify()
        console.log(res)
        setNotifys(res)
    }
    useEffect(() => {
        getNotify()
    }, [])
    const getPostById = async (id) => {
        const res = await postApi.getPostById(id)
        console.log(res)
        setPost(res)
    }
    const renderFollow = (notify) => {
        return (<div>
            <p><Link to={`/profile/${notify?.User[0]?._id}`} style={{ fontWeight: '600' }}>{notify?.User[0]?.Name}</Link> Started following you</p>
        </div>)
    }
    // const renderComment = (notify) => {
    //     getPostById(notify?.type?.id)
    //     return (
    //         <div style={{ display: 'flex', alignItems: 'center' }} >
    //             <p><Link to={`/profile/${notify?.User[0]?._id}`} style={{ fontWeight: '600' }}>{notify?.User[0]?.Name}</Link> commented on this post</p>
    //             <div style={{ width: '30px', height: '50px', border: '1px solid black' }}>
    //                 <img src={post?.source?.data} alt={post?.source?.filename} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    //             </div>
    //         </div>
    //     )
    // }
    return (
        < Box
            sx={{
                position: 'absolute',
                left: '60px',
                top: '0px',
                boxShadow: 'rgba(0, 0, 0, 0.24) 9px -1px 20px -10px',
                background: theme.palette.background.default,
                zIndex: 100,
                height: '100vh',
                width: '300px',
                overflowX: 'hidden',
                overflowY: 'auto'
            }
            }
        >
            <Stack>
                <h3>Notifications</h3>
                {
                    notifys.length !== 0 ? (notifys.map(notify => {
                        return (<div key={notify?._id}>
                            <Stack direction='row' height='80px' width='100%' padding='10px' display='flex' alignItems='center'>
                                <div style={{
                                    width: '40px', height: '40px', marginRight: '10px'
                                }}>
                                    <Avatar alt="Avatar" src={notify?.User[0]?.avatar?.data} />
                                </div>
                                <div style={{ fontSize: '14px', maxWidth: '200px' }}>
                                    {notify?.type?.typeName === 'follow' && renderFollow(notify)}
                                    {notify?.type?.typeName === 'Comment' && <RenderComment notify={notify} />}
                                </div>
                            </Stack >
                        </div>)
                    })) : (<div style={{ width: '100%', height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ borderRadius: '50%', border: '1px solid black', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                            <HeartStraight size={50} />
                        </div>
                        <div style={{ fontSize: '10px', padding: '10px 0 0 0' }}>
                            <p>Activity on your posts</p>
                        </div>
                        <div style={{ fontSize: '10px', maxWidth: '250px', textAlign: 'center', padding: '10px 0 0 0' }}>
                            <p>When someone likes or comments on one of your posts, you'll see it here.</p>
                        </div>
                    </div>)
                }
            </Stack>
            {/* <Stack direction="column" width="100%" p={1} spacing={2}>
                <Stack direction="row" justifyContent="space-between" width="100%">
                    <Typography variant="body1" fontSize="0.8rem" fontWeight={500} color={theme.palette.text.secondary}>
                        Đề xuất cho bạn
                    </Typography>
                </Stack>
                <Stack direction="column" width="100%">
                    <SuggestionsUserItem />
                    <SuggestionsUserItem />
                    <SuggestionsUserItem />
                </Stack>
            </Stack> */}
        </Box >
    );
}

export default Notifications;
