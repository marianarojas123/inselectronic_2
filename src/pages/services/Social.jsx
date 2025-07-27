import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { FaShareAlt, FaChartLine, FaCamera, FaVideo, FaPlay, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const SocialContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  color: white;
  padding: 2rem;
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

// Sección de Portafolio
const PortfolioSection = styled.div`
  margin: 4rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #00ff88;
`;

const SliderContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 15px;
`;

const SliderTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(-${props => props.currentIndex * 100}%);
`;

const Slide = styled.div`
  min-width: 100%;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SlideContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const SlideInfo = styled.div`
  padding: 1rem;
`;

const SlideTitle = styled.h3`
  font-size: 1.8rem;
  color: #00ff88;
  margin-bottom: 1rem;
`;

const SlideDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #ccc;
`;

const SlideTechnologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TechnologyTag = styled.span`
  background: rgba(0, 255, 136, 0.2);
  color: #00ff88;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  border: 1px solid rgba(0, 255, 136, 0.3);
`;

const SlideLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #00ff88;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #00cc6a;
  }
`;

const SliderControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const SliderButton = styled.button`
  background: rgba(0, 255, 136, 0.2);
  border: 1px solid rgba(0, 255, 136, 0.5);
  color: #00ff88;
  padding: 0.8rem 1.2rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    background: rgba(0, 255, 136, 0.3);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const SliderDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? '#00ff88' : 'rgba(255, 255, 255, 0.3)'};
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#00ff88' : 'rgba(255, 255, 255, 0.5)'};
  }
`;

// Servicios Grid
const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ServiceCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  transition: transform 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ServiceIcon = styled.div`
  font-size: 3rem;
  color: #00ff88;
  margin-bottom: 1rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #00ff88;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #ccc;
`;

// Datos del portafolio de redes sociales
const portfolioItems = [
  {
    id: 1,
    title: "Campaña Instagram - Restaurante Gourmet",
    description: "Campaña completa de Instagram para restaurante gourmet con aumento del 300% en seguidores y 150% en engagement en 3 meses.",
    image: "/developers/redes_1.jpeg",
    technologies: ["Instagram Marketing", "Content Creation", "Hashtag Strategy", "Influencer Collaboration"],
    link: "#"
  },
  {
    id: 2,
    title: "Estrategia Facebook - E-commerce",
    description: "Estrategia integral de Facebook Ads para tienda online con ROI del 400% y aumento de ventas del 250%.",
    image: "/developers/redes_2.jpeg",
    technologies: ["Facebook Ads", "Retargeting", "Conversion Optimization", "Analytics"],
    link: "#"
  },
  {
    id: 3,
    title: "Campaña TikTok - Marca de Moda",
    description: "Campaña viral en TikTok para marca de moda con más de 2 millones de visualizaciones y 50K nuevos seguidores.",
    image: "/developers/redes_3.jpeg",
    technologies: ["TikTok Marketing", "Viral Content", "Trend Analysis", "Community Management"],
    link: "#"
  },
  {
    id: 4,
    title: "LinkedIn B2B - Empresa Tecnológica",
    description: "Estrategia B2B en LinkedIn para empresa tecnológica con generación de 200 leads cualificados y 15 reuniones de ventas.",
    image: "/developers/redes_4.jpeg",
    technologies: ["LinkedIn Marketing", "Lead Generation", "Content Marketing", "Networking"],
    link: "#"
  },
  {
    id: 5,
    title: "YouTube Channel - Fitness Coach",
    description: "Desarrollo de canal de YouTube para coach de fitness con 100K suscriptores y monetización exitosa en 6 meses.",
    image: "/developers/redes_5.jpeg",
    technologies: ["YouTube Marketing", "Video Production", "SEO", "Monetization"],
    link: "#"
  }
];

const socialServices = [
  {
    icon: <FaShareAlt />,
    title: "Gestión de Redes",
    description: "Administramos tus perfiles sociales y creamos contenido relevante para tu audiencia."
  },
  {
    icon: <FaChartLine />,
    title: "Análisis y Métricas",
    description: "Monitoreamos el rendimiento de tus redes y optimizamos tu estrategia digital."
  },
  {
    icon: <FaCamera />,
    title: "Contenido Visual",
    description: "Creamos imágenes y gráficos atractivos para tus publicaciones en redes sociales."
  },
  {
    icon: <FaVideo />,
    title: "Contenido Multimedia",
    description: "Producimos videos y contenido interactivo para aumentar el engagement."
  }
];

function Social() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % portfolioItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % portfolioItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleVideoClick = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  return (
    <SocialContainer>
      <ContentWrapper>
        <Title>Redes Sociales</Title>
        <Description>
          Potenciamos tu presencia en redes sociales con estrategias efectivas
          y contenido de calidad. Nuestro equipo de expertos en marketing digital
          te ayuda a conectar con tu audiencia y alcanzar tus objetivos.
        </Description>

        {/* Sección de Video */}
        <VideoSection>
          <SectionTitle>Nuestra Estrategia Digital</SectionTitle>
          <VideoContainer>
            <Video 
              src="/videos/video_4.mp4" 
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

        {/* Sección de Portafolio */}
        <PortfolioSection>
          <SectionTitle>Nuestras Campañas de Redes Sociales</SectionTitle>
          <SliderContainer>
            <SliderTrack currentIndex={currentSlide}>
              {portfolioItems.map((item) => (
                <Slide key={item.id}>
                  <SlideContent>
                    <SlideImage src={item.image} alt={item.title} />
                    <SlideInfo>
                      <SlideTitle>{item.title}</SlideTitle>
                      <SlideDescription>{item.description}</SlideDescription>
                      <SlideTechnologies>
                        {item.technologies.map((tech, index) => (
                          <TechnologyTag key={index}>{tech}</TechnologyTag>
                        ))}
                      </SlideTechnologies>
                      <SlideLink href={item.link}>
                        Ver Proyecto Completo →
                      </SlideLink>
                    </SlideInfo>
                  </SlideContent>
                </Slide>
              ))}
            </SliderTrack>
          </SliderContainer>

          <SliderControls>
            <SliderButton onClick={prevSlide} disabled={currentSlide === 0}>
              <FaChevronLeft />
            </SliderButton>
            <SliderButton onClick={nextSlide} disabled={currentSlide === portfolioItems.length - 1}>
              <FaChevronRight />
            </SliderButton>
          </SliderControls>

          <SliderDots>
            {portfolioItems.map((_, index) => (
              <Dot
                key={index}
                active={index === currentSlide}
                onClick={() => goToSlide(index)}
              />
            ))}
          </SliderDots>
        </PortfolioSection>

        {/* Servicios */}
        <SectionTitle>Servicios de Redes Sociales</SectionTitle>
        <ServicesGrid>
          {socialServices.map((service, index) => (
            <ServiceCard key={index}>
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </ContentWrapper>
    </SocialContainer>
  );
}

export default Social; 