import * as React from 'react';
import { NotePencil } from 'phosphor-react';
import { Avatar, Box, Checkbox, Modal, Stack, Typography, useTheme } from '@mui/material';
import { X } from 'phosphor-react';
import ItemUserInbox from './ItemUserInbox';
import { useDispatch, useSelector } from 'react-redux';
import { getShowChats } from '~/features/message/messageSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as userApi from '~/api/userApi/userApi'
import { useState } from 'react';
import io from 'socket.io-client';
const socket = io("http://localhost:3240");
const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    background: 'rgb(255, 255, 255)',
    p: 1,
    borderRadius: '10px',
};

function ListUserInbox() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const loading = useSelector((state) => state.message.loading)
    const ListUserChat = useSelector((state) => state.message.data);
    const [listUser, setListUser] = useState([])
    const renderItemSuggested = () => {
        return (
            <>{
                listUser?.map((user) => (
                    <Stack direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        p={1}
                        sx={{
                            '&:hover': {
                                background: theme.palette.grey[200],
                            },
                        }}
                        key={user?._id}>
                        <Link to={`/message/${user?._id}`} onClick={handleClose}>
                            <Stack direction="row" spacing={2}>
                                <Avatar src={user?.avatar?.data} alt="user" />
                                <Stack direction="column">
                                    <Typography variant="body2" fontWeight={600} color={theme.palette.text.primary}>
                                        {user?.userName}
                                    </Typography>
                                    <Typography variant="body2" fontWeight={400} color={theme.palette.text.secondary}>
                                        {user?.Name}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Link>
                    </Stack>
                ))
            }</>
        );
    };
    const dispatch = useDispatch();
    const showchats = async () => {
        const actionResult = await dispatch(getShowChats());
        return actionResult;
    };
    useEffect(() => {
        showchats();
    }, []);
    const handleFindUser = async (e) => {
        console.log(e.target.value)
        const res = await userApi.searchUser(e.target.value)
        setListUser(res)
        console.log(res)
    }
    const [usersOnline, setUsersOnline] = useState([])
    useEffect(() => {
        socket.on('get-online-user', data => {
            setUsersOnline(data)
        })
    }, [socket])
    const checkUserOnline = (id) => {
        if (usersOnline.find(u => u?.userId === id)) {
            return true;
        }
        return false;
    }
    return (
        <Stack direction='column' height='100%' width='100%'>
            {/* header */}
            <Stack direction='row' borderBottom='1px solid rgb(219, 219, 219)' padding='10px' justifyContent='center' alignItems='center' height='50px'>
                <div style={{ fontSize: '16px', fontWeight: '600' }}><h3>{currentUser.data.userName}</h3></div>
                <div><button onClick={handleOpen}><NotePencil size={25} /></button></div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} minWidth='400px' maxHeight='400px'>
                        <Stack direction="column">
                            <Stack
                                direction="row"
                                width="100%"
                                alignItems="center"
                                justifyContent={'center'}
                                p={1}
                                position="relative"
                                borderBottom='1px solid rgb(219, 219, 219)'
                            >
                                <Typography variant="body1 " fontWeight={5600} fontSize="0.8rem">
                                    <h3>New Message</h3>
                                </Typography>
                                <Box sx={{ position: 'absolute', right: '10px' }} onClick={handleClose}>
                                    <X size={20} />
                                </Box>
                            </Stack>
                            <Stack
                                direction="row"
                                borderBottom='1px solid rgb(219, 219, 219)'
                                spacing={2}
                                p={1}
                            >
                                <Typography variant="body2" fontWeight="600" fontSize="0.8rem">
                                    To:
                                </Typography>
                                <input placeholder="Search..." onChange={e => handleFindUser(e)}></input>
                            </Stack>
                            <Stack direction="column" p="10px 0px" style={{ width: '100%', height: '300px', overflow: "auto" }}>
                                {renderItemSuggested()}
                            </Stack>
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                p={1}
                                sx={{
                                    borderTop: '1px solid',
                                    borderColor: theme.palette.grey[300],
                                }}
                            >
                            </Stack>
                        </Stack>
                    </Box>
                </Modal>
            </Stack>
            {/* list user chat */}
            < Stack direction='column' height='calc(100% - 50px)' overflow='auto' sx={{
                '&::-webkit-scrollbar': {
                    width: 5,
                    backgroundColor: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: theme.palette.grey[500],
                    borderRadius: '10px',
                },
            }}>
                {ListUserChat?.map((e) => (
                    <button key={e?._id[0]} style={{ cursor: 'pointer' }} ><Link to={`/message/${e?._id[0]}`}><ItemUserInbox user={e?.User} online={checkUserOnline(e?.User[0]?._id)} /></Link></button>
                ))}
            </Stack>
        </Stack >
    );
}

export default ListUserInbox;
