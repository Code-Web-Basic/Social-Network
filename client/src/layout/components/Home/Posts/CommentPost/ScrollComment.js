import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import CommentItemPost from './CommentItemPost';

function ScrollComment() {
    const [messages, setMessages] = useState([]);
    const data = [
        {
            id: 1,
            displayName: 'van tu',
            replyNumber: 1,
            parent: '',
            body: 'parent 1',
        },
        {
            id: 3,
            displayName: 'van tu',
            replyNumber: 1,
            parent: '',
            body: 'parent 1',
        },
        {
            id: 2,
            displayName: 'van tu',
            replyNumber: 1,
            parent: '',
            body: 'parent 1',
        },
    ];
    const loading = false;
    // const [showBottomBar, setShowBottomBar] = useState(true);

    useEffect(() => {
        setMessages(data);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //lazy load
    const observer = useRef(
        new IntersectionObserver(async (entries) => {
            const first = entries[0];
            if (first.isIntersecting) {
                try {
                    if (data.length > 0) {
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
        <Stack direction={'column'} spacing={0.5} width="100%">
            {messages.length > 0 ? (
                messages.map((item) => {
                    return <CommentItemPost key={item?.id} data={item} reply={item} />;
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
            {data.length > 9 && loading ? (
                <Box sx={{ display: 'flex', justifyContent: ' center', width: '100%' }} ref={setBottomBar}>
                    <CircularProgress size={20} />
                </Box>
            ) : null}
        </>
    );
}

export default ScrollComment;
