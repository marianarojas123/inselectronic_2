import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import StarsBackground from '../components/StarsBackground';

const ContactContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 2rem 2rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 1.5rem;
  }
`;

const ContactGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const ContactCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-5px);
    border-color: #00ff88;
    box-shadow: 0 10px 30px rgba(0, 255, 136, 0.2);
  }
`;

const Icon = styled.div`
  font-size: 2.5rem;
  color: #00ff88;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  color: #00ff88;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  color: #ffffff;
  line-height: 1.6;
`;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 4rem auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  color: #00ff88;
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #00ff88;
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #00ff88;
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  border-radius: 8px;
  border: none;
  background: #00ff88;
  color: #000000;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: #00cc6a;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 136, 0.3);
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
  }
`;

const MessageContainer = styled.div`
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
`;

const SuccessMessage = styled(MessageContainer)`
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid #00ff88;
  color: #00ff88;
`;

const ErrorMessage = styled(MessageContainer)`
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid #ff4444;
  color: #ff4444;
`;

const DirectEmailButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 8px;
  background: linear-gradient(45deg, #00ff88, #00b8ff);
  color: #000000;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 136, 0.3);
  }
`;

const EmailInstructions = styled.div`
  background: rgba(0, 255, 136, 0.05);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  text-align: center;
`;

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [emailjsLoaded, setEmailjsLoaded] = useState(false);

  useEffect(() => {
    // Cargar EmailJS dinámicamente
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = () => {
      window.emailjs.init('YOUR_PUBLIC_KEY'); // Reemplazar con tu clave pública
      setEmailjsLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    try {
      if (emailjsLoaded && window.emailjs) {
        // Usar EmailJS si está disponible
        const result = await window.emailjs.send(
          'service_insbotinselectronic', // Reemplazar con tu Service ID
          'template_contact_form', // Reemplazar con tu Template ID
          {
            to_email: 'insbotinselectronic@gmail.com',
            from_name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message
          }
        );

        if (result.status === 200) {
          setMessage({
            type: 'success',
            text: '¡Mensaje enviado exitosamente! Te responderemos pronto.'
          });
          e.target.reset();
        } else {
          throw new Error('Error en el envío');
        }
      } else {
        // Fallback: usar mailto
        const mailtoLink = `mailto:insbotinselectronic@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Nombre: ${data.name}\nEmail: ${data.email}\n\nMensaje:\n${data.message}`)}`;
        window.location.href = mailtoLink;
        
        setMessage({
          type: 'success',
          text: 'Redirigiendo a tu cliente de email...'
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({
        type: 'error',
        text: 'Error al enviar el mensaje. Usa el botón de email directo.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StarsBackground>
      <ContactContainer>
        <ContactGrid>
          <ContactCard>
            <Icon>
              <FaEnvelope />
            </Icon>
            <Title>Email</Title>
            <Text>insbotinselectronic@gmail.com</Text>
          </ContactCard>
          <ContactCard>
            <Icon>
              <FaPhone />
            </Icon>
            <Title>Teléfono</Title>
            <Text>+1 (555) 123-4567</Text>
          </ContactCard>
          <ContactCard>
            <Icon>
              <FaMapMarkerAlt />
            </Icon>
            <Title>Dirección</Title>
            <Text>123 Calle Tecnológica, Ciudad Digital</Text>
          </ContactCard>
          <ContactCard>
            <Icon>
              <FaClock />
            </Icon>
            <Title>Horario</Title>
            <Text>Lunes a Viernes: 9:00 AM - 6:00 PM</Text>
          </ContactCard>
        </ContactGrid>

        <FormContainer>
          <FormTitle>Enviar Mensaje</FormTitle>
          
          <EmailInstructions>
            <p style={{ margin: 0, color: '#00ff88' }}>
              💡 <strong>Consejo:</strong> Si el formulario no funciona, usa el botón de email directo al final.
            </p>
          </EmailInstructions>
          
          {message.type && (
            message.type === 'success' ? (
              <SuccessMessage>
                <FaCheck /> {message.text}
              </SuccessMessage>
            ) : (
              <ErrorMessage>
                <FaExclamationTriangle /> {message.text}
              </ErrorMessage>
            )
          )}

          <Form onSubmit={handleSubmit}>
            <Input 
              type="text" 
              name="name"
              placeholder="Nombre completo" 
              required 
            />
            <Input 
              type="email" 
              name="email"
              placeholder="Correo electrónico" 
              required 
            />
            <Input 
              type="text" 
              name="subject"
              placeholder="Asunto" 
              required 
            />
            <TextArea 
              name="message"
              placeholder="Escribe tu mensaje aquí..." 
              required 
            />
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </SubmitButton>
          </Form>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p style={{ color: '#ccc', marginBottom: '1rem' }}>
              O envía un email directamente:
            </p>
            <DirectEmailButton href="mailto:insbotinselectronic@gmail.com?subject=Consulta desde el sitio web">
              <FaEnvelope /> Enviar Email Directo
            </DirectEmailButton>
          </div>
        </FormContainer>
      </ContactContainer>
    </StarsBackground>
  );
}

export default Contact; 