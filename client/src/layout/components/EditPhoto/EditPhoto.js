import {
    Button,
    ButtonGroup,
    Chip,
    Grid,
    IconButton,
    Slider,
    Stack,
    styled,
    Typography,
    useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import {
    ArrowArcLeft,
    ArrowArcRight,
    ClockCounterClockwise,
    Crop,
    EyedropperSample,
    Faders,
    PencilSimple,
} from 'phosphor-react';
import { useState } from 'react';
import images from '~/assets/images';

const ItemNavigateEdit = styled(Box)(({ theme, active }) => ({
    border: '1px solid',
    borderColor: theme.palette.grey[300],
    backgroundColor: active ? theme.palette.grey[300] : '',

    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: 1,
    minWidth: '70px',
    minHeight: '70px',

    '&:hover': {
        borderColor: theme.palette.grey[500],
    },
}));
const ItemChipButton = styled(Chip)(({ theme, active = false }) => ({
    backgroundColor: active ? theme.palette.grey[300] : 'transparent',
    '&:hover': {
        border: '1px solid',
        borderColor: theme.palette.grey[300],
    },
}));
function valuetext(value) {
    return `${value}°C`;
}
function EditPhoto() {
    const theme = useTheme();

    const [alignment, setAlignment] = useState('left');
    const [devices, setDevices] = useState(() => ['phone']);

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    const handleDevices = (event, newDevices) => {
        if (newDevices.length) {
            setDevices(newDevices);
        }
    };
    return (
        <>
            <Grid container direction={'row'} width="100%" height="100vh">
                <Grid item xs={1} height="100%">
                    <Stack
                        direction="column"
                        spacing={2}
                        alignItems={'center'}
                        justifyContent={'center'}
                        p={'10px 10px'}
                    >
                        <Stack direction="row">
                            <IconButton>
                                <ClockCounterClockwise size={20} />
                            </IconButton>
                        </Stack>
                        {/* crop */}
                        <Stack direction="row">
                            <ItemNavigateEdit active="true">
                                <Crop size={20} weight="bold" />
                                <Typography variant="body2" fontWeight={500}>
                                    Crop
                                </Typography>
                            </ItemNavigateEdit>
                        </Stack>
                        {/* Finetune */}
                        <Stack direction="row">
                            <ItemNavigateEdit>
                                <Faders size={20} weight="bold" />
                                <Typography variant="body2" fontWeight={500}>
                                    Finetune
                                </Typography>
                            </ItemNavigateEdit>
                        </Stack>
                        {/* Fitter */}
                        <Stack direction="row">
                            <ItemNavigateEdit>
                                <EyedropperSample size={20} weight="bold" />
                                <Typography variant="body2" fontWeight={500}>
                                    Fitter
                                </Typography>
                            </ItemNavigateEdit>
                        </Stack>
                        {/* annotate */}
                        <Stack direction="row">
                            <ItemNavigateEdit>
                                <PencilSimple size={20} weight="bold" />
                                <Typography variant="body2" fontWeight={500}>
                                    annotate
                                </Typography>
                            </ItemNavigateEdit>
                        </Stack>
                        {/* crop
                        <Stack direction="row">
                            <ItemNavigateEdit>
                                <Crop size={20} weight="bold" />
                                <Typography variant="body2" fontWeight={500}>
                                    Crop
                                </Typography>
                            </ItemNavigateEdit>
                        </Stack> */}
                    </Stack>
                </Grid>
                <Grid item xs={11} height="100%" overflow="hidden">
                    <Stack
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        maxHeight="100px"
                        width="100%"
                        spacing={2}
                        p={1}
                    >
                        {/* button undo */}
                        <Stack direction="row">
                            <ButtonGroup variant="outlined" aria-label="control undo images">
                                <Button
                                    sx={{
                                        color: theme.palette.grey[500],
                                        borderColor: theme.palette.grey[400],
                                        borderRadius: 10,
                                        '&: hover': {
                                            color: theme.palette.grey[500],
                                            borderColor: theme.palette.grey[400],
                                            backgroundColor: theme.palette.grey[200],
                                        },
                                    }}
                                >
                                    <ArrowArcLeft size={20} weight="bold" />
                                </Button>
                                <Button
                                    sx={{
                                        color: theme.palette.grey[400],
                                        borderColor: theme.palette.grey[400],
                                        borderRadius: 10,
                                    }}
                                >
                                    <ArrowArcRight size={20} weight="bold" />
                                </Button>
                            </ButtonGroup>
                        </Stack>
                        {/* button edit */}
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <ItemChipButton label="Rotate left" />
                            <ItemChipButton label="Flip horizontal" />
                            <ItemChipButton label="Crop shape" />
                        </Stack>
                    </Stack>
                    {/* container */}
                    <Stack
                        direction="row"
                        maxHeight="calc(100vh - 200px)"
                        width="100%"
                        padding="0px 20px"
                        alignItems="center"
                        justifyContent="center"
                        overflow="hidden"
                    >
                        <img
                            src={images.loginBackground}
                            alt="edit images"
                            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
                        />
                    </Stack>
                    {/* navigate */}
                    <Stack
                        direction="column"
                        width="100%"
                        maxHeight="100px"
                        justifyContent="center"
                        alignItems="center"
                        position="relative"
                    >
                        <Box sx={{ width: 700 }}>
                            <Slider
                                aria-label="Small steps"
                                defaultValue={0}
                                getAriaValueText={valuetext}
                                step={10}
                                marks
                                min={-100}
                                max={100}
                                valueLabelDisplay="auto"
                                sx={{
                                    color: theme.palette.grey[500],
                                    background: 'transparent',
                                    '& .MuiSlider-thumb': {
                                        height: '30px',
                                        borderRadius: 0,
                                        width: '3px',
                                        backgroundColor: '#fff',
                                        border: '1px solid currentColor',

                                        '& .airbnb-bar': {
                                            height: 9,
                                            width: 1,
                                            backgroundColor: 'currentColor',
                                            marginLeft: 1,
                                            marginRight: 1,
                                        },
                                        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                                            boxShadow: 'inherit',
                                        },
                                        '&:before': {
                                            display: 'none',
                                        },
                                    },
                                    '& .MuiSlider-track': {
                                        height: 3,
                                    },
                                    '& .MuiSlider-rail': {
                                        color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
                                        opacity: theme.palette.mode === 'dark' ? undefined : 1,
                                        height: 3,
                                    },
                                }}
                            />
                        </Box>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <ItemChipButton label="Rotation" />
                            <ItemChipButton label="Scale" />
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}

export default EditPhoto;
