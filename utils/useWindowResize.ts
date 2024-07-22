"use client"
import { useEffect, useState } from 'react';

export enum Viewport {
    MOBILE = 'MOBILE',
    TABLET = 'TABLET',
    SMALL_DESKTOP = 'SMALL_DESKTOP',
    LARGE_DESKTOP = 'LARGE_DESKTOP',
    EXTRA_LARGE_DESKTOP = 'EXTRA_LARGE_DESTOP'
}

const useWindowResize = () => {

    const isClient = typeof window === 'object'; // Check if window object is available

    const [windowSize, setWindowSize] = useState<{ width: number; height: number }>(() => ({
        width: isClient ? window.innerWidth : 0,
        height: isClient ? window.innerHeight : 0,
    }));

    const [viewport, setViewport] = useState<Viewport>(); // State to hold the viewport size classification
    if (typeof window === 'object') {
        useEffect(() => {
            if (!isClient) {
                return; // If running on server, do nothing
            }
            setViewport(classifyViewportSize(window.innerWidth));

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
        }, [window?.innerWidth, window?.innerHeight]);
    }


    const classifyViewportSize = (width: number): Viewport => {
        if (width < 640) {
            return Viewport.MOBILE;
        } else if (width >= 640 && width < 1024) {
            return Viewport.TABLET;
        } else if (width >= 1024 && width < 1440) {
            return Viewport.SMALL_DESKTOP;
        } else if (width >= 1440 && width < 1920) {
            return Viewport.LARGE_DESKTOP;
        } else {
            return Viewport.EXTRA_LARGE_DESKTOP;
        }
    };

    return { windowSize, viewport };
};

export default useWindowResize;
