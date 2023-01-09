import {
  OrbitControls,
  PerspectiveCamera,
  useTexture,
} from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { NextPage } from 'next';
import { Suspense } from 'react';
import { TextureLoader } from 'three';

const TextureScene = () => {
  const props = useTexture({
    map: '/paving-stones/color.jpg',
    displacementMap: '/paving-stones/displacement.jpg',
    normalMap: '/paving-stones/normalDX.jpg',
    roughnessMap: '/paving-stones/roughness.jpg',
    aoMap: '/paving-stones/ao.jpg',
  });
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight />
      <PerspectiveCamera />
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <mesh>
        <sphereGeometry args={[1, 100, 100]} />
        <meshStandardMaterial displacementScale={0.2} {...props} />
      </mesh>
    </>
  );
};

const Tutorial03: NextPage = () => {
  return (
    <div className="w-full h-[100vh]">
      <Canvas>
        <Suspense>
          <TextureScene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Tutorial03;
