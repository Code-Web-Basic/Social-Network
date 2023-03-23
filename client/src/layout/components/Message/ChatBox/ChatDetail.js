import * as React from 'react';
// mui ui
import { Avatar, FormControl, Input, InputAdornment, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { Gear, Heart, Phone, Smiley, VideoCamera } from 'phosphor-react';
import * as messApi from '~/api/messageApi/messageApi'
import { useState } from 'react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShowMessage } from '~/features/message/messageSlide';
import './ChatDetail.css'
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',

        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));
function ChatDetail(props) {
    const { userfriend } = props
    const [isPickerVisible, setPickerVisible] = useState(false)
    const [currentChat, setCurrentChat] = useState('')
    const handleHeart = async () => {
        const data = {
            targetId: userfriend?._id[0],
            message: '❤',
            isReply: false
        }
        const res = await messApi.postSendMessage(data)
        console.log(res)
    }
    const handleEmojiClick = (event) => {
        let message = currentChat;
        message += event.native;
        setCurrentChat(message);
    };
    const handlePickerVisible = () => {
        setPickerVisible(!isPickerVisible)
    }
    const dispatch = useDispatch();
    const getMessages = async () => {
        const actionResult = await dispatch(getShowMessage(userfriend?._id[0]));
        return actionResult;
    };
    useEffect(() => {
        getMessages();
    }, [userfriend]);
    const messageData = useSelector((state) => state.message?.messages);
    const currentUser = useSelector((state) => state.auth.currentUser.data);
    return (<Stack direction='column' height='100%' width='100%'>
        {/* header */}
        <Stack direction='row' borderBottom='1px solid rgb(219, 219, 219)' height='50px' marginLeft='15px' justifyContent='space-between'>
            <div style={{ fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <div style={{ width: '30px', height: '30px', marginRight: '10px' }}>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar alt="Avatar" src={userfriend._id ? userfriend?.User[0]?.avatar?.data : ''} style={{
                            width: '100%',
                            height: '100%'
                        }} />
                    </StyledBadge>
                </div>
                <div style={{ fontSize: '14px', display: 'flex', alignContent: 'flex-start', flexDirection: 'column', justifyContent: 'center', textAlign: 'left' }}>
                    <h4 style={{ padding: '3px 0' }}>{userfriend._id ? userfriend?.User[0]?.Name : ''}</h4>
                    <p>Đang hoạt động</p>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Phone size={28} style={{ margin: '0px 10px', cursor: 'pointer' }} />
                <VideoCamera size={28} style={{ margin: '0px 10px', cursor: 'pointer' }} />
                <Gear size={28} style={{ margin: '0px 10px', cursor: 'pointer' }} />
            </div>
        </Stack>
        {/* char detail*/}
        <Stack style={{ width: '100%', height: '100%', position: 'relative' }}>
            <div style={{ height: 'calc(100% - 50px)', overflow: 'auto' }}>
                {messageData?.map((mess) => (
                    <div key={mess._id} className={currentUser?._id === mess?.sourceId ? 'item-mess mychat' : 'item-mess'}>
                        <div className='avatar' style={{ width: '30px', height: '30px' }}>
                            <img src={userfriend?.User[0]?.avatar?.data}></img>
                        </div>
                        <p
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'white',
                                color: 'black',
                                borderRadius: '20px',
                                fontSize: '15px',
                                maxWidth: '300px',
                                padding: '5px',
                                background: 'rgb(219, 219, 219)'
                            }}
                        >
                            {mess.message}
                        </p>
                    </div>
                ))}
            </div>
            <div style={{ position: 'absolute', bottom: '20px', width: '90%', height: '50px', left: '5%', right: '5%', borderTop: '1px solid rgb(219, 219, 219)', borderBottom: '1px solid rgb(219, 219, 219)' }}>
                <FormControl style={{ width: '100%', height: '25px' }}>
                    <Input style={{ fontSize: '18px' }}
                        startAdornment={
                            <InputAdornment position="start">
                                <Smiley size={25} onClick={handlePickerVisible} cursor='pointer' />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <Heart fontSize='25px' fontWeight='700' cursor='pointer' onClick={handleHeart} />
                            </InputAdornment>
                        }
                        //
                        onChange={(e) => setCurrentChat(e.target.value)}
                        value={currentChat}
                    />
                    {isPickerVisible ? (<div tabIndex="-1" style={{ position: 'absolute', bottom: '30px' }}>
                        <Picker data={data} onEmojiSelect={handleEmojiClick} theme="light" />
                    </div>) : <></>}
                </FormControl>
            </div>
        </Stack>
    </Stack >);
}

export default ChatDetail;