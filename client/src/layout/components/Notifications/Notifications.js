import { Avatar, Box, Stack, Typography, useTheme } from '@mui/material';
import { HeartStraight } from 'phosphor-react';
import SuggestionsUserItem from '../Home/SuggestionsUser/SuggestionsUserItem';
import * as userApi from '~/api/userApi/userApi'
import { useEffect, useState } from 'react';

function Notifications() {
    const theme = useTheme();
    const [notifys, setNotifys] = useState([])
    // const getNotify = async () => {
    //     const res = await userApi.getNotify()
    //     console.log(res)
    // }
    // useEffect(() => {
    //     getNotify()
    // }, [])
    return (
        < Box
            sx={{
                position: 'absolute',
                left: '60px',
                top: '0px',
                boxShadow: 'rgba(0, 0, 0, 0.24) 9px -1px 20px -10px',
                background: theme.palette.background.default,
                zIndex: 100,
            }
            }
        >
            <Stack>
                <h2>Thông báo</h2>
                {
                    notifys.length !== 0 ? (notifys.map(notify => {
                        return (<div key={notify.id}>
                            <Stack direction='row' height='80px' width='100%' padding='10px'>
                                <div style={{ width: '40px', height: '40px', marginRight: '10px' }}>
                                    <Avatar alt="Avatar" src={notify.img} style={{
                                        width: '100%',
                                        height: '100%'
                                    }} />
                                </div>
                                <div style={{ fontSize: '14px', display: 'flex', alignContent: 'flex-start', flexDirection: 'column', justifyContent: 'center', textAlign: 'left' }}>
                                    <p>{notify.content}</p>
                                </div>
                            </Stack >
                        </div>)
                    })) : (<div style={{ width: '100%', height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ borderRadius: '50%', border: '1px solid black', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                            <HeartStraight size={50} />
                        </div>
                        <div style={{ fontSize: '10px', padding: '10px 0 0 0' }}>
                            <p>Hoạt động trên bài đăng của bạn</p>
                        </div>
                        <div style={{ fontSize: '10px', maxWidth: '250px', textAlign: 'center', padding: '10px 0 0 0' }}>
                            <p>Khi ai đó thích hoặc nhận xét về một trong các bài đăng của bạn, bạn sẽ thấy nó ở đây.</p>
                        </div>
                    </div>)
                }
            </Stack>
            <Stack direction="column" width="100%" p={1} spacing={2}>
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
            </Stack>
        </Box >
    );
}

export default Notifications;
