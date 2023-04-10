import { Avatar, Skeleton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';

function SkeletonLoading({ type = 'account', layout = 'row', numberLoading }) {
    const renderUi = () => {
        if (type === 'account') {
            // account loading layout row
            if (layout === 'row') {
                return (
                    <>
                        <Box sx={{ pt: 0.2 }} width="100%" display="flex" alignItems="center" gap={1}>
                            <Skeleton animation="wave" variant="circular" width={50} height={50} />
                            <Stack direction={'column'} width="100%">
                                <Skeleton />
                                <Skeleton width="60%" />
                            </Stack>
                        </Box>
                        <Box sx={{ pt: 0.2 }} width="100%" display="flex" alignItems="center" gap={1}>
                            <Skeleton animation="wave" variant="circular" width={50} height={50} />
                            <Stack direction={'column'} width="100%">
                                <Skeleton />
                                <Skeleton width="60%" />
                            </Stack>
                        </Box>
                    </>
                );
            }
            // account loading layout column
            if (layout === 'column') {
                return (
                    <>
                        <Box
                            sx={{ pt: 0.2 }}
                            width="100%"
                            display="flex"
                            alignItems="center"
                            flexDirection={'column'}
                            gap={1}
                        >
                            <Skeleton animation="wave" variant="circular" width={50} height={50} />
                            <Stack direction={'column'} width="100%">
                                <Skeleton />
                                <Skeleton width="60%" />
                            </Stack>
                        </Box>
                        <Box
                            sx={{ pt: 0.2 }}
                            width="100%"
                            display="flex"
                            alignItems="center"
                            flexDirection={'column'}
                            gap={1}
                        >
                            <Skeleton animation="wave" variant="circular" width={50} height={50} />
                            <Stack direction={'column'} width="100%">
                                <Skeleton />
                                <Skeleton width="60%" />
                            </Stack>
                        </Box>
                    </>
                );
            }
        }
        if (type === 'post') {
            return (
                <div style={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ margin: 1 }}>
                            <Skeleton variant="circular">
                                <Avatar />
                            </Skeleton>
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <Skeleton width="100%">
                                <Typography>.</Typography>
                            </Skeleton>
                        </Box>
                    </Box>

                    <Skeleton variant="rectangular" width="100%">
                        <div style={{ paddingTop: '80%' }} />
                    </Skeleton>
                    <Box sx={{ width: '100%' }}>
                        <Skeleton width="100%">
                            <Typography>.</Typography>
                        </Skeleton>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Skeleton width="100%">
                            <Typography>.</Typography>
                        </Skeleton>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Skeleton width="100%">
                            <Typography>.</Typography>
                        </Skeleton>
                    </Box>
                </div>
            );
        }
    };
    return renderUi();
}

export default SkeletonLoading;
