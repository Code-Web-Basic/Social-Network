import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFirstComment } from '~/features/comment/commentSlice';
import CommentItemPost from './CommentItemPost';

function ScrollComment({ id }) {
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([]);
    const [paging, setPaging] = useState(1);

    const loadingComment = false;
    // const [showBottomBar, setShowBottomBar] = useState(true);
    const { data, loading, error } = useSelector((state) => state.comment);
    // console.log(data);
    useEffect(() => {
        // setMessages(data);
        dispatch(getFirstComment({ id, paging }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //lazy load
    const observer = useRef(
        new IntersectionObserver(async (entries) => {
            const first = entries[0];
            if (first.isIntersecting) {
                try {
                    if (data?.length > 0) {
                        setMessages(data);
                    } else {
                        setTimeout(() => {
                            // setShowBottomBar(false);
                        }, 3000);
                    }
                    // handle result here
                } catch (rejectedValueOrSerializedError) {
                    // handle error here
                    console.log(rejectedValueOrSerializedError);
                }
            }
        }),
        { threshold: 1 },
    );

    const [bottomBar, setBottomBar] = useState(null);

    useEffect(() => {
        const currentBottomBar = bottomBar;
        const currentObserver = observer.current;
        if (currentBottomBar) {
            currentObserver.observe(currentBottomBar);
        }
        return () => {
            if (currentBottomBar) {
                currentObserver.unobserve(currentBottomBar);
            }
        };
    }, [bottomBar]);

    const renderComment = () => (
        <Stack direction={'column'} spacing={0.5} width="100%" height="100%">
            {data?.length > 0 ? (
                data?.map((item) => {
                    return <CommentItemPost key={item?._id} data={item} />;
                    // console.log(item);
                })
            ) : (
                <Stack direction={'row'} alignItems="center" justifyContent={'center'} width="100%">
                    <Typography variant="h6">No Comments</Typography>
                </Stack>
            )}
        </Stack>
    );

    return (
        <>
            {renderComment()}
            {data?.length > 9 && loadingComment ? (
                <Box sx={{ display: 'flex', justifyContent: ' center', width: '100%' }} ref={setBottomBar}>
                    <CircularProgress size={20} />
                </Box>
            ) : null}
        </>
    );
}

export default ScrollComment;
