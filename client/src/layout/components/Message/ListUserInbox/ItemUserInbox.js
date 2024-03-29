import { Stack, Avatar } from "@mui/material";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import * as React from 'react';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',

        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

function ItemUserInbox(props) {
    const { user, online } = props
    return (<Stack direction='row' height='80px' width='100%' padding='10px'>
        <div style={{
            width: '50px', height: '50px', marginRight: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
            {online ? <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
            >
                <Avatar alt="Avatar" src={user[0]?.avatar?.data} />
            </StyledBadge> :
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Avatar alt="Avatar" src={user[0]?.avatar?.data} />
                </StyledBadge>}

        </div>
        <div style={{ fontSize: '14px', display: 'flex', alignContent: 'flex-start', flexDirection: 'column', justifyContent: 'center', textAlign: 'left' }}>
            <h4 style={{ padding: '3px 0' }}>{user[0]?.Name}</h4>
            <p>{online ? 'Đang hoạt động' : 'Không hoạt động'}</p>
        </div>
    </Stack >);
}

export default ItemUserInbox;