import { Avatar, Box, Button, Checkbox, Chip, Modal, Stack, Typography, useTheme } from '@mui/material';
import { X, XCircle } from 'phosphor-react';
import { useEffect, useState } from 'react';
import useDebounce from '~/hook/useDebounce';
import * as userApi from '~/api/userApi/userApi';
import PropTypes from 'prop-types';
import * as messageApi from '~/api/messageApi/messageApi';
// style
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    background: 'rgb(255, 255, 255)',
    p: 1,
    borderRadius: '10px',
};
// render item share
export const SharePostListItem = ({ data = [], userChecks, setUserChecks, clearDataSearch }) => {
    const theme = useTheme();
    // click check box
    const handleChange = (e) => {
        const { value, checked } = e.target;
        clearDataSearch();
        if (checked) {
            // push selected value in list
            setUserChecks((prev) => [...prev, data[value]]);
        } else {
            // remove unchecked value from the list
            setUserChecks((prev) => prev.filter((x) => x._id !== data[value]._id));
        }
    };
    // check user
    const isCheckUserExist = (id) => {
        if (userChecks.some((i) => i._id === id)) {
            return true;
        } else {
            return false;
        }
    };
    return data?.map((e, index) => {
        return (
            <Stack
                key={e._id}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                p={1}
                sx={{
                    '&:hover': {
                        background: theme.palette.grey[200],
                    },
                }}
            >
                <Stack direction="row" spacing={2}>
                    <Avatar src="" alt="user" />
                    <Stack direction="column">
                        <Typography variant="body2" fontWeight={600} color={theme.palette.text.primary}>
                            {e.userName}
                        </Typography>
                        <Typography variant="body2" fontWeight={400} color={theme.palette.text.secondary}>
                            {e.Name}
                        </Typography>
                    </Stack>
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="center">
                    <Checkbox checked={isCheckUserExist(e._id)} value={index} onChange={handleChange} />
                </Stack>
            </Stack>
        );
    });
};
SharePostListItem.prototype = {
    data: PropTypes.array,
    userChecks: PropTypes.array,
    setUserChecks: PropTypes.func,
    clearDataSearch: PropTypes.func,
};
// share
function SharePost({ children, idPost }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // data
    const [dataResult, setDataResult] = useState([]);
    const [dataSuggestion, setDataSuggestion] = useState([]);
    const [valueInput, setValueInput] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const [valueInputMessage, setValueInputMessage] = useState('');

    const valueDebounce = useDebounce(valueInput, 500);
    // search user
    useEffect(() => {
        if (valueDebounce) {
            setIsSearching(true);
            const callApi = async () => {
                const res = await userApi.searchUser(valueDebounce);
                setDataResult(res);
                setIsSearching(false);
            };
            callApi();
        } else {
            setDataResult([]);
            setIsSearching(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueDebounce]);
    // call api suggestion
    useEffect(() => {
        if (open) {
            const callApi = async () => {
                const res = await userApi.suggestionUser();
                setDataSuggestion(res);
                setIsSearching(false);
            };
            callApi();
        }
    }, [open]);

    // clear data search
    const clearDataSearch = () => {
        setValueInput('');
        setDataResult([]);
    };
    const handleClearData = () => {
        setValueInput('');
        setValueInputMessage('');
        setUserChecks([]);
        handleClose();
    };
    // check item
    const [userChecks, setUserChecks] = useState([]);

    // render item check
    const renderChipItemUser = () => {
        const handleDeleteCheckUser = (id) => {
            if (id) {
                setUserChecks((prev) => prev.filter((i) => i._id !== id));
            }
        };
        return userChecks.map((i) => {
            return (
                <Chip
                    key={i._id}
                    itemID="1"
                    color="primary"
                    size="small"
                    deleteIcon={<XCircle size={20} weight="bold" />}
                    onDelete={() => handleDeleteCheckUser(i?._id)}
                    label={i.userName}
                    sx={{ margin: '0px 10px' }}
                />
            );
        });
    };
    //

    const handleSharePost = () => {
        try {
            userChecks.forEach((i) => {
                const data = {
                    targetId: i._id,
                    message: idPost,
                    isReply: false,
                };
                const callApi = async () => {
                    const res = await messageApi.postSendMessage(data);
                    if (valueInputMessage) {
                        const res1 = await messageApi.postSendMessage({
                            targetId: i._id,
                            message: valueInputMessage,
                            isReply: false,
                        });
                    }
                    console.log(res);
                };
                callApi();
            });
            handleClearData();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div onClick={handleOpen}>{children}</div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-share-post"
                aria-describedby="modal-modal-share-post-home"
            >
                <Box sx={style} minWidth="500px" maxheight="600px" maxWidth={'calc(100% - 500px)'} overflow="hidden">
                    <Stack direction="column">
                        <Stack
                            direction="row"
                            width="100%"
                            alignItems="center"
                            justifyContent={'center'}
                            p={1}
                            position="relative"
                            sx={{
                                borderBottom: '1px solid',
                                borderColor: theme.palette.grey[300],
                            }}
                        >
                            <Typography variant="body1 " fontWeight={5600} fontSize="0.8rem">
                                Share
                            </Typography>
                            <Box sx={{ position: 'absolute', right: '10px' }} onClick={handleClose}>
                                <X size={20} />
                            </Box>
                        </Stack>
                        <Stack
                            direction="row"
                            spacing={2}
                            p={1}
                            sx={{
                                borderBottom: '1px solid',
                                borderColor: theme.palette.grey[300],
                                width: '100%',
                                alignItems: 'center',
                            }}
                        >
                            <Typography variant="body2" fontWeight="600" fontSize="0.8rem">
                                To:
                            </Typography>
                            <Stack direction={'row'} width={'100%'} flexWrap={'wrap'} alignItems={'center'}>
                                {renderChipItemUser()}
                                <input
                                    style={{ width: '200px', margin: '5px 10px' }}
                                    placeholder="Search"
                                    value={valueInput}
                                    onChange={(e) => setValueInput(e.target.value)}
                                ></input>
                            </Stack>
                        </Stack>
                        <Stack direction="column" width="100%" p="10px 0px">
                            <Stack direction="row" p={0.5}>
                                <Typography variant="body2" fontWeight={600}>
                                    {dataResult.length > 0 ? 'Search' : 'Suggested'}
                                </Typography>
                            </Stack>
                            <SharePostListItem
                                data={dataResult.length > 0 ? dataResult : dataSuggestion}
                                userChecks={userChecks}
                                setUserChecks={setUserChecks}
                                clearDataSearch={clearDataSearch}
                            />
                            {isSearching && (
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    p={1}
                                    sx={{
                                        '&:hover': {
                                            background: theme.palette.grey[200],
                                        },
                                    }}
                                >
                                    <Stack direction="row" spacing={2}>
                                        <Avatar src="" alt="user" />
                                        <Stack direction="column">
                                            <Typography
                                                variant="body2"
                                                fontWeight={600}
                                                color={theme.palette.text.primary}
                                            ></Typography>
                                            <Typography
                                                variant="body2"
                                                fontWeight={400}
                                                color={theme.palette.text.secondary}
                                            ></Typography>
                                        </Stack>
                                    </Stack>

                                    <Stack direction="row" alignItems="center" justifyContent="center">
                                        <Checkbox />
                                    </Stack>
                                </Stack>
                            )}
                        </Stack>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            p={1}
                            sx={{
                                borderTop: '1px solid',
                                borderColor: theme.palette.grey[300],
                            }}
                        >
                            {userChecks.length > 0 && (
                                <Box
                                    sx={{
                                        padding: '5px',
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'start',
                                        margin: '5px 0px',
                                    }}
                                >
                                    <input
                                        placeholder="Write a message"
                                        value={valueInputMessage}
                                        onChange={(e) => setValueInputMessage(e.target.value)}
                                    ></input>
                                </Box>
                            )}
                            <Button
                                variant="contained"
                                sx={{
                                    width: '100%',
                                    fontSize: '0.7re m',
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
                                onClick={handleSharePost}
                            >
                                Message
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}

export default SharePost;
