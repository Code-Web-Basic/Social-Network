import { useEffect, useRef, useState } from 'react';
// mui
import { LoadingButton } from '@mui/lab';
import {
    Alert,
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Snackbar,
    Stack,
    styled,
    Switch,
    Typography,
    useTheme,
} from '@mui/material';
import { Eye, EyeSlash, GithubLogo } from 'phosphor-react';
// redux
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { signInGithub, signInGoogle, signInPassWord } from '~/features/auth/authSlice';
// component
import { Link, useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import { router as configRouter } from '~/config/config';

const IOSSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(
    ({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }),
);
function Login() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // data
    const { currentUser, loading, error, typeLogin, isError } = useSelector((state) => state.auth);
    // data
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //
    const [showPassword, setShowPassword] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const showMessageRef = useRef();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickGoogle = async () => {
        try {
            window.open('http://localhost:3240/v1/auth/google', '_self');
            await dispatch(signInGoogle());
        } catch (error) {
            console.log('failed', error);
        }
    };
    const handleClickGithub = async () => {
        try {
            await window.open('http://localhost:3240/v1/auth/github', '_self');
            await dispatch(signInGithub());
        } catch (error) {
            console.log('failed', error.message);
        }
    };
    const handleClickButtonSignIn = async () => {
        const dataUser = {
            password: password,
            email: email,
            authType: 'local',
        };
        try {
            const actionResult = await dispatch(signInPassWord({ data: dataUser }));
            const currentUser = unwrapResult(actionResult);
            console.log(currentUser);
        } catch (error) {
            console.log('failed', error.message);
        }
        if (isError) {
            handleShowMessage();
            console.log(error);
        }
    };

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);
    const handleShowMessage = () => {
        setShowMessage(true);
        if (showMessageRef.current) {
            clearTimeout(showMessageRef.current);
        }
        showMessageRef.current = setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    };
    const handleCloseMessage = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowMessage(false);
        if (showMessageRef.current) {
            clearTimeout(showMessageRef.current);
        }
    };
    return (
        <>
            <Snackbar open={showMessage} onClose={handleShowMessage}>
                <Alert onClose={handleCloseMessage} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
            <Grid container width="100%" height={'100vh'}>
                <Grid item xs={6} height="100%" alignItems="center" justifyContent="center">
                    <Stack direction={'column'} p={2} height="100%" width="100%" spacing={2}>
                        <Stack direction={'row'} alignItems="center" justifyContent={'space-between'}>
                            <Box height={50} component={Link} to="/">
                                <img
                                    src={images.logo}
                                    alt=""
                                    width={'100%'}
                                    height={'100%'}
                                    style={{ objectFit: 'cover' }}
                                ></img>
                            </Box>
                            <Box display={'flex'} gap={'10px'}>
                                <Typography variant="h4" fontSize="1rem">
                                    Don’t have an account?
                                </Typography>
                                <Typography
                                    fontSize="1rem"
                                    variant="h4"
                                    component={Link}
                                    to={configRouter.register}
                                    sx={{ color: theme.palette.primary.main }}
                                >
                                    Sign up!
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack direction={'column'} alignItems="center" justifyContent={'center'} spacing={2} flex="1">
                            {/* title */}
                            <Typography variant="h4">Welcome Back</Typography>
                            <Typography variant="h5" sx={{ fontSize: '1rem', fontWeight: 500 }}>
                                Login into your account
                            </Typography>
                            {/* button login */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: 2,
                                    paddingTop: '30px',
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    sx={{
                                        height: 44,
                                        width: 126,
                                        borderRadius: 2,
                                        color: theme.palette.text.secondary,
                                        borderColor: theme.palette.text.secondary,
                                        '&:hover': {
                                            color: theme.palette.text.secondary,
                                        },
                                    }}
                                    startIcon={<img src={images.googleIcon} alt="google"></img>}
                                    onClick={handleClickGoogle}
                                >
                                    Google
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        height: 44,
                                        width: 126,
                                        borderRadius: 2,
                                        color: theme.palette.text.secondary,
                                        borderColor: theme.palette.text.secondary,
                                        '&:hover': {
                                            color: theme.palette.text.secondary,
                                        },
                                    }}
                                    startIcon={<GithubLogo size={20} />}
                                    onClick={handleClickGithub}
                                >
                                    Github
                                </Button>
                            </Box>
                            {/* div */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '20px 10px',
                                    gap: '10px',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '130px',
                                        height: '0.5px',
                                        backgroundColor: theme.palette.text.disabled,
                                        opacity: 0.5,
                                    }}
                                ></Box>
                                <Typography variant="h6" fontSize={'1rem'}>
                                    Or continue with
                                </Typography>
                                <Box
                                    sx={{
                                        width: '130px',
                                        height: '0.5px',
                                        backgroundColor: theme.palette.text.disabled,
                                        opacity: 0.5,
                                    }}
                                ></Box>
                            </Box>
                            {/* input login */}
                            <Stack direction={'column'} spacing={3} alignItems="center">
                                <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-email">email</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email"
                                        type="email"
                                        label="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <Eye size={20} weight="light" />
                                                    ) : (
                                                        <EyeSlash size={20} weight="light" />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                            </Stack>
                            {/* recover password */}
                            <Stack
                                direction={'row'}
                                alignItems="center"
                                justifyContent={'space-between'}
                                padding="10px 0px"
                                width={400}
                            >
                                <Stack direction={'row'} alignItems="center" spacing={2}>
                                    <IOSSwitch />
                                    <Typography variant="body1">Remember me</Typography>
                                </Stack>
                                <Stack direction={'row'} alignItems="center" fontSize="0.8rem">
                                    Recover Password
                                </Stack>
                            </Stack>
                            {/* button login */}
                            <LoadingButton
                                onClick={handleClickButtonSignIn}
                                loading={loading}
                                loadingPosition="center"
                                variant="outlined"
                                sx={{
                                    height: 55,
                                    width: 400,
                                    borderRadius: 2,
                                    color: theme.palette.text.secondary,
                                    borderColor: theme.palette.text.secondary,
                                    '&:hover': {
                                        color: theme.palette.text.secondary,
                                    },
                                }}
                            >
                                Log In
                            </LoadingButton>
                            {/* <Button
                            variant="outlined"
                            sx={{
                                height: 55,
                                width: 400,
                                borderRadius: 2,
                                color: theme.palette.text.secondary,
                                borderColor: theme.palette.text.secondary,
                                '&:hover': {
                                    color: theme.palette.text.secondary,
                                },
                            }}
                            onClick={handleClickButtonSignIn}
                        >
                            Log In
                        </Button> */}
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack
                        direction={'column'}
                        p={2}
                        width="100%"
                        height="100%"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Stack
                            direction={'row'}
                            alignItems="center"
                            justifyContent={'center'}
                            position="relative"
                            width="100%"
                            height="100%"
                        >
                            <img
                                src={images.loginBackground}
                                alt="background"
                                style={{
                                    position: 'absolute',
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'cover',
                                    transform: 'translateX(-10%)',
                                }}
                            />
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}

export default Login;
