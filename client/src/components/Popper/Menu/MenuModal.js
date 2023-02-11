import { Box, Modal, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';

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
function MenuModal({ children, data = [] }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const renderItemMenuModal = () => {
        return data.map((item, index) => (
            <Stack
                key={index}
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
                }}
            >
                <Typography variant="body2" fontWeight={item.fontWeight} color={item.color}>
                    {item.title}
                </Typography>
            </Stack>
        ));
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
                        {renderItemMenuModal()}
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

export default MenuModal;
