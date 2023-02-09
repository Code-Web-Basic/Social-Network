import { CircularProgress, Stack, Typography } from '@mui/material';
import CommentItemPost from './CommentItemPost';
import PropTypes from 'prop-types';
function ReplyCommentPost({ dataReply = [], replyNumber }) {
    const loadReplyComment = () => {
        console.log('load comment');
    };
    const loadingReply = false;
    const renderReply = () => {
        return <CommentItemPost />;
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
