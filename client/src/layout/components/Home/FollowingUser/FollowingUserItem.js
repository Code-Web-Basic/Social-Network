import { Avatar, Stack, Typography } from '@mui/material';

function FollowingUserItem() {
    return (
        <Stack direction={'column'} p={1} spacing={1} justifyContent="center" alignItems={'center'} minWidth="60px">
            <Avatar sx={{ height: 55, width: 55, border: '1px solid gray' }} />
            <Typography noWrap overflow="hidden">
                noma sky
            </Typography>
        </Stack>
    );
}

export default FollowingUserItem;
