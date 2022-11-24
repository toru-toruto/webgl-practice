import { Canvas } from '@react-three/fiber';
import { NextPage } from 'next';
import {
  UIEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
  WheelEventHandler,
} from 'react';

const ScrollPage: NextPage = () => {
  const [isDisplay, setIsDisplay] = useState(false);
  const isRunning = useRef(false);
  const [speed, setSpeed] = useState(0);
  const [position, setPosition] = useState(0);
  const block = useRef<HTMLDivElement>(null);

  const isScrollToggle = useCallback((e: WheelEvent) => {
    if (isRunning.current) return;
    isRunning.current = true;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const newSpeed = speed + e.deltaY * 0.0003;
    setSpeed(newSpeed);
    console.log('newSpeed:' + newSpeed);
    requestAnimationFrame(() => {
      isRunning.current = false;
      if (!block.current) return;

      console.log('hoge');
      // setIsDisplay(scrollTop > 100);
      let newPosition = position + speed;
      setSpeed(speed * 0.99);
      const rounded = Math.round(newPosition);
      const diff = rounded - newPosition;
      newPosition += diff * 0.015;
      setPosition(newPosition);
      console.log(newPosition);
      block.current.style.transform = `translate(0,${newPosition * 100}px)`;
    });
  }, []);

  useEffect(() => {
    document.addEventListener('wheel', isScrollToggle, {
      passive: true,
    });
    return () => {
      document.removeEventListener('wheel', isScrollToggle);
    };
  }, []);

  const onClickClose = () => {
    document.removeEventListener('scroll', isScrollToggle);
    setIsDisplay(false);
  };

  return (
    <div>
      {/* <Canvas orthographic></Canvas> */}
      <div className={'w-full h-[200vh] bg-green-100'}>
        <div ref={block} className={'w-20 h-20 bg-red-100'}></div>
      </div>
    </div>
  );
};

export default ScrollPage;
