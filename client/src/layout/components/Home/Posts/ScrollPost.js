import { Divider, Stack, Typography, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonLoading from '~/components/SkeletonLoading/SkeletonLoading';
import SuggestionsUser from '../SuggestionsUser/SuggestionsUser';
import PostEnd from './PostEnd';
import PostItem from './PostItem';
import { useEffect, useRef, useState } from 'react';
import { getBookMarkFirst } from '~/features/bookmark/bookmarkSlice';
import { getSkipPost } from '~/features/post/postSlice';

const StyleDivider = styled(Divider)(({ theme }) => ({
    width: '100%',
    color: theme.palette.grey[300],
    paddingBottom: '10px',
}));

function ScrollPost() {
    // const [use]
    const { data, loading } = useSelector((state) => state.post);
    const [showBottomBar, setShowBottomBar] = useState(true);
    const [paging, setPaging] = useState(1);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBookMarkFirst());
        setPaging(2);
    }, [dispatch]);
    // const {}
    // const loading = true;
    //lazy load
    const observer = useRef(
        new IntersectionObserver(async (entries) => {
            const first = entries[0];
            if (first.isIntersecting) {
                try {
                    const originalPromiseResult = await dispatch(getSkipPost({ paging: paging })).unwrap();
                    console.log(originalPromiseResult);
                    console.log('test');
                    if (originalPromiseResult?.length > 0) {
                        // setMessages(data);
                        setPaging((prev) => prev + 1);
                        if (!showBottomBar) {
                            setBottomBar(true);
                        }
                    } else {
                        setTimeout(() => {
                            setShowBottomBar(false);
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
    const renderPost = () => {
        return data?.length > 0 ? (
            data?.map((item, index) =>
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
            )
        ) : (
            <Typography variant="h6" fontSize="1.2rem" width="100%" textAlign="center">
                No Posts
            </Typography>
        );
    };
    return (
        <div>
            <Stack direction="column" spacing={2} p="30px 10px" justifyContent="center">
                {renderPost()}
                {loading && data?.length === 0 ? (
                    <Stack direction={'column'} width="100%" spacing={2} ref={setBottomBar}>
                        <SkeletonLoading type="post" />
                        <SkeletonLoading type="post" />
                    </Stack>
                ) : null}

                {data?.length > 9 ? (
                    <Stack direction={'column'} width="100%" spacing={2} ref={setBottomBar}>
                        <SkeletonLoading type="post" />
                        <SkeletonLoading type="post" />
                    </Stack>
                ) : null}
            </Stack>
        </div>
    );
}

export default ScrollPost;
