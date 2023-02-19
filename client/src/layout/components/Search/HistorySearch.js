import { Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import UserSearchItem from './UserSearchItem';
import * as userApi from '~/api/userApi/userApi';

function HistorySearch() {
    const theme = useTheme();
    // const { loading, error, data } = useQuery('searchHistory');

    const [historySearch, setHistorySearch] = useState([1, 2, 3]);
    console.log('test');
    // useEffect(() => {
    //     if (data) {
    //         setHistorySearch([...data]);
    //     }
    // }, [data]);
    useEffect(() => {
        const callApi = async () => {
            const res = await userApi.getHistorySearch('');
            console.log(res);
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
            <Stack direction="column" width="100%" spacing={1}>
                {renderItemHistory()}
            </Stack>
        </>
    );
}

export default HistorySearch;
