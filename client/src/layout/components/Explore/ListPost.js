import { Box, ImageList, ImageListItem, Typography, useTheme, Stack, IconButton } from '@mui/material';
import { ChatCircle, Heart, Image, VideoCamera } from 'phosphor-react';
import { useEffect } from 'react';
import { useState } from 'react';
import * as postApi from '~/api/postApi/postApi';
import CommentPost from '../Home/Posts/CommentPost/CommentPost';

function srcset(image) {
    return {
        src: `${image}`,
        srcSet: `${image}`,
    };
}
function ListPost() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const callApi = async () => {
            const res = await postApi.getNewFeed({ paging: 1 });
            if (res) {
                setData([...res]);
            }
        };
        callApi();
    }, []);
    console.log(data);
    return (
        <ImageList
            sx={{ width: '100%', height: '100%', padding: '10px 250px' }}
            variant="quilted"
            cols={3}
            rowHeight={320}
        >
            {data.map((item, index) => {
                if ((index + 1) % 10 === 3 || (index + 1) % 10 === 6) {
                    return <ItemListPost item={item} rows={2} key={item?.Post?._id} />;
                } else {
                    return <ItemListPost item={item} rows={1} key={item?.Post?._id} />;
                }
            })}
        </ImageList>
    );
}

export default ListPost;

export const ItemListPost = ({ item, rows }) => {
    const theme = useTheme();
    const [hover, setHover] = useState(false);
    const video = false;
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
                src={item?.Post?.source[0].data}
                alt={item?.Post?.source[0].filename}
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
                        data={item}
                        like={false}
                        bookmark={false}
                        handleLikePost={() => { }}
                        handleBookmarkPost={() => { }}
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
                                    {item?.Post?.commentCount}
                                </Typography>
                            </Stack>
                        </Stack>
                    </CommentPost>
                </Box>
            )}
        </ImageListItem>
    );
};
