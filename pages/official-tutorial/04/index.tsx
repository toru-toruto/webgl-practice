import { animated, config, useSpring } from '@react-spring/three';
import { Canvas, useFrame } from '@react-three/fiber';
import { NextPage } from 'next';
import { useRef, useState } from 'react';
import { Mesh } from 'three';

const AnimationTutorial = () => {
  const myMesh = useRef<Mesh>(null);
  const [active, setActive] = useState(false);
  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: config.wobbly,
  });
  const { positionX } = useSpring({
    positionX: active ? 1 : -1,
    config: config.wobbly,
  });

  useFrame(({ clock }) => {
    // console.log('hey frame' + clock.getElapsedTime());
    // clock.
    if (!myMesh.current) return;
    myMesh.current.rotation.x = Math.sin(clock.getElapsedTime());
  });

  return (
    <animated.mesh
      scale={scale}
      onClick={() => setActive(!active)}
      ref={myMesh}
      position-x={positionX}
    >
      <boxGeometry />
      <meshBasicMaterial color={'royalblue'} />
    </animated.mesh>
  );
};

const Tutorial04: NextPage = () => {
  return (
    <>
      <div className="w-full h-[100vh]">
        <Canvas>
          <AnimationTutorial />
        </Canvas>
      </div>
    </>
  );
};
export default Tutorial04;
