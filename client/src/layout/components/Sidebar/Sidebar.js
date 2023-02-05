import { Box, Stack, Typography } from '@mui/material';

function Sidebar() {
    return (
        <Stack direction={'column'}>
            <Stack direction={'row'} width="100%" height="50px" p={1}>
                <Typography variant="h3">Sidebar</Typography>
            </Stack>
            <Stack direction={'column'} width="100%" height="50px" p={1}>
                <Stack direction={'row'}></Stack>
            </Stack>
        </Stack>
    );
}

export default Sidebar;
