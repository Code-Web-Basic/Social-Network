import { Avatar, Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import images from '~/assets/images';

function UploadCreatePost() {
    const theme = useTheme();
    const [selectedFile, setSelectedFile] = useState([]);
    const handlerSelectedFile = (e) => {
        const file = e.target.files[0];
        console.log(e.target.files[0]);

        if (!file) return;
        file.isUploading = true;
        setSelectedFile([...selectedFile, file]);

        // upload file
        const formData = new FormData();
        formData.append('newFile', file, file.name);
    };
    const handlerUploadFile = () => {};

    return (
        <Stack direction="column" width="100%" height="100%">
            {/* header create post */}
            <Stack
                direction="row"
                p={1}
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
                // onClick={handleClose}
                sx={{
                    position: 'relative',
                    borderBottom: '1px solid',
                    width: '100%',
                    borderColor: theme.palette.grey[300],
                }}
            >
                <Stack direction={'row'}></Stack>
                <Stack direction={'row'}>
                    <Typography variant="body2" fontWeight={600}>
                        Create new post
                    </Typography>
                </Stack>
                <Stack direction={'row'}></Stack>
            </Stack>
            {/* content */}
            <Box
                sx={{
                    position: 'relative',
                    minHeight: 600,
                    maxHeight: 800,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                }}
            >
                {selectedFile.length === 0 && (
                    <>
                        <img src={images.uploadIcon} alt="upload" />
                        <Typography variant="h6">Drag photos and videos here</Typography>
                        <input
                            type="file"
                            style={{
                                position: 'absolute',
                                height: '100%',
                                width: '100%',
                                // visibility: 'hidden',
                                opacity: 0,
                                zIndex: 100,
                            }}
                            onChange={handlerSelectedFile}
                        />
                        <Button
                            variant="contained"
                            sx={{
                                fontSize: '0.6rem',
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
                            Select from computer
                        </Button>
                    </>
                )}
                {selectedFile.length > 0 && (
                    <>
                        <img
                            alt="not fount"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                            src={URL.createObjectURL(selectedFile[0])}
                        />
                    </>
                )}
            </Box>
        </Stack>
    );
}

export default UploadCreatePost;
