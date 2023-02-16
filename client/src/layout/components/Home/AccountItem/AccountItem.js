// mui ui
import { Avatar, Button, Stack, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import * as configRouter from '~/config/config';
// components

function AccountItem({ currentUser }) {
    const theme = useTheme();
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            p={1}
            component={Link}
            to={`${configRouter.router.profile}`}
        >
            <Stack direction="row" spacing={2}>
                <Avatar src={currentUser?.avatar} alt="user" />
                <Stack direction="column">
                    <Typography variant="body2" fontWeight={600} color={theme.palette.text.primary}>
                        {currentUser?.userName}
                    </Typography>
                    <Typography variant="body2" fontWeight={400} color={theme.palette.text.secondary}>
                        {currentUser?.Name}
                    </Typography>
                </Stack>
            </Stack>

            <Stack direction="row">
                <Button variant="text" sx={{ fontSize: '0.6rem', fontWeight: 600 }}>
                    Switch
                </Button>
            </Stack>
        </Stack>
    );
}

export default AccountItem;
