import * as React from 'react';
// mui ui
import { Avatar, FormControl, IconButton, Input, InputAdornment, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { Gear, Heart, Image, Phone, Smiley, VideoCamera } from 'phosphor-react';
import { useState } from 'react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShowMessage, postSendMessage } from '~/features/message/messageSlice';
import './ChatDetail.css'
import { Link, Navigate, useParams } from 'react-router-dom';
import * as userApi from '~/api/userApi/userApi'
import images from '~/assets/images';
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
function ChatDetail() {
    //const { userfriend } = props
    const [isPickerVisible, setPickerVisible] = useState(false)
    const [currentChat, setCurrentChat] = useState('')
    const [userfriend, setUserfriend] = useState([])
    const { id } = useParams()
    const getfriend = async () => {
        const res = await userApi.getFriend(id)
        setUserfriend(res)
    }
    useEffect(() => {
        getfriend()
    }, [id])
    const dispatch = useDispatch();
    const handleHeart = async () => {
        const data = {
            targetId: id,
            message: '❤',
            isReply: false
        }

        await dispatch(postSendMessage(data));
        await dispatch(getShowMessage(id))
    }
    const handleEmojiClick = (event) => {
        let message = currentChat;
        message += event.native;
        setCurrentChat(message);
    };
    const handlePickerVisible = () => {
        setPickerVisible(!isPickerVisible)
    }
    const handleInputImage = async (e) => {
        let formData = new FormData();
        formData.append('targetId', id);
        formData.append('isReply', false);
        formData.append('message', ' ');
        formData.append('files', e.target.files[0]);
        await dispatch(postSendMessage(formData));
        await dispatch(getShowMessage(id))
    }
    const handleSubmit = async (event) => {
        const data = {
            targetId: id,
            message: currentChat,
            isReply: false
        }
        if (event.key === 'Enter' && currentChat !== '') {
            await dispatch(postSendMessage(data));
            await dispatch(getShowMessage(id))
            setCurrentChat('')
        }
    }
    const messageData = useSelector((state) => state.message.messages);
    const currentUser = useSelector((state) => state.auth.currentUser.data);
    return (<Stack direction='column' height='100%' width='100%'>
        {/* header */}
        <Stack direction='row' borderBottom='1px solid rgb(219, 219, 219)' height='50px' marginLeft='15px' justifyContent='space-between'>
            <div style={{ fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <div style={{ width: '30px', height: '30px', marginRight: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar alt="Avatar" src={userfriend?.avatar?.data} />
                    </StyledBadge>
                </div>
                <div style={{ fontSize: '14px', display: 'flex', alignContent: 'flex-start', flexDirection: 'column', justifyContent: 'center', textAlign: 'left' }}>
                    <h4 style={{ padding: '3px 0' }}>{userfriend?.Name}</h4>
                    <p>Đang hoạt động</p>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link to={`/roomvoice/${id}`}><Phone size={28} style={{ margin: '0px 10px', cursor: 'pointer' }} /></Link>
                {/* <Phone size={28} style={{ margin: '0px 10px', cursor: 'pointer' }} /> */}
                <Link to={`/roomcall/${id}`}><VideoCamera size={28} style={{ margin: '0px 10px', cursor: 'pointer' }} /></Link>
                {/* <VideoCamera size={28} style={{ margin: '0px 10px', cursor: 'pointer' }} onClick={handleCallVideo} /> */}
                <Gear size={28} style={{ margin: '0px 10px', cursor: 'pointer' }} />
            </div>
        </Stack>
        {/* char detail*/}
        <Stack style={{ width: '100%', height: 'calc(100% - 50px)', position: 'relative' }}>
            <div style={{ height: 'calc(100% - 100px)', overflow: 'auto' }}>
                {messageData?.length > 0 ? messageData?.map((mess) => (
                    <div key={mess._id} className={currentUser?._id === mess?.sourceId ? 'item-mess mychat' : 'item-mess'}>
                        <div className='avatar' style={{ width: '30px', height: '30px' }}>
                            <img src={userfriend?.avatar?.data}></img>
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
                            {mess.message !== ' ' ? mess.message : <img src={mess.source[0]?.data} style={{ maxWidth: '250px', maxHeight: '250px' }} />}
                        </p>
                    </div>
                )) : <></>}
            </div>
            <div style={{ position: 'absolute', bottom: '20px', width: '90%', height: '50px', left: '5%', right: '5%', borderTop: '1px solid rgb(219, 219, 219)', borderBottom: '1px solid rgb(219, 219, 219)' }}>
                <FormControl style={{ width: '100%', height: '25px', display: 'flex', flexDirection: 'row' }}>
                    <Input style={{ fontSize: '18px', width: '100%' }}
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
                        onKeyDown={handleSubmit}
                    />
                    <div>
                        <input
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            onChange={(e) => {
                                handleInputImage(e)
                            }}
                        />
                        <label htmlFor="file" >
                            <img src={images.image} alt="" style={{ margin: '0px 5px', height: '30px', cursor: 'pointer' }} />
                        </label>
                    </div>
                    {isPickerVisible ? (<div tabIndex="-1" style={{ position: 'absolute', bottom: '30px' }}>
                        <Picker data={data} onEmojiSelect={handleEmojiClick} theme="light" />
                    </div>) : <></>}
                </FormControl>
            </div>
        </Stack>
    </Stack >);
}

export default ChatDetail;