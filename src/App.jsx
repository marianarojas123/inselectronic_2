import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Design from './pages/services/Design';
import DesignGrafico from './pages/services/DesignGrafico';
import DisenosPersonalizados from './pages/services/DisenosPersonalizados';
import DisenoInteriores from './pages/services/DisenoInteriores';
import Programming from './pages/services/Programming';
import Security from './pages/services/Security';
import Social from './pages/services/Social';
import Products from './pages/services/Products';
import Shipping from './pages/services/Shipping';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Documentation from './pages/Documentation';
import Wifi from './pages/Wifi';
import Store from './pages/Store';
import GlobalStyle from './styles/GlobalStyle';
import SecurityProvider from './components/SecurityProvider';

// Importar sistemas de monitoreo
import analyticsManager from './config/analytics';
import seoManager from './config/seo';
import performanceMonitor from './config/performance';

const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #000000;
  position: relative;
  z-index: 1;
  margin: 0;
  padding: 0;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  padding: 0;
  margin: 0;
  padding-top: 80px;
  position: relative;
  z-index: 2;
  background-color: #000000;

  @media (max-width: 768px) {
    padding-top: 70px;
  }
`;

function App() {
  useEffect(() => {
    // Inicializar sistemas de monitoreo
    const initializeMonitoring = () => {
      try {
        // Inicializar Google Analytics
        analyticsManager.initialize();
        
        // Inicializar SEO
        seoManager.initialize();
        
        // Inicializar monitoreo de rendimiento
        performanceMonitor.initialize();
        
        console.log('✅ Sistemas de monitoreo inicializados correctamente');
      } catch (error) {
        console.error('❌ Error al inicializar sistemas de monitoreo:', error);
      }
    };

    // Configurar tracking de navegación
    const setupNavigationTracking = () => {
      const currentPath = window.location.pathname;
      
      // Actualizar SEO para la página actual
      const pageKey = getPageKey(currentPath);
      seoManager.updatePageMeta(pageKey);
      
      // Trackear vista de página en Analytics
      analyticsManager.trackPageView({
        page_title: document.title,
        page_location: window.location.href,
        page_path: currentPath
      });
      
      // Medir rendimiento de carga de página
      performanceMonitor.measure('page_load', () => {
        // La medición se hace automáticamente
        return true;
      });
    };

    // Función para obtener la clave de página
    const getPageKey = (path) => {
      switch (path) {
        case '/':
          return 'home';
        case '/services':
          return 'services';
        case '/services/products':
          return 'products';
        case '/contact':
          return 'contact';
        case '/portfolio':
          return 'portfolio';
        default:
          return 'home';
      }
    };

    // Configurar tracking de eventos de seguridad
    const setupSecurityTracking = () => {
      // Monitorear actividad sospechosa
      const logActivity = (data) => {
        analyticsManager.logActivity({
          ...data,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent
        });
      };

      // Trackear eventos de usuario
      document.addEventListener('click', (event) => {
        logActivity({
          type: 'USER_CLICK',
          element: event.target.tagName,
          elementClass: event.target.className,
          elementId: event.target.id
        });
      });

      // Trackear eventos de formulario
      document.addEventListener('submit', (event) => {
        logActivity({
          type: 'FORM_SUBMIT',
          formId: event.target.id || event.target.className,
          formAction: event.target.action
        });
      });

      // Trackear eventos de navegación
      window.addEventListener('beforeunload', () => {
        logActivity({
          type: 'PAGE_UNLOAD',
          timeOnPage: Date.now() - performance.timing.navigationStart
        });
      });
    };

    // Configurar monitoreo de errores
    const setupErrorTracking = () => {
      window.addEventListener('error', (event) => {
        analyticsManager.trackUserAction('error', {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        });
      });

      window.addEventListener('unhandledrejection', (event) => {
        analyticsManager.trackUserAction('unhandled_rejection', {
          reason: event.reason
        });
      });
    };

    // Configurar monitoreo de rendimiento
    const setupPerformanceTracking = () => {
      // Monitorear métricas de Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          if (entry.entryType === 'largest-contentful-paint') {
            analyticsManager.trackUserAction('performance_metric', {
              metric: 'LCP',
              value: entry.startTime
            });
          }
        });
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    };

    // Inicializar todo
    initializeMonitoring();
    setupNavigationTracking();
    setupSecurityTracking();
    setupErrorTracking();
    setupPerformanceTracking();

    // Configurar tracking de cambios de ruta
    const handleRouteChange = () => {
      setTimeout(() => {
        setupNavigationTracking();
      }, 100);
    };

    // Escuchar cambios de ruta
    window.addEventListener('popstate', handleRouteChange);

    // Limpiar al desmontar
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      performanceMonitor.cleanup();
    };
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <SecurityProvider>
          <GlobalStyle />
          <AppContainer>
            <Navbar />
            <MainContent>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/design" element={<Design />} />
                <Route path="/services/design-grafico" element={<DesignGrafico />} />
                <Route path="/services/disenos-personalizados" element={<DisenosPersonalizados />} />
                <Route path="/services/diseno-interiores" element={<DisenoInteriores />} />
                <Route path="/services/programming" element={<Programming />} />
                <Route path="/services/security" element={<Security />} />
                <Route path="/services/social" element={<Social />} />
                <Route path="/services/products" element={<Products />} />
                <Route path="/services/shipping" element={<Shipping />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/documentation" element={<Documentation />} />
                <Route path="/wifi" element={<Wifi />} />
                <Route path="/store" element={<Store />} />
              </Routes>
            </MainContent>
            <Footer />
          </AppContainer>
        </SecurityProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
