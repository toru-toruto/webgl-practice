import { NextPage } from 'next';
import { useState } from 'react';
import { Star } from 'react-konva';
import {
  useSpring,
  config,
  animated,
  to,
  useSpringRef,
  useChain,
  useTransition,
} from 'react-spring';
import data from '../../../src/libs/data';
import styles from '../../../src/styles/styles.module.css';

const Hoge = () => {
  const [flip, setFlip] = useState(false);

  const { o, xyz, color } = useSpring({
    reset: true,
    reverse: flip,
    config: config.molasses,
    onRest: () => setFlip(!flip),
    from: { o: 0, xyz: [0, 0, 0], color: 'red' },
    o: 1,
    xyz: [10, 20, 5],
    color: 'green',
  });

  return (
    <>
      <animated.div
        style={{
          color,
          background: o.to((o) => `rgba(210, 57, 77, ${o})`),
          transform: xyz.to((x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`),
          border: to(
            [o, color],
            (o, c) => `${(o as number) * 10}px solid ${c as string}`
          ),
          padding: o
            .to({ range: [0, 0.5, 1], output: [0, 0, 10] })
            .to((o) => `${o}%`),
          borderColor: o.to({ range: [0, 1], output: ['red', '#ffaabb'] }),
          opacity: o.to([0.1, 0.2, 0.6, 1], [1, 0.1, 0.5, 1]),
        }}
      >
        {o
          .to({ range: [0, 0.5, 1], output: [0, 0, 10] })
          .to((n) => n.toFixed(2))}
      </animated.div>
    </>
  );
};

const Fuga = () => {
  const [active, setActive] = useState(false);
  const [n, setN] = useState(0);

  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: config.molasses,
  }));

  return (
    <>
      <animated.div
        style={{
          // transform: to([style.x, style.y], (x, y) => ({
          //   range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
          //   output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
          // })).to((x, y) => `translate(${x}px, ${y}px)`),
          // color: style.x
          //   .to({ range: [0, 0.75, 1], output: [0, 0.5, 0] })
          //   .to((x) => `rgb(${x * 255}, 0, 0`),
          transform: to(
            [style.x, style.y],
            (x, y) => `translate(${x}px, ${y}px)`
          ),
        }}
        className={
          'w-full h-20 font-medium text-3xl flex justify-center grid content-center'
        }
      >
        <div
          onClick={() => {
            api({ x: 5 * n, y: 3 * n * n * n });

            setN(n + 1);
          }}
          className="select-none"
        >
          content
        </div>
      </animated.div>
    </>
  );
};

const Piyo = () => {
  const [open, set] = useState(false);

  const springApi = useSpringRef();
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: { size: '20%', background: 'hotpink' },
    to: {
      size: open ? '100%' : '20%',
      background: open ? 'white' : 'hotpink',
    },
  });

  const transApi = useSpringRef();
  const transition = useTransition(open ? data : [], {
    ref: transApi,
    trail: 400 / data.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });

  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
  useChain(open ? [springApi, transApi] : [transApi, springApi], [
    0,
    open ? 0.1 : 0.6,
  ]);

  return (
    <div className={styles.wrapper}>
      <animated.div
        style={{ ...rest, width: size, height: size }}
        className={styles.container}
        onClick={() => set((open) => !open)}
      >
        {transition((style, item) => (
          <animated.div
            className={styles.item}
            style={{ ...style, background: item.css, height: item.height }}
          />
        ))}
      </animated.div>
    </div>
  );
};

function AsyncExample() {
  const styles = useSpring({
    to: async (next, cancel) => {
      await next({ opacity: 1, color: '#ffaaee' });
      await next({ opacity: 0, color: 'rgb(14,26,19)' });
    },
    from: { opacity: 0, color: 'red' },
  });
  // ...
  return <animated.div style={styles}>I will fade in and out</animated.div>;
}

const Spring02: NextPage = () => {
  return (
    <>
      <Fuga />
      {/* <Hoge /> */}
      <Piyo />
      <AsyncExample />
    </>
  );
};

export default Spring02;
