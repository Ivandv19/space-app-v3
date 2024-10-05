import { useState, useEffect } from 'react';

const useCarrusel = (images) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Cambia cada 5 segundos

        return () => clearInterval(interval);
    }, [images.length]);

    return { currentIndex, setCurrentIndex };
};

export default useCarrusel;