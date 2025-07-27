import React from 'react';
import styled from '@emotion/styled';
import { FaTimes, FaTrash, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 1500;
  display: flex;
  justify-content: flex-end;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    justify-content: center;
    padding: 1rem;
  }
`;

const CartContainer = styled.div`
  background: rgba(0, 0, 0, 0.98);
  border-left: 2px solid rgba(0, 255, 136, 0.3);
  width: 100%;
  max-width: 450px;
  height: 100vh;
  overflow: hidden;
  backdrop-filter: blur(20px);
  box-shadow: -15px 0 40px rgba(0, 0, 0, 0.6);
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    max-width: 100%;
    border-left: none;
    border-radius: 20px;
    margin: 0;
    height: calc(100vh - 2rem);
    border: 2px solid rgba(0, 255, 136, 0.3);
  }
`;

const CartHeader = styled.div`
  background: linear-gradient(45deg, #00ff88, #00b8ff);
  color: #000;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 255, 136, 0.3);

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 18px 18px 0 0;
  }
`;

const CartTitle = styled.h2`
  margin: 0;
  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border: none;
  color: #000;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.8rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    padding: 0.6rem;
    font-size: 1.3rem;
  }
`;

const CartContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #00ff88, #00b8ff);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #00b8ff, #00ff88);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #ccc;
`;

const EmptyCartIcon = styled.div`
  font-size: 5rem;
  color: rgba(255, 255, 255, 0.15);
  margin-bottom: 2rem;
  opacity: 0.7;
`;

const EmptyCartText = styled.p`
  font-size: 1.3rem;
  margin: 0;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const CartItem = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(0, 255, 136, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
    gap: 1rem;
    margin-bottom: 1.2rem;
  }
`;

const ItemImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;
  border: 2px solid rgba(0, 255, 136, 0.2);
  transition: all 0.3s ease;

  ${CartItem}:hover & {
    border-color: rgba(0, 255, 136, 0.5);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemName = styled.h4`
  margin: 0 0 0.8rem 0;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.3px;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.6rem;
  }
`;

const ItemPrice = styled.div`
  color: #00ff88;
  font-weight: bold;
  font-size: 1.2rem;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ItemControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.8rem;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const QuantityButton = styled.button`
  background: rgba(0, 255, 136, 0.2);
  border: 1px solid rgba(0, 255, 136, 0.3);
  color: #00ff88;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;

  &:hover {
    background: rgba(0, 255, 136, 0.3);
    border-color: #00ff88;
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
`;

const Quantity = styled.span`
  color: #fff;
  font-weight: bold;
  min-width: 25px;
  text-align: center;
  font-size: 1rem;
`;

const RemoveButton = styled.button`
  background: rgba(255, 68, 68, 0.2);
  border: 1px solid rgba(255, 68, 68, 0.4);
  color: #ff4444;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;

  &:hover {
    background: rgba(255, 68, 68, 0.3);
    border-color: #ff4444;
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(255, 68, 68, 0.4);
  }
`;

const CartFooter = styled.div`
  background: rgba(0, 0, 0, 0.9);
  border-top: 2px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  backdrop-filter: blur(15px);

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 0 0 18px 18px;
  }
`;

const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
`;

const TotalLabel = styled.span`
  color: #ccc;
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const TotalAmount = styled.span`
  color: #00ff88;
  font-size: 1.8rem;
  font-weight: bold;
  text-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  background: linear-gradient(45deg, #00ff88, #00b8ff);
  color: #000;
  border: none;
  padding: 1.2rem;
  border-radius: 15px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 20px rgba(0, 255, 136, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0, 255, 136, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 1.1rem;
  }
`;

const AuthMessage = styled.div`
  text-align: center;
  color: #ffaa00;
  font-size: 0.95rem;
  margin-top: 1rem;
  padding: 0.8rem;
  background: rgba(255, 170, 0, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(255, 170, 0, 0.3);
  font-weight: 500;
`;

function Cart({ isOpen, onClose }) {
  const { items, total, itemCount, removeItem, updateQuantity, getFormattedTotal } = useCart();
  const { isAuthenticated } = useAuth();

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId) => {
    removeItem(itemId);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('Por favor inicia sesión para continuar con la compra');
      return;
    }
    // Aquí iría la lógica de checkout
    alert('Funcionalidad de checkout en desarrollo');
  };

  return (
    <CartOverlay isOpen={isOpen} onClick={onClose}>
      <CartContainer isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <CartHeader>
          <CartTitle>Carrito ({itemCount})</CartTitle>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </CartHeader>

        <CartContent>
          {items.length === 0 ? (
            <EmptyCart>
              <EmptyCartIcon>
                <FaShoppingCart />
              </EmptyCartIcon>
              <EmptyCartText>Tu carrito está vacío</EmptyCartText>
            </EmptyCart>
          ) : (
            items.map((item) => (
              <CartItem key={item.id}>
                <ItemImage src={item.image} alt={item.name} />
                <ItemDetails>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>{getFormattedTotal(item.price * item.quantity)}</ItemPrice>
                </ItemDetails>
                <ItemControls>
                  <QuantityControls>
                    <QuantityButton
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus />
                    </QuantityButton>
                    <Quantity>{item.quantity}</Quantity>
                    <QuantityButton
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <FaPlus />
                    </QuantityButton>
                  </QuantityControls>
                  <RemoveButton onClick={() => handleRemoveItem(item.id)}>
                    <FaTrash />
                  </RemoveButton>
                </ItemControls>
              </CartItem>
            ))
          )}
        </CartContent>

        {items.length > 0 && (
          <CartFooter>
            <TotalSection>
              <TotalLabel>Total:</TotalLabel>
              <TotalAmount>{getFormattedTotal()}</TotalAmount>
            </TotalSection>
            <CheckoutButton onClick={handleCheckout}>
              Proceder al Pago
            </CheckoutButton>
            {!isAuthenticated && (
              <AuthMessage>
                * Inicia sesión para continuar con la compra
              </AuthMessage>
            )}
          </CartFooter>
        )}
      </CartContainer>
    </CartOverlay>
  );
}

export default Cart; 