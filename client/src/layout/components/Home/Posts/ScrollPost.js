import { Divider, Stack, Typography, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonLoading from '~/components/SkeletonLoading/SkeletonLoading';
import SuggestionsUser from '../SuggestionsUser/SuggestionsUser';
import PostEnd from './PostEnd';
import PostItem from './PostItem';
//
import { useEffect, useRef, useState } from 'react';
import { getBookMarkFirst } from '~/features/bookmark/bookmarkSlice';
import { getFirstPost, getSkipPost } from '~/features/post/postSlice';
import useElementOnScreen from '~/hook/useElementOnScreen';

const StyleDivider = styled(Divider)(({ theme }) => ({
    width: '100%',
    color: theme.palette.grey[300],
    paddingBottom: '10px',
}));

function ScrollPost() {
    const dispatch = useDispatch();
    const refBottomBar = useRef();
    const { data } = useSelector((state) => state.post);
    const isIntersecting = useElementOnScreen(refBottomBar, { threshold: 1.0 });

    const [showBottomBar, setShowBottomBar] = useState(true);
    const [pagingPost, setPagingPost] = useState(1);

    useEffect(() => {
        dispatch(getBookMarkFirst());
    }, [dispatch]);

    useEffect(() => {
        if (isIntersecting && showBottomBar) {
            const fetchMorePost = async () => {
                try {
                    const originalPromiseResult = await dispatch(getSkipPost({ paging: pagingPost })).unwrap();
                    console.log(originalPromiseResult);
                    if (originalPromiseResult.length === 0) {
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
    }, [isIntersecting, pagingPost, showBottomBar]);

    const renderPost = () => {
        return data?.map((item, index) =>
            index === 0 ? (
                <Stack direction={'column'} key={item?.Post?._id}>
                    {/* <StyleDivider /> */}
                    <PostItem data={item} />
                    <StyleDivider />
                    <SuggestionsUser typeLayout="row" />
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
            <div ref={refBottomBar} width="100%" style={{ height: '10xp' }}></div>
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
