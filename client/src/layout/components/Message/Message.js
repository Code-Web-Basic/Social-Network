import Grid from '@mui/material/Grid';
import ListUserInbox from './ListUserInbox/ListUserInbox';
import ChatBox from './ChatBox/ChatBox';
function Message() {
    return (
        <Grid container height='100vh' padding='20px 0px'>
            <Grid item xs={1.5}></Grid>
            <Grid item xs={9} container height='100%' border='1px solid rgb(219, 219, 219)' borderRadius='5px' boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'>
                {/* list user inbox */}
                <Grid item xs={4} borderRight='1px solid rgb(219, 219, 219)' height='100%'>
                    <ListUserInbox />
                </Grid>
                {/* chat */}
                <Grid item xs={8} height='100%'>
                    <ChatBox />
                </Grid>
            </Grid>
            <Grid item xs={1.5}></Grid>
        </Grid>
    );
}

export default Message;
