import { useEffect, useState } from 'react';
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
import { GithubLogo } from 'phosphor-react';
// component
import images from '~/assets/images';
import { registerPassword } from '~/api/authApi/authApi';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const theme = useTheme()
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [open, setOpen] = useState(false)
    const [messageError, setMessageError] = useState([])
    const navigate = useNavigate();
    const isNumber = (str) => {
        if (str.length === 10)
            return /^[0-9]+$/.test(str);
        else
            return false
    }
    const isEmail = (str) => {
        // Biểu thức chính quy để kiểm tra định dạng email
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(str);
    }
    const handleSignUp = async (e) => {
        e.preventDefault();
        const newUser = {
            email: email,
            password: password,
            name: name,
            username: username,
            phone: phone
        };
        if (email === '' || phone === '' || name === '' || username === '' || password === '' || confirmPassword === '') {
            setOpen(true)
            setMessageError([...messageError, 'Please fill out all fields'])
        }
        else {
            if (!isEmail(email)) {
                setOpen(true)
                setMessageError([...messageError, 'Please enter email is valid!'])
            }
            else if (!isNumber(phone)) {
                setOpen(true)
                setMessageError([...messageError, 'Please enter phone is valid!'])
            }
            else if (password === confirmPassword) {
                if (password.length < 5) {
                    setOpen(true)
                    setMessageError([...messageError, 'Please enter a password longer than 6 characters!'])
                }
                else {
                    try {
                        const res = await registerPassword(newUser)
                        console.log(res)
                        if (res?.user) {
                            navigate('login')
                        }
                    }
                    catch (error) {
                        setOpen(true)
                        setMessageError([...messageError, error?.response?.data?.error])
                    }
                }
            }
            else {
                setOpen(true)
                setMessageError([...messageError, 'Password not confirm'])
            }
        }
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickGoogle = async () => {
        const url = 'http://localhost:3240/v1/auth/google';
        window.open(url, '_self');
        console.log('click login google');
    };
    return (
        <Grid container width="100%" height={'100vh'}>
            <Grid item xs={6} height="100%" alignItems="center" justifyContent="center">
                <Stack direction={'column'} p={2} height="100%" width="100%" spacing={2}>
                    <Stack direction={'column'} alignItems="center" justifyContent={'center'} spacing={2} flex="1">
                        {/* title */}
                        <Typography variant="h4">Welcome My Website</Typography>
                        {/* input login */}
                        <Stack direction={'column'} spacing={1.5} alignItems="center">
                            <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-email" >Email</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-email"
                                    type="email"
                                    label="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
                                <InputLabel>Name</InputLabel>
                                <OutlinedInput
                                    type="text"
                                    label="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
                                <InputLabel >User name</InputLabel>
                                <OutlinedInput
                                    type="text"
                                    label="User name"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
                                <InputLabel >Phone</InputLabel>
                                <OutlinedInput
                                    type="text"
                                    label="Phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                edge="end"
                                            >
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                <OutlinedInput
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                edge="end"
                                            >
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirm Password"
                                    type='password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </FormControl>
                        </Stack>
                        {/* button login */}
                        <LoadingButton
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
                            onClick={handleSignUp}
                        >
                            Sign up
                        </LoadingButton>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
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
                                Or Login With
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
                        {/* button login */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 2,
                            }}
                        >
                            <Button
                                onClick={handleClickGoogle}
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
                            >
                                Google
                            </Button>
                            {/* login */}
                            <Stack direction={'row'} alignItems="center" fontSize="0.8rem">
                                Have an account? <Link to={'/login'} style={{ color: 'blue', fontSize: '15px' }}>Log in</Link>
                            </Stack>
                        </Box>
                    </Stack>
                </Stack>
            </Grid>
            <div className='test'>
                {messageError.map((e) => (
                    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                        <Alert variant="filled" severity="error" sx={{ width: '100%' }}>
                            {e}
                        </Alert>
                    </Snackbar>))}
            </div>
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
    );
}

export default Register;
