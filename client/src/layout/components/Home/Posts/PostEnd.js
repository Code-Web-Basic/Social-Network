import { Stack, Typography, useTheme } from '@mui/material';
import images from '~/assets/images';

function PostEnd() {
    const theme = useTheme();
    return (
        <Stack
            direction="column"
            justifyContent={'center'}
            alignItems="center"
            padding="30px 0px"
            width="100%"
            spacing={1}
            sx={{
                borderBottom: '1px solid',
                borderColor: theme.palette.grey[300],
            }}
        >
            <img src={images.iconCheck} alt="icon" height={96} width={96} />
            <Typography variant="body2" fontWeight={600} color={theme.palette.text.primary}>
                You're all caught up
            </Typography>
            <Typography variant="body2" fontWeight={400} color={theme.palette.text.secondary}>
                You've seen all new posts from the past 3 days.
            </Typography>
        </Stack>
    );
}

export default PostEnd;
