import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { FaTruck, FaGlobe, FaBox, FaShippingFast, FaPlay, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ShippingContainer = styled.div`
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

// Sección de Servicios
const ServicesSection = styled.div`
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

const SlideFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const FeatureTag = styled.span`
  background: rgba(0, 255, 136, 0.2);
  color: #00ff88;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  border: 1px solid rgba(0, 255, 136, 0.3);
`;

const SlidePrice = styled.div`
  font-size: 1.5rem;
  color: #00ff88;
  font-weight: bold;
  margin-bottom: 1rem;
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

// Datos de servicios de envío
const shippingItems = [
  {
    id: 1,
    title: "Envío Express Internacional",
    description: "Servicio de envío express con entrega en 24-48 horas a más de 150 países. Incluye seguimiento en tiempo real y seguro completo.",
    image: "/developers/envios_1.png",
    features: ["24-48h Delivery", "Real-time Tracking", "Full Insurance", "150+ Countries"],
    price: "Desde $25",
    link: "#"
  },
  {
    id: 2,
    title: "Envío de Divisas Seguro",
    description: "Transferencia segura de divisas a cualquier parte del mundo con las mejores tasas de cambio y comisiones mínimas.",
    image: "/developers/envios_2.png",
    features: ["Secure Transfer", "Best Rates", "Low Fees", "Instant Processing"],
    price: "Comisión 1.5%",
    link: "#"
  },
  {
    id: 3,
    title: "Logística E-commerce",
    description: "Solución completa de logística para tiendas online con almacenamiento, picking, packing y envío automatizado.",
    image: "/developers/envios_3.jpeg",
    features: ["Warehousing", "Order Fulfillment", "Automated Shipping", "API Integration"],
    price: "Desde $50/mes",
    link: "#"
  },
  {
    id: 4,
    title: "Envío de Documentos",
    description: "Servicio especializado para envío de documentos importantes con entrega certificada y confirmación de recepción.",
    image: "/developers/envios_4.jpeg",
    features: ["Certified Delivery", "Signature Required", "Document Tracking", "Legal Compliance"],
    price: "Desde $15",
    link: "#"
  },
  {
    id: 5,
    title: "Carga Pesada Internacional",
    description: "Servicio de transporte de carga pesada y voluminosa con equipos especializados y rutas optimizadas.",
    image: "/developers/envios_5.jpg",
    features: ["Heavy Cargo", "Specialized Equipment", "Route Optimization", "Custom Clearance"],
    price: "Cotización personalizada",
    link: "#"
  }
];

const shippingServices = [
  {
    icon: <FaTruck />,
    title: "Envíos Express",
    description: "Entrega rápida y segura a cualquier parte del mundo con seguimiento en tiempo real."
  },
  {
    icon: <FaGlobe />,
    title: "Cobertura Global",
    description: "Servicio de envío a más de 200 países con opciones de entrega personalizadas."
  },
  {
    icon: <FaBox />,
    title: "Embalaje Seguro",
    description: "Empaque profesional para garantizar la integridad de tus productos durante el transporte."
  },
  {
    icon: <FaShippingFast />,
    title: "Logística Integral",
    description: "Gestión completa del proceso de envío, desde la recolección hasta la entrega."
  }
];

function Shipping() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % shippingItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % shippingItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + shippingItems.length) % shippingItems.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleVideoClick = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  return (
    <ShippingContainer>
      <ContentWrapper>
        <Title>Envíos Internacionales</Title>
        <Description>
          Ofrecemos soluciones logísticas completas para tus envíos internacionales.
          Con nuestra red global de distribución, garantizamos entregas rápidas
          y seguras a cualquier destino.
        </Description>

        {/* Sección de Video */}
        <VideoSection>
          <SectionTitle>Nuestro Servicio de Envíos</SectionTitle>
          <VideoContainer>
            <Video 
              src="/videos/video_5.mp4" 
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

        {/* Sección de Servicios */}
        <ServicesSection>
          <SectionTitle>Nuestros Servicios de Envío</SectionTitle>
          <SliderContainer>
            <SliderTrack currentIndex={currentSlide}>
              {shippingItems.map((item) => (
                <Slide key={item.id}>
                  <SlideContent>
                    <SlideImage src={item.image} alt={item.title} />
                    <SlideInfo>
                      <SlideTitle>{item.title}</SlideTitle>
                      <SlideDescription>{item.description}</SlideDescription>
                      <SlideFeatures>
                        {item.features.map((feature, index) => (
                          <FeatureTag key={index}>{feature}</FeatureTag>
                        ))}
                      </SlideFeatures>
                      <SlidePrice>{item.price}</SlidePrice>
                      <SlideLink href={item.link}>
                        Solicitar Cotización →
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
            <SliderButton onClick={nextSlide} disabled={currentSlide === shippingItems.length - 1}>
              <FaChevronRight />
            </SliderButton>
          </SliderControls>

          <SliderDots>
            {shippingItems.map((_, index) => (
              <Dot
                key={index}
                active={index === currentSlide}
                onClick={() => goToSlide(index)}
              />
            ))}
          </SliderDots>
        </ServicesSection>

        {/* Servicios */}
        <SectionTitle>Servicios de Envío</SectionTitle>
        <ServicesGrid>
          {shippingServices.map((service, index) => (
            <ServiceCard key={index}>
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </ContentWrapper>
    </ShippingContainer>
  );
}

export default Shipping; 