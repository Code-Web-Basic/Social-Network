import { Avatar, Box, Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import images from '~/assets/images';
import { WrapperPopper } from '~/components/Popper';
import * as userApi from '~/api/userApi/userApi';
import { useSelector } from 'react-redux';

function MenuUserFollowing({ id, data }) {
    const theme = useTheme();

    return (
        <WrapperPopper>
            <Stack direction="column" p={1.5} sx={{ minWidth: 300 }} spacing={2}>
                <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={2}>
                    <Avatar src={`${data?.User?.avatar.data}`} alt="user" sx={{ width: 50, height: 50 }} />
                    <Stack direction="column">
                        <Stack direction="row">
                            <Typography variant="body2" fontWeight={600} sx={{ color: theme.palette.text.primary }}>
                                {data?.User?.userName}
                            </Typography>
                        </Stack>
                        <Typography
                            variant="body2"
                            fontWeight={400}
                            fontSize="0.8rem"
                            sx={{ color: theme.palette.text.secondary }}
                        >
                            {data?.User?.Name}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-around">
                    <Stack direction="column" alignItems={'center'}>
                        <Typography
                            variant="body2"
                            fontWeight={600}
                            fontSize="0.8rem"
                            color={theme.palette.text.primary}
                        >
                            {/* tesst */}
                        </Typography>
                        <Typography
                            variant="body2"
                            fontWeight={400}
                            fontSize="0.8rem"
                            color={theme.palette.text.secondary}
                        >
                            post
                        </Typography>
                    </Stack>
                    <Stack direction="column" alignItems={'center'}>
                        <Typography
                            variant="body2"
                            fontWeight={600}
                            fontSize="0.8rem"
                            color={theme.palette.text.primary}
                        >
                            63.5M
                        </Typography>
                        <Typography
                            variant="body2"
                            fontWeight={400}
                            fontSize="0.8rem"
                            color={theme.palette.text.secondary}
                        >
                            followers
                        </Typography>
                    </Stack>
                    <Stack direction="column" alignItems={'center'}>
                        <Typography
                            variant="body2"
                            fontWeight={600}
                            fontSize="0.8rem"
                            color={theme.palette.text.primary}
                        >
                            31
                        </Typography>
                        <Typography
                            variant="body2"
                            fontWeight={400}
                            fontSize="0.8rem"
                            color={theme.palette.text.secondary}
                        >
                            following
                        </Typography>
                    </Stack>
                </Stack>
                <Stack direction="row" p="10px 0px" alignItems="center" justifyContent="space-between">
                    <Grid container height="110px" maxWidth={'360px'}>
                        <Grid item xs={4} p={0.1}>
                            <Box sx={{ overflow: 'hidden', width: '100%', height: '100%' }}>
                                <img
                                    src={images.post}
                                    alt="user"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={4} p={0.1}>
                            <Box sx={{ overflow: 'hidden', width: '100%', height: '100%' }}>
                                <img
                                    src={images.post}
                                    alt="user"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={4} p={0.1}>
                            <Box sx={{ overflow: 'hidden', width: '100%', height: '100%' }}>
                                <img
                                    src={images.post}
                                    alt="user"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between" p={1} spacing={2}>
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
                    <Button
                        variant="contained"
                        sx={{
                            width: '100%',
                            fontSize: '0.7rem',
                            background: theme.palette.grey[500],
                            boxShadow: 'none',
                            borderRadius: '10px',
                            '&:hover': {
                                background: theme.palette.grey[400],
                                boxShadow: 'none',
                            },
                            '&:active': {
                                background: theme.palette.grey[400],
                                boxShadow: 'none',
                            },
                        }}
                    >
                        following
                    </Button>
                </Stack>
            </Stack>
        </WrapperPopper>
    );
}

export default MenuUserFollowing;
