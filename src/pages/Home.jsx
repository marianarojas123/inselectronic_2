import React, { useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import ChatBot from '../components/ChatBot';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(45deg, #000000, #1a1a1a);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: -80px;
  padding-top: 80px;

  @media (max-width: 768px) {
    margin-top: -70px;
    padding-top: 70px;
  }
`;

const HeroSection = styled.div`
  position: relative;
  text-align: center;
  color: white;
  z-index: 2;
  width: 100%;
  max-width: 900px;
  padding: ${props => props.isMobile ? '0 1.5rem' : '0 2rem'};
  margin-top: ${props => props.isMobile ? '2rem' : '3rem'};
  margin-bottom: ${props => props.isMobile ? '2rem' : '3rem'};
`;

const Title = styled.h1`
  font-size: ${props => props.isMobile ? '3.5rem' : '5rem'};
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #00ff88, #00b8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: bold;
  letter-spacing: 2px;
  text-shadow: 
    0 0 30px rgba(0, 255, 136, 0.4),
    0 0 60px rgba(0, 255, 136, 0.2),
    0 0 90px rgba(0, 255, 136, 0.1);
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 2.8rem;
    margin-bottom: 1rem;
    letter-spacing: 1px;
  }
`;

const Subtitle = styled.p`
  font-size: ${props => props.isMobile ? '1.3rem' : '1.8rem'};
  color: #ffffff;
  margin-bottom: 1rem;
  text-shadow: 
    0 0 15px rgba(255, 255, 255, 0.4),
    0 0 30px rgba(255, 255, 255, 0.2);
  line-height: 1.5;
  letter-spacing: 0.5px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }
`;

const PDFContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: ${props => props.isMobile ? '2rem 0 3rem 0' : '4rem 0 4rem 0'};
  min-height: ${props => props.isMobile ? '400px' : '600px'};
`;

const PDFAnimation = styled.div`
  position: relative;
  width: ${props => props.isMobile ? '250px' : '350px'};
  height: ${props => props.isMobile ? '350px' : '500px'};
  background: linear-gradient(45deg, #00ff88, #00b8ff);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 6s ease-in-out infinite;
  box-shadow: 
    0 20px 40px rgba(0, 255, 136, 0.3),
    0 0 100px rgba(0, 255, 136, 0.2),
    inset 0 0 50px rgba(0, 255, 136, 0.1);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    background: #000;
    border-radius: 15px;
    z-index: 1;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotateY(0deg);
    }
    25% {
      transform: translateY(-20px) rotateY(5deg);
    }
    50% {
      transform: translateY(-10px) rotateY(0deg);
    }
    75% {
      transform: translateY(-15px) rotateY(-5deg);
    }
  }

  @media (max-width: 768px) {
    width: 220px;
    height: 308px;
  }
`;

const PDFViewer = styled.iframe`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  border: none;
  border-radius: 10px;
  z-index: 2;
  background: white;
`;

const PDFIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  color: #00ff88;
  font-size: ${props => props.isMobile ? '3rem' : '4rem'};
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 0.7;
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.1);
    }
  }
`;

const PDFText = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  color: #00ff88;
  font-size: ${props => props.isMobile ? '0.8rem' : '1rem'};
  font-weight: bold;
  text-align: center;
  letter-spacing: 1px;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
  animation: glow 3s ease-in-out infinite;

  @keyframes glow {
    0%, 100% {
      text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
    }
    50% {
      text-shadow: 0 0 20px rgba(0, 255, 136, 0.8), 0 0 30px rgba(0, 255, 136, 0.6);
    }
  }
`;

const FloatingParticles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const Particle = styled.div`
  position: absolute;
  width: 2px;
  height: 2px;
  background: #00ff88;
  border-radius: 50%;
  animation: float-particle ${props => props.duration || 10}s linear infinite;
  animation-delay: ${props => props.delay || 0}s;
  opacity: 0.6;

  @keyframes float-particle {
    0% {
      transform: translateY(100vh) translateX(0);
      opacity: 0;
    }
    10% {
      opacity: 0.6;
    }
    90% {
      opacity: 0.6;
    }
    100% {
      transform: translateY(-100px) translateX(${props => props.xOffset || 0}px);
      opacity: 0;
    }
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(-10px);
    }
    60% {
      transform: translateX(-50%) translateY(-5px);
    }
  }

  @media (max-width: 768px) {
    bottom: 2rem;
  }
`;

