import React from 'react';
import styled from '@emotion/styled';
import { FaDownload, FaFilePdf, FaBook, FaLightbulb, FaChartLine } from 'react-icons/fa';
import StarsBackground from '../components/StarsBackground';

const DocumentationContainer = styled.div`
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.7);
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
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #00ff88, #00b8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #cccccc;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  line-height: 1.6;
`;

const WhitePaperSection = styled.section`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 3rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 255, 136, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const WhitePaperTitle = styled.h2`
  font-size: 2rem;
  color: #00ff88;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const WhitePaperContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FeatureCard = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid rgba(0, 255, 136, 0.1);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-5px);
    border-color: #00ff88;
    box-shadow: 0 10px 30px rgba(0, 255, 136, 0.2);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  color: #00ff88;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  color: white;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: #cccccc;
  line-height: 1.6;
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #00ff88;
  color: #000000;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: #00b8ff;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 136, 0.3);
  }
`;

const TableOfContents = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  border: 1px solid rgba(0, 255, 136, 0.1);
  backdrop-filter: blur(10px);
`;

const TocTitle = styled.h3`
  color: #00ff88;
  margin-bottom: 1rem;
`;

const TocList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TocItem = styled.li`
  margin-bottom: 0.5rem;
  color: #cccccc;
  
  &:before {
    content: "•";
    color: #00ff88;
    margin-right: 0.5rem;
  }
`;

function Documentation() {
  return (
    <StarsBackground>
      <DocumentationContainer>
        <Content>
          <Title>Documentación Técnica</Title>
          <Description>
            Explora nuestra documentación detallada y descarga nuestro white paper para conocer más sobre nuestras soluciones tecnológicas y servicios.
          </Description>

          <WhitePaperSection>
            <WhitePaperTitle>
              <FaBook /> White Paper: Soluciones Tecnológicas Avanzadas
            </WhitePaperTitle>
            
            <TableOfContents>
              <TocTitle>Índice de Contenidos</TocTitle>
              <TocList>
                <TocItem>Introducción y Visión General</TocItem>
                <TocItem>Metodología y Enfoque</TocItem>
                <TocItem>Análisis de Mercado</TocItem>
                <TocItem>Soluciones Propuestas</TocItem>
                <TocItem>Casos de Éxito</TocItem>
                <TocItem>Conclusiones y Recomendaciones</TocItem>
              </TocList>
            </TableOfContents>

            <WhitePaperContent>
              <FeatureCard>
                <FeatureIcon>
                  <FaLightbulb />
                </FeatureIcon>
                <FeatureTitle>Innovación Tecnológica</FeatureTitle>
                <FeatureDescription>
                  Descubre cómo nuestras soluciones innovadoras están transformando la industria y creando nuevas oportunidades de negocio.
                </FeatureDescription>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>
                  <FaChartLine />
                </FeatureIcon>
                <FeatureTitle>Análisis de Mercado</FeatureTitle>
                <FeatureDescription>
                  Un análisis detallado de las tendencias actuales y futuras del mercado tecnológico, con datos y estadísticas relevantes.
                </FeatureDescription>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>
                  <FaFilePdf />
                </FeatureIcon>
                <FeatureTitle>Documentación Completa</FeatureTitle>
                <FeatureDescription>
                  Accede a nuestra documentación técnica detallada, incluyendo especificaciones, diagramas y casos de uso.
                </FeatureDescription>
              </FeatureCard>
            </WhitePaperContent>

            <DownloadButton href="/white-paper.pdf" download>
              <FaDownload /> Descargar White Paper (PDF)
            </DownloadButton>
          </WhitePaperSection>
        </Content>
      </DocumentationContainer>
    </StarsBackground>
  );
}

export default Documentation; 