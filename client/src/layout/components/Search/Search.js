import { Box, CircularProgress, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { XCircle } from 'phosphor-react';
import { useEffect, useState } from 'react';
import useDebounce from '~/hook/useDebounce';
import UserSearchItem from './UserSearchItem';

function Search() {
    const theme = useTheme();
    const [valueInput, setValueInput] = useState('');
    // API search results
    const [results, setResults] = useState([]);
    // Searching status (whether there is pending API request)
    const [isSearching, setIsSearching] = useState(false);

    const valueDebounce = useDebounce(valueInput, 500);

    useEffect(() => {
        if (valueDebounce) {
            setIsSearching(true);
            const callApi = () => {};
            callApi();
        } else {
            setResults([]);
            setIsSearching(false);
        }
        return () => {};
    }, [valueDebounce]);
    const clickClear = () => {
        setValueInput('');
        setResults([]);
        return;
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
            {/* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */}
            <Stack direction={'column'} width="400px" height="100vh" p={2}>
                <Stack
                    direction="column"
                    spacing={3}
                    sx={{ borderBottom: '1px solid', borderColor: theme.palette.grey[300] }}
                    paddingBottom={2}
                >
                    <Typography variant="body1" fontWeight={600} width="100%">
                        Search
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        p={1}
                        sx={{ background: theme.palette.grey[200], borderRadius: '10px' }}
                    >
                        <input
                            placeholder="Search"
                            style={{
                                padding: '5px 10px',
                                background: 'none',
                                outline: 'none',
                                border: 'none',
                                width: '100%',
                            }}
                            value={valueInput}
                            onChange={(e) => setValueInput(e.target.value)}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {!isSearching ? (
                                <IconButton size="small" onClick={clickClear}>
                                    <XCircle size={20} />
                                </IconButton>
                            ) : (
                                <CircularProgress size={15} />
                            )}
                        </Box>
                    </Stack>
                </Stack>
                <Stack direction="column" padding={'10px 0px'} spacing={2}>
                    {results.length === 0 ? (
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
                                <UserSearchItem />
                                <UserSearchItem />
                                <UserSearchItem />
                            </Stack>
                        </>
                    ) : (
                        <>
                            <UserSearchItem />
                            <UserSearchItem />
                            <UserSearchItem />
                        </>
                    )}
                </Stack>
            </Stack>
        </Box>
    );
}

export default Search;
