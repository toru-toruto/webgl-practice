import { PerspectiveCamera } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { NextPage } from 'next';
import { Suspense, useEffect } from 'react';
import THREE, { Vector3 } from 'three';

const ParticleScroll: NextPage = () => {
  // const { mouse, camera } = useThree();

  const cameraParam = {
    fov: 45,
    near: 0.1,
    far: 100,
    // lookAt: new THREE.Vector3(0, 0, 0),
    x: 0,
    y: 0.5,
    z: 4,
  };
  useEffect(() => {
    // camera.lookAt(new THREE.Vector3(0, 0, 0));
    // camera.far = 100;
  }, []);

  return (
    <div className="w-full h-full">
      <Suspense fallback={<span>loading...</span>}>
        <Canvas>
          <ambientLight />
          <PerspectiveCamera {...cameraParam} />
        </Canvas>
      </Suspense>
    </div>
  );
};
export default ParticleScroll;
