import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import images from '~/assets/images';

function MediaPost({ data = [], isImages = false }) {
    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 1,
                    maxHeight: '600px',
                    // minHeight: '550px',
                    // height: '550px',

                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {isImages ? (
                    <img
                        alt={data[0]?.filename}
                        src={`${data[0]?.data}`}
                        style={{
                            // position: 'absolute',
                            // top: 0,
                            // left: 0,
                            // bottom: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            minHeight: '150px',
                        }}
                    />
                ) : (
                    <img
                        alt={data[0]?.filename}
                        src={images.image}
                        style={{
                            // position: 'absolute',
                            // top: 0,
                            // left: 0,
                            // bottom: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            minHeight: '150px',
                        }}
                    />
                )}
            </Box>
        </>
    );
}

export default MediaPost;
MediaPost.prototype = {
    data: PropTypes.array,
    isImages: PropTypes.bool,
};
