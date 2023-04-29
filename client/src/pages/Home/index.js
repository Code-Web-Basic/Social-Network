import { Grid, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import AccountItem from '~/layout/components/Home/AccountItem/AccountItem';
import SuggestionsUser from '~/layout/components/Home/SuggestionsUser/SuggestionsUser';
import { useEffect } from 'react';
import ScrollPost from '~/layout/components/Home/Posts/ScrollPost';
import FollowingUser from '~/layout/components/Home/FollowingUser/FollowingUser';
import io from 'socket.io-client';
const socket = io('http://localhost:3240');
function Home() {
    const currentUser = useSelector((state) => state.auth.currentUser);
    useEffect(() => {
        socket.emit('add-user', currentUser?.data?._id);
    }, [currentUser]);
    return (
        <>
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={4.5} p={'20px 30px'}>
                    <Stack direction="column">
                        <FollowingUser />
                        <ScrollPost />
                        {/* <ScrollPost data={dataCurrent} /> */}
                    </Stack>
                </Grid>
                <Grid item xs={3.5}>
                    <Stack direction={'column'} paddingTop="40px">
                        <AccountItem currentUser={currentUser?.data} />
                        <SuggestionsUser />
                    </Stack>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </>
    );
}
export default Home;
