import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FaQuoteLeft, FaStar, FaCode, FaPalette, FaShieldAlt, FaLaptopCode, FaUsers } from 'react-icons/fa';
import StarsBackground from '../components/StarsBackground';

const PortfolioContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: rgba(26, 26, 26, 0.7);
  color: white;
  padding: 1.5rem 2rem 2rem;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 1rem 1rem 1.5rem;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #00ff88;
`;

const Description = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #888;
  margin-bottom: 3rem;
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #00ff88;
  
  svg {
    font-size: 1.5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const TestimonialCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 255, 136, 0.2);
  }
`;

const ClientImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 1rem;
  border: 3px solid #00ff88;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  color: #00ff88;
  opacity: 0.5;
`;

const Stars = styled.div`
  display: flex;
  gap: 0.5rem;
  color: #ffd700;
  margin-bottom: 1rem;
  justify-content: center;
`;

const TestimonialText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #ccc;
  margin-bottom: 1rem;
  text-align: center;
`;

const ClientName = styled.h3`
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const ClientRole = styled.p`
  font-size: 0.9rem;
  color: #888;
  text-align: center;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? '#00ff88' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.active ? '#000' : '#fff'};
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#00ff88' : 'rgba(255, 255, 255, 0.2)'};
  }

  svg {
    font-size: 1rem;
  }
`;

const ProjectCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 255, 136, 0.2);
  }
`;

const ProjectMedia = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #000;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  color: #fff;
  margin: 1rem;
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  color: #ccc;
  margin: 0 1rem 1rem;
  line-height: 1.6;
`;

const ProjectDetails = styled.div`
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
`;

const DeveloperInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const DeveloperImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DeveloperName = styled.div`
  h4 {
    color: #fff;
    margin: 0;
    font-size: 1rem;
  }
`;

const DeveloperRole = styled.p`
  color: #888;
  margin: 0;
  font-size: 0.9rem;
`;

const ProjectStats = styled.div`
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 0.9rem;
`;

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');

  const testimonials = [
    {
      name: 'María González',
      role: 'CEO, TechStart',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      rating: 5,
      text: 'INSELECTRONIC transformó completamente nuestra presencia digital. Su equipo profesional y dedicado superó todas nuestras expectativas.'
    },
    {
      name: 'Carlos Rodríguez',
      role: 'Director de Marketing',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      rating: 5,
      text: 'Excelente trabajo en nuestro proyecto de e-commerce. La atención al detalle y la calidad del código son excepcionales.'
    },
    {
      name: 'Ana Martínez',
      role: 'Fundadora, DesignLab',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      rating: 5,
      text: 'Gracias a INSELECTRONIC, nuestra aplicación móvil es un éxito. Su expertise en desarrollo móvil es invaluable.'
    }
  ];

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Plataforma completa de comercio electrónico con sistema de pagos, gestión de inventario y panel administrativo.',
      category: 'programming',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
      developer: {
        name: 'Juan Pérez',
        role: 'Full Stack Developer',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
      },
      stats: {
        duration: '3 meses',
        budget: '$15,000'
      }
    },
    {
      id: 2,
      title: 'Brand Identity Design',
      description: 'Diseño completo de identidad corporativa incluyendo logo, colores, tipografía y aplicaciones.',
      category: 'design',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      developer: {
        name: 'Laura García',
        role: 'Graphic Designer',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100'
      },
      stats: {
        duration: '2 semanas',
        budget: '$3,500'
      }
    },
    {
      id: 3,
      title: 'Cybersecurity Audit',
      description: 'Auditoría completa de seguridad informática con reporte detallado y recomendaciones de mejora.',
      category: 'security',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
      developer: {
        name: 'Roberto Silva',
        role: 'Security Expert',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
      },
      stats: {
        duration: '1 mes',
        budget: '$8,000'
      }
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <StarsBackground>
      <PortfolioContainer>
        <Content>
          <Title>Nuestro Portafolio</Title>
          <Description>
            Descubre algunos de nuestros proyectos más destacados y testimonios de clientes satisfechos.
          </Description>

          <Section>
            <SectionTitle>
              <FaCode /> Proyectos Destacados
            </SectionTitle>
            
            <FilterButtons>
              <FilterButton 
                active={activeFilter === 'all'} 
                onClick={() => setActiveFilter('all')}
              >
                Todos
              </FilterButton>
              <FilterButton 
                active={activeFilter === 'programming'} 
                onClick={() => setActiveFilter('programming')}
              >
                <FaCode /> Programación
              </FilterButton>
              <FilterButton 
                active={activeFilter === 'design'} 
                onClick={() => setActiveFilter('design')}
              >
                <FaPalette /> Diseño
              </FilterButton>
              <FilterButton 
                active={activeFilter === 'security'} 
                onClick={() => setActiveFilter('security')}
              >
                <FaShieldAlt /> Seguridad
              </FilterButton>
            </FilterButtons>

            <Grid>
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id}>
                  <ProjectMedia>
                    <img src={project.image} alt={project.title} />
                  </ProjectMedia>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectDetails>
                    <DeveloperInfo>
                      <DeveloperImage>
                        <img src={project.developer.image} alt={project.developer.name} />
                      </DeveloperImage>
                      <DeveloperName>
                        <h4>{project.developer.name}</h4>
                        <DeveloperRole>{project.developer.role}</DeveloperRole>
                      </DeveloperName>
                    </DeveloperInfo>
                    <ProjectStats>
                      <span>Duración: {project.stats.duration}</span>
                      <span>Presupuesto: {project.stats.budget}</span>
                    </ProjectStats>
                  </ProjectDetails>
                </ProjectCard>
              ))}
            </Grid>
          </Section>

          <Section>
            <SectionTitle>
              <FaUsers /> Testimonios de Clientes
            </SectionTitle>
            <Grid>
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index}>
                  <ClientImage>
                    <img src={testimonial.image} alt={testimonial.name} />
                  </ClientImage>
                  <QuoteIcon>
                    <FaQuoteLeft />
                  </QuoteIcon>
                  <Stars>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </Stars>
                  <TestimonialText>{testimonial.text}</TestimonialText>
                  <ClientName>{testimonial.name}</ClientName>
                  <ClientRole>{testimonial.role}</ClientRole>
                </TestimonialCard>
              ))}
            </Grid>
          </Section>
        </Content>
      </PortfolioContainer>
    </StarsBackground>
  );
}

export default Portfolio; 