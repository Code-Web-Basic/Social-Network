import { Stack } from '@mui/material';
import PostItem from './PostItem';

function Posts() {
    const loading = true;
    return (
        <div>
            <Stack direction="column" spacing={2} p="30px 10px">
                <PostItem />
            </Stack>
        </div>
    );
}

export default Posts;
