import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

// Estado inicial del carrito
const initialState = {
  items: [],
  total: 0,
  itemCount: 0
};

// Tipos de acciones
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Reducer del carrito
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        
        const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        
        return {
          ...state,
          items: updatedItems,
          total,
          itemCount
        };
      } else {
        const newItems = [...state.items, action.payload];
        const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
        
        return {
          ...state,
          items: newItems,
          total,
          itemCount
        };
      }
    }
    
    case CART_ACTIONS.REMOVE_ITEM: {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return {
        ...state,
        items: updatedItems,
        total,
        itemCount
      };
    }
    
    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        return cartReducer(state, { type: CART_ACTIONS.REMOVE_ITEM, payload: id });
      }
      
      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      
      const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return {
        ...state,
        items: updatedItems,
        total,
        itemCount
      };
    }
    
    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0
      };
    
    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        ...action.payload
      };
    
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user, isAuthenticated } = useAuth();

  // Función para obtener la clave del carrito basada en el usuario
  const getCartKey = () => {
    return isAuthenticated ? `cart_${user.id}` : 'cart_guest';
  };

  // Cargar carrito desde localStorage
  useEffect(() => {
    const cartKey = getCartKey();
    const savedCart = localStorage.getItem(cartKey);
    
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cartData });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem(cartKey);
      }
    }
  }, [isAuthenticated, user?.id]);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    const cartKey = getCartKey();
    localStorage.setItem(cartKey, JSON.stringify(state));
  }, [state, isAuthenticated, user?.id]);

  // Función para agregar item al carrito
  const addItem = (product, quantity = 1) => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    };
    
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: item });
  };

  // Función para remover item del carrito
  const removeItem = (productId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
  };

  // Función para actualizar cantidad de un item
  const updateQuantity = (productId, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: productId, quantity } });
  };

  // Función para limpiar el carrito
  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  // Función para obtener el total formateado
  const getFormattedTotal = () => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(state.total);
  };

  // Función para verificar si un producto está en el carrito
  const isInCart = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  // Función para obtener la cantidad de un producto en el carrito
  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const value = {
    items: state.items,
    total: state.total,
    itemCount: state.itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getFormattedTotal,
    isInCart,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 