import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentItemPost from './CommentItemPost';
import useElementOnScreen from '~/hook/useElementOnScreen';
import { clearDataComment, getFirstComment, getSkipComment } from '~/features/comment/commentSlice';

function ScrollComment({ id, open }) {
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.comment);
    const [containerRef, isVisible] = useElementOnScreen({ root: null, threshold: 1 });

    const [showBottomBar, setShowBottomBar] = useState(data?.length === 0 ? true : false);
    const [pagingPost, setPagingPost] = useState(1);
    useEffect(() => {
        // setMessages(data);
        // if(data?.length)
        dispatch(clearDataComment());
        setShowBottomBar(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);
    useEffect(() => {
        console.log(isVisible);
        if (isVisible && showBottomBar) {
            const fetchMorePost = async () => {
                try {
                    const originalPromiseResult = await dispatch(
                        getSkipComment({ id: id, paging: pagingPost }),
                    ).unwrap();
                    if (originalPromiseResult.length < 15) {
                        setShowBottomBar(false);
                    } else {
                        setPagingPost((prev) => prev + 1);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            fetchMorePost();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible, pagingPost, showBottomBar, open]);
    const renderComment = () =>
        data?.map((item) => {
            return <CommentItemPost key={item?._id} data={item} />;
        });

    return (
        <>
            <Stack direction={'column'} spacing={0.5} width="100%" height="100%">
                {renderComment()}
                {data?.length === 0 && !showBottomBar && (
                    <Stack direction={'row'} alignItems="center" justifyContent={'center'} width="100%">
                        <Typography variant="h6">No Comments</Typography>
                    </Stack>
                )}
                <div ref={containerRef} width="100%" style={{ height: '10px' }}></div>
                {showBottomBar && (
                    <Box sx={{ display: 'flex', justifyContent: ' center', width: '100%' }}>
                        <CircularProgress size={20} />
                    </Box>
                )}
            </Stack>
        </>
    );
}

export default ScrollComment;
