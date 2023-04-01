import * as React from 'react';
import Button from '@mui/material/Button';
import * as bookmarksApi from '~/api/bookmarksApi/bookmarksApi'
// mui ui
import { Box, ImageList, ImageListItem, Modal, Stack, Typography, useTheme } from '@mui/material';
import { X } from 'phosphor-react';
import { useState } from 'react';
import { useEffect } from 'react';
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
function Saved() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const theme = useTheme();
    // const currentUser = useSelector((state) => state.auth.currentUser.data);
    const [post, setPost] = useState([])
    const getBookMarks = async () => {
        const res = await bookmarksApi.getBookMarks()
        setPost(res)
    }
    useEffect(() => {
        getBookMarks()
    }, [])
    const renderCollections = () => {
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
                <Stack direction='column' spacing={2}>
                    <Stack direction="column">
                        <input placeholder="Bộ sưu tập mới" ></input>
                    </Stack>
                </Stack>
                <Stack direction='column' alignItems="center" justifyContent="center">
                    <Button style={{ color: 'black' }}>Tiếp</Button>
                </Stack>
            </Stack>
        );
    };
    return (<div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div>Chỉ mình bạn có thể xem mục mình đã lưu</div>
            <div>
                <Button onClick={handleOpen}><p style={{ fontSize: '8px' }}>Bộ sưu tập mới</p></Button>
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
                                    <h3>Thêm bộ sưu tập mới</h3>
                                </Typography>
                                <Box sx={{ position: 'absolute', right: '10px' }} onClick={handleClose}>
                                    <X size={20} />
                                </Box>
                            </Stack>
                        </Stack>
                        {renderCollections()}
                    </Box>
                </Modal>
            </div>
        </div>
        <div>
            <ImageList sx={{ width: '100%', overflow: 'hidden' }} cols={3} rowHeight={250}>
                {post.map((item) => (
                    <ImageListItem key={item.img} className='post' sx={{ border: '1px solid black', width: '100%', height: '100%', overflow: 'hidden' }}>
                        {!item.isVideo ?
                            <img
                                src={`${item?.source[0]?.data}`}
                                alt={item?.caption}
                                loading="lazy"
                                style={{ width: '100%', height: '100%', cursor: 'pointer', objectFit: 'none' }}
                            /> : <video src={item?.source[0]?.data} style={{ width: '100%', height: '100%', cursor: 'pointer', objectFit: 'none' }} />
                        }
                    </ImageListItem>
                ))
                }
            </ImageList >
        </div>
    </div>);
}

export default Saved;