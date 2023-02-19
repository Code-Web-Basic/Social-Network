import * as React from 'react';
import { NotePencil } from 'phosphor-react';
import { Avatar, Box, Checkbox, Modal, Stack, Typography, useTheme } from '@mui/material';
import { X } from 'phosphor-react';
import ItemUserInbox from './ItemUserInbox';

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    background: 'rgb(255, 255, 255)',
    p: 1,
    borderRadius: '10px',
};
function ListUserInbox() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const renderItemSuggested = () => {
        return (
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                p={1}
                sx={{
                    '&:hover': {
                        background: theme.palette.grey[200],
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

                <Stack direction="row" alignItems="center" justifyContent="center">
                    <Checkbox />
                </Stack>
            </Stack>
        );
    };
    return (
        <div style={{ height: '100%', width: '100%' }}>
            <Stack direction='column' height='100%'>
                {/* header */}
                <Stack direction='row' borderBottom='1px solid rgb(219, 219, 219)' padding='10px' justifyContent='center' alignItems='center'>
                    <div style={{ fontSize: '16px', fontWeight: '600' }}><h3>Foryour.106</h3></div>
                    <div><button onClick={handleOpen}><NotePencil size={25} /></button></div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style} minWidth="500px" maxheight="600px" overflow="hidden">
                            <Stack direction="column">
                                <Stack
                                    direction="row"
                                    width="100%"
                                    alignItems="center"
                                    justifyContent={'center'}
                                    p={1}
                                    position="relative"
                                    borderBottom='1px solid rgb(219, 219, 219)'
                                >
                                    <Typography variant="body1 " fontWeight={5600} fontSize="0.8rem">
                                        <h3>Tin nhắn mới</h3>
                                    </Typography>
                                    <Box sx={{ position: 'absolute', right: '10px' }} onClick={handleClose}>
                                        <X size={20} />
                                    </Box>
                                </Stack>
                                <Stack
                                    direction="row"
                                    borderBottom='1px solid rgb(219, 219, 219)'
                                    spacing={2}
                                    p={1}
                                >
                                    <Typography variant="body2" fontWeight="600" fontSize="0.8rem">
                                        Tới:
                                    </Typography>
                                    <input placeholder="Tìm kiếm..." ></input>
                                </Stack>
                                <Stack direction="column" width="100%" p="10px 0px">
                                    <Stack direction="row" p={0.5}>
                                        <Typography variant="body2" fontWeight={600}>
                                            Gợi ý
                                        </Typography>
                                    </Stack>
                                    {renderItemSuggested()}
                                </Stack>
                                <Stack
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    p={1}
                                    sx={{
                                        borderTop: '1px solid',
                                        borderColor: theme.palette.grey[300],
                                    }}
                                >
                                </Stack>
                            </Stack>
                        </Box>
                    </Modal>
                </Stack>
                <Stack direction='column' height='100%' overflow='scroll'>
                    {/* listuser */}
                    <button style={{ cursor: 'pointer' }}><ItemUserInbox /></button>
                    <button style={{ cursor: 'pointer' }}><ItemUserInbox /></button>
                    <button style={{ cursor: 'pointer' }}><ItemUserInbox /></button>
                </Stack>
            </Stack>
        </div>
    );
}

export default ListUserInbox;
