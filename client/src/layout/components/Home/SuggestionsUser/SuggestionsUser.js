import { Stack, Typography, useTheme } from '@mui/material';
import AccountItem from '../AccountItem/AccountItem';
import SuggestionsUserItem from './SuggestionsUserItem';

function SuggestionsUser() {
    const theme = useTheme();
    return (
        <Stack direction="column" width="100%" p={1} spacing={2} marginTop="30px">
            <AccountItem />
            <Stack direction="row" justifyContent="space-between" width="100%">
                <Typography variant="body1" fontSize="0.8rem" fontWeight={500} color={theme.palette.text.secondary}>
                    Suggestions for you
                </Typography>
                <Typography variant="body2" fontWeight={400} fontSize="0.6rem" color={theme.palette.text.primary}>
                    See All
                </Typography>
            </Stack>
            <Stack direction="column" width="100%">
                <SuggestionsUserItem />
            </Stack>
        </Stack>
    );
}

export default SuggestionsUser;
