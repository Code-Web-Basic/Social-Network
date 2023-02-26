import { Divider, Stack, styled } from '@mui/material';
import SuggestionsUser from '../SuggestionsUser/SuggestionsUser';
import PostEnd from './PostEnd';
import PostItem from './PostItem';

const StyleDivider = styled(Divider)(({ theme }) => ({
    width: '100%',
    color: theme.palette.grey[300],
    paddingBottom: '10px',
}));

function ScrollPost({ data }) {
    // const [use]
    return (
        <div>
            <Stack direction="column" spacing={2} p="30px 10px">
                {data?.map((item, index) =>
                    index === 0 ? (
                        <Stack direction={'column'} key={item?.Post?._id}>
                            <StyleDivider />
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
                )}
            </Stack>
        </div>
    );
}

export default ScrollPost;
