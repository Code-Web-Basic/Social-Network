import PropTypes from 'prop-types';
//mui ui
import { Avatar, Button, IconButton, Stack, Typography, useTheme } from '@mui/material';
// components
import TippyHeadless from '@tippyjs/react/headless';
import MenuUserFollowing from '../Posts/MenuUserFollowing/MenuUserFollowing';
import { X } from 'phosphor-react';
import { useState } from 'react';
import * as followerApi from '~/api/followApi/followApi';
function SuggestionsUserItem({ data = {}, typeLayout = 'row' }) {
    const theme = useTheme();
    // const [hover, setHover] = useState();
    const [isFollower, setIsFollower] = useState(false);
    const clickCloseItem = () => {
        return;
    };
    const handleClickFollowing = async () => {
        try {
            const res = await followerApi.follow(data?._id);
            console.log(res);
            setIsFollower(true);
        } catch (error) {
            console.log(error);
        }
    };
    const handleClickUnFollowing = async () => {
        try {
            const res = await followerApi.unFollower(data?._id);
            console.log(res);
            setIsFollower(false);
        } catch (error) {
            console.log(error);
        }
    };
    return typeLayout === 'row' ? (
        <Stack direction="row" alignItems="center" justifyContent="space-between" p={1}>
            <TippyHeadless
                interactive
                placement="bottom-start"
                render={(attrs) => (
                    <div className="box" tabIndex="-1" {...attrs}>
                        <MenuUserFollowing data={data} />
                    </div>
                )}
            >
                <Stack direction="row" spacing={2}>
                    <Avatar src={`${data?.avatar?.data ? data?.avatar.data : ''}`} alt="user" />
                    <Stack direction="column">
                        <Typography variant="body2" fontWeight={600} color={theme.palette.text.primary}>
                            {data?.userName}
                        </Typography>
                        <Typography variant="body2" fontWeight={400} color={theme.palette.text.secondary}>
                            Suggested for you
                        </Typography>
                    </Stack>
                </Stack>
            </TippyHeadless>

            <Stack direction="row">
                {!isFollower ? (
                    <Button
                        variant="text"
                        sx={{
                            width: '100%',
                            fontSize: '0.7rem',
                            boxShadow: 'none',
                            borderRadius: '10px',
                            '&:hover': {
                                color: theme.palette.primary.dark,
                                boxShadow: 'none',
                            },
                            '&:active': {
                                color: theme.palette.primary.dark,
                                boxShadow: 'none',
                            },
                        }}
                        onClick={handleClickFollowing}
                    >
                        Following
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        sx={{
                            width: '100%',
                            fontSize: '0.7rem',
                            boxShadow: 'none',
                            borderRadius: '10px',
                            '&:hover': {
                                color: theme.palette.primary.dark,
                                boxShadow: 'none',
                            },
                            '&:active': {
                                color: theme.palette.primary.dark,
                                boxShadow: 'none',
                            },
                        }}
                        onClick={handleClickFollowing}
                    >
                        unFollowing
                    </Button>
                )}
            </Stack>
        </Stack>
    ) : (
        <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            p={1.5}
            sx={{ border: '1px solid', borderColor: theme.palette.grey[300] }}
            spacing={2}
            position="relative"
            maxWidth={180}
        >
            <IconButton sx={{ position: 'absolute', top: '0px', right: '0px' }} onClick={clickCloseItem}>
                <X size={15} />
            </IconButton>
            <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" width="100%">
                {/* <TippyHeadless
                    interactive
                    placement="bottom-start"
                    render={(attrs) => (
                        <div className="box" tabIndex="-1" {...attrs}>
                            <MenuUserFollowing />
                        </div>
                    )}
                > */}
                <Avatar src={`${data?.avatar?.data ? data?.avatar.data : ''}`} alt="user" />
                {/* </TippyHeadless> */}
                <Stack direction="column" width="100%" justifyContent="center" alignItems="center">
                    <Typography
                        variant="body2"
                        fontWeight={600}
                        color={theme.palette.text.primary}
                        noWrap
                        textOverflow={'ellipsis'}
                    >
                        {data?.userName}
                    </Typography>
                    <Typography
                        variant="body2"
                        fontWeight={400}
                        color={theme.palette.text.secondary}
                        noWrap
                        textOverflow={'ellipsis'}
                    >
                        Suggested for you
                    </Typography>
                </Stack>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center">
                {!isFollower ? (
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
                        onClick={handleClickFollowing}
                    >
                        Following
                    </Button>
                ) : (
                    <Button
                        variant="outlined"
                        sx={{
                            width: '100%',
                            fontSize: '0.7rem',
                            color: theme.palette.primary.light,
                            boxShadow: 'none',
                            borderRadius: '10px',
                            '&:hover': {
                                color: theme.palette.primary.dark,
                                boxShadow: 'none',
                            },
                            '&:active': {
                                color: theme.palette.primary.dark,
                                boxShadow: 'none',
                            },
                        }}
                        onClick={handleClickUnFollowing}
                    >
                        unFollowing
                    </Button>
                )}
            </Stack>
        </Stack>
    );
}

export default SuggestionsUserItem;

SuggestionsUserItem.prototype = {
    data: PropTypes.array,
    typeLayout: PropTypes.string,
};
