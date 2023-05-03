import { useRef, useState } from 'react';
// mui ui
import { Avatar, Box, Button, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material';
//icon
import { CaretDown, CaretUp, DotsThree, ThumbsUp } from 'phosphor-react';
//components
import MenuModal from '~/components/Popper/Menu/MenuModal';
import { calculateTimePassed } from '~/utils/utils';
import NewReplyComment from './NewReplyComment';
import ReplyCommentPost from './ReplyCommentPost';
import { useDispatch, useSelector } from 'react-redux';
import * as commentApi from '~/api/CommentApi/CommentApi';
import { decreaseReactionComment, increaseReactionComment } from '~/features/comment/commentSlice';

const MENU_REPORT = [
    {
        title: 'Report',
        fontWeight: 600,
        color: 'error',
    },
];
function CommentItemPost({ data, replyId }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser.data);
    const likeRef = useRef(null);
    const [likeComment, setLikeComment] = useState(data?.reaction?.some((i) => i === currentUser?._id));
    const [arrowUp, setArrowUp] = useState(false);
    const [showReplyComment, setShowReplyComment] = useState(false);

    const changeArrow = () => {
        setArrowUp((prev) => !prev);
    };

    let arrow = <CaretDown size={15} />;
    if (arrowUp) {
        arrow = <CaretUp size={15} />;
    }

    const clickLikeComment = async () => {
        if (likeComment === true) {
            await commentApi.likeComment({ id: data?._id });
            dispatch(decreaseReactionComment({ idComment: data?._id, idUser: currentUser?._id }));
            setLikeComment(false);
        } else {
            await commentApi.likeComment({ id: currentUser?._id });
            dispatch(increaseReactionComment({ idComment: data?._id, idUser: currentUser?._id }));
            setLikeComment(true);
        }
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
                <Stack direction={'row'} alignItems="center" justifyContent="space-between" spacing={5} width={'100%'}>
                    <Stack direction={'row'} alignItems="center" spacing={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center', padding: '5px', gap: '5px' }}>
                            <Tooltip title="Like">
                                <IconButton size="small" onClick={clickLikeComment}>
                                    <ThumbsUp
                                        size={15}
                                        color={likeComment ? 'red' : theme.palette.grey[800]}
                                        weight={likeComment ? 'fill' : 'regular'}
                                        ref={likeRef}
                                    />
                                </IconButton>
                            </Tooltip>
                            {/* number like */}
                            <Typography variant="body2" fontWeight={600}>
                                {data?.reaction?.length}
                            </Typography>
                        </Box>
                        {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Tooltip title="UnLike">
                                <IconButton size="small" onClick={unlikeComment}>
                                    <ThumbsDown size={15} ref={unLikeRef} />
                                </IconButton>
                            </Tooltip> */}
                        {/* number unlike */}
                        {/* <Typography variant="body2" fontWeight={600}>
                                5
                            </Typography>
                        </Box> */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <MenuModal data={MENU_REPORT}>
                                <IconButton size="small">
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
                        idComment={replyId ? replyId : data?._id}
                        idPost={data?.postId}
                        // commentReply={data?.User?._id}
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
                        {arrowUp && <ReplyCommentPost idComment={data?._id} />}
                    </>
                )}
            </Stack>
        </Stack>
    );
}

export default CommentItemPost;
