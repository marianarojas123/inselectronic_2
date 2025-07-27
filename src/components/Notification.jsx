import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { FaCheck, FaTimes } from 'react-icons/fa';

const NotificationContainer = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: rgba(0, 255, 136, 0.95);
  color: #000;
  padding: 1.5rem 2rem;
  border-radius: 15px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  z-index: 3000;
  display: flex;
  align-items: center;
  gap: 1rem;
  transform: translateX(${props => props.show ? '0' : '100%'});
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(0, 255, 136, 0.4);
  max-width: 400px;
  animation: ${props => props.show ? 'slideIn 0.4s ease-out' : 'none'};

  @keyframes slideIn {
    0% {
      transform: translateX(100%) scale(0.8);
      opacity: 0;
    }
    100% {
      transform: translateX(0) scale(1);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: none;
    padding: 1.2rem 1.5rem;
    gap: 0.8rem;
  }
`;

const NotificationIcon = styled.div`
  color: #000;
  font-size: 1.5rem;
  background: rgba(255, 255, 255, 0.3);
  padding: 0.8rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    padding: 0.6rem;
  }
`;

const NotificationContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const NotificationTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0.3rem;
  font-size: 1.1rem;
  letter-spacing: 0.3px;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.2rem;
  }
`;

const NotificationMessage = styled.div`
  font-size: 0.95rem;
  opacity: 0.9;
  line-height: 1.4;
  letter-spacing: 0.2px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const CloseButton = styled.button`
  background: rgba(0, 0, 0, 0.1);
  border: none;
  color: #000;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    padding: 0.4rem;
    font-size: 0.9rem;
  }
`;

function Notification({ show, message, title = "¡Éxito!", onClose, duration = 3000 }) {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <NotificationContainer show={show}>
      <NotificationIcon>
        <FaCheck />
      </NotificationIcon>
      <NotificationContent>
        <NotificationTitle>{title}</NotificationTitle>
        <NotificationMessage>{message}</NotificationMessage>
      </NotificationContent>
      <CloseButton onClick={onClose}>
        <FaTimes />
      </CloseButton>
    </NotificationContainer>
  );
}

export default Notification; 