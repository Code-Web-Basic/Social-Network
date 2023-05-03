import { PaperPlaneTilt } from "phosphor-react";
import * as React from 'react';
import Button from '@mui/material/Button';
// mui ui
import { Avatar, Box, Checkbox, Modal, Stack, Typography, useTheme } from '@mui/material';
import { X } from 'phosphor-react';
import ChatDetail from "./ChatDetail";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearMess, getShowMessage } from "~/features/message/messageSlice";
import { useEffect } from "react";
import * as userApi from '~/api/userApi/userApi'
import io from 'socket.io-client';
import { useState } from "react";
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
function ChatBox() {
    const [open, setOpen] = React.useState(false);
    const [listUser, setListUser] = useState([])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const theme = useTheme();
    //const { userfriend } = props
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
    const { id } = useParams()
    const [paging, setPaging] = useState(1);

    const [showBottomBar, setShowBottomBar] = useState(true);
    // get message
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMorePost = async () => {
            await dispatch(clearMess())
            if (id !== undefined) {
                const originalPromiseResult = await dispatch(getShowMessage({
                    id: id,
                    paging: 1
                }))
                console.log(originalPromiseResult)
                if (originalPromiseResult?.payload?.length < 15) {
                    setShowBottomBar(false);
                }
                else {
                    setPaging(2);
                    // setShowBottomBar(true);
                }
            }
        };
        fetchMorePost();
    }, [id])

    // check online
    const [usersOnline, setUsersOnline] = useState([])
    useEffect(() => {
        socket.on('get-online-user', data => {
            // console.log(data)
            setUsersOnline(data)
        })
    }, [socket])

    const checkUserOnline = () => {
        if (usersOnline.find(u => u?.userId === id)) {
            return true;
        }
        return false;
    }
    const handleFindUser = async (e) => {
        console.log(e.target.value)
        const res = await userApi.searchUser(e.target.value)
        setListUser(res)
        console.log(res)
    }
    return (<>
        {id ? (
            <ChatDetail paging={paging} setPaging={setPaging}
                online={checkUserOnline()} showBottomBar={showBottomBar} setShowBottomBar={setShowBottomBar}
            />
        ) : (<>
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ borderRadius: '50%', border: '1px solid black', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <PaperPlaneTilt size={32} />
                </div>
                <div style={{ fontSize: '10px', padding: '10px 0 0 0' }}>
                    <h1>Your Messages</h1>
                </div>
                <div style={{ fontSize: '10px', maxWidth: '250px', textAlign: 'center', padding: '10px 0 0 0' }}>
                    <p>Send private photos and messages to a friend or group.</p>
                </div>
                <div>
                    <Button onClick={handleOpen}><p style={{ fontSize: '15px' }}>New message</p></Button>
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
                </div>
            </div>
        </>)
        }
    </>);
}

export default ChatBox;