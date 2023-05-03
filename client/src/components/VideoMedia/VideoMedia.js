import { Box, IconButton, useTheme } from '@mui/material';
import { Play, SpeakerHigh, SpeakerSimpleNone, SpeakerSlash } from 'phosphor-react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';

function VideoMedia({ autoPlay = true, muted = true, controls = false, style, src, type }) {
    const theme = useTheme();
    const videoRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isAwaiting, setIsAwaiting] = useState(false);
    const [isMute, setIsMute] = useState(false);
    useEffect(() => {
        if (!videoRef.current) return;
        const onPlay = () => {
            if (isAwaiting) setIsPlaying(false);
            setIsPlaying(true);
        };
        const onPause = () => {
            if (isAwaiting) setIsPlaying(false);
            setIsPlaying(false);
        };
        const onWaiting = () => {
            if (isPlaying) setIsPlaying(true);
            setIsAwaiting(true);
        };
        const onMute = () => {
            setIsMute(true);
        };
        const onUnMute = () => {
            setIsMute(false);
        };
        const element = videoRef.current;
        element.addEventListener('play', onPlay);
        element.addEventListener('playing', onPlay);
        element.addEventListener('pause', onPause);
        element.addEventListener('waiting', onWaiting);

        return () => {
            element.removeEventListener('play', onPlay);
            element.removeEventListener('playing', onPlay);
            element.removeEventListener('pause', onPause);
            element.removeEventListener('waiting', onWaiting);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAwaiting]);

    const handlePlayPauseClick = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
    };
    const handleMuteClick = () => {
        if (!videoRef.current) return;
        if (videoRef.current.muted) {
            videoRef.current.muted = false;
            setIsMute(true);
        } else {
            videoRef.current.muted = true;
            setIsMute(false);
        }
    };
    return (
        <Box sx={{ ...style, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <video
                playsInline
                autoPlay={autoPlay}
                muted={muted}
                style={{ objectFit: 'cover', maxHeight: '100%', width: '100%' }}
                controls={controls}
                ref={videoRef}
                onClick={handlePlayPauseClick}
            >
                <source src={src} type={type} />
            </video>
            <IconButton sx={{ position: 'absolute' }} onClick={handlePlayPauseClick}>
                {!isPlaying && <Play size={20} weight="fill" color={theme.palette.common.white} />}
            </IconButton>
            <IconButton sx={{ position: 'absolute', bottom: 20, right: 5 }} onClick={handleMuteClick}>
                {isMute ? (
                    <SpeakerHigh size={20} color={theme.palette.common.white} weight="bold" />
                ) : (
                    <SpeakerSlash color={theme.palette.common.white} size={20} weight="bold" />
                )}
            </IconButton>
        </Box>
    );
}

export default VideoMedia;
