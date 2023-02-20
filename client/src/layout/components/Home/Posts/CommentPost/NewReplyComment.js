import EmojiPicker from '@emoji-mart/react';
import dataEmoji from '@emoji-mart/data';
import { Avatar, Box, Button, IconButton, Stack, useTheme } from '@mui/material';
import { Smiley, X } from 'phosphor-react';
import { useRef, useState } from 'react';
import TippyHeadless from '@tippyjs/react/headless';
import { useSelector } from 'react-redux';
function NewReplyComment(props) {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const theme = useTheme();
    const [valueInput, setValueInput] = useState('');
    const [enableBtn, setEnableBtn] = useState(true);
    const messageRef = useRef();
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
        const dataComment = {
            displayName: currentUser?.user?.displayName,
            userAvatar: currentUser?.user?.photoURL,
            body: valueInput,
            likeNumber: 0,
            unlikeNumber: 0,
            parentId: `${props.idComment}`,
            replyNumber: 0,
            userId: currentUser?.user?.uid,
            createAt: Date.now(),
        };
        if (valueInput.length > 0) {
            console.log(dataComment);
            setValueInput('');
        }
    };
    return (
        <>
            <Box width={'100%'}>
                <Stack
                    direction={'row'}
                    alignItems="flex-start"
                    justifyContent={'space-between'}
                    spacing={2}
                    width={'100%'}
                >
                    <Stack direction={'row'}>
                        <Avatar
                            src={currentUser?.data?.avatar}
                            sx={{ width: 25, height: 25, transform: 'translateY(10px)' }}
                        />
                    </Stack>
                    <Stack direction={'column'} width="100%" alignItems={'center'}>
                        <Stack direction={'row'} width="100%">
                            <input
                                placeholder="new comment"
                                // autoFocus={this.props.autoFocus}
                                typeof="text"
                                autoFocus={props.autoFocus}
                                style={{
                                    width: '100%',
                                    minHeight: 40,
                                    border: 'none',
                                    outline: 'none',
                                    borderRadius: 2,
                                }}
                                value={valueInput}
                                onChange={(e) => setValueInput(e.target.value)}
                                onBlur={commentFocusOut}
                                onKeyUp={commentStroke}
                                ref={messageRef}
                            />
                        </Stack>

                        <Stack
                            direction={'row'}
                            spacing={2}
                            alignItems="center"
                            justifyContent={'space-between'}
                            height={'100%'}
                            width="100%"
                        >
                            <TippyHeadless
                                interactive
                                trigger="click"
                                placement="top-end"
                                render={(attrs) => (
                                    <div className="box" {...attrs} tabIndex="-1">
                                        <EmojiPicker data={dataEmoji} onEmojiSelect={handleEmojiClick} />
                                    </div>
                                )}
                            >
                                <IconButton id="emoji-icon-button">
                                    <Smiley size={15} />
                                </IconButton>
                            </TippyHeadless>
                            <Stack direction={'row'} spacing={2} alignItems="center" justifyContent={'space-between'}>
                                {/* post */}
                                <Button
                                    id="send-icon-button"
                                    variant="text"
                                    size="small"
                                    sx={{ fontSize: '0.6rem' }}
                                    disabled={enableBtn}
                                    onClick={sendComment}
                                >
                                    Post
                                </Button>
                                {/* cancel */}
                                <Box
                                    id="cancel-icon-button"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        '&:hover': {
                                            color: theme.palette.grey[500],
                                        },
                                    }}
                                    onClick={() => props.callbackCancel()}
                                >
                                    <X size={15} />
                                </Box>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </>
    );
}

export default NewReplyComment;
