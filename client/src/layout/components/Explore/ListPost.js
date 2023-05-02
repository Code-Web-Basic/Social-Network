import {
    Box,
    ImageList,
    ImageListItem,
    Typography,
    useTheme,
    Stack,
    IconButton,
    CircularProgress,
} from '@mui/material';
import { ChatCircle, Heart, Image, VideoCamera } from 'phosphor-react';
import { useEffect } from 'react';
import { useState } from 'react';
import * as postApi from '~/api/postApi/postApi';
import CommentPost from '../Home/Posts/CommentPost/CommentPost';
import useElementOnScreen from '~/hook/useElementOnScreen';
import { useDispatch, useSelector } from 'react-redux';
import { addNewBookmark, removeNewBookmark } from '~/features/bookmark/bookmarkSlice';

function srcset(image) {
    return {
        src: `${image}`,
        srcSet: `${image}`,
    };
}
function ListPost() {
    const [data, setData] = useState([]);
    const [containerRef, isVisible] = useElementOnScreen({ root: null, rootMargin: '10px', threshold: 1.0 });

    const [showBottomBar, setShowBottomBar] = useState(data.length === 0 ? true : false);
    const [pagingPost, setPagingPost] = useState(1);

    useEffect(() => {
        if (isVisible && showBottomBar) {
            const callApi = async () => {
                const resExplore = await postApi.getExplore({ paging: pagingPost });
                if (resExplore.length >= 15) {
                    setData((prev) => [...prev, ...resExplore]);
                    setPagingPost((prev) => prev + 1);
                } else {
                    setData((prev) => [...prev, ...resExplore]);
                    setShowBottomBar(false);
                }
            };
            callApi();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible, pagingPost, showBottomBar]);

    return (
        <>
            <ImageList sx={{ width: '100%', padding: '10px 250px' }} variant="quilted" cols={3} rowHeight={320}>
                {data.map((item, index) => {
                    if ((index + 1) % 10 === 3 || (index + 1) % 10 === 6) {
                        return <ItemListPost item={item} rows={2} key={item?._id} data={data} setData={setData} />;
                    } else {
                        return <ItemListPost item={item} rows={1} key={item?._id} data={data} setData={setData} />;
                    }
                })}
            </ImageList>
            <div style={{ width: '100%', height: '10px' }} ref={containerRef}></div>
            {showBottomBar && (
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '10px',
                    }}
                >
                    <CircularProgress color="inherit" />
                </Box>
            )}
        </>
    );
}

export default ListPost;

export const ItemListPost = ({ item, rows, data, setData }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser.data);
    const dataBookmark = useSelector((state) => state.bookmark.data);
    const [hover, setHover] = useState(false);
    const [like, setLike] = useState(item?.reaction?.includes(currentUser?._id));
    const [bookmark, setBookmark] = useState(dataBookmark.some((e) => e.postId === item?._id));
    const video = false;

    const increaseNumberLike = () => {
        const arrTmp = data;
        const index = arrTmp.findIndex((obj) => obj?._id === item._id);
        // console.log(index, arrTmp);
        if (arrTmp[index]) {
            arrTmp[index].reaction = [...arrTmp[index].reaction, currentUser?._id];
            arrTmp[index].reactionCount++;
        }
        setData(arrTmp);
        // console.log('increaseNumberLike');
    };
    const decreaseNumberLike = () => {
        const arrTmp = data;
        const index = arrTmp.findIndex((obj) => obj?._id === item._id);
        if (arrTmp[index]) {
            const dataReaction = arrTmp[index].reaction.filter((item) => item !== currentUser?._id);
            arrTmp[index].reaction = dataReaction;
            // console.log(index, arrTmp);
            if (arrTmp[index].reactionCount !== 0) {
                arrTmp[index].reactionCount--;
            }
        }
        setData(arrTmp);
        // console.log('decreaseNumberLike');
    };
    const handleLikePost = async () => {
        try {
            if (item?.reaction?.includes(currentUser?._id) & like) {
                await postApi.reactionPost({ id: item._id });
                setLike(false);
                // dispatch(decreaseNumberLike({ idPost: data.Post?._id, idUser: currentUser?._id }));
                decreaseNumberLike();
            } else {
                await postApi.reactionPost({ id: item._id });
                setLike(true);
                // dispatch(increaseNumberLike({ idPost: data.Post?._id, idUser: currentUser?._id }));
                increaseNumberLike();
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleBookmarkPost = async () => {
        if (bookmark) {
            await dispatch(removeNewBookmark({ idPost: item?._id }));
            setBookmark(false);
        } else {
            await dispatch(addNewBookmark({ idPost: item?._id }));
            setBookmark(true);
        }
    };
    return (
        <ImageListItem
            key={item.img}
            cols={1}
            rows={rows || 1}
            sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <img
                style={{ objectFit: 'cover' }}
                src={item?.source[0].data}
                alt={item?.source[0].filename}
                loading="lazy"
            />
            {video ? (
                <IconButton sx={{ position: 'absolute', top: 0, right: 0 }}>
                    <VideoCamera size={20} weight="bold" color={theme.palette.common.white} />
                </IconButton>
            ) : (
                <IconButton sx={{ position: 'absolute', top: 0, right: 0 }}>
                    <Image size={20} weight="bold" color={theme.palette.common.white} />
                </IconButton>
            )}

            {hover && (
                <Box
                    sx={{
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        background: 'rgba(0,0,0,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <CommentPost
                        data={{ User: { ...item?.User[0] }, Post: { ...item } }}
                        like={like}
                        bookmark={bookmark}
                        handleLikePost={handleLikePost}
                        handleBookmarkPost={handleBookmarkPost}
                        styles={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Stack direction="row">
                            <Stack direction="row" alignItems={'center'}>
                                <Heart size={20} weight="fill" color={theme.palette.common.white} />
                                <Typography
                                    variant="h6"
                                    fontSize={'1.2rem'}
                                    color={theme.palette.common.white}
                                    marginLeft="5px"
                                >
                                    {item?.reactionCount}
                                </Typography>
                            </Stack>
                            <Stack direction="row" alignItems={'center'} marginLeft="30px">
                                <ChatCircle size={20} weight="fill" color={theme.palette.common.white} />
                                <Typography
                                    variant="h6"
                                    fontSize={'1.2rem'}
                                    color={theme.palette.common.white}
                                    marginLeft="5px"
                                >
                                    {item?.commentCount}
                                </Typography>
                            </Stack>
                        </Stack>
                    </CommentPost>
                </Box>
            )}
        </ImageListItem>
    );
};
