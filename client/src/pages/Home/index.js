import { Grid, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AccountItem from '~/layout/components/Home/AccountItem/AccountItem';
import SuggestionsUser from '~/layout/components/Home/SuggestionsUser/SuggestionsUser';
import { useEffect, useState } from 'react';
import ScrollPost from '~/layout/components/Home/Posts/ScrollPost';
import FollowingUser from '~/layout/components/Home/FollowingUser/FollowingUser';
import { getFirstPost } from '~/features/post/postSlice';
function Home() {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();
    const [paging, setPaging] = useState(1);

    useEffect(() => {
        // const callApi = async () => {
        //     await ;
        // };
        // callApi();
        dispatch(getFirstPost());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
