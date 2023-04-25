import { useEffect } from 'react';
import { Box, Stack, useTheme } from '@mui/material';
import { useState } from 'react';
import UserSearchItem from './UserSearchItem';

import HistorySearch from './HistorySearch';
import InputSearch from './InputSearch';
import * as userApi from '~/api/userApi/userApi';

function Search() {
    const theme = useTheme();
    // API search results
    const [results, setResults] = useState([]);
    // history search

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

    // handle click search item
    const handleClickItem = async (item) => {
        if (!historySearch.some((e) => e._id === item?._id)) {
            const res = await userApi.addSearchUser({ targetId: item?._id });
            setHistorySearch((prev) => [...prev, { ...res, User: [item] }]);
        }
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                left: '60px',
                top: '0px',
                boxShadow: 'rgba(0, 0, 0, 0.24) 9px -1px 20px -10px',
                background: theme.palette.background.default,
                zIndex: 100,
            }}
        >
            <InputSearch setResults={setResults} />
            {/* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */}
            <Stack direction={'column'} width="400px" height="100vh" p={2}>
                <Stack direction="column" padding={'10px 0px'} spacing={2}>
                    {results?.length === 0 ? (
                        <>
                            <HistorySearch
                                historySearch={historySearch}
                                loading={loading}
                                setHistorySearch={setHistorySearch}
                            />
                        </>
                    ) : (
                        <>
                            {results?.map((item) => {
                                return (
                                    <UserSearchItem
                                        data={item}
                                        key={item._id}
                                        handleClick={() => handleClickItem(item)}
                                    />
                                );
                            })}

                            {/* <UserSearchItem />
                            <UserSearchItem /> */}
                        </>
                    )}
                </Stack>
            </Stack>
        </Box>
    );
}

export default Search;
