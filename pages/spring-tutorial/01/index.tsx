import { Canvas } from '@react-three/fiber';
import { NextPage } from 'next';
import { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';

const Fuga = () => {
  return (
    <div>
      <div>fugaaaaa</div>
    </div>
  );
};

const FadeText = () => {
  const [flip, setFlip] = useState(false);
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: true,
    reverse: flip,
    delay: 200,
    config: config.molasses,
    onRest: () => setFlip(!flip),
  });

  return (
    <>
      <animated.h1 style={props} className={'text-[100px] font-medium'}>
        hello
      </animated.h1>
    </>
  );
};

const Star = () => {
  const [flip, setFlip] = useState(false);
  const { x } = useSpring({
    reset: true,
    reverse: flip,
    from: { x: 0 },
    x: 1,
    delay: 200,
    config: config.molasses,
    onRest: () => setFlip(!flip),
  });

  const makeCircle = () => {
    return [...Array.from(Array(156), (v, k) => k)]
      .map(
        (v) =>
          `${Math.floor(100 + 100 * Math.cos((360 * v) / 156.0))},${Math.floor(
            100 + 100 * Math.sin((360 * v) / 156.0)
          )}`
      )
      .join(' ');
  };

  return (
    <animated.svg
      style={{ margin: 20, width: 200, height: 200 }}
      viewBox="0 0 200 200"
      strokeWidth="2"
      fill="white"
      stroke="rgb(45, 55, 71)"
      strokeLinecap={'round'}
      strokeLinejoin="round"
      strokeDasharray={156}
      strokeDashoffset={x.to((x) => (1 - x) * 156)}
    >
      <polygon points={makeCircle()} />
    </animated.svg>
  );
};

const Count = () => {
  const [flip, setFlip] = useState(false);
  const { count } = useSpring({
    reset: true,
    reverse: flip,
    from: { count: 0 },
    count: 1,
    delay: 200,
    config: config.molasses,
    onRest: () => setFlip(!flip),
  });
  return <animated.div>{count.to((n) => n.toFixed(2))}</animated.div>;
};

const Scrolling = () => {
  const [flip, setFlip] = useState(false);
  const words = ['We', 'came', 'We', 'saw', 'We', 'kicked'];

  const { scroll } = useSpring({
    scroll: (words.length - 1) * 50,
    from: { scroll: 0 },
    reset: true,
    reverse: flip,
    delay: 200,
    config: config.molasses,
    onRest: () => setFlip(!flip),
  });

  return (
    <animated.div
      style={{
        position: 'relative',
        width: '100%',
        height: 60,
        overflow: 'auto',
        fontSize: '0.5em',
      }}
      scrollTop={scroll}
    >
      {words.map((word, i) => (
        <div
          key={`${word}_${i}`}
          style={{ width: '100%', height: 50, textAlign: 'center' }}
        >
          {word}
        </div>
      ))}
    </animated.div>
  );
};

const Hoge = () => {
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: config.molasses,
  });
  const AnimatedFuga = animated(Fuga);
  return (
    <>
      <animated.div style={props}>I will fade in</animated.div>
      <AnimatedFuga style={props} />
      <FadeText />
      <Star />
      <Count />
      <Scrolling />
    </>
  );
};

const Spring01: NextPage = () => {
  return (
    <>
      <Canvas>
        <mesh></mesh>
      </Canvas>
      <Hoge />
    </>
  );
};

export default Spring01;
