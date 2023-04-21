import { Box, ImageList, ImageListItem, Typography, useTheme, Stack, IconButton } from '@mui/material';
import { ChatCircle, Heart, Image, VideoCamera } from 'phosphor-react';
import { useState } from 'react';

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
    };
}
function ListPost() {
    const theme = useTheme();
    return (
        <ImageList
            sx={{ width: '100%', height: '100%', padding: '10px 200px' }}
            variant="quilted"
            cols={3}
            rowHeight={320}
        >
            {itemData.map((item, index) => {
                if ((index + 1) % 10 === 3 || (index + 1) % 10 === 6) {
                    return <ItemListPost item={item} rows={2} key={item.img} />;
                } else {
                    return <ItemListPost item={item} rows={1} key={item.img} />;
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
            <img style={{ objectFit: 'cover' }} {...srcset(item.img, 121, rows, 1)} alt={item.title} loading="lazy" />
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
                    <Stack direction="row">
                        <Stack direction="row" alignItems={'center'}>
                            <Heart size={20} weight="fill" color={theme.palette.common.white} />
                            <Typography
                                variant="h6"
                                fontSize={'1.2rem'}
                                color={theme.palette.common.white}
                                marginLeft="5px"
                            >
                                1234
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
                                1234
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>
            )}
        </ImageListItem>
    );
};

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        author: '@arwinneil',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star 1',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike 2',
    },
];
