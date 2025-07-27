import styled from '@emotion/styled';

const DocumentationContainer = styled.div`
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

const Section = styled.section`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
`;

const SectionTitle = styled.h2`
  color: #00ff88;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

function Documentation() {
  return (
    <DocumentationContainer>
      <Content>
        <Title>Documentación</Title>
        <Section>
          <SectionTitle>Guías de Uso</SectionTitle>
          <Text>
            Aquí encontrarás toda la documentación necesaria para utilizar nuestros servicios
            y productos de manera efectiva.
          </Text>
        </Section>
        <Section>
          <SectionTitle>API Reference</SectionTitle>
          <Text>
            Documentación técnica detallada de nuestras APIs y servicios de desarrollo.
          </Text>
        </Section>
        <Section>
          <SectionTitle>Preguntas Frecuentes</SectionTitle>
          <Text>
            Respuestas a las preguntas más comunes sobre nuestros servicios y productos.
          </Text>
        </Section>
      </Content>
    </DocumentationContainer>
  );
}

export default Documentation; 