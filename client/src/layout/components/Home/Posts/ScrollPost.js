import { Divider, Stack, Typography, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonLoading from '~/components/SkeletonLoading/SkeletonLoading';
import PostEnd from './PostEnd';
import PostItem from './PostItem';
//
import { useEffect, useState } from 'react';
import { getBookMarkFirst } from '~/features/bookmark/bookmarkSlice';
import { getSkipPost } from '~/features/post/postSlice';
import useElementOnScreen from '~/hook/useElementOnScreen';

const StyleDivider = styled(Divider)(({ theme }) => ({
    width: '100%',
    color: theme.palette.grey[300],
    paddingBottom: '10px',
}));

function ScrollPost() {
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.post);
    const [containerRef, isVisible] = useElementOnScreen({ root: null, threshold: 1 });

    const [showBottomBar, setShowBottomBar] = useState(data.length === 0 ? true : false);
    const [pagingPost, setPagingPost] = useState(1);

    useEffect(() => {
        dispatch(getBookMarkFirst());
        // dispatch(getSkipPost({ paging: pagingPost }));
        // setPagingPost((prev) => prev + 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if (isVisible && showBottomBar) {
            const fetchMorePost = async () => {
                try {
                    const originalPromiseResult = await dispatch(getSkipPost({ paging: pagingPost })).unwrap();
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
    }, [isVisible, pagingPost, showBottomBar]);

    const renderPost = () => {
        return data?.map((item, index) =>
            index === 0 ? (
                <Stack direction={'column'} key={item?.Post?._id}>
                    {/* <StyleDivider /> */}
                    <PostItem data={item} />
                    {/* <StyleDivider /> */}
                    {/* <SuggestionsUser typeLayout="row" /> */}
                    {/* <StyleDivider /> */}
                </Stack>
            ) : (
                <Stack direction="column" key={item?.Post?._id}>
                    <StyleDivider />
                    <PostItem data={item} />
                </Stack>
            ),
        );
    };
    return (
        <Stack direction="column" spacing={2} p="30px 10px" justifyContent="center">
            {renderPost()}
            {data?.length === 0 && !showBottomBar ? (
                <Typography variant="h6" fontSize="1.2rem" width="100%" textAlign="center">
                    No Posts
                </Typography>
            ) : null}
            {<div ref={containerRef} width="100%" style={{ height: '10xp' }}></div>}
            {showBottomBar ? (
                <Stack direction={'column'} width="100%" spacing={2}>
                    <SkeletonLoading type="post" />
                    <SkeletonLoading type="post" />
                </Stack>
            ) : (
                <PostEnd />
            )}
        </Stack>
    );
}

export default ScrollPost;
