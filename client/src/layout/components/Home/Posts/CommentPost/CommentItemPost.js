import { useRef, useState } from 'react';
// mui ui
import { Avatar, Box, Button, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material';
//icon
import { CaretDown, CaretUp, DotsThree, ThumbsDown, ThumbsUp } from 'phosphor-react';
//components
import MenuModal from '~/components/Popper/Menu/MenuModal';
import { calculateTimePassed } from '~/utils/utils';
import NewReplyComment from './NewReplyComment';
import ReplyCommentPost from './ReplyCommentPost';

const MENU_REPORT = [
    {
        title: 'Report',
        fontWeight: 600,
        color: 'error',
    },
];
function CommentItemPost({ data, reply }) {
    const theme = useTheme();
    const likeRef = useRef(null);
    const unLikeRef = useRef(null);
    const [arrowUp, setArrowUp] = useState(false);
    const [showReplyComment, setShowReplyComment] = useState(false);

    const changeArrow = () => {
        setArrowUp((prev) => !prev);
    };

    let arrow = <CaretDown size={15} />;
    if (arrowUp) {
        arrow = <CaretUp size={15} />;
    }

    const likeComment = () => {
        return;
    };
    const unlikeComment = () => {
        return;
    };

    const handleShowReply = () => {
        setShowReplyComment((prev) => !prev);
    };
    return (
        <Stack direction={'row'} p={1} spacing={1} width="100%">
            <Box alignItems={'flex-start'} justifyItems={'center'}>
                <Avatar
                    src={data?.User[0]?.avatar?.data ? data.User[0].avatar.data : ''}
                    sx={{ width: 25, height: 25 }}
                />
            </Box>
            <Stack direction={'column'} width="100%">
                <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={2} width={'100%'}>
                    <Typography variant="body2" fontWeight={600}>
                        {data?.User[0]?.userName}
                    </Typography>
                    <Typography variant="body2" fontSize={'0.8rem'} fontWeight={400}>
                        {calculateTimePassed(data?.updatedAt)}
                    </Typography>
                </Stack>
                <Stack direction={'row'} width={'100%'}>
                    <Typography variant="body2">{data?.content}</Typography>
                </Stack>
                <Stack direction={'row'} alignItems="center" justifyContent="flex-start" spacing={5} width={'100%'}>
                    <Stack direction={'row'} alignItems="center" spacing={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center', padding: '5px', gap: '5px' }}>
                            <Tooltip title="Like">
                                <IconButton size="small" onClick={likeComment}>
                                    <ThumbsUp size={15} ref={likeRef} />
                                </IconButton>
                            </Tooltip>
                            {/* number like */}
                            <Typography variant="body2" fontWeight={600}>
                                {data?.reaction?.length}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Tooltip title="UnLike">
                                <IconButton size="small" onClick={unlikeComment}>
                                    <ThumbsDown size={15} ref={unLikeRef} />
                                </IconButton>
                            </Tooltip>
                            {/* number unlike */}
                            <Typography variant="body2" fontWeight={600}>
                                5
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <MenuModal data={MENU_REPORT}>
                                <IconButton size="small" onClick={unlikeComment}>
                                    <DotsThree size={15} />
                                </IconButton>
                            </MenuModal>
                        </Box>
                    </Stack>
                    <Stack>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{
                                borderRadius: '10px',
                                color: theme.palette.text.primary,
                                fontWeight: 600,
                                fontSize: '0.5rem',
                                boxShadow: 'none',
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    bgcolor: theme.palette.grey[200],
                                    boxShadow: 'none',
                                },
                            }}
                            onClick={handleShowReply}
                        >
                            reply
                        </Button>
                    </Stack>
                </Stack>
                {showReplyComment && (
                    <NewReplyComment
                        autoFocus={false}
                        callbackCancel={() => setShowReplyComment()}
                        idComment={data?.id}
                        currentUser={data?.User[0]}
                    />
                )}
                {data?.replyCount > 0 && (
                    <>
                        <Stack direction={'row'} width={'100%'}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    color: theme.palette.primary.main,
                                    cursor: 'pointer',
                                }}
                                onClick={changeArrow}
                            >
                                {arrow}
                                <Typography variant="overline" fontSize={'0.5rem'} fontWeight="600">
                                    show {data?.replyNumber} reply
                                </Typography>
                            </Box>
                        </Stack>
                        {arrowUp && <ReplyCommentPost />}
                    </>
                )}
            </Stack>
        </Stack>
    );
}

export default CommentItemPost;
