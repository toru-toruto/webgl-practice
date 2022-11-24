import type { NextPage } from 'next';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Box from '../src/components/Box';

const Home: NextPage = () => {
  return (
    <div>
      <Suspense fallback={<span>loading...</span>}>
        <Canvas>
          <ambientLight />
          <PerspectiveCamera />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          />
          <Box position={[-1.2, 0, 0]} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Home;
