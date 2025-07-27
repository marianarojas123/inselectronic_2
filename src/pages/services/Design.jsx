import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FaDesktop, FaMobile, FaPaintBrush, FaPlay, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DesignContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  color: white;
  padding: 1.5rem 2rem 2rem;

  @media (max-width: 768px) {
    padding: 1rem 1rem 1.5rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #00ff88;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
`;

const Description = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 4rem;
  line-height: 1.6;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

// Sección de Video
const VideoSection = styled.div`
  margin: 4rem 0;
  text-align: center;
`;

const VideoContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
`;

const Video = styled.video`
  width: 100%;
  height: auto;
  border-radius: 15px;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;

const PlayButton = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(0, 255, 136, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #00ff88;
`;

// Servicios Grid
const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ServiceCard = styled(Link)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-decoration: none;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(0, 255, 136, 0.5);
    box-shadow: 0 20px 40px rgba(0, 255, 136, 0.2);
  }
`;

const ServiceIcon = styled.div`
  font-size: 4rem;
  color: #00ff88;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
`;

const ServiceTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #00ff88;
`;

const ServiceDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #ccc;
  margin-bottom: 2rem;
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  text-align: left;
  width: 100%;
`;

const FeatureItem = styled.li`
  padding: 0.5rem 0;
  color: #ccc;
  font-size: 0.9rem;
  position: relative;
  padding-left: 1.5rem;

  &:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #00ff88;
    font-weight: bold;
  }
`;

const ViewMoreButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #00ff88;
  font-weight: bold;
  font-size: 1.1rem;
  transition: gap 0.3s ease;
`;

const designServices = [
  {
    icon: <FaDesktop />,
    title: "Diseño Gráfico",
    description: "Creamos diseños para imprimir letreros, vinil, diseños para redes sociales modernos y responsivos que cautivan y reflejan la identidad de tu marca.",
    features: [
      "Identidad visual y branding",
      "Diseño para impresión",
      "Material promocional",
      "Diseño digital y web",
      "Packaging y empaques"
    ],
    path: "/services/design-grafico"
  },
  {
    icon: <FaMobile />,
    title: "Diseños Personalizados",
    description: "Diseñamos tus fiestas y cualquier tipo de eventos con tu marca empresarial o motivos infantiles que amaras.",
    features: [
      "Fiestas infantiles temáticas",
      "Bodas y eventos especiales",
      "Eventos corporativos",
      "Decoración personalizada",
      "Invitaciones únicas"
    ],
    path: "/services/disenos-personalizados"
  },
  {
    icon: <FaPaintBrush />,
    title: "Diseño de Interiores",
    description: "Desarrollamos la identidad visual completa de tu casa, estructuras, cocinas y mucho más.",
    features: [
      "Diseño residencial",
      "Espacios comerciales",
      "Mobiliario personalizado",
      "Planos y renders 3D",
      "Selección de materiales"
    ],
    path: "/services/diseno-interiores"
  }
];

function Design() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleVideoClick = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  return (
    <DesignContainer>
      <ContentWrapper>
        <Title>Servicios de Diseño</Title>
        <Description>
          Transformamos tus ideas en diseños impactantes que conectan con tu audiencia.
          Nuestro equipo de diseñadores combina creatividad y estrategia para crear
          soluciones visuales que destacan en el mercado digital. Creemos tus ideas y nos encargamos de materializarlas también.
        </Description>

        {/* Sección de Video */}
        <VideoSection>
          <SectionTitle>Nuestro Proceso Creativo</SectionTitle>
          <VideoContainer>
            <Video 
              src="/videos/video_1.mp4" 
              controls={isVideoPlaying}
              autoPlay={isVideoPlaying}
              muted
            />
            {!isVideoPlaying && (
              <VideoOverlay onClick={handleVideoClick}>
                <PlayButton>
                  <FaPlay />
                </PlayButton>
              </VideoOverlay>
            )}
          </VideoContainer>
        </VideoSection>

        {/* Servicios */}
        <SectionTitle>Nuestros Servicios de Diseño</SectionTitle>
        <ServicesGrid>
          {designServices.map((service, index) => (
            <ServiceCard key={index} to={service.path}>
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <ServiceFeatures>
                {service.features.map((feature, featureIndex) => (
                  <FeatureItem key={featureIndex}>{feature}</FeatureItem>
                ))}
              </ServiceFeatures>
              <ViewMoreButton>
                Ver Portafolio <FaArrowRight />
              </ViewMoreButton>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </ContentWrapper>
    </DesignContainer>
  );
}

export default Design; 