const ScrollText = styled.span`
  font-size: 0.9rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const ScrollArrow = styled.div`
  width: 2px;
  height: 20px;
  background: linear-gradient(to bottom, #00ff88, transparent);
  border-radius: 1px;

  @media (max-width: 768px) {
    height: 15px;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(45deg, #00ff88, #00b8ff);
  color: #000;
  border: 2px solid #00ff88;
  padding: 1.2rem 3rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 30px rgba(0, 255, 136, 0.4), 0 0 20px rgba(0, 255, 136, 0.3);
  text-transform: uppercase;
  position: relative;
  margin-top: 22rem;
  z-index: 10;
  white-space: nowrap;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 255, 136, 0.6), 0 0 30px rgba(0, 255, 136, 0.4);
  }

  @media (max-width: 768px) {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    margin-top: 18rem;
  }

  @media (max-width: 480px) {
    padding: 0.9rem 2rem;
    font-size: 1rem;
    margin-top: 16rem;
  }
`;

const SocialIcons = styled.div`
  position: fixed;
  right: ${props => props.isMobile ? '1.5rem' : '3rem'};
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  z-index: 2;

  @media (max-width: 480px) {
    right: 1rem;
    gap: 1rem;
  }
`;

const SocialIcon = styled.a`
  color: white;
  font-size: ${props => props.isMobile ? '1.3rem' : '1.6rem'};
  transition: all 0.3s ease;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
  padding: ${props => props.isMobile ? '0.8rem' : '1rem'};
  border-radius: 50%;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #00ff88;
    transform: translateX(-8px) scale(1.1);
    background: rgba(0, 255, 136, 0.15);
    border-color: rgba(0, 255, 136, 0.4);
    box-shadow: 0 5px 20px rgba(0, 255, 136, 0.3);
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding: 0.7rem;
  }
`;

function Home() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCTAClick = () => {
    // Scroll to services section or navigate to services page
    window.location.href = '/services';
  };

  // Generar partículas flotantes
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 10,
    xOffset: (Math.random() - 0.5) * 200
  }));

  return (
    <HomeContainer>
      <FloatingParticles>
        {particles.map(particle => (
          <Particle
            key={particle.id}
            style={{ left: `${particle.left}%` }}
            duration={particle.duration}
            delay={particle.delay}
            xOffset={particle.xOffset}
          />
        ))}
      </FloatingParticles>
      
      <HeroSection isMobile={isMobile}>
        <Title isMobile={isMobile}>INSELECTRONIC</Title>
        <Subtitle isMobile={isMobile}>
          Tecnologia en tus Manos
        </Subtitle>
      </HeroSection>
      
      <PDFContainer isMobile={isMobile}>
        <PDFAnimation isMobile={isMobile}>
          <PDFViewer 
            src="/developers/insbot.pdf" 
            title="INSBOT PDF"
            allowFullScreen
          />
          <CTAButton isMobile={isMobile} onClick={handleCTAClick}>
            Explorar Servicios
          </CTAButton>
        </PDFAnimation>
      </PDFContainer>
      
      <SocialIcons isMobile={isMobile}>
        <SocialIcon href="https://www.facebook.com/inselectronic.insbot/" isMobile={isMobile}>
          <FaFacebook />
        </SocialIcon>
        <SocialIcon href="https://x.com/INSELECTRONIC1" isMobile={isMobile}>
          <FaTwitter />
        </SocialIcon>
        <SocialIcon href="https://www.instagram.com/inselectronic_alfayomega3/" isMobile={isMobile}>
          <FaInstagram />
        </SocialIcon>
        <SocialIcon href="https://www.linkedin.com/in/insbot-inselectronic-b0344b281/" isMobile={isMobile}>
          <FaLinkedin />
        </SocialIcon>
      </SocialIcons>

      <ScrollIndicator>
        <ScrollText>Somos viajeros del tiempo</ScrollText>
        <ScrollArrow />
      </ScrollIndicator>
      
      <ChatBot />
    </HomeContainer>
  );
}

export default Home; 