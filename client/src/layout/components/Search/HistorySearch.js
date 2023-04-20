import { Stack, Typography, useTheme } from '@mui/material';
import UserSearchItem from './UserSearchItem';
import * as userApi from '~/api/userApi/userApi';
import SkeletonLoading from '~/components/SkeletonLoading/SkeletonLoading';

function HistorySearch({ historySearch = [], loading = false, setHistorySearch }) {
    const theme = useTheme();

    // clear history item
    const handleClickRemoveHistory = async (id) => {
        await userApi.removeSearchHistory({ historyId: id });
        setHistorySearch((prev) => prev.filter((i) => i._id !== id));
        console.log('onclick remove history');
    };
    // render Item History
    const renderItemHistory = () => {
        return historySearch.map((item) => {
            return (
                <UserSearchItem
                    data={item.User[0]}
                    key={item._id}
                    search={true}
                    handleClickItemRemove={() => handleClickRemoveHistory(item._id)}
                />
            );
        });
    };

    // clearHistoryAll
    const handleClickRemoveAll = async () => {
        console.log('click remove all');
        await userApi.removeSearchHistoryAll();
        setHistorySearch([]);
    };
    return (
        <>
            <Stack direction="row" justifyContent="space-between" alignItems={'center'} width="100%">
                <Typography variant="body2" fontWeight={600}>
                    Recent
                </Typography>
                <Typography
                    variant="body2"
                    fontSize={'0.8rem'}
                    fontWeight={500}
                    color={theme.palette.primary.light}
                    sx={{ cursor: 'pointer' }}
                    onClick={handleClickRemoveAll}
                >
                    clear all
                </Typography>
            </Stack>
            <Stack direction="column" width="100%" spacing={1} alignItems="center">
                {loading ? (
                    <SkeletonLoading layout="row" type="account" />
                ) : historySearch.length > 0 ? (
                    renderItemHistory()
                ) : (
                    <Typography>No recent searches.</Typography>
                )}
            </Stack>
        </>
    );
}

export default HistorySearch;
