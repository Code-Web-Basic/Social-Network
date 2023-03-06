import Grid from '@mui/material/Grid';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { BookmarkSimple, GridFour, Tag, X } from 'phosphor-react';
import { Avatar, Button, Modal, Stack, useTheme } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Post from '~/layout/components/Profile/Post';
import Saved from '~/layout/components/Profile/Saved';
import Tagged from '~/layout/components/Profile/Tagged';
import { useSelector } from 'react-redux';

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

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ width: '100%', height: 'calc(100% - 244px)' }}
        >
            {value === index && (
                <Box sx={{ p: 3 }} width='100%' height='100%' padding='0'>
                    <Typography width='100%' height='100%' padding='0'>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
function Profile() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const theme = useTheme();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const currentUser = useSelector((state) => state.auth.currentUser);
    console.log(currentUser.data.userName)
    const handleEdit = () => {
        navigate('/message')
    }
    const renderFollower = () => {
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
                            LinhNgoc.123
                        </Typography>
                        <Typography variant="body2" fontWeight={400} color={theme.palette.text.secondary}>
                            Linh Ngọc
                        </Typography>
                    </Stack>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="center">
                    <Button style={{ color: 'black' }}>Xóa</Button>
                </Stack>
            </Stack>
        );
    };
    return (<Grid container height='100vh'>
        <Grid item xs={1.5}></Grid>
        <Grid item xs={9} borderRadius='5px' boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px' padding='20px 10px'>
            <div style={{ borderBottom: '1px solid rgb(219, 219, 219)', width: '100%', height: '150px', paddingBottom: '44px', display: 'flex' }}>
                <div style={{ width: '30%', height: '100%', display: 'flex', objectFit: 'cover', justifyContent: 'center' }}>
                    <Avatar alt={currentUser.data.avatar.filename} src={currentUser.data.avatar.data} style={{ width: '150px', height: '150px' }} />
                </div>
                <div style={{ width: '70%', height: '100%' }}>
                    <div style={{ display: 'flex', padding: '5px' }}>
                        <div>
                            <h4>{currentUser.data.userName}</h4>
                        </div>
                        <div style={{ marginLeft: '10px' }}>
                            <Button variant="text" onClick={handleEdit}><b style={{ color: 'black', fontSize: '13px' }}>Chỉnh sửa thông tin</b></Button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px' }}>
                        <div style={{ fontSize: '16px', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <p ><b>0</b> bài viết</p>
                        </div>
                        <div style={{ cursor: 'pointer' }}>
                            <button onClick={handleOpen} style={{ cursor: 'pointer', fontSize: '16px' }}><b>47</b> người theo dõi</button>
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
                                                <h3>Người theo dõi</h3>
                                            </Typography>
                                            <Box sx={{ position: 'absolute', right: '10px' }} onClick={handleClose}>
                                                <X size={20} />
                                            </Box>
                                        </Stack>
                                    </Stack>
                                    {renderFollower()}
                                </Box>
                            </Modal>
                        </div>
                        <div style={{ cursor: 'pointer' }}>
                            <button onClick={handleOpen} style={{ cursor: 'pointer', fontSize: '16px' }} >Đang theo dõi <b>255</b> người dùng</button>
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
                                                <h3>Người đang theo dõi</h3>
                                            </Typography>
                                            <Box sx={{ position: 'absolute', right: '10px' }} onClick={handleClose}>
                                                <X size={20} />
                                            </Box>
                                        </Stack>
                                    </Stack>
                                    {renderFollower()}
                                </Box>
                            </Modal>
                        </div>
                    </div>
                    <div style={{ padding: '5px' }}>
                        <p>...</p>
                    </div>
                </div>
            </div>
            <div style={{ width: '100%', height: '78px' }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                    <Box sx={{ borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab icon={<GridFour />} iconPosition="start" label="BÀI VIẾT" {...a11yProps(0)} />
                            <Tab icon={<BookmarkSimple />} iconPosition="start" label="ĐÃ LƯU" {...a11yProps(1)} />
                            <Tab icon={<Tag />} iconPosition="start" label="ĐƯỢC GẮN THẺ" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                </Box>
            </div>
            <TabPanel value={value} index={0}>
                <Post />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Saved />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Tagged />
            </TabPanel>
        </Grid>
        <Grid item xs={1.5}></Grid>
    </Grid>);
}
export default Profile;
