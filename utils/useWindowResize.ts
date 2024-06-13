import { useEffect, useState } from 'react';

const useWindowResize = () => {
    
    const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Initial window size on component mount
        handleResize();

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowSize;
};

export default useWindowResize;
