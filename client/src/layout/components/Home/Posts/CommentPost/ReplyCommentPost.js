import { CircularProgress, Stack, Typography } from '@mui/material';
import CommentItemPost from './CommentItemPost';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import * as commentApi from '~/api/CommentApi/CommentApi';
function ReplyCommentPost({ replyNumber, idComment }) {
    const [dataReply, setDataReply] = useState([]);
    const [dataPaging, setDataPaging] = useState(1);
    const [showBottomBar, setShowBottomBar] = useState(dataReply?.length === 0 ? true : false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const callApi = async () => {
            try {
                setLoading(true);
                const res = await commentApi.getCommentReply({ paging: dataPaging, id: idComment });
                if (res?.length >= 15) {
                    setDataReply(res);
                    setDataPaging((prev) => prev + 1);
                } else {
                    setDataReply(res);
                    showBottomBar(false);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        callApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSkipReplyComment = async () => {
        try {
            setLoading(true);
            const res = await commentApi.getCommentReply({ paging: dataPaging, id: idComment });
            if (res) {
                setDataReply((prev) => [...prev, ...res]);
                setDataPaging((prev) => prev + 1);
            } else {
                setDataReply((prev) => [...prev, ...res]);
                setShowBottomBar(false);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    const renderReply = () => {
        return dataReply.map((item) => {
            return <CommentItemPost data={item} key={item?._id} replyId={idComment} />;
        });
    };
    return (
        <Stack direction="column" width="100%">
            {renderReply()}
            {dataReply.length !== replyNumber && (
                <Stack direction="row" alignItems="center" justifyContent="center" width="100%">
                    {!showBottomBar && (
                        <Stack direction="row" alignItems="center" justifyContent="center" width="100%">
                            <Typography
                                variant="body2"
                                fontWeight={400}
                                fontSize="0.5rem"
                                sx={{ transform: 'translateX(-20px)', cursor: 'pointer' }}
                                onClick={handleSkipReplyComment}
                            >
                                Load Comment
                            </Typography>
                        </Stack>
                    )}
                    {!loading && (
                        <Stack direction="row" alignItems="center" justifyContent="center" width="100%">
                            <Stack sx={{ transform: 'translateX(-20px)' }}>
                                <CircularProgress size={10} />
                            </Stack>
                        </Stack>
                    )}
                </Stack>
            )}
        </Stack>
    );
}

export default ReplyCommentPost;
ReplyCommentPost.prototype = {
    dataReply: PropTypes.array,
    replyNumber: PropTypes.number,
};
