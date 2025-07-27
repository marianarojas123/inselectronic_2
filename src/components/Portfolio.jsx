import styled from '@emotion/styled';

const PortfolioContainer = styled.div`
  min-height: 100vh;
  padding: 8rem 2rem 2rem;
  background: linear-gradient(45deg, #000000, #1a1a1a);
  color: white;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #00ff88;
  margin-bottom: 2rem;
  text-align: center;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-10px);
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00ff88;
  font-size: 1.5rem;
`;

const ProjectInfo = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  color: #00ff88;
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.6;
`;

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'Plataforma de comercio electrónico con sistema de pagos integrado.'
  },
  {
    title: 'App de Gestión',
    description: 'Aplicación móvil para gestión de recursos empresariales.'
  },
  {
    title: 'Sistema de Seguridad',
    description: 'Solución de seguridad informática para empresas.'
  },
  {
    title: 'Redes Sociales',
    description: 'Campaña de marketing digital para marca de tecnología.'
  }
];

function Portfolio() {
  return (
    <PortfolioContainer>
      <Content>
        <Title>Portafolio</Title>
        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard key={index}>
              <ProjectImage>Proyecto {index + 1}</ProjectImage>
              <ProjectInfo>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
              </ProjectInfo>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Content>
    </PortfolioContainer>
  );
}

export default Portfolio; 