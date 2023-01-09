import { Canvas, ThreeElements, useFrame } from '@react-three/fiber';
import { NextPage } from 'next';
import { useRef, useState } from 'react';
import * as THREE from 'three';

type BoxProps = {
  position: [number, number, number];
};

const Box = (props: BoxProps) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
    }
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      {/* <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} /> */}
    </mesh>
  );
};

const OfficialTutorial: NextPage = () => {
  return (
    <>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </>
  );
};

export default OfficialTutorial;
