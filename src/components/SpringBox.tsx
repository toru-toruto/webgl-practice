import { useState } from 'react';
import { useSpring } from '@react-spring/core';
import { a } from '@react-spring/three';
import styled from '@emotion/styled';

const SpringBox = () => {
  const [active, setActive] = useState(0);
  const { spring } = useSpring({
    spring: active,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

  const scale = spring.to([0, 1], [1, 5]);
  const rotation = spring.to([0, 1], [1, 5]);
  const color = spring.to([0, 1], ['#6246ea', '#e45858']);
  const StyledContainer = a.meshStandardMaterial as any;

  return (
    <a.mesh
      rotation-y={rotation}
      scale-x={scale}
      scale-z={scale}
      onClick={() => setActive(Number(!active))}
    >
      <boxBufferGeometry attach={'geometry'} args={[1, 1, 1]} />
      <StyledContainer roughness={0.5} attach="material" color={color} />
    </a.mesh>
  );
};
export default SpringBox;
