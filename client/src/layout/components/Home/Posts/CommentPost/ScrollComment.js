import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSkipComment } from '~/features/comment/commentSlice';
import CommentItemPost from './CommentItemPost';
import useElementOnScreen from '~/hook/useElementOnScreen';

function ScrollComment({ id }) {
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.comment);
    const [containerRef, isVisible] = useElementOnScreen({ root: null, threshold: 1 });
    const [paging, setPaging] = useState(1);
    const [showBottomBar, setShowBottomBar] = useState(data.length === 0 ? true : false);
    useEffect(() => {
        if (isVisible && showBottomBar) {
            const fetchMorePost = async () => {
                try {
                    const originalPromiseResult = await dispatch(getSkipComment({ id: id, paging: paging })).unwrap();
                    if (originalPromiseResult.length < 15) {
                        setShowBottomBar(false);
                    } else {
                        setPaging((prev) => prev + 1);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            fetchMorePost();
        }
        console.log(isVisible, data, paging);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible, paging, showBottomBar]);
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
            <div ref={containerRef} width="100%"></div>
            {showBottomBar ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <CircularProgress size={20} />
                </Box>
            ) : null}
        </>
    );
}

export default ScrollComment;
