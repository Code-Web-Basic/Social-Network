import { useEffect, useRef, useState } from 'react';

function useElementOnScreen(option) {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const callbackFunction = (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    };
    const observer = useRef(new IntersectionObserver(callbackFunction, option));
    useEffect(() => {
        // const observer = new IntersectionObserver(callbackFunction, option);
        const currentBottomBar = containerRef.current;
        const currentObserver = observer.current;
        if (currentBottomBar) {
            currentObserver.observe(currentBottomBar);
        }
        return () => {
            if (currentBottomBar) {
                currentObserver.unobserve(currentBottomBar);
            }
        };
    }, [containerRef, option]);
    return [containerRef, isVisible];
}

export default useElementOnScreen;
