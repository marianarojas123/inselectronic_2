import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars, useTexture, Text3D, Center } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import styled from '@emotion/styled';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import * as THREE from 'three';
import ChatBot from './ChatBot';

const HomeContainer = styled.div`
  height: 100vh;
  background: linear-gradient(45deg, #000000, #1a1a1a);
  position: relative;
  overflow: hidden;
`;

const HeroSection = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 1;
  width: 100%;
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #00ff88, #00b8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
`;

const SocialIcons = styled.div`
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 2;
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.8rem;
  border-radius: 50%;
  backdrop-filter: blur(5px);

  &:hover {
    color: #00ff88;
    transform: translateX(-5px);
    background: rgba(0, 255, 136, 0.1);
  }
`;

function FloatingParticles() {
  const particles = useRef();
  const count = 2000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    particles.current.rotation.x = Math.sin(time / 4) / 8;
    particles.current.rotation.y = Math.sin(time / 2) / 8;
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00ff88"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
}

function TechSphere() {
  const sphereRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    sphereRef.current.rotation.x = Math.sin(time / 2) / 4;
    sphereRef.current.rotation.y = Math.sin(time / 4) / 4;
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhongMaterial
        color="#00ff88"
        wireframe
        transparent
        opacity={0.5}
        emissive="#00ff88"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function CircuitBoard() {
  const boardRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    boardRef.current.rotation.z = Math.sin(time / 4) / 8;
  });

  return (
    <group ref={boardRef}>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[4, 4, 32, 32]} />
        <meshPhongMaterial
          color="#000000"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[3.8, 3.8, 16, 16]} />
        <meshPhongMaterial
          color="#00ff88"
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ff88" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00b8ff" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <TechSphere />
      </Float>
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <CircuitBoard />
      </Float>
      
      <FloatingParticles />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}

function Home() {
  return (
    <HomeContainer>
      <Scene />
      <HeroSection>
        <Title>INSELECTRONIC</Title>
        <Subtitle>Tecnología en tus manos</Subtitle>
      </HeroSection>
      <SocialIcons>
        <SocialIcon href="#" target="_blank">
          <FaFacebook />
        </SocialIcon>
        <SocialIcon href="#" target="_blank">
          <FaTwitter />
        </SocialIcon>
        <SocialIcon href="#" target="_blank">
          <FaInstagram />
        </SocialIcon>
        <SocialIcon href="#" target="_blank">
          <FaLinkedin />
        </SocialIcon>
      </SocialIcons>
      <ChatBot />
    </HomeContainer>
  );
}

export default Home; 