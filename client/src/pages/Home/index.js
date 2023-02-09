import { Grid, Paper, Stack, styled } from '@mui/material';
import FollowingUser from '~/layout/components/Home/FollowingUser/FollowingUser';
import Posts from '~/layout/components/Home/Posts/Post';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
function Home() {
    return (
        <>
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={4.5} p={'20px 30px'}>
                    <Stack direction="column">
                        <FollowingUser />
                        <Posts />
                    </Stack>
                </Grid>
                <Grid item xs={3.5}></Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </>
    );
}
export default Home;
