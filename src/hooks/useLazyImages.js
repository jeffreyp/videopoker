import { useState, useEffect, useRef } from 'react';

export const useLazyImages = () => {
    const [loadedImages, setLoadedImages] = useState(new Set());
    const observerRef = useRef(null);

    useEffect(() => {
        // Create intersection observer for lazy loading
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.dataset.src;
                        if (src) {
                            img.src = src;
                            setLoadedImages(prev => new Set([...prev, src]));
                            observerRef.current?.unobserve(img);
                        }
                    }
                });
            },
            {
                rootMargin: '50px', // Start loading 50px before the image enters viewport
                threshold: 0.1
            }
        );

        return () => {
            observerRef.current?.disconnect();
        };
    }, []); // Remove loadedImages from dependencies to avoid infinite re-renders

    const observeImage = (img) => {
        if (img && observerRef.current) {
            observerRef.current.observe(img);
        }
    };

    return { observeImage, loadedImages };
};