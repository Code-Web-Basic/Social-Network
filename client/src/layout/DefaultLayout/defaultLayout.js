import { Grid } from '@mui/material';
import Sidebar from '../components/Sidebar';

const DefaultLayout = ({ children }) => {
    return (
        <Grid container>
            <Grid item xs={2}>
                <Sidebar />
            </Grid>
            <Grid item xs={10}>
                {children}
            </Grid>
        </Grid>
    );
};

export default DefaultLayout;
