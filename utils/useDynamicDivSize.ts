import { useEffect, useState, RefObject } from 'react';

interface Size {
  width: number;
  height: number;
}

const useDynamicDivSize = (ref: RefObject<HTMLElement>): Size => {
    
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  const handleResize = () => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      setSize({ width, height });
    }
  };

  useEffect(() => {
    handleResize(); // Initial size on component mount
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref, window.innerWidth, window.innerHeight]); // Include window size in the dependency array

  return size;
};

export default useDynamicDivSize;
