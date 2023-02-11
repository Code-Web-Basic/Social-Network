import { Avatar, Box, Button, Checkbox, Modal, Radio, Stack, Typography, useTheme } from '@mui/material';
import { X } from 'phosphor-react';
import { useState } from 'react';

// style
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
function SharePost({ children }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [numberUserShare, setNumberUserShare] = useState([]);

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
        <>
            <div onClick={handleOpen}>{children}</div>
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
                            sx={{
                                borderBottom: '1px solid',
                                borderColor: theme.palette.grey[300],
                            }}
                        >
                            <Typography variant="body1 " fontWeight={5600} fontSize="0.8rem">
                                Share
                            </Typography>
                            <Box sx={{ position: 'absolute', right: '10px' }} onClick={handleClose}>
                                <X size={20} />
                            </Box>
                        </Stack>
                        <Stack
                            direction="row"
                            spacing={2}
                            p={1}
                            sx={{
                                borderBottom: '1px solid',
                                borderColor: theme.palette.grey[300],
                            }}
                        >
                            <Typography variant="body2" fontWeight="600" fontSize="0.8rem">
                                To:
                            </Typography>
                            <input placeholder="Search"></input>
                        </Stack>
                        <Stack direction="column" width="100%" p="10px 0px">
                            <Stack direction="row" p={0.5}>
                                <Typography variant="body2" fontWeight={600}>
                                    Suggested
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
                            {numberUserShare.length > 0 && <input placeholder="Write a message"></input>}
                            <Button
                                variant="contained"
                                sx={{
                                    width: '100%',
                                    fontSize: '0.7rem',
                                    background: theme.palette.primary.light,
                                    boxShadow: 'none',
                                    borderRadius: '10px',
                                    '&:hover': {
                                        background: theme.palette.primary.dark,
                                        boxShadow: 'none',
                                    },
                                    '&:active': {
                                        background: theme.palette.primary.dark,
                                        boxShadow: 'none',
                                    },
                                }}
                            >
                                Message
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}

export default SharePost;
