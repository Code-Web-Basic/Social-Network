import { Divider, Stack, styled } from '@mui/material';
import SuggestionsUser from '../SuggestionsUser/SuggestionsUser';
import PostEnd from './PostEnd';
import PostItem from './PostItem';

const StyleDivider = styled(Divider)(({ theme }) => ({
    width: '100%',
    color: theme.palette.grey[300],
    padding: '10px 0px',
}));

function Posts() {
    // const [use]
    return (
        <div>
            <Stack direction="column" spacing={2} p="30px 10px">
                <PostItem />
                <StyleDivider />
                <SuggestionsUser typeLayout="row" />
                <StyleDivider />
                <PostEnd />
                <StyleDivider />
            </Stack>
        </div>
    );
}

export default Posts;
