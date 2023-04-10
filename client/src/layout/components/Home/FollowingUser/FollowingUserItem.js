import { Avatar, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function FollowingUserItem({ data }) {
    return (
        <Stack
            direction={'column'}
            p={1}
            spacing={1}
            justifyContent="center"
            alignItems={'center'}
            minWidth="60px"
            overflow={'hidden'}
        >
            <Avatar
                sx={{ height: 55, width: 55, border: '1px solid gray' }}
                alt={`${data?.User[0].Name}`}
                src={`${data?.User[0]?.avatar?.data}`}
            />
            <Typography noWrap overflow="hidden" textOverflow={'ellipsis'} width="100%">
                {data?.User[0]?.Name}
            </Typography>
        </Stack>
    );
}

export default FollowingUserItem;
FollowingUserItem.prototype = {
    data: PropTypes.object,
};
