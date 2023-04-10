import { Divider, Stack, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import SkeletonLoading from '~/components/SkeletonLoading/SkeletonLoading';
import SuggestionsUser from '../SuggestionsUser/SuggestionsUser';
import PostEnd from './PostEnd';
import PostItem from './PostItem';

const StyleDivider = styled(Divider)(({ theme }) => ({
    width: '100%',
    color: theme.palette.grey[300],
    paddingBottom: '10px',
}));

function ScrollPost() {
    // const [use]
    const { data, loading } = useSelector((state) => state.post);
    // const loading = true;

    const renderPost = () => {
        return data?.map((item, index) =>
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
        );
    };
    return (
        <div>
            <Stack direction="column" spacing={2} p="30px 10px">
                {loading && (
                    <Stack direction={'column'} width="100%" spacing={2}>
                        <SkeletonLoading type="post" />
                        <SkeletonLoading type="post" />
                    </Stack>
                )}
                {!loading && renderPost()}
            </Stack>
        </div>
    );
}

export default ScrollPost;
