import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const RegisterOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const RegisterContainer = styled.div`
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 15px;
  width: 100%;
  max-width: 450px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  transform: scale(${props => props.isOpen ? 1 : 0.9});
  transition: transform 0.3s ease;
`;

const RegisterHeader = styled.div`
  background: linear-gradient(45deg, #00ff88, #00b8ff);
  color: #000;
  padding: 2rem;
  text-align: center;
  position: relative;
`;

const RegisterTitle = styled.h2`
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
`;

const RegisterSubtitle = styled.p`
  margin: 0.5rem 0 0 0;
  opacity: 0.8;
  font-size: 1rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #000;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const RegisterForm = styled.form`
  padding: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: #fff;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00ff88;
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  ${props => props.error && `
    border-color: #ff4444;
    box-shadow: 0 0 10px rgba(255, 68, 68, 0.3);
  `}
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.error ? '#ff4444' : '#00ff88'};
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #00ff88;
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 3px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 255, 136, 0.1);
  }
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(45deg, #00ff88, #00b8ff);
  color: #000;
  border: none;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 136, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: #ccc;
`;

const LoginButton = styled.button`
  background: none;
  border: none;
  color: #00ff88;
  cursor: pointer;
  text-decoration: underline;
  font-size: 1rem;

  &:hover {
    color: #00b8ff;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  border-top-color: #000;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

function Register({ isOpen, onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { register, isLoading, error, clearError } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) {
      return;
    }

    const result = await register(formData);
    
    if (result.success) {
      onClose();
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setErrors({});
    }
  };

  const handleClose = () => {
    clearError();
    setErrors({});
    onClose();
  };

  return (
    <RegisterOverlay isOpen={isOpen} onClick={handleClose}>
      <RegisterContainer isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <RegisterHeader>
          <RegisterTitle>Crear Cuenta</RegisterTitle>
          <RegisterSubtitle>Únete a nuestra comunidad</RegisterSubtitle>
          <CloseButton onClick={handleClose}>
            <FaTimes />
          </CloseButton>
        </RegisterHeader>

        <RegisterForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Nombre Completo</Label>
            <InputGroup>
              <InputIcon error={errors.name}>
                <FaUser />
              </InputIcon>
              <Input
                type="text"
                name="name"
                placeholder="Tu nombre completo"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
              />
            </InputGroup>
            {errors.name && (
              <ErrorMessage>
                <FaTimes />
                {errors.name}
              </ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <InputGroup>
              <InputIcon error={errors.email}>
                <FaEnvelope />
              </InputIcon>
              <Input
                type="email"
                name="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
              />
            </InputGroup>
            {errors.email && (
              <ErrorMessage>
                <FaTimes />
                {errors.email}
              </ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Contraseña</Label>
            <InputGroup>
              <InputIcon error={errors.password}>
                <FaLock />
              </InputIcon>
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </InputGroup>
            {errors.password && (
              <ErrorMessage>
                <FaTimes />
                {errors.password}
              </ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Confirmar Contraseña</Label>
            <InputGroup>
              <InputIcon error={errors.confirmPassword}>
                <FaLock />
              </InputIcon>
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Repite tu contraseña"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={errors.confirmPassword}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </InputGroup>
            {errors.confirmPassword && (
              <ErrorMessage>
                <FaTimes />
                {errors.confirmPassword}
              </ErrorMessage>
            )}
          </FormGroup>

          {error && (
            <ErrorMessage style={{ marginBottom: '1rem' }}>
              <FaTimes />
              {error}
            </ErrorMessage>
          )}

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoadingSpinner />
                Creando cuenta...
              </>
            ) : (
              'Crear Cuenta'
            )}
          </SubmitButton>

          <LoginLink>
            ¿Ya tienes una cuenta?{' '}
            <LoginButton type="button" onClick={onSwitchToLogin}>
              Inicia Sesión
            </LoginButton>
          </LoginLink>
        </RegisterForm>
      </RegisterContainer>
    </RegisterOverlay>
  );
}

export default Register; 