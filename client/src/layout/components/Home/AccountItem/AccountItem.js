// mui ui
import { Avatar, Box, Button, Modal, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import MenuModal from '~/components/Popper/Menu/MenuModal';
import * as configRouter from '~/config/config';
import { logout } from '~/features/auth/authSlice';
import { clearMessage } from '~/features/message/messageSlice';
// components
import io from 'socket.io-client';
const socket = io("http://localhost:3240");
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    background: 'rgb(255, 255, 255)',
    p: 1,
    borderRadius: '10px',
};
// modal user switch account
export function MenuModalUser({ children }) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const logoutAccount = async () => {
        console.log('call');
        socket.disconnect()
        await dispatch(clearMessage())
        await dispatch(logout());
    };
    return (
        <>
            <div onClick={handleOpen}>{children}</div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} minWidth="400px" maxWidth="600px">
                    <Stack direction="column">
                        <Stack
                            direction="row"
                            p={1}
                            alignItems="center"
                            justifyContent="center"
                            spacing={2}
                            sx={{
                                '&:hover': {
                                    bgcolor: theme.palette.grey[100],
                                    borderRadius: 1,
                                },
                                '&:active': {
                                    bgcolor: theme.palette.grey[200],
                                    borderRadius: 1,
                                },
                                cursor: 'pointer',
                            }}
                            onClick={logoutAccount}
                        >
                            <Typography variant="body2" fontWeight={500} color={theme.palette.primary.light}>
                                Logout
                            </Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            p={1}
                            alignItems="center"
                            justifyContent="center"
                            spacing={2}
                            onClick={handleClose}
                            sx={{
                                '&:hover': {
                                    bgcolor: theme.palette.grey[100],
                                    borderRadius: 1,
                                },
                                '&:active': {
                                    bgcolor: theme.palette.grey[200],
                                    borderRadius: 1,
                                },
                                cursor: 'pointer',
                            }}
                        >
                            <Typography variant="body2" fontWeight={400}>
                                Cancel
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}
// account item
function AccountItem({ currentUser }) {
    const theme = useTheme();

    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between" p={1}>
            <Stack
                direction="row"
                spacing={2}
                component={Link}
                to={`${configRouter.router.profile.slice(0, -3) + currentUser?._id}`}
            >
                <Avatar src={currentUser?.avatar ? `${currentUser?.avatar?.data}` : ''} alt="user" />
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
                <MenuModalUser>
                    <Button variant="text" sx={{ fontSize: '0.6rem', fontWeight: 600 }}>
                        Switch
                    </Button>
                </MenuModalUser>
            </Stack>
        </Stack>
    );
}

export default AccountItem;
