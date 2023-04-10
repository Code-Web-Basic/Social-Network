import { Box, Stack, useTheme } from '@mui/material';
import { useState } from 'react';
import UserSearchItem from './UserSearchItem';

import HistorySearch from './HistorySearch';
import InputSearch from './InputSearch';

function Search() {
    const theme = useTheme();
    // API search results
    const [results, setResults] = useState([]);
    // history search

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
                            <HistorySearch />
                        </>
                    ) : (
                        <>
                            {results?.map((item) => {
                                return <UserSearchItem data={item} key={item._id} />;
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
