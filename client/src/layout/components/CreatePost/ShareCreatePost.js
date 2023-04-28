import { useState } from 'react';
import { useSelector } from 'react-redux';
// swipper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
// mui
import {
    Avatar,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Grid,
    IconButton,
    Stack,
    // styled,
    // Switch,
    TextareaAutosize,
    Typography,
    useTheme,
} from '@mui/material';
// import MuiAccordion from '@mui/material/Accordion';
// import MuiAccordionSummary from '@mui/material/AccordionSummary';
// import MuiAccordionDetails from '@mui/material/AccordionDetails';
// icon
import { CaretLeft, CaretRight, Smiley } from 'phosphor-react';

// tippy
import Tippy from '@tippyjs/react/headless';
// different import path!
// emoij
import EmojiPicker from '@emoji-mart/react';
import dataEmoji from '@emoji-mart/data';
// api
import * as postApi from '~/api/postApi/postApi';

// const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
//     border: `1px solid ${theme.palette.divider}`,
//     '&:not(:last-child)': {
//         borderBottom: 0,
//     },
//     '&:before': {
//         display: 'none',
//     },
// }));

// const AccordionSummary = styled((props) => <MuiAccordionSummary expandIcon={<CaretRight size={24} />} {...props} />)(
//     ({ theme }) => ({
//         // backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
//         flexDirection: 'row-reverse',
//         '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
//             transform: 'rotate(90deg)',
//         },
//         '& .MuiAccordionSummary-content': {
//             marginLeft: theme.spacing(1),
//         },
//     }),
// );

// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//     padding: theme.spacing(2),
//     borderTop: '1px solid rgba(0, 0, 0, .125)',
// }));

// const AntSwitch = styled(Switch)(({ theme }) => ({
//     width: 28,
//     height: 16,
//     padding: 0,
//     display: 'flex',
//     '&:active': {
//         '& .MuiSwitch-thumb': {
//             width: 15,
//         },
//         '& .MuiSwitch-switchBase.Mui-checked': {
//             transform: 'translateX(9px)',
//         },
//     },
//     '& .MuiSwitch-switchBase': {
//         padding: 2,
//         '&.Mui-checked': {
//             transform: 'translateX(12px)',
//             color: '#fff',
//             '& + .MuiSwitch-track': {
//                 opacity: 1,
//                 backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
//             },
//         },
//     },
//     '& .MuiSwitch-thumb': {
//         boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
//         width: 12,
//         height: 12,
//         borderRadius: 6,
//         transition: theme.transitions.create(['width'], {
//             duration: 200,
//         }),
//     },
//     '& .MuiSwitch-track': {
//         borderRadius: 16 / 2,
//         opacity: 1,
//         backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
//         boxSizing: 'border-box',
//     },
// }));

