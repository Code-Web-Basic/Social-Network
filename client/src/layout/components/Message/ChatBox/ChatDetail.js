import * as React from 'react';
// mui ui
import { Avatar, Stack, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { Gear, Phone, VideoCamera } from 'phosphor-react';
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
function ChatDetail() {
    const theme = useTheme()
    return (<Stack direction='column' height='100%' width='100%'>
        {/* header */}
        <Stack direction='row' borderBottom='1px solid rgb(219, 219, 219)' height='50px' marginLeft='15px' justifyContent='space-between'>
            <div style={{ fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <div style={{ width: '30px', height: '30px', marginRight: '10px' }}>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar alt="Avatar" src="https://cdn-icons-png.flaticon.com/512/1088/1088537.png" style={{
                            width: '100%',
                            height: '100%'
                        }} />
                    </StyledBadge>
                </div>
                <div style={{ fontSize: '14px', display: 'flex', alignContent: 'flex-start', flexDirection: 'column', justifyContent: 'center', textAlign: 'left' }}>
                    <h4 style={{ padding: '3px 0' }}>Van Tu</h4>
                    <p>Đang hoạt động</p>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Phone size={28} style={{ margin: '0px 10px', cursor: 'pointer' }} />
                <VideoCamera size={28} style={{ margin: '0px 10px', cursor: 'pointer' }} />
                <Gear size={28} style={{ margin: '0px 10px', cursor: 'pointer' }} />
            </div>
        </Stack>
        {/* char detail*/}
        <Stack direction='column' height='calc(100% - 50px)' overflow='auto' sx={{
            '&::-webkit-scrollbar': {
                width: 5,
                backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.grey[500],
                borderRadius: '10px',
            },
        }}>
            chat
        </Stack>
    </Stack >);
}

export default ChatDetail;