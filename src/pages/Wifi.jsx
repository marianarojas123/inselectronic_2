import React from 'react';
import styled from '@emotion/styled';
import { FaWifi, FaQrcode, FaClock, FaInfoCircle } from 'react-icons/fa';

const WifiContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #000000;
  color: #ffffff;
  padding: 1.5rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 1rem 1rem 1.5rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 255, 136, 0.3);
  border: 1px solid rgba(0, 255, 136, 0.2);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #00ff88, #00ccff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
`;

const WifiInfo = styled.div`
  background: rgba(0, 255, 136, 0.1);
  border-radius: 10px;
  padding: 1.5rem;
  margin: 1rem 0;
  border: 1px solid rgba(0, 255, 136, 0.3);
`;

const WifiName = styled.h2`
  font-size: 1.8rem;
  color: #00ff88;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.4);
`;

const WifiPassword = styled.p`
  font-size: 1.5rem;
  color: #ffffff;
  margin: 1rem 0;
  font-family: monospace;
  letter-spacing: 2px;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
`;

const InfoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem 0;
  color: #ffffff;
  font-size: 1.1rem;
`;

const Icon = styled.div`
  font-size: 1.5rem;
  color: #00ff88;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.4);
`;

const QRCode = styled.div`
  margin: 2rem 0;
  padding: 1rem;
  background: #ffffff;
  border-radius: 10px;
  display: inline-block;
`;

function Wifi() {
  return (
    <WifiContainer>
      <ContentWrapper>
        <Title>Zona WiFi</Title>
        <Description>
          Disfruta de internet de alta velocidad en nuestras instalaciones.
          Conecta tus dispositivos y mantente en línea mientras nos visitas.
        </Description>
        
        <WifiInfo>
          <WifiName>INSELECTRONIC_WIFI</WifiName>
          <WifiPassword>INSELECTRONIC2025</WifiPassword>
          
          <InfoSection>
            <Icon><FaClock /></Icon>
            <span>Horario: 24/7</span>
          </InfoSection>
          
          <InfoSection>
            <Icon><FaInfoCircle /></Icon>
            <span>Velocidad: 100 Mbps</span>
          </InfoSection>
        </WifiInfo>

        <QRCode>
          <img src="/developers/ins_QR_code1.png" alt="Código QR WiFi" style={{ width: 200, height: 200 }} />
        </QRCode>

        <div style={{ margin: '2rem 0' }}>
          <h2 style={{ color: '#00ff88', marginBottom: '1rem' }}>¿Dónde están los puntos de acceso WiFi gratis?</h2>
          <video src="/videos/video_6.mp4" controls style={{ width: '100%', maxWidth: 400, borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
            Tu navegador no soporta la reproducción de video.
          </video>
        </div>
      </ContentWrapper>
    </WifiContainer>
  );
}

export default Wifi; 