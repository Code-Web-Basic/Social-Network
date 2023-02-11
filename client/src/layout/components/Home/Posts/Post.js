import { Stack } from '@mui/material';
import PostEnd from './PostEnd';
import PostItem from './PostItem';

function Posts() {
    const loading = true;
    return (
        <div>
            <Stack direction="column" spacing={2} p="30px 10px">
                <PostItem />
                <PostEnd />
            </Stack>
        </div>
    );
}

export default Posts;
