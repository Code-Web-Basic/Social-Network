import { Avatar, Box, CircularProgress, Stack, Typography, useTheme } from '@mui/material';
import { HeartStraight } from 'phosphor-react';
import * as userApi from '~/api/userApi/userApi'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RenderComment from './RenderComment';
import useElementOnScreen from '~/hook/useElementOnScreen';

function Notifications() {
    const theme = useTheme();
    const [notifys, setNotifys] = useState([])

    // reder notify user follow
    const renderFollow = (notify) => {
        return (<div>
            <p><Link to={`/profile/${notify?.User[0]?._id}`} style={{ fontWeight: '600' }}>{notify?.User[0]?.Name}</Link> Started following you</p>
        </div>)
    }

    const [containerRef, isVisible] = useElementOnScreen({ root: null, threshold: 1 });
    // load het paging
    const [showBottomBar, setShowBottomBar] = useState(true);
    const [pagingPost, setPagingPost] = useState(1);

    useEffect(() => {
        if (isVisible && showBottomBar) {
            const callApi = async () => {
                const resNotifys = await userApi.getNotify(pagingPost)
                if (resNotifys.length > 0) {
                    console.log('call')
                    console.log(resNotifys)
                    setNotifys((prev) => [...prev, ...resNotifys])
                    setShowBottomBar(true);
                    setPagingPost((prev) => prev + 1);
                } else {
                    setShowBottomBar(false);
                }
            };
            callApi();
        }
        console.log(isVisible);
        console.log(pagingPost)
    }, [isVisible, pagingPost, showBottomBar]);

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
                <h3 style={{ margin: '10px 10px' }}>Notifications</h3>
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
                                    {notify?.type?.typeName === 'post' && <RenderComment notify={notify} />}
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
                <div ref={containerRef} style={{ width: '100%', height: '10px' }}></div>
                {showBottomBar && <CircularProgress />}
            </Stack>
        </Box >
    );
}

export default Notifications;
