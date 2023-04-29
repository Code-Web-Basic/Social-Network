import { useEffect, useRef, useState } from 'react';

function useElementOnScreen(ref, option) {
    const [isIntersecting, setIntersecting] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            // Update our state when observer callback fires
            setIntersecting(entry.isIntersecting);
        }, option);
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            observer.unobserve(ref.current);
        };
    }, [option, ref]); // Empty array ensures that effect is only run on mount and unmount
    return isIntersecting;
}

export default useElementOnScreen;
