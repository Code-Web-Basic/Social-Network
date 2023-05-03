import { Avatar, Box, Stack, Typography, useTheme } from '@mui/material';
import {
    Bell,
    ChatCircleDots,
    Compass,
    House,
    InstagramLogo,
    MagnifyingGlass,
    MonitorPlay,
    Plus,
} from 'phosphor-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { router as configRouter } from '~/config/config';
import Notifications from '../Notifications/Notifications';
import Search from '../Search/Search';
import { useSelector } from 'react-redux';
import useOnClickOutside from '~/hook/useOnClickOutside';
import { useRef } from 'react';
import images from '~/assets/images';
function Sidebar() {
    const theme = useTheme();
    const location = useLocation();
    const [openSideBar, setOpenSidebar] = useState(true);
    const [activeCurrent, setActiveCurrent] = useState(0);
    const currentUser = useSelector((state) => state.auth.currentUser.data);
    const ref = useRef();
    useOnClickOutside(ref, () => {
        setOpenSidebar(false);
        setActiveCurrent(10);
    });

    const renderComponent = () => {
        if (activeCurrent === 1) {
            return <Search />;
        }
        if (activeCurrent === 5) {
            return <Notifications />;
        }
    };

    return (
        <Box sx={{ position: 'sticky', top: '0px', zIndex: 1000 }} ref={ref}>
            <Stack direction="row">
                <Stack
                    direction={'column'}
                    spacing={2}
                    width={!openSideBar ? '60px' : '100%'}
                    overflow="hidden"
                    sx={{
                        transition: '0.1s linear',
                        borderRight: '1px solid',
                        borderColor: theme.palette.grey[300],
                        height: '100vh',
                    }}
                >
                    <Stack
                        direction={'row'}
                        width="100%"
                        height="50px"
                        p={1}
                        alignItems="center"
                        justifyContent="center"
                    >
                        {openSideBar ? (
                            <img src={images.logo} alt="logo" style={{ width: '70px', height: '70px' }} />
                        ) : (
                            <>
                                <InstagramLogo size={24} weight="regular" />
                            </>
                        )}
                    </Stack>
                    <Stack direction={'column'} width="100%" p={1} spacing={2}>
                        {/* home */}
                        <Stack
                            direction={'row'}
                            p={'10px 10px'}
                            alignItems="center"
                            justifyContent="flex-start"
                            width="100%"
                            sx={{
                                '&:hover': {
                                    background: theme.palette.grey[300],
                                    borderRadius: '15px',
                                },
                                background:
                                    location.pathname === configRouter.home && openSideBar
                                        ? theme.palette.grey[300]
                                        : 'transparent',
                                borderRadius: '15px',
                            }}
                            spacing={3}
                            component={Link}
                            to={configRouter.home}
                            onClick={() => {
                                setOpenSidebar(true);
                                setActiveCurrent(0);
                            }}
                        >
                            {location.pathname === configRouter.home ? (
                                <>
                                    <House size={24} weight="fill" />
                                    {openSideBar && (
                                        <Typography variant="h6" fontSize={'1rem'} fontWeight="600">
                                            Home
                                        </Typography>
                                    )}
                                </>
                            ) : (
                                <>
                                    <House size={24} weight="regular" />
                                    {openSideBar && (
                                        <Typography variant="body1" fontWeight="300">
                                            Home
                                        </Typography>
                                    )}
                                </>
                            )}
                        </Stack>
                        {/* search */}
                        <Stack
                            direction={'row'}
                            p={'10px 10px'}
                            alignItems="center"
                            justifyContent="flex-start"
                            width="100%"
                            sx={{
                                '&:hover': {
                                    background: theme.palette.grey[300],
                                    borderRadius: '15px',
                                },
                                background:
                                    activeCurrent === 1 && !openSideBar ? theme.palette.grey[300] : 'transparent',
                                borderRadius: '15px',
                            }}
                            spacing={3}
                            onClick={() => {
                                setOpenSidebar(false);
                                setActiveCurrent(1);
                            }}
                        >
                            {activeCurrent === 1 ? (
                                <>
                                    <MagnifyingGlass size={24} weight="fill" />
                                    {openSideBar && (
                                        <Typography variant="h6" fontSize={'1rem'} fontWeight="600">
                                            Search
                                        </Typography>
                                    )}
                                </>
                            ) : (
                                <>
                                    <MagnifyingGlass size={24} weight="regular" />
                                    {openSideBar && (
                                        <Typography variant="body1" fontWeight="300">
                                            Search
                                        </Typography>
                                    )}
                                </>
                            )}
                        </Stack>
                        {/* explore */}
                        <Stack
                            direction={'row'}
                            p={'10px 10px'}
                            alignItems="center"
                            justifyContent="flex-start"
                            width="100%"
                            sx={{
                                '&:hover': {
                                    background: theme.palette.grey[300],
                                    borderRadius: '15px',
                                },
                                background:
                                    location.pathname === configRouter.explore && openSideBar
                                        ? theme.palette.grey[300]
                                        : 'transparent',
                                borderRadius: '15px',
                            }}
                            spacing={3}
                            component={Link}
                            to={configRouter.explore}
                            onClick={() => {
                                setOpenSidebar(true);
                                setActiveCurrent(2);
                            }}
                        >
                            {location.pathname === configRouter.explore ? (
                                <>
                                    <Compass size={24} weight="fill" />
                                    {openSideBar && (
                                        <Typography variant="h6" fontSize={'1rem'} fontWeight="600">
                                            Explore
                                        </Typography>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Compass size={24} weight="regular" />
                                    {openSideBar && (
                                        <Typography variant="body1" fontWeight="300">
                                            Explore
                                        </Typography>
                                    )}
                                </>
                            )}
                        </Stack>
                        {/* reels */}
                        <Stack
                            direction={'row'}
                            p={'10px 10px'}
                            alignItems="center"
                            justifyContent="flex-start"
                            width="100%"
                            sx={{
                                '&:hover': {
                                    background: theme.palette.grey[300],
                                    borderRadius: '15px',
                                },
                                background:
                                    location.pathname === configRouter.reels && openSideBar
                                        ? theme.palette.grey[300]
                                        : 'transparent',
                                borderRadius: '15px',
                            }}
                            spacing={3}
                            component={Link}
                            to={configRouter.reels}
                            onClick={() => {
                                setOpenSidebar(true);
                                setActiveCurrent(3);
                            }}
                        >
                            {location.pathname === configRouter.reels ? (
                                <>
                                    <MonitorPlay size={24} weight="fill" />
                                    {openSideBar && (
                                        <Typography variant="h6" fontSize={'1rem'} fontWeight="600">
                                            Reels
                                        </Typography>
                                    )}
                                </>
                            ) : (
                                <>
                                    <MonitorPlay size={24} weight="regular" />
                                    {openSideBar && (
                                        <Typography variant="body1" fontWeight="300">
                                            Reels
                                        </Typography>
                                    )}
                                </>
                            )}
                        </Stack>
                        {/* message */}
                        <Stack
                            direction={'row'}
                            p={'10px 10px'}
                            alignItems="center"
                            justifyContent="flex-start"
                            width="100%"
                            sx={{
                                '&:hover': {
                                    background: theme.palette.grey[300],
                                    borderRadius: '15px',
                                },
                                background:
                                    location.pathname === configRouter.message && openSideBar
                                        ? theme.palette.grey[300]
                                        : 'transparent',
                                borderRadius: '15px',
                            }}
                            spacing={3}
                            component={Link}
                            to={configRouter.message}
                            onClick={() => {
                                setOpenSidebar(true);
                                setActiveCurrent(4);
                            }}
                        >
                            {location.pathname === configRouter.message ? (
                                <>
                                    <ChatCircleDots size={24} weight="fill" />
                                    {openSideBar && (
                                        <Typography variant="h6" fontSize={'1rem'} fontWeight="600">
                                            Message
                                        </Typography>
                                    )}
                                </>
                            ) : (
                                <>
                                    <ChatCircleDots size={24} weight="regular" />
                                    {openSideBar && (
                                        <Typography variant="body1" fontWeight="300">
                                            Message
                                        </Typography>
                                    )}
                                </>
                            )}
                        </Stack>
                        {/* notifications */}
                        <Stack
                            direction={'row'}
                            p={'10px 10px'}
                            alignItems="center"
                            justifyContent="flex-start"
                            width="100%"
                            sx={{
                                '&:hover': {
                                    background: theme.palette.grey[300],
                                    borderRadius: '15px',
                                },
                                background:
                                    activeCurrent === 5 && !openSideBar ? theme.palette.grey[300] : 'transparent',
                                borderRadius: '15px',
                            }}
                            spacing={3}
                            onClick={() => {
                                setOpenSidebar(false);
                                setActiveCurrent(5);
                            }}
                        >
                            {activeCurrent === 5 ? (
                                <>
                                    <Bell size={24} weight="fill" />
                                    {openSideBar && (
                                        <Typography variant="h6" fontSize={'1rem'} fontWeight="600">
                                            notifications
                                        </Typography>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Bell size={24} weight="regular" />
                                    {openSideBar && (
                                        <Typography variant="body1" fontWeight="300">
                                            notifications
                                        </Typography>
                                    )}
                                </>
                            )}
                        </Stack>
                        {/* Create */}
                        <Stack
                            direction={'row'}
                            p={'10px 10px'}
                            alignItems="center"
                            justifyContent="flex-start"
                            width="100%"
                            sx={{
                                '&:hover': {
                                    background: theme.palette.grey[300],
                                    borderRadius: '15px',
                                },
                                background:
                                    location.pathname === configRouter.create && openSideBar
                                        ? theme.palette.grey[300]
                                        : 'transparent',
                                borderRadius: '15px',
                            }}
                            component={Link}
                            to={configRouter.create}
                            spacing={3}
                            onClick={() => {
                                setOpenSidebar(true);
                                setActiveCurrent(6);
                            }}
                        >
                            {location.pathname === configRouter.create ? (
                                <>
                                    <Plus size={24} weight="fill" />
                                    {openSideBar && (
                                        <Typography variant="h6" fontSize={'1rem'} fontWeight="600">
                                            Create
                                        </Typography>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Plus size={24} weight="regular" />
                                    {openSideBar && (
                                        <Typography variant="body1" fontWeight="300">
                                            Create
                                        </Typography>
                                    )}
                                </>
                            )}
                        </Stack>

                        {/* Profile */}
                        <Stack
                            direction={'row'}
                            p={'10px 10px'}
                            alignItems="center"
                            justifyContent="flex-start"
                            width="100%"
                            sx={{
                                '&:hover': {
                                    background: theme.palette.grey[300],
                                    borderRadius: '15px',
                                },
                                background:
                                    location.pathname === `/profile/${currentUser?._id}` && openSideBar
                                        ? theme.palette.grey[300]
                                        : 'transparent',
                                borderRadius: '15px',
                            }}
                            spacing={3}
                            component={Link}
                            to={`/profile/${currentUser?._id}`}
                            onClick={() => {
                                setOpenSidebar(true);
                                setActiveCurrent(7);
                            }}
                        >
                            {location.pathname === `/profile/${currentUser?._id}` ? (
                                <>
                                    <Avatar src="" variant="circular" sx={{ height: 25, width: 25 }} />
                                    {openSideBar && (
                                        <Typography variant="h6" fontSize={'1rem'} fontWeight="600">
                                            Profile
                                        </Typography>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Avatar src="" variant="circular" sx={{ height: 25, width: 25 }} />
                                    {openSideBar && (
                                        <Typography variant="body1" fontWeight="300">
                                            Profile
                                        </Typography>
                                    )}
                                </>
                            )}
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            <Stack direction={'column'} height="100%">
                {renderComponent()}
            </Stack>
        </Box>
    );
}

export default Sidebar;
