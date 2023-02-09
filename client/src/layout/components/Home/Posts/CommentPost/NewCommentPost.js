import { Box, Button, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { Smiley } from 'phosphor-react';
import { useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
// different import path!
import EmojiPicker from '@emoji-mart/react';
import dataEmoji from '@emoji-mart/data';

function NewCommentPost(props) {
    const [showNavigate, setShowNavigate] = useState(false);
    // console.log(currentUser);
    // const [commentLine, setCommentLine] = useState(false);
    const [enableBtn, setEnableBtn] = useState(true);

    const [valueInput, setValueInput] = useState('');

    const messageRef = useRef();

    const theme = useTheme();
    const commentFocusIn = () => {
        // setCommentLine(true);
        setShowNavigate(true);
    };
    const commentFocusOut = () => {
        // setCommentLine(false);
    };
    const commentStroke = (event) => {
        let currMessage = event.target.value;
        if (currMessage) {
            setEnableBtn(false);
        } else {
            setEnableBtn(true);
        }
    };

    const handleEmojiClick = (event) => {
        let message = valueInput;
        message += event.native;
        setValueInput(message);
    };

    const sendComment = (event) => {
        event.preventDefault();
        // const dataComment = {
        //     displayName: currentUser?.user?.displayName,
        //     userAvatar: currentUser?.user?.photoURL,
        //     body: valueInput,
        //     likeNumber: 0,
        //     unlikeNumber: 0,
        //     parentId: '',
        //     replyNumber: 0,
        //     userId: currentUser?.user?.uid,
        //     mediaId: props?.mediaId,
        //     createAt: Date.now(),
        // };
        if (valueInput.length > 0) {
            // handleSendChatValue(valueFormChat);
            // dispatch(addNewComment(dataComment));
            setValueInput('');
        }
    };
    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
            <input
                placeholder="Add new comment"
                width={'100%'}
                typeof="text"
                autoFocus={props.autoFocus}
                style={{
                    width: '100%',
                    minHeight: 30,
                    border: 'none',
                    outline: 'none',
                    padding: '10px 0px',
                    margin: '5px 0px',
                }}
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
                onFocus={commentFocusIn}
                onBlur={commentFocusOut}
                onKeyUp={commentStroke}
                ref={messageRef}
            />
            <Stack direction="row" alignItems="center" justifyContent="center">
                {!enableBtn && (
                    <Button variant="text" size="small">
                        Post
                    </Button>
                )}
                <Tippy
                    interactive
                    trigger="click"
                    render={(attrs) => (
                        <div className="box" tabIndex="-1" {...attrs}>
                            <EmojiPicker data={dataEmoji} onEmojiSelect={handleEmojiClick} theme="light" />
                        </div>
                    )}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            color: theme.palette.text.secondary,
                            '&:hover': {
                                color: theme.palette.grey[500],
                            },
                        }}
                    >
                        <Smiley size={20} />
                    </Box>
                </Tippy>
            </Stack>
        </Stack>
    );
}

export default NewCommentPost;