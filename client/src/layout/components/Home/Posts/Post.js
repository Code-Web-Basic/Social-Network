import { Divider, Stack, useTheme } from '@mui/material';
import SuggestionsUser from '../SuggestionsUser/SuggestionsUser';
import PostEnd from './PostEnd';
import PostItem from './PostItem';

function Posts() {
    const loading = true;
    const theme = useTheme();
    return (
        <div>
            <Stack direction="column" spacing={2} p="30px 10px">
                <PostItem />
                <Divider sx={{ width: '100%', color: theme.palette.grey[300], padding: '10px 0px' }} />
                <SuggestionsUser typeLayout="row" />
                <Divider sx={{ width: '100%', color: theme.palette.grey[300], padding: '10px 0px' }} />
                <PostEnd />
                <Divider sx={{ width: '100%', color: theme.palette.grey[300], padding: '10px 0px' }} />
            </Stack>
        </div>
    );
}

export default Posts;
