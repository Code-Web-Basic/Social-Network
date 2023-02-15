import { Avatar, Button, Container, Modal, Stack, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import UploadCreatePost from './UploadCreatePost';

// stylessss

function CreatePost({ children }) {
    const theme = useTheme();
    // handle close open  modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //render components
    const renderItemMenuModal = () => {
        return <UploadCreatePost />;
    };

    return (
        <>
            <Box
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}
            >
                <Box
                    minWidth="650px"
                    minHeight="650px"
                    maxHeight="1600px"
                    maxWidth="1600px"
                    sx={{
                        bgcolor: 'background.paper',
                        background: 'rgb(255, 255, 255)',
                        borderRadius: '10px',
                        border: '1px solid',
                        borderColor: theme.palette.grey[300],
                    }}
                >
                    {renderItemMenuModal()}
                </Box>
            </Box>
        </>
    );
}

export default CreatePost;
