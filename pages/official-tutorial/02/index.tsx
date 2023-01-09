import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { NextPage } from 'next';
import { TextureLoader } from 'three';

const Hoge = () => {
  const colorMap = useLoader(TextureLoader, '/PavingStones092_1K_Color.jpg');
  
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight />
      <PerspectiveCamera />
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>
    </>
  );
};

const Tutorial02: NextPage = () => {
  return (
    <Canvas>
      <Hoge />;
    </Canvas>
  );
};

export default Tutorial02;
