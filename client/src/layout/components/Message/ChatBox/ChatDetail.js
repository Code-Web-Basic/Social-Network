import * as React from 'react';
// mui ui
import { Avatar, CircularProgress, FormControl, Input, InputAdornment, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { ArrowBendUpLeft, Heart, Image, Phone, Smiley, VideoCamera, X } from 'phosphor-react';
import { useState } from 'react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearMess, clearMessage, getShowMessage, postSendMessage } from '~/features/message/messageSlice';
import * as messageApi from '~/api/messageApi/messageApi';
import './ChatDetail.css'
import { Link, useParams } from 'react-router-dom';
import * as userApi from '~/api/userApi/userApi'
import { useRef } from 'react';
import io from 'socket.io-client';
import useElementOnScreen from '~/hook/useElementOnScreen';
import RenderPostMess from './RenderPostMess';
const socket = io("http://localhost:3240");
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
    const [isPickerVisible, setPickerVisible] = useState(false)
    const [currentChat, setCurrentChat] = useState('')
    const [userfriend, setUserfriend] = useState([])
    const [reply, setReply] = useState(false)
    const [replyValue, setReplyValue] = useState('')
    const [messageReceive, setMessageReceive] = useState({})

    const [containerRef, isVisible] = useElementOnScreen({ root: null, threshold: 1 });
    // load het paging

    const [loading, setLoading] = useState(false)

    const messagesEndRef = useRef(null)
    const { id } = useParams()
    const dispatch = useDispatch();
    const { online, paging, setPaging, showBottomBar, setShowBottomBar } = props

    // get info
    const messageData = useSelector((state) => state.message.messages);
    const loadingMessage = useSelector((state) => state.message.loading);
    const currentUser = useSelector((state) => state.auth.currentUser.data);

    // info friend
    const getfriend = async () => {
        const res = await userApi.getFriend(id)
        // console.log(res)
        setUserfriend(res)
    }
    useEffect(() => {
        getfriend()
    }, [id])

    // socket
    useEffect(() => {
        socket.on('receive_message', data => {
            setMessageReceive(data.message)
        })
    }, [socket])

    // send mess when click tym
    const handleHeart = async () => {
        const data = {
            targetId: id,
            message: '❤',
            isReply: false
        }
        await dispatch(postSendMessage(data));
        socket.emit('send_message', {
            message: data
        })
        messagesEndRef.current?.scrollIntoView()
    }

    // send mess when click image
    const handleInputImage = async (e) => {
        let formData = new FormData();
        formData.append('targetId', id);
        formData.append('isReply', false);
        formData.append('message', ' ');
        formData.append('files', e.target.files[0]);
        await dispatch(postSendMessage(formData));
        const res = await messageApi.postSendMessage(formData)
        socket.emit('send_message', {
            message: {
                targetId: res?.targetId,
                isReply: res?.isReply,
                message: res?.message,
                files: res?.source[0]?.data
            }
        })
        messagesEndRef.current?.scrollIntoView()
    }

    // send mess when enter input
    const handleSubmit = async (event) => {
        const data = {
            targetId: id,
            message: currentChat,
            isReply: reply,
            replyId: replyValue?._id ? replyValue?._id : null
        }
        if (event.key === 'Enter' && currentChat !== '') {
            await dispatch(postSendMessage(data));
            socket.emit('send_message', {
                message: data
            })
            setCurrentChat('')
            setReply(false)
            messagesEndRef.current?.scrollIntoView()
        }
    }

    // display emoji
    const handleEmojiClick = (event) => {
        let message = currentChat;
        message += event.native;
        setCurrentChat(message);
    };

    const handlePickerVisible = () => {
        setPickerVisible(!isPickerVisible)
    }

    // handle Reply
    const handleReplyMessage = (e) => {
        setReplyValue(e)
        setReply(true)
    }
    const handleCloseReply = () => {
        setReply(false)
    }

    // convert timestamp to date time
    const convertTime = (e) => {
        const dateObj = new Date(e * 1000);
        const dateString = dateObj.toLocaleString();
        const time = dateString.slice(0, 5)
        return time
    }

    // render message
    const renderMessage = (mess) => {
        if (mess.message === ' ') {
            return ((mess?.postId !== '' && mess?.postId) ?
                <RenderPostMess mess={mess} />
                :
                (<img src={mess.source[0]?.data} alt='imgmess' style={{ maxWidth: '250px', maxHeight: '250px' }} />))
        }
        else if (mess.message === '❤') {
            return (<p
                style={{
                    color: 'rgb(255, 48, 64)',
                    borderRadius: '20px',
                    fontSize: '44px',
                    maxWidth: '300px',
                    padding: '5px'
                }}
            >
                {mess.message}
            </p>)
        }
        else {
            return (<div>
                {(mess.replyId && ('messReply' in mess)) ? (
                    <div>
                        {
                            mess?.messReply[0]?.message === '❤' &&
                            <p
                                style={{
                                    color: 'rgb(255, 48, 64)',
                                    fontSize: '30px',
                                    opacity: '0.5'
                                }}
                            >
                                {mess?.messReply[0]?.message}
                            </p>
                        }
                        {
                            mess?.messReply[0]?.message === ' ' &&
                            (<img src={mess?.messReply[0]?.source[0]?.data} alt='imgmess' style={{ maxWidth: '150px', maxHeight: '150px', opacity: '0.5' }} />)
                        }
                        {
                            (mess?.messReply[0]?.message !== ' ' && mess?.messReply[0]?.message !== '❤') &&
                            (<p
                                style={{
                                    color: 'black',
                                    borderRadius: '20px',
                                    fontSize: '15px',
                                    maxWidth: '300px',
                                    opacity: '0.5'
                                }}
                            >
                                {mess?.messReply[0]?.message}
                            </p>)
                        }
                        <p
                            style={{
                                color: 'black',
                                borderRadius: '20px',
                                fontSize: '15px',
                                maxWidth: '300px',
                                padding: '0px 5px'
                            }}
                        >
                            {mess.message}
                        </p>
                    </div>
                ) :
                    (<p
                        style={{
                            color: 'black',
                            borderRadius: '20px',
                            fontSize: '15px',
                            maxWidth: '300px',
                            padding: '5px'
                        }}
                    >
                        {mess.message}
                    </p>)
                }
            </div>)
        }
    }

    // render socket
    const renderMessSocket = (mess) => {
        if (mess.message === ' ') {
            return (<img src={messageReceive.files} alt='imgmess' style={{ maxWidth: '240px', maxHeight: '240x' }} />)
        }
        else if (mess.message === '❤') {
            return (<p
                style={{
                    color: 'rgb(255, 48, 64)',
                    borderRadius: '20px',
                    fontSize: '44px',
                    maxWidth: '300px',
                    padding: '5px'
                }}
            >
                {mess.message}
            </p>)
        }
        else {
            return (<p
                style={{
                    color: 'black',
                    borderRadius: '20px',
                    fontSize: '15px',
                    maxWidth: '300px',
                    padding: '5px'
                }}
            >
                {mess.message}</p>)
        }
    }

    useEffect(() => {
        if (isVisible && showBottomBar && messageData?.length >= 15) {
            const fetchMorePost = async () => {
                if (id !== undefined) {
                    setLoading(true)
                    const originalPromiseResult = await dispatch(getShowMessage({
                        id: id,
                        paging: paging
                    }))
                    if (originalPromiseResult?.payload?.length < 15) {
                        setShowBottomBar(false);
                    }
                    else {
                        setPaging((prev) => prev + 1);
                        // setShowBottomBar(true);

                    }
                    setLoading(false)
                }
            };
            fetchMorePost();
            // console.log(paging);
        }
    }, [dispatch, isVisible, paging, showBottomBar]);

    return (<Stack direction='column' height='100%' width='100%'>
        {/* header */}
        <Stack direction='row' borderBottom='1px solid rgb(219, 219, 219)' height='50px' marginLeft='15px' justifyContent='space-between'>
            <div style={{ fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <div style={{ width: '30px', height: '30px', marginRight: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {online ? <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar alt="Avatar" src={userfriend?.avatar?.data} />
                    </StyledBadge> :
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        >
                            <Avatar alt="Avatar" src={userfriend?.avatar?.data} />
                        </StyledBadge>}
                </div>
                <div style={{ fontSize: '14px', display: 'flex', alignContent: 'flex-start', flexDirection: 'column', justifyContent: 'center', textAlign: 'left' }}>
                    <h4 style={{ padding: '3px 0' }}>{userfriend?.Name}</h4>
                    <p>{online ? 'Đang hoạt động' : 'Không hoạt động'}</p>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link to={`/roomvoice/${id}`}><Phone size={28} style={{ margin: '0px 10px', cursor: 'pointer' }} /></Link>
                <Link to={`/roomcall/${id}`}><VideoCamera size={28} style={{ margin: '0px 10px', cursor: 'pointer' }} /></Link>
            </div>
        </Stack>
        {/* char detail*/}
        <Stack style={{ width: '100%', height: 'calc(100% - 50px)', position: 'relative' }}>
            <ScrollToBottom >
                {<div id='loading' ref={containerRef} style={{ width: '100%', height: '10px' }}></div>}
                {showBottomBar && <CircularProgress />}
                {messageData?.map((mess) => (
                    <div key={mess._id} className={currentUser?._id === mess?.sourceId ? 'item-mess mychat' : 'item-mess'}>
                        {currentUser?._id === mess?.sourceId ? <div className='iconReply'>
                            <button onClick={() => handleReplyMessage(mess)}><ArrowBendUpLeft style={{ cursor: 'pointer' }} size={20} /></button>
                        </div> : ''}
                        <Avatar className='avatar' src={userfriend?.avatar?.data} alt="avatar" sx={{ width: '30px', height: '30px', objectFit: 'cover' }} />
                        <div className='mess-detail'>
                            <p className='timeSend'>{convertTime(mess?.createdAt)}</p>
                            {renderMessage(mess)}
                        </div>
                        {currentUser?._id !== mess?.sourceId ? <div className='iconReply'>
                            <button onClick={() => handleReplyMessage(mess)}><ArrowBendUpLeft style={{ cursor: 'pointer' }} size={20} /></button>
                        </div> : ''}
                    </div>
                ))}
                {/* display socket */}
                {JSON.stringify(messageReceive) === '{}' ? '' : <div className='item-mess'>
                    <div className='avatar' style={{ width: '30px', height: '30px' }}>
                        <img src={userfriend?.avatar?.data} alt='avatar'></img>
                    </div>
                    {renderMessSocket(messageReceive)}
                    <div className='iconReply'>
                        <button onClick={() => handleReplyMessage(messageReceive.message)}><ArrowBendUpLeft style={{ cursor: 'pointer' }} size={20} /></button>
                    </div>
                </div>}
                <div id='testtstss' ref={messagesEndRef} />
            </ScrollToBottom>

            {/* Input */}
            <div style={{ position: 'absolute', bottom: '20px', width: '90%', height: '70px', left: '5%', right: '5%' }}>
                <div className={reply ? 'reply' : 'non-reply'}>
                    <div style={{ fontSize: '12px' }}>
                        {currentUser?._id === replyValue?.sourceId ? <p>Đang trả lời <b>Bạn</b></p> : <p>Đang trả lời <b>{userfriend?.Name}</b></p>}
                        <p>{replyValue?.message === ' ' ? 'Hình ảnh' : replyValue?.message}</p>
                    </div>
                    <div>
                        <button onClick={handleCloseReply} style={{ cursor: 'pointer' }}><X fontSize="15px" /></button>
                    </div>
                </div>
                <FormControl style={{ position: 'absolute', bottom: '10px', width: '100%', height: '25px', display: 'flex', flexDirection: 'row' }}>
                    <Input style={{ fontSize: '18px', width: '100%', fontFamily: '-moz-initial' }}
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
                            <Image size={32} style={{ margin: '0px 5px', height: '30px', cursor: 'pointer' }} />
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

function ScrollToBottom({ children }) {
    // console.log(children[2])
    const [key, setKey] = useState(0);
    const containerRef = useRef(null);
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
        // console.log(key);
    }, [key]);

    useEffect(() => {
        setKey(key + 1);
    }, [children[2]]);

    return (
        <div ref={containerRef} style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100% - 75px)' }}>
            {children}
        </div>
    );
}