function ShareCreatePost({ handleBack = () => {}, selectedFile = [], setSelectedFile = () => {} }) {
    // mui ui
    const theme = useTheme();
    const currentUser = useSelector((state) => state.auth.currentUser);
    // const [expanded, setExpanded] = useState(' ');

    const [loadingShare, setLoadingShare] = useState(false);
    const handleClose = () => {
        setLoadingShare(false);
    };
    const handleOpen = () => {
        setLoadingShare(true);
    };

    // const handleChange = (panel) => (event, newExpanded) => {
    //     setExpanded(newExpanded ? panel : false);
    // };
    //   value input string
    const [valueInput, setValueInput] = useState('');

    const handleEmojiClick = (event) => {
        let message = valueInput;
        message += event.native;
        setValueInput(message);
    };

    const sendSharePost = async (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append('caption', valueInput);
        formData.append('isVideo', false);

        selectedFile.forEach((e) => formData.append('files', selectedFile[0]));
        handleOpen();
        if (valueInput.length > 0) {
            // handleSendChatValue(valueFormChat);
            // dispatch(addNewComment(dataComment));
            try {
                const res = await postApi.createPostImages({ data: formData });
                console.log(res);
            } catch (error) {
                console.log(error);
            }
            handleClose();
            setValueInput(' ');
            setSelectedFile([]);
            handleBack();
        }
    };
    return (
        <>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loadingShare}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Stack direction="column" width="100%" height={800}>
                {/* header */}
                <Stack
                    direction="row"
                    p={1}
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                    // onClick={handleClose}
                    sx={{
                        position: 'relative',
                        borderBottom: '1px solid',
                        width: '100%',
                        borderColor: theme.palette.grey[300],
                    }}
                >
                    <Stack direction={'row'}>
                        <IconButton size="small" onClick={handleBack}>
                            <CaretLeft size={24} />
                        </IconButton>
                    </Stack>
                    <Stack direction={'row'}>
                        <Typography variant="body2" fontWeight={600}>
                            Create new post
                        </Typography>
                    </Stack>
                    <Stack direction={'row'} onClick={sendSharePost}>
                        <Button size="small" variant="text" sx={{ fontSize: '0.8rem' }} disabled={loadingShare}>
                            Share
                        </Button>
                    </Stack>
                </Stack>
                {/* container */}
                <Box
                    sx={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Grid container width="100%" height="100%">
                        <Grid item xs={7}>
                            <Swiper
                                pagination={true}
                                modules={[Pagination]}
                                style={{ width: '100%', height: '100%', position: 'relative' }}
                                spaceBetween={10}
                                slidesPerView={1}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                            >
                                {selectedFile.map((i) => {
                                    return (
                                        <SwiperSlide
                                            key={i?.lastModified}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Stack
                                                direction="column"
                                                minWidth="450px"
                                                maxHeight="600px"
                                                overflow="hidden"
                                                alignItems="center"
                                                justifyContent="center"
                                                sx={{
                                                    aspectRatio: '1 / 1',
                                                    flexBasis: '888px',
                                                    background: 'black',
                                                }}
                                            >
                                                <img
                                                    src={URL.createObjectURL(i)}
                                                    alt="post"
                                                    style={{ objectFit: 'cover', maxHeight: '100%', maxWidth: '100%' }}
                                                />
                                            </Stack>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </Grid>
                        <Grid item xs={5} width="500px">
                            <Stack
                                direction="column"
                                width="100%"
                                height="100%"
                                p={'0px 10px'}
                                paddingBottom={'10px'}
                                sx={{ borderLeft: '1px solid', borderColor: theme.palette.grey[300] }}
                                overflow={'auto'}
                            >
                                {/* avatar */}
                                <Stack
                                    direction="row"
                                    p={2}
                                    alignItems="center"
                                    justifyContent="flex-start"
                                    spacing={2}
                                >
                                    <Avatar src={currentUser?.data?.avatar?.data} />
                                    <Typography variant="body1" fontWeight={600} fontSize={'0.8rem'}>
                                        {currentUser.data.userName}
                                    </Typography>
                                </Stack>
                                {/*text description */}
                                <Stack direction={'column'} width="100%" p={2} spacing={2}>
                                    {/* input */}
                                    <Stack direction={'column'} width="100%" minHeight="100px">
                                        {/* <input placeholder="writer a caption" style={{ fontSize: '1.1rem' }}></input> */}
                                        <TextareaAutosize
                                            aria-label="writer a caption"
                                            minRows={14}
                                            maxRows={14}
                                            placeholder="writer a caption"
                                            style={{
                                                width: '100%',
                                                border: 'none',
                                                outline: 'none',
                                                fontSize: '1.1rem',
                                                resize: 'none',
                                            }}
                                            value={valueInput}
                                            onChange={(e) => setValueInput(e.target.value)}
                                        />
                                    </Stack>
                                    {/* navigate input */}
                                    <Stack direction={'row'} width="100%">
                                        <Tippy
                                            interactive
                                            trigger="click"
                                            render={(attrs) => (
                                                <div className="box" tabIndex="-1" {...attrs}>
                                                    <EmojiPicker
                                                        data={dataEmoji}
                                                        onEmojiSelect={handleEmojiClick}
                                                        theme="light"
                                                    />
                                                </div>
                                            )}
                                        >
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                sx={{
                                                    color: theme.palette.text.secondary,
                                                    '&:hover': {
                                                        color: theme.palette.grey[500],
                                                    },
                                                }}
                                            >
                                                <Smiley size={20} />
                                            </Box>
                                        </Tippy>
                                    </Stack>
                                </Stack>
                                {/* description */}
                                {/* <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                        <Typography>Accessibility</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Stack direction={'column'} spacing={2} width="100%">
                                            <Typography
                                                variant="body2"
                                                fontWeight={400}
                                                color={theme.palette.text.secondary}
                                            >
                                                Alt text describes your photos for people with visual impairments. Alt
                                                text will be automatically created for your photos or you can choose to
                                                write your own.
                                            </Typography>
                                            <Stack direction={'row'} spacing={2}>
                                                <Avatar variant="square" />
                                                <Box
                                                    sx={{
                                                        width: '100%',
                                                        border: '1px solid',
                                                        borderColor: theme.palette.grey[300],
                                                        borderRadius: 2,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        padding: '0px 10px',
                                                    }}
                                                >
                                                    <input
                                                        style={{ width: '100%' }}
                                                        placeholder="writer all text..."
                                                    ></input>
                                                </Box>
                                            </Stack>
                                        </Stack>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                                        <Typography>Advanced settings</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Stack direction={'column'} spacing={2} width="100%">
                                           
                                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                                <Typography
                                                    variant="body1"
                                                    fontWeight={500}
                                                    color={theme.palette.text.primary}
                                                >
                                                    Hide like and view counts on this post
                                                </Typography>
                                                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} />
                                            </Stack>
                                            <Typography
                                                variant="body2"
                                                fontWeight={400}
                                                color={theme.palette.text.secondary}
                                            >
                                                Only you will see the total number of likes and views on this post. You
                                                can change this later by going to the ··· menu at the top of the post.
                                                To hide like counts on other people's posts, go to your account
                                                settings.
                                            </Typography>
                                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                                <Typography
                                                    variant="body1"
                                                    fontWeight={500}
                                                    color={theme.palette.text.primary}
                                                >
                                                    Turn off commenting
                                                </Typography>
                                                <AntSwitch inputProps={{ 'aria-label': 'ant design' }} />
                                            </Stack>
                                            <Typography
                                                variant="body2"
                                                fontWeight={400}
                                                color={theme.palette.text.secondary}
                                            >
                                                You can change this later by going to the ··· menu at the top of your
                                                post.
                                            </Typography>
                                        </Stack>
                                    </AccordionDetails>
                                </Accordion> */}
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
        </>
    );
}

export default ShareCreatePost;
