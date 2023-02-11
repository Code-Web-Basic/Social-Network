import { Avatar, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { X } from 'phosphor-react';

function UserSearchItem() {
    const theme = useTheme();
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            p={1}
            sx={{
                '&:hover': {
                    background: theme.palette.grey[100],
                    borderRadius: 1,
                },
            }}
        >
            <Stack direction="row" spacing={2}>
                <Avatar src="" alt="user" />
                <Stack direction="column">
                    <Typography variant="body2" fontWeight={600} color={theme.palette.text.primary}>
                        chithanhduongngoc
                    </Typography>
                    <Typography variant="body2" fontWeight={400} color={theme.palette.text.secondary}>
                        Suggested for you
                    </Typography>
                </Stack>
            </Stack>

            <Stack direction="row">
                <IconButton size="small">
                    <X size={20} />
                </IconButton>
            </Stack>
        </Stack>
    );
}

export default UserSearchItem;
