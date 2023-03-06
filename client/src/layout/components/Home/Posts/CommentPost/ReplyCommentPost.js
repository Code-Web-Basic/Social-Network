import { CircularProgress, Stack, Typography } from '@mui/material';
import CommentItemPost from './CommentItemPost';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import * as commentApi from '~/api/CommentApi/CommentApi';
function ReplyCommentPost({ replyNumber, idComment }) {
    const [dataReply, setDataReply] = useState([]);
    const loadReplyComment = () => {
        console.log('load comment');
    };

    useEffect(() => {
        const callApi = async () => {
            const res = await commentApi.getCommentReply({ paging: 1, id: idComment });
            if (res) {
                setDataReply(res);
            }
        };
        callApi();
    }, [idComment]);
    const loadingReply = false;
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
                    {!loadingReply ? (
                        <Stack direction="row" alignItems="center" justifyContent="center" width="100%">
                            <Typography
                                variant="body2"
                                fontWeight={400}
                                fontSize="0.5rem"
                                sx={{ transform: 'translateX(-20px)', cursor: 'pointer' }}
                                onClick={loadReplyComment}
                            >
                                Load Comment
                            </Typography>
                        </Stack>
                    ) : (
                        <Stack sx={{ transform: 'translateX(-20px)' }}>
                            <CircularProgress size={10} />
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
