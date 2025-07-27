import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { FaRobot, FaTimes, FaPaperPlane, FaTelegram } from 'react-icons/fa';
import { TELEGRAM_BOT } from '../config/telegram';

const ChatContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
`;

const ChatButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #00ff88;
  border: none;
  color: #000;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 255, 136, 0.4);
  }
`;

const ChatWindow = styled.div`
  position: fixed;
  bottom: 5rem;
  right: 2rem;
  width: 350px;
  height: 500px;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
`;

const ChatHeader = styled.div`
  padding: 1rem;
  background: rgba(0, 255, 136, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ChatTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #00ff88;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #00ff88;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: #00ff88;
    border-radius: 3px;
  }
`;

const Message = styled.div`
  max-width: 80%;
  padding: 0.8rem 1rem;
  border-radius: 15px;
  background: ${props => props.isBot ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  align-self: ${props => props.isBot ? 'flex-start' : 'flex-end'};
  border: 1px solid ${props => props.isBot ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
`;

const TelegramButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #0088cc;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  margin: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: #006699;
    transform: translateY(-2px);
  }
`;

const InputContainer = styled.div`
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #00ff88;
  }
`;

const SendButton = styled.button`
  background: #00ff88;
  border: none;
  color: #000;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #00cc6a;
  }
`;

const initialMessages = [
  {
    text: TELEGRAM_BOT.welcomeMessage,
    isBot: true
  },
  {
    text: TELEGRAM_BOT.redirectMessage,
    isBot: true
  }
];

const quickResponses = {
  "servicios": "Ofrecemos servicios de diseño, programación, seguridad informática y administración de redes sociales. Para más detalles, únete a nuestro chat de Telegram.",
  "precios": "Nuestros precios varían según el proyecto. Para una cotización personalizada, únete a nuestro chat de Telegram.",
  "contacto": "Puedes contactarnos por email a contacto@insbotinselectronic.com o uniéndote a nuestro chat de Telegram.",
  "horario": "Estamos disponibles de lunes a viernes de 9:00 AM a 6:00 PM. Para una atención más personalizada, únete a nuestro chat de Telegram.",
  "default": "Para una atención más personalizada, te invitamos a unirte a nuestro chat de Telegram donde podremos ayudarte mejor."
};

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Agregar mensaje del usuario
    setMessages(prev => [...prev, { text: inputValue, isBot: false }]);

    // Simular respuesta del bot
    setTimeout(() => {
      const response = getBotResponse(inputValue.toLowerCase());
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    }, 1000);

    setInputValue('');
  };

  const getBotResponse = (message) => {
    for (const [key, value] of Object.entries(quickResponses)) {
      if (message.includes(key)) {
        return value;
      }
    }
    return quickResponses.default;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <ChatContainer>
      {!isOpen && (
        <ChatButton onClick={() => setIsOpen(true)}>
          <FaRobot />
        </ChatButton>
      )}
      
      {isOpen && (
        <ChatWindow>
          <ChatHeader>
            <ChatTitle>
              <FaRobot />
              Asistente Virtual
            </ChatTitle>
            <CloseButton onClick={() => setIsOpen(false)}>
              <FaTimes />
            </CloseButton>
          </ChatHeader>
          
          <MessagesContainer>
            {messages.map((message, index) => (
              <Message key={index} isBot={message.isBot}>
                {message.text}
              </Message>
            ))}
            <div ref={messagesEndRef} />
          </MessagesContainer>

          <TelegramButton href={TELEGRAM_BOT.telegramLink} target="_blank">
            <FaTelegram />
            Unirse al Chat de Telegram
          </TelegramButton>
          
          <InputContainer>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
            />
            <SendButton onClick={handleSend}>
              <FaPaperPlane />
            </SendButton>
          </InputContainer>
        </ChatWindow>
      )}
    </ChatContainer>
  );
}

export default ChatBot; 