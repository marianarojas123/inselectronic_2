import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

// Estado inicial de autenticación
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

// Tipos de acciones
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_USER: 'UPDATE_USER'
};

// Reducer de autenticación
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.REGISTER_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    
    case AUTH_ACTIONS.LOGIN_SUCCESS:
    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    
    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };
    
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
    
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    
    default:
      return state;
  }
}

// Función para validar email
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Función para validar contraseña
const validatePassword = (password) => {
  return password.length >= 6;
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: user });
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('user');
      }
    } else {
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  }, []);

  // Guardar usuario en localStorage cuando cambie
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [state.user]);

  // Función de registro
  const register = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.REGISTER_START });

    try {
      // Validaciones
      if (!userData.name || userData.name.trim().length < 2) {
        throw new Error('El nombre debe tener al menos 2 caracteres');
      }

      if (!validateEmail(userData.email)) {
        throw new Error('El email no es válido');
      }

      if (!validatePassword(userData.password)) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      if (userData.password !== userData.confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }

      // Verificar si el usuario ya existe
      const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = savedUsers.find(u => u.email === userData.email.toLowerCase());
      
      if (existingUser) {
        throw new Error('Ya existe una cuenta con este email');
      }

      // Crear nuevo usuario
      const newUser = {
        id: Date.now().toString(),
        name: userData.name.trim(),
        email: userData.email.toLowerCase(),
        password: userData.password, // En una app real, esto debería estar hasheado
        createdAt: new Date().toISOString(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=00ff88&color=000&size=128`
      };

      // Guardar usuario en la lista de usuarios
      savedUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(savedUsers));

      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));

      dispatch({ type: AUTH_ACTIONS.REGISTER_SUCCESS, payload: newUser });
      return { success: true };
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.REGISTER_FAILURE, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Función de inicio de sesión
  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });

    try {
      // Validaciones
      if (!validateEmail(credentials.email)) {
        throw new Error('El email no es válido');
      }

      if (!credentials.password) {
        throw new Error('La contraseña es requerida');
      }

      // Verificar credenciales
      const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const user = savedUsers.find(u => 
        u.email === credentials.email.toLowerCase() && 
        u.password === credentials.password
      );

      if (!user) {
        throw new Error('Email o contraseña incorrectos');
      }

      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));

      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: user });
      return { success: true };
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Función de cierre de sesión
  const logout = () => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // Función para limpiar errores
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Función para actualizar datos del usuario
  const updateUser = (updates) => {
    // Actualizar en localStorage también
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = savedUsers.map(u => 
      u.id === state.user.id ? { ...u, ...updates } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    dispatch({ type: AUTH_ACTIONS.UPDATE_USER, payload: updates });
  };

  const value = {
    ...state,
    register,
    login,
    logout,
    clearError,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 