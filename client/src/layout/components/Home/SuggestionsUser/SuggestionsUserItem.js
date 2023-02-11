import PropTypes from 'prop-types';
//mui ui
import { Avatar, Button, Stack, Typography, useTheme } from '@mui/material';
// components
import TippyHeadless from '@tippyjs/react/headless';
import MenuUserFollowing from '../Posts/MenuUserFollowing/MenuUserFollowing';

function SuggestionsUserItem({ data = [], typeLayout = 'row' }) {
    const theme = useTheme();

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
        <Stack direction="column" alignItems="center" justifyContent="center" p={1}>
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
            </TippyHeadless>

            <Stack direction="row">
                <Button variant="text" sx={{ fontSize: '0.6rem', fontWeight: 600 }}>
                    Following
                </Button>
            </Stack>
        </Stack>
    );
}

export default SuggestionsUserItem;

SuggestionsUserItem.prototype = {
    data: PropTypes.array,
};
