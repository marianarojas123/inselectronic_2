import React from 'react';
import styled from '@emotion/styled';
import { FaHeart, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: rgba(0, 0, 0, 0.95);
  color: white;
  padding: 3rem 2rem 2rem;
  text-align: center;
  backdrop-filter: blur(15px);
  border-top: 1px solid rgba(0, 255, 136, 0.2);
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 2rem 1rem 1.5rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const FooterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const CompanyInfo = styled.div`
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const CompanyName = styled.h3`
  color: #00ff88;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  letter-spacing: 1px;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const CompanyTagline = styled.p`
  color: #ccc;
  font-size: 0.95rem;
  margin: 0;
  letter-spacing: 0.3px;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const SocialLink = styled.a`
  color: #ccc;
  font-size: 1.3rem;
  transition: all 0.3s ease;
  padding: 0.8rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);

  &:hover {
    color: #00ff88;
    background: rgba(0, 255, 136, 0.1);
    border-color: rgba(0, 255, 136, 0.3);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 255, 136, 0.3);
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0.7rem;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.3), transparent);
  margin: 1rem 0;
`;

const Copyright = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: #888;
  font-size: 0.9rem;
  letter-spacing: 0.3px;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    flex-direction: column;
    gap: 0.3rem;
  }
`;

const HeartIcon = styled.span`
  color: #ff4444;
  animation: heartbeat 1.5s ease-in-out infinite;

  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <CompanyInfo>
            <CompanyName>INSELECTRONIC</CompanyName>
            <CompanyTagline>
              Innovación tecnológica al servicio de tu futuro digital
            </CompanyTagline>
          </CompanyInfo>
          
          <SocialLinks>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <Divider />

        <Copyright>
          <span>© {new Date().getFullYear()} INSELECTRONIC - Todos los derechos reservados</span>
          <span>•</span>
          <span>
            Hecho con <HeartIcon><FaHeart /></HeartIcon> para la comunidad
          </span>
          <span>•</span>
          <span>
            Desarrollado por <strong>Mariana A. Rojas R.</strong>
          </span>
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer; 