import { Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import UserSearchItem from './UserSearchItem';
import * as userApi from '~/api/userApi/userApi';
import SkeletonLoading from '~/components/SkeletonLoading/SkeletonLoading';

function HistorySearch() {
    const theme = useTheme();
    // const { loading, error, data } = useQuery('searchHistory', userApi.getHistorySearch());
    const [loading, setLoading] = useState(false);
    const [historySearch, setHistorySearch] = useState([]);
    useEffect(() => {
        const callApi = async () => {
            setLoading(true);
            const res = await userApi.getHistorySearch();
            if (res?.length > 0) {
                setHistorySearch([...res]);
            }
            setLoading(false);
        };
        callApi();
    }, []);
    const renderItemHistory = () => {
        return historySearch.map((item) => <UserSearchItem key={item} />);
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
