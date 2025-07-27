import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaBars, FaTimes, FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Cart from './Cart';
import Login from './Login';
import Register from './Register';
import UserProfile from './UserProfile';

const Nav = styled.nav`
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(15px);
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 255, 136, 0.2);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
  }
`;

const Logo = styled(Link)`
  color: #00ff88;
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  letter-spacing: 1px;

  &:hover {
    color: #00b8ff;
    transform: translateY(-2px);
    text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    height: 100vh;
    width: 100%;
    background: rgba(0, 0, 0, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 6rem 2rem 2rem;
    transition: right 0.3s ease;
    overflow-y: auto;
    gap: 2rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.8rem 0;
  letter-spacing: 0.5px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(45deg, #00ff88, #00b8ff);
    transition: width 0.3s ease;
  }

  &:hover::after,
  &.active::after {
    width: 100%;
  }

  &:hover {
    color: #00ff88;
    transform: translateY(-1px);
  }

  &.active {
    color: #00ff88;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
    width: 100%;
    text-align: center;
    padding: 1.2rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 1.5rem;
    margin-top: 3rem;
  }
`;

const IconButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.95rem;
  font-weight: 500;
  position: relative;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(0, 255, 136, 0.2);
    border-color: #00ff88;
    color: #00ff88;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 136, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    padding: 1.2rem;
    font-size: 1.1rem;
  }
`;

const CartButton = styled(IconButton)`
  position: relative;
`;

const CartBadge = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(45deg, #ff4444, #ff6b6b);
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  animation: ${props => props.show ? 'pulse 0.6s ease-in-out' : 'none'};
  box-shadow: 0 2px 8px rgba(255, 68, 68, 0.4);

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
`;

const UserButton = styled(IconButton)`
  position: relative;
`;

const UserAvatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: 0.5rem;
  border: 2px solid rgba(0, 255, 136, 0.3);
  transition: all 0.3s ease;

  ${UserButton}:hover & {
    border-color: #00ff88;
    transform: scale(1.1);
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  display: none;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 8px;

  &:hover {
    color: #00ff88;
    background: rgba(0, 255, 136, 0.1);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenuHeader = styled.div`
  display: none;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(15px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  border-bottom: 1px solid rgba(0, 255, 136, 0.2);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease;

  @media (min-width: 769px) {
    display: none;
  }
`;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
    closeMenu();
  };

  const openRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
    closeMenu();
  };

  const openProfile = () => {
    setIsProfileOpen(true);
    closeMenu();
  };

  const switchToLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const switchToRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  return (
    <>
      <MobileMenuHeader>
        <Logo to="/" onClick={closeMenu}>
          INSELECTRONIC
        </Logo>
        <MenuButton onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MenuButton>
      </MobileMenuHeader>
      <Nav>
        <Logo to="/" onClick={closeMenu}>
          INSELECTRONIC
        </Logo>
        <NavLinks isOpen={isOpen}>
          <StyledNavLink to="/" onClick={closeMenu}>Inicio</StyledNavLink>
          <StyledNavLink to="/services" onClick={closeMenu}>Servicios</StyledNavLink>
          <StyledNavLink to="/store" onClick={closeMenu}>Tienda</StyledNavLink>
          <StyledNavLink to="/portfolio" onClick={closeMenu}>Portafolio</StyledNavLink>
          <StyledNavLink to="/documentation" onClick={closeMenu}>Documentación</StyledNavLink>
          <StyledNavLink to="/contact" onClick={closeMenu}>Contacto</StyledNavLink>
          <AuthButtons>
            <CartButton onClick={toggleCart}>
              <FaShoppingCart />
              {!isMobile && <span>Carrito</span>}
              {itemCount > 0 && (
                <CartBadge show={itemCount > 0}>
                  {itemCount > 99 ? '99+' : itemCount}
                </CartBadge>
              )}
            </CartButton>
            
            {isAuthenticated ? (
              <UserButton onClick={openProfile}>
                <UserAvatar src={user?.avatar} alt={user?.name} />
                {!isMobile && <span>{user?.name}</span>}
              </UserButton>
            ) : (
              <IconButton onClick={openLogin}>
                <FaUser />
                {!isMobile && <span>Iniciar Sesión</span>}
              </IconButton>
            )}
          </AuthButtons>
        </NavLinks>
        <MenuButton onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MenuButton>
      </Nav>
      <Overlay isOpen={isOpen} onClick={closeMenu} />
      
      {/* Modales */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Login 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={switchToRegister}
      />
      <Register 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={switchToLogin}
      />
      <UserProfile 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)}
      />
    </>
  );
}

export default Navbar; 