import PropTypes from 'prop-types';
//mui ui
import { Avatar, Button, IconButton, Stack, Typography, useTheme } from '@mui/material';
// components
import TippyHeadless from '@tippyjs/react/headless';
import MenuUserFollowing from '../Posts/MenuUserFollowing/MenuUserFollowing';
import { X } from 'phosphor-react';

function SuggestionsUserItem({ data = [], typeLayout = 'row' }) {
    const theme = useTheme();

    const clickCloseItem = () => {
        return;
    };
    return typeLayout === 'row' ? (
        <Stack direction="row" alignItems="center" justifyContent="space-between" p={1}>
            <TippyHeadless
                interactive
                placement="bottom-start"
                render={(attrs) => (
                    <div className="box" tabIndex="-1" {...attrs}>
                        <MenuUserFollowing />
                    </div>
                )}
            >
                <Stack direction="row" spacing={2}>
                    <Avatar src="" alt="user" />
                    <Stack direction="column">
                        <Typography variant="body2" fontWeight={600} color={theme.palette.text.primary}>
                            chithanhduongngoc
                        </Typography>
                        <Typography variant="body2" fontWeight={400} color={theme.palette.text.secondary}>
                            Suggested for you
                        </Typography>
                    </Stack>
                </Stack>
            </TippyHeadless>

            <Stack direction="row">
                <Button variant="text" sx={{ fontSize: '0.6rem', fontWeight: 600 }}>
                    Following
                </Button>
                {/* {data?.following ? (
                    <Button variant="text">Following</Button>
                ) : (
                    <Button variant="text" color={theme.palette.text.secondary}>
                        unFollowing
                    </Button>
                )} */}
            </Stack>
        </Stack>
    ) : (
        <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            p={1.5}
            sx={{ border: '1px solid', borderColor: theme.palette.grey[300] }}
            spacing={2}
            position="relative"
            maxWidth={180}
        >
            <IconButton sx={{ position: 'absolute', top: '0px', right: '0px' }} onClick={clickCloseItem}>
                <X size={15} />
            </IconButton>
            <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" width="100%">
                {/* <TippyHeadless
                    interactive
                    placement="bottom-start"
                    render={(attrs) => (
                        <div className="box" tabIndex="-1" {...attrs}>
                            <MenuUserFollowing />
                        </div>
                    )}
                > */}
                <Avatar src="" alt="user" />
                {/* </TippyHeadless> */}
                <Stack direction="column" width="100%" justifyContent="center" alignItems="center">
                    <Typography
                        variant="body2"
                        fontWeight={600}
                        color={theme.palette.text.primary}
                        noWrap
                        textOverflow={'ellipsis'}
                    >
                        chithanhduongngoc
                    </Typography>
                    <Typography
                        variant="body2"
                        fontWeight={400}
                        color={theme.palette.text.secondary}
                        noWrap
                        textOverflow={'ellipsis'}
                    >
                        Suggested for you
                    </Typography>
                </Stack>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center">
                <Button
                    variant="contained"
                    sx={{
                        width: '100%',
                        fontSize: '0.7rem',
                        background: theme.palette.primary.light,
                        boxShadow: 'none',
                        borderRadius: '10px',
                        '&:hover': {
                            background: theme.palette.primary.dark,
                            boxShadow: 'none',
                        },
                        '&:active': {
                            background: theme.palette.primary.dark,
                            boxShadow: 'none',
                        },
                    }}
                >
                    Following
                </Button>
            </Stack>
        </Stack>
    );
}

export default SuggestionsUserItem;

SuggestionsUserItem.prototype = {
    data: PropTypes.array,
    typeLayout: PropTypes.string,
};
