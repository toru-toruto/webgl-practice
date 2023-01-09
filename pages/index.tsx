import type { NextPage } from 'next';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Box from '../src/components/Box';
import SpringBox from '../src/components/SpringBox';

const Home: NextPage = () => {
  return (
    <div className="w-full h-[100vh]">
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
          <SpringBox />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Home;
