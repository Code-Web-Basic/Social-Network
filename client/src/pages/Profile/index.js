import Grid from '@mui/material/Grid';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { BookmarkSimple, GridFour, Tag, X } from 'phosphor-react';
import { Avatar, Button, CircularProgress, Modal, Skeleton, Stack, useTheme } from '@mui/material';
import { Link, useNavigate, useParams } from "react-router-dom";
import Post from '~/layout/components/Profile/Post';
import Saved from '~/layout/components/Profile/Saved';
import { useDispatch, useSelector } from 'react-redux';
import * as followApi from '~/api/followApi/followApi'
import * as userApi from '~/api/userApi/userApi'
import { useState } from 'react';
import { useEffect } from 'react';
import { updateUser } from '~/features/auth/authSlice';

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
    const theme = useTheme();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.currentUser.data);
    const loading = useSelector((state) => state.auth.loading);
    //
    const [value, setValue] = useState(0);
    const [openfollower, setOpenFollower] = useState(false);
    const [openfollowing, setOpenFollowing] = useState(false);
    const [follower, setFollower] = useState([])
    const [following, setFollowing] = useState([])
    const [post, setPost] = useState([])
    const [user, getUser] = useState(null)
    const [follow, setFollow] = useState(null)
    //
    const handleOpenFollower = () => setOpenFollower(true);
    const handleCloseFollower = () => setOpenFollower(false);
    const handleOpenFollowing = () => setOpenFollowing(true);
    const handleCloseFollowing = () => setOpenFollowing(false);
    const { id } = useParams()
    // get friend
    const getfriend = async () => {
        const res = await userApi.getFriend(id)
        getUser(res)
    }

    useEffect(() => {
        getfriend()
    }, [id])

    const checkFollow = async (id) => {
        if (currentUser?._id !== id) {
            const res = await followApi.checkUserFollow(id)
            console.log(res)
            if (res?.isFollow) {
                setFollow(true)
            }
            else {
                setFollow(false)
            }
        }
    }
    useEffect(() => {
        checkFollow(id)
    }, [id])

    // handle follow
    const handleFollow = async () => {
        await followApi.follow(id)
        await getFollowing()
        setFollow(true)
    }
    const handleUnFollow = async () => {
        await followApi.unFollower(id)
        await getFollowing()
        setFollow(false)
    }

    // 
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleNewMessage = () => {
        navigate(`/message/${id}`)
    }

    // call Api follow and post
    const getPostOfUser = async () => {
        const res = await userApi.getPostOfUser(id)
        setPost(res)
    }

    const getFollower = async () => {
        const res = await followApi.getFollower(id)
        setFollower(res)
    }
    const getFollowing = async () => {
        const res = await followApi.getFollowing(id)
        setFollowing(res)
    }
    useEffect(() => {
        getPostOfUser()
        getFollower()
        getFollowing()
    }, [id])

    // handle unfollower/ unfollowing
    const handleUnFollower = async (id) => {
        await followApi.unFollower(id)
        await getFollower()
    }

    const handleUnFollowing = async (id) => {
        const data = {
            followerId: id
        }
        await followApi.unFollowing(data)
        await getFollowing()
    }

    // render list follower
    const renderFollower = () => {
        return (
            <>{
                follower?.map((e) => (<Stack direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    p={1}
                    sx={{
                        '&:hover': {
                            background: theme.palette.grey[200],
                        },
                    }}
                    key={e?.User[0]?._id}>
                    <Link to={`/profile/${e?.User[0]?._id}`} onClick={handleCloseFollower}>
                        <Stack direction="row" spacing={2}>
                            <Avatar src={e?.User[0]?.avatar?.data} alt="user" />
                            <Stack direction="column">
                                <Typography variant="body2" fontWeight={600} color={theme.palette.text.primary}>
                                    {e?.User[0]?.userName}
                                </Typography>
                                <Typography variant="body2" fontWeight={400} color={theme.palette.text.secondary}>
                                    {e?.User[0]?.Name}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Link>
                    {user?._id === currentUser?._id ? <Stack direction="coloumn" alignItems="center" justifyContent="center">
                        <button style={{ cursor: 'pointer', fontSize: '15px', fontWeight: '600' }} onClick={() => handleUnFollower(e?.User[0]?._id)}>UnFollow</button>
                    </Stack> : ''}
                </Stack>))
            }</>
        );
    };

    // render list following
    const renderFollowing = () => {
        return (
            <>{
                following?.map((e) => (<Stack direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    p={1}
                    sx={{
                        '&:hover': {
                            background: theme.palette.grey[200],
                        },
                    }}
                    key={e?.User[0]?._id}>
                    <Link to={`/profile/${e?.User[0]?._id}`} onClick={handleCloseFollowing}>
                        <Stack direction="row" spacing={2}>
                            <Avatar src={e?.User[0]?.avatar?.data} alt="user" />
                            <Stack direction="column">
                                <Typography variant="body2" fontWeight={600} color={theme.palette.text.primary}>
                                    {e?.User[0]?.userName}
                                </Typography>
                                <Typography variant="body2" fontWeight={400} color={theme.palette.text.secondary}>
                                    {e?.User[0]?.Name}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Link>
                    {user?._id === currentUser?._id ? <Stack direction="coloumn" alignItems="center" justifyContent="center">
                        <button style={{ cursor: 'pointer', fontSize: '15px', fontWeight: '600' }} onClick={() => handleUnFollowing(e?.User[0]?._id)}>Remove</button>
                    </Stack> : ''}
                </Stack>))
            }</>
        );
    };

    // change avatar
    const dispatch = useDispatch();
    const handleChangeAvatar = async (e) => {
        let formData = new FormData();
        formData.append('file', e.target.files[0]);
        await dispatch(updateUser(formData))
    }
    return (
        <Grid container height='100vh' sx={{ overflow: 'auto' }}>
            <Grid item xs={1.5}></Grid>
            <Grid item xs={9} borderRadius='5px' boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px' padding='20px 10px' sx={{ height: '100%' }}>
                {/* profile */}
                <div style={{ borderBottom: '1px solid rgb(219, 219, 219)', width: '100%', height: '150px', paddingBottom: '44px', display: 'flex' }}>
                    {/* display and update avatar */}
                    {user?._id === currentUser?._id ?
                        <div style={{ width: '30%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                            <input
                                type="file"
                                id="file"
                                style={{ display: "none" }}
                                onChange={(e) => {
                                    handleChangeAvatar(e)
                                }}
                            />
                            <label htmlFor="file" >
                                <div style={{ width: '30%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}>
                                    {!loading && <Avatar alt={user?._id === currentUser?._id ? currentUser?.avatar?.filename : user?.avatar?.filename}
                                        src={user?._id === currentUser?._id ? currentUser?.avatar?.data : user?.avatar?.data}
                                        style={{ width: '150px', height: '150px' }}
                                    />}
                                    {loading && <CircularProgress color="secondary" />}
                                </div>
                            </label>
                        </div>
                        :
                        <div style={{ width: '30%', height: '100%', display: 'flex', objectFit: 'cover', justifyContent: 'center' }}>
                            {!loading && <Avatar alt={user?._id === currentUser?._id ? currentUser?.avatar?.filename : user?.avatar?.filename}
                                src={user?._id === currentUser?._id ? currentUser?.avatar?.data : user?.avatar?.data}
                                style={{ width: '150px', height: '150px' }}
                            />}
                            {loading && <CircularProgress color="secondary" />}
                        </div>}
                    {/* display info  */}
                    <div style={{ width: '70%', height: '100%' }}>
                        <div style={{ display: 'flex', padding: '5px' }}>
                            {/* display user */}
                            <div>
                                {!loading && <h4>{user?._id === currentUser?._id ? currentUser?.userName : user?.userName}</h4>}
                                {loading && <Skeleton animation="wave" />}
                            </div>
                            {/* display button message */}
                            <div style={{ marginLeft: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {user?._id !== currentUser?._id &&
                                    <button style={{
                                        padding: '8px 10px', backgroundColor: 'rgb(0, 149, 246)',
                                        color: 'white', cursor: 'pointer',
                                        fontWeight: '600', borderRadius: '5px'
                                    }}
                                        onClick={handleNewMessage}>
                                        Message
                                    </button>}
                            </div>
                            {/* button follow/ unfollow */}
                            {
                                user?._id !== currentUser?._id &&
                                <div style={{ marginLeft: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {follow ? <button onClick={handleUnFollow}>
                                        <b style={{ padding: '8px 10px', color: 'black', fontSize: '13px', cursor: 'pointer' }}>UnFollow</b>
                                    </button>
                                        :
                                        <button onClick={handleFollow}>
                                            <b style={{ padding: '8px 10px', color: 'black', fontSize: '13px', cursor: 'pointer' }}>
                                                Follow</b>
                                        </button>}
                                </div>
                            }
                        </div>
                        {/* display number post/ follower/ following */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px', position: 'relative' }}>
                            <div style={{ fontSize: '16px', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                <p ><b>{post?.length}</b> Posts</p>
                            </div>
                            {/* display follower */}
                            <div style={{ cursor: 'pointer' }}>
                                <button onClick={handleOpenFollowing} style={{ cursor: 'pointer', fontSize: '16px' }}><b>{following?.length}</b> Followers</button>
                                <Modal
                                    open={openfollowing}
                                    onClose={handleCloseFollowing}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style} minWidth="400px" maxheight="400px" overflow="auto">
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
                                                    <h3>Follower</h3>
                                                </Typography>
                                                <Box sx={{ position: 'absolute', right: '10px' }} onClick={handleCloseFollowing}>
                                                    <X size={20} />
                                                </Box>
                                            </Stack>
                                        </Stack>
                                        {following.length === 0 ? <p style={{ fontSize: '15px' }}>No follower</p> : renderFollowing()}
                                    </Box>
                                </Modal>
                            </div>
                            {/* display following */}
                            <div style={{ cursor: 'pointer' }}>
                                <button onClick={handleOpenFollower} style={{ cursor: 'pointer', fontSize: '16px' }} >
                                    <b>{follower?.length}</b> Following
                                </button>
                                <Modal
                                    open={openfollower}
                                    onClose={handleCloseFollower}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style} minWidth="400px" maxheight="400px" overflow="auto">
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
                                                    <h3>Following</h3>
                                                </Typography>
                                                <Box sx={{ position: 'absolute', right: '10px' }} onClick={handleCloseFollower}>
                                                    <X size={20} />
                                                </Box>
                                            </Stack>
                                        </Stack>
                                        {follower.length === 0 ? <p style={{ fontSize: '15px' }}>No following</p> : renderFollower()}
                                    </Box>
                                </Modal>
                            </div>
                        </div>
                        <div style={{ padding: '5px' }}>
                            <p>...</p>
                        </div>
                    </div>
                </div>

                {/* tab pen */}
                <div style={{ width: '100%', height: '78px' }}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                        <Box sx={{ borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab icon={<GridFour />} iconPosition="start" label="POSTS" {...a11yProps(0)} />
                                {user?._id === currentUser?._id ?
                                    <Tab icon={<BookmarkSimple />} iconPosition="start" label="SAVED" {...a11yProps(1)} />
                                    :
                                    ''}
                            </Tabs>
                        </Box>
                    </Box>
                </div>
                {/* child in tab pen */}
                <TabPanel value={value} index={0}>
                    <Post post={post} setPost={setPost} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Saved />
                </TabPanel>
            </Grid>
            <Grid item xs={1.5}></Grid>
        </Grid>);
}
export default Profile;
