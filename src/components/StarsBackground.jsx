import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import styled from '@emotion/styled';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  min-height: 100vh;
`;

function StarsScene() {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1}
        color="#00ff88"
      />
    </Canvas>
  );
}

function StarsBackground({ children }) {
  return (
    <>
      <BackgroundContainer>
        <StarsScene />
      </BackgroundContainer>
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </>
  );
}

export default StarsBackground; 