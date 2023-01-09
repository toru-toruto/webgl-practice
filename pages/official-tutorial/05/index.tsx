import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { NextPage } from 'next';

const Muni = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight />
      <PerspectiveCamera />
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial />
      </mesh>
    </>
  );
};

const Tutorial05: NextPage = () => {
  return (
    <>
      <div>
        <Canvas>
          <Muni />
        </Canvas>
      </div>
    </>
  );
};

export default Tutorial05;
