import { useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import ShareCreatePost from './ShareCreatePost';
import UploadCreatePost from './UploadCreatePost';

function CreatePost({ children }) {
    const theme = useTheme();
    const [selectedFile, setSelectedFile] = useState([]);
    const [historyComponent, setHistoryComponent] = useState(0);
    // const Current = historyComponent[historyComponent.length - 1];
    const handleNextShare = () => {
        setHistoryComponent(1);
    };
    const handleBack = () => {
        setHistoryComponent(0);
    };

    //render components
    const renderItemMenuModal = () => {
        if (historyComponent === 0) {
            return (
                <UploadCreatePost
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                    handleNextShare={handleNextShare}
                />
            );
        } else if (historyComponent === 1) {
            return (
                <ShareCreatePost
                    selectedFile={selectedFile}
                    handleBack={handleBack}
                    setSelectedFile={setSelectedFile}
                />
            );
        }
    };

    return (
        <>
            <Box
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}
            >
                <Box
                    minWidth="650px"
                    minHeight="650px"
                    maxHeight="1000px"
                    maxWidth="1300px"
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
