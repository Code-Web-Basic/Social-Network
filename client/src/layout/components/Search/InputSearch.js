import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// mui
import { Box, CircularProgress, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { XCircle } from 'phosphor-react';
// hook
import useDebounce from '~/hook/useDebounce';
// components
import * as userApi from '~/api/userApi/userApi';

function InputSearch({ setResults }) {
    const theme = useTheme();

    const [valueInput, setValueInput] = useState('');
    // Searching status (whether there is pending API request)
    const [isSearching, setIsSearching] = useState(false);

    const valueDebounce = useDebounce(valueInput, 500);

    useEffect(() => {
        if (valueDebounce) {
            setIsSearching(true);
            const callApi = async () => {
                const res = await userApi.searchUser(valueDebounce);
                setResults(res);
                setIsSearching(false);
            };
            callApi();
        } else {
            setResults([]);
            setIsSearching(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueDebounce]);

    const clickClear = () => {
        setValueInput('');
        setResults([]);
        return;
    };
    return (
        <Stack
            direction="column"
            spacing={3}
            sx={{ borderBottom: '1px solid', borderColor: theme.palette.grey[300] }}
            paddingBottom={2}
            margin="10px 10px"
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
    );
}

export default InputSearch;
InputSearch.prototype = {
    setResults: PropTypes.func,
};
