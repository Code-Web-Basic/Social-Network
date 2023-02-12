import { Grid, Stack } from '@mui/material';
import AccountItem from '~/layout/components/Home/AccountItem/AccountItem';
import FollowingUser from '~/layout/components/Home/FollowingUser/FollowingUser';
import Posts from '~/layout/components/Home/Posts/Post';
import SuggestionsUser from '~/layout/components/Home/SuggestionsUser/SuggestionsUser';

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));
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
                <Grid item xs={3.5}>
                    <Stack direction={'column'} paddingTop="40px">
                        <AccountItem />
                        <SuggestionsUser />
                    </Stack>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </>
    );
}
export default Home;
