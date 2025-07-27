import React from 'react';
import styled from '@emotion/styled';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { FaPalette, FaCode, FaShieldAlt, FaShareAlt, FaShoppingCart, FaTruck, FaWifi } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ServicesContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #000000;
  color: #ffffff;
  padding: 1rem 2rem 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem 1.5rem;
  }
`;

const BackgroundCanvas = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  background-color: #000000;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 255, 136, 0.3);
  border: 1px solid rgba(0, 255, 136, 0.2);
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #00ff88, #00ccff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #ffffff;
  text-align: center;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ServiceCard = styled(Link)`
  background: rgba(0, 0, 0, 0.9);
  border-radius: 15px;
  padding: 2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 255, 136, 0.3);
  text-decoration: none;
  color: #ffffff;
  box-shadow: 0 4px 16px rgba(0, 255, 136, 0.2);

  &:hover {
    transform: translateY(-10px);
    background: rgba(0, 0, 0, 1);
    border-color: rgba(0, 255, 136, 0.5);
    box-shadow: 0 8px 32px rgba(0, 255, 136, 0.3);
    color: #ffffff;
  }
`;

const ServiceIcon = styled.div`
  font-size: 3rem;
  color: #00ff88;
  margin-bottom: 1rem;
  text-shadow: 0 0 15px rgba(0, 255, 136, 0.5);
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #00ff88;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.4);
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #ffffff;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
`;

function Scene() {
  return (
    <Canvas>
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

const services = [
  {
    icon: <FaPalette />,
    title: 'Diseño',
    description: 'Creamos diseños unicos y perzonalizados que reflejan la identidad de tu marca.',
    path: '/services/design'
  },
  {
    icon: <FaCode />,
    title: 'Programación',
    description: 'Desarrollamos, programamos y creamos soluciones tecnologicas para tu negocio.',
    path: '/services/programming'
  },
  {
    icon: <FaShieldAlt />,
    title: 'Seguridad',
    description: 'Protegemos tu información y sistemas con las últimas tecnologías en seguridad.',
    path: '/services/security'
  },
  {
    icon: <FaShareAlt />,
    title: 'Redes Sociales',
    description: 'Gestionamos tu presencia en redes sociales para maximizar tu alcance.',
    path: '/services/social'
  },
  {
    icon: <FaShoppingCart />,
    title: 'Productos',
    description: 'Ofrecemos una amplia gama de productos tecnológicos de alta calidad al mayor y detal.',
    path: '/services/products'
  },
  {
    icon: <FaTruck />,
    title: 'Envíos de Divisas',
    description: 'Rapidos, Seguros y Confiables para los envios de divisas a nivel internacional.',
    path: '/services/shipping'
  },
  {
    icon: <FaWifi />,
    title: 'Zona WiFi',
    description: 'Acceso a internet de alta velocidad en nuestras instalaciones y atraves de nuestra App.',
    path: '/wifi'
  }
];

function Services() {
  return (
    <ServicesContainer>
      <BackgroundCanvas>
        <Scene />
      </BackgroundCanvas>
      <ContentWrapper>
        <Title>Nuestros Servicios</Title>
        <Description>
          Ofrecemos soluciones tecnológicas integrales para impulsar tu negocio al siguiente nivel.
          Nuestro equipo de expertos está listo para ayudarte a alcanzar tus objetivos.
        </Description>
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard key={index} to={service.path}>
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </ContentWrapper>
    </ServicesContainer>
  );
}

export default Services; 