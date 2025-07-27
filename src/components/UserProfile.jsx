import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FaUser, FaEnvelope, FaCalendar, FaSignOutAlt, FaTimes, FaEdit, FaSave } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ProfileOverlay = styled.div`
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

const ProfileContainer = styled.div`
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 15px;
  width: 100%;
  max-width: 500px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  transform: scale(${props => props.isOpen ? 1 : 0.9});
  transition: transform 0.3s ease;
`;

const ProfileHeader = styled.div`
  background: linear-gradient(45deg, #00ff88, #00b8ff);
  color: #000;
  padding: 2rem;
  text-align: center;
  position: relative;
`;

const ProfileTitle = styled.h2`
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
`;

const ProfileSubtitle = styled.p`
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

const ProfileContent = styled.div`
  padding: 2rem;
`;

const AvatarSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #00ff88;
  margin-bottom: 1rem;
`;

const UserName = styled.h3`
  color: #fff;
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
`;

const UserEmail = styled.p`
  color: #ccc;
  margin: 0;
  font-size: 1rem;
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
`;

const StatNumber = styled.div`
  color: #00ff88;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #ccc;
  font-size: 0.9rem;
`;

const InfoSection = styled.div`
  margin-bottom: 2rem;
`;

const InfoTitle = styled.h4`
  color: #00ff88;
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const InfoIcon = styled.div`
  color: #00ff88;
  font-size: 1.2rem;
  width: 20px;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.div`
  color: #ccc;
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
`;

const InfoValue = styled.div`
  color: #fff;
  font-size: 1rem;
`;

const EditButton = styled.button`
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

const Input = styled.input`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 5px;
  color: #fff;
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #00ff88;
  }
`;

const ActionsSection = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 1rem;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
  }
`;

const LogoutButton = styled(ActionButton)`
  background: rgba(255, 68, 68, 0.2);
  border: 1px solid rgba(255, 68, 68, 0.5);
  color: #ff4444;

  &:hover {
    background: rgba(255, 68, 68, 0.3);
    box-shadow: 0 5px 15px rgba(255, 68, 68, 0.3);
  }
`;

const SaveButton = styled(ActionButton)`
  background: linear-gradient(45deg, #00ff88, #00b8ff);
  border: none;
  color: #000;

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 255, 136, 0.3);
  }
`;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

function UserProfile({ isOpen, onClose }) {
  const { user, logout, updateUser } = useAuth();
  const { items } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      name: user?.name || '',
      email: user?.email || ''
    });
  };

  const handleSave = () => {
    updateUser(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      name: user?.name || '',
      email: user?.email || ''
    });
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!user) return null;

  return (
    <ProfileOverlay isOpen={isOpen} onClick={onClose}>
      <ProfileContainer isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <ProfileHeader>
          <ProfileTitle>Mi Perfil</ProfileTitle>
          <ProfileSubtitle>Gestiona tu cuenta</ProfileSubtitle>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </ProfileHeader>

        <ProfileContent>
          <AvatarSection>
            <Avatar src={user.avatar} alt={user.name} />
            <UserName>{user.name}</UserName>
            <UserEmail>{user.email}</UserEmail>
          </AvatarSection>

          <StatsSection>
            <StatCard>
              <StatNumber>{items.length}</StatNumber>
              <StatLabel>Productos en Carrito</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{formatDate(user.createdAt)}</StatNumber>
              <StatLabel>Miembro desde</StatLabel>
            </StatCard>
          </StatsSection>

          <InfoSection>
            <InfoTitle>Información Personal</InfoTitle>
            
            <InfoItem>
              <InfoIcon>
                <FaUser />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Nombre</InfoLabel>
                {isEditing ? (
                  <Input
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                    placeholder="Tu nombre"
                  />
                ) : (
                  <InfoValue>{user.name}</InfoValue>
                )}
              </InfoContent>
              {!isEditing && (
                <EditButton onClick={handleEdit}>
                  <FaEdit />
                </EditButton>
              )}
            </InfoItem>

            <InfoItem>
              <InfoIcon>
                <FaEnvelope />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Email</InfoLabel>
                {isEditing ? (
                  <Input
                    name="email"
                    type="email"
                    value={editData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                  />
                ) : (
                  <InfoValue>{user.email}</InfoValue>
                )}
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <InfoIcon>
                <FaCalendar />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Fecha de Registro</InfoLabel>
                <InfoValue>{formatDate(user.createdAt)}</InfoValue>
              </InfoContent>
            </InfoItem>
          </InfoSection>

          <ActionsSection>
            {isEditing ? (
              <>
                <ActionButton onClick={handleCancel}>
                  Cancelar
                </ActionButton>
                <SaveButton onClick={handleSave}>
                  <FaSave />
                  Guardar
                </SaveButton>
              </>
            ) : (
              <LogoutButton onClick={handleLogout}>
                <FaSignOutAlt />
                Cerrar Sesión
              </LogoutButton>
            )}
          </ActionsSection>
        </ProfileContent>
      </ProfileContainer>
    </ProfileOverlay>
  );
}

export default UserProfile; 