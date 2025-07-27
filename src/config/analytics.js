// Configuración de Google Analytics 4
const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Reemplazar con tu ID real
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Reemplazar con tu ID real

// Configuración de eventos personalizados
const CUSTOM_EVENTS = {
  // Eventos de navegación
  PAGE_VIEW: 'page_view',
  PAGE_SCROLL: 'page_scroll',
  TIME_ON_PAGE: 'time_on_page',
  
  // Eventos de usuario
  USER_LOGIN: 'user_login',
  USER_REGISTER: 'user_register',
  USER_LOGOUT: 'user_logout',
  USER_PROFILE_UPDATE: 'user_profile_update',
  
  // Eventos de carrito
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  VIEW_CART: 'view_cart',
  BEGIN_CHECKOUT: 'begin_checkout',
  
  // Eventos de productos
  VIEW_PRODUCT: 'view_product',
  SEARCH_PRODUCT: 'search_product',
  FILTER_PRODUCT: 'filter_product',
  
  // Eventos de servicios
  VIEW_SERVICE: 'view_service',
  CONTACT_SERVICE: 'contact_service',
  
  // Eventos de formularios
  FORM_START: 'form_start',
  FORM_COMPLETE: 'form_complete',
  FORM_ERROR: 'form_error',
  
  // Eventos de seguridad
  SECURITY_THREAT: 'security_threat',
  BLOCKED_IP: 'blocked_ip',
  
  // Eventos de rendimiento
  PAGE_LOAD_TIME: 'page_load_time',
  RESOURCE_LOAD_ERROR: 'resource_load_error',
  
  // Eventos de engagement
  SCROLL_DEPTH: 'scroll_depth',
  CLICK_ELEMENT: 'click_element',
  HOVER_ELEMENT: 'hover_element',
  
  // Eventos de conversión
  LEAD_GENERATION: 'lead_generation',
  PHONE_CALL: 'phone_call',
  EMAIL_CLICK: 'email_click',
  SOCIAL_SHARE: 'social_share'
};

// Configuración de dimensiones personalizadas
const CUSTOM_DIMENSIONS = {
  USER_TYPE: 'user_type',
  USER_SEGMENT: 'user_segment',
  PAGE_SECTION: 'page_section',
  CONTENT_TYPE: 'content_type',
  PRODUCT_CATEGORY: 'product_category',
  SERVICE_TYPE: 'service_type',
  SECURITY_LEVEL: 'security_level',
  DEVICE_TYPE: 'device_type',
  BROWSER_TYPE: 'browser_type',
  LOCATION: 'location'
};

// Configuración de métricas personalizadas
const CUSTOM_METRICS = {
  SESSION_DURATION: 'session_duration',
  PAGE_ENGAGEMENT: 'page_engagement',
  CONVERSION_RATE: 'conversion_rate',
  BOUNCE_RATE: 'bounce_rate',
  SECURITY_THREATS: 'security_threats',
  PERFORMANCE_SCORE: 'performance_score'
};

class AnalyticsManager {
  constructor() {
    this.isInitialized = false;
    this.sessionStartTime = Date.now();
    this.pageStartTime = Date.now();
    this.scrollDepth = 0;
    this.userProperties = {};
    this.customEvents = [];
    this.performanceMetrics = {};
  }

  // Inicializar Google Analytics
  initialize() {
    if (this.isInitialized) return;

    try {
      // Cargar Google Analytics
      this.loadGoogleAnalytics();
      
      // Configurar eventos automáticos
      this.setupAutomaticTracking();
      
      // Configurar monitoreo de rendimiento
      this.setupPerformanceMonitoring();
      
      // Configurar tracking de engagement
      this.setupEngagementTracking();
      
      this.isInitialized = true;
      console.log('✅ Google Analytics inicializado correctamente');
    } catch (error) {
      console.error('❌ Error al inicializar Google Analytics:', error);
    }
  }

  // Cargar Google Analytics
  loadGoogleAnalytics() {
    // Cargar gtag
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: {
        [CUSTOM_DIMENSIONS.USER_TYPE]: 'user_type',
        [CUSTOM_DIMENSIONS.USER_SEGMENT]: 'user_segment',
        [CUSTOM_DIMENSIONS.PAGE_SECTION]: 'page_section',
        [CUSTOM_DIMENSIONS.CONTENT_TYPE]: 'content_type',
        [CUSTOM_DIMENSIONS.PRODUCT_CATEGORY]: 'product_category',
        [CUSTOM_DIMENSIONS.SERVICE_TYPE]: 'service_type',
        [CUSTOM_DIMENSIONS.SECURITY_LEVEL]: 'security_level',
        [CUSTOM_DIMENSIONS.DEVICE_TYPE]: 'device_type',
        [CUSTOM_DIMENSIONS.BROWSER_TYPE]: 'browser_type',
        [CUSTOM_DIMENSIONS.LOCATION]: 'location'
      }
    });

    window.gtag = gtag;
  }

  // Configurar tracking automático
  setupAutomaticTracking() {
    // Tracking de páginas
    this.trackPageView();
    
    // Tracking de tiempo en página
    this.trackTimeOnPage();
    
    // Tracking de scroll
    this.trackScrollDepth();
    
    // Tracking de clicks
    this.trackClicks();
    
    // Tracking de formularios
    this.trackForms();
    
    // Tracking de errores
    this.trackErrors();
    
    // Tracking de rendimiento
    this.trackPerformance();
  }

  // Tracking de vista de página
  trackPageView(customData = {}) {
    const pageData = {
      page_title: document.title,
      page_location: window.location.href,
      page_referrer: document.referrer,
      user_agent: navigator.userAgent,
      screen_resolution: `${screen.width}x${screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language,
      ...customData
    };

    this.sendEvent(CUSTOM_EVENTS.PAGE_VIEW, pageData);
    this.pageStartTime = Date.now();
  }

  // Tracking de tiempo en página
  trackTimeOnPage() {
    setInterval(() => {
      const timeOnPage = Date.now() - this.pageStartTime;
      if (timeOnPage > 30000) { // Solo enviar después de 30 segundos
        this.sendEvent(CUSTOM_EVENTS.TIME_ON_PAGE, {
          time_on_page: Math.round(timeOnPage / 1000),
          page_title: document.title,
          page_location: window.location.href
        });
      }
    }, 30000);
  }

  // Tracking de profundidad de scroll
  trackScrollDepth() {
    let maxScroll = 0;
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Enviar eventos en puntos clave
        if ([25, 50, 75, 90, 100].includes(scrollPercent)) {
          this.sendEvent(CUSTOM_EVENTS.SCROLL_DEPTH, {
            scroll_depth: scrollPercent,
            page_title: document.title,
            page_location: window.location.href
          });
        }
      }
    });
  }

  // Tracking de clicks
  trackClicks() {
    document.addEventListener('click', (event) => {
      const element = event.target;
      const tagName = element.tagName.toLowerCase();
      const className = element.className;
      const id = element.id;
      const text = element.textContent?.trim().substring(0, 50);
      
      this.sendEvent(CUSTOM_EVENTS.CLICK_ELEMENT, {
        element_type: tagName,
        element_class: className,
        element_id: id,
        element_text: text,
        page_title: document.title,
        page_location: window.location.href
      });
    });
  }

  // Tracking de formularios
  trackForms() {
    document.addEventListener('submit', (event) => {
      const form = event.target;
      const formId = form.id || form.className || 'unknown';
      
      this.sendEvent(CUSTOM_EVENTS.FORM_COMPLETE, {
        form_id: formId,
        form_action: form.action,
        page_title: document.title,
        page_location: window.location.href
      });
    });

    document.addEventListener('focusin', (event) => {
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        const form = event.target.closest('form');
        if (form) {
          this.sendEvent(CUSTOM_EVENTS.FORM_START, {
            form_id: form.id || form.className || 'unknown',
            field_name: event.target.name || event.target.id || 'unknown',
            page_title: document.title,
            page_location: window.location.href
          });
        }
      }
    });
  }

  // Tracking de errores
  trackErrors() {
    window.addEventListener('error', (event) => {
      this.sendEvent('error', {
        error_message: event.message,
        error_filename: event.filename,
        error_lineno: event.lineno,
        error_colno: event.colno,
        page_title: document.title,
        page_location: window.location.href
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.sendEvent('error', {
        error_type: 'unhandled_promise_rejection',
        error_message: event.reason?.message || event.reason,
        page_title: document.title,
        page_location: window.location.href
      });
    });
  }

  // Tracking de rendimiento
  trackPerformance() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0];
          const paint = performance.getEntriesByType('paint');
          
          const performanceData = {
            dom_content_loaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            load_time: navigation.loadEventEnd - navigation.loadEventStart,
            first_paint: paint.find(p => p.name === 'first-paint')?.startTime,
            first_contentful_paint: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
            page_title: document.title,
            page_location: window.location.href
          };

          this.sendEvent(CUSTOM_EVENTS.PAGE_LOAD_TIME, performanceData);
        }, 1000);
      });
    }
  }

  // Configurar monitoreo de rendimiento
  setupPerformanceMonitoring() {
    // Monitorear recursos
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'resource' && entry.duration > 3000) {
            this.sendEvent(CUSTOM_EVENTS.RESOURCE_LOAD_ERROR, {
              resource_name: entry.name,
              resource_duration: Math.round(entry.duration),
              resource_type: entry.initiatorType,
              page_title: document.title,
              page_location: window.location.href
            });
          }
        });
      });
      
      observer.observe({ entryTypes: ['resource'] });
    }
  }

  // Configurar tracking de engagement
  setupEngagementTracking() {
    // Tracking de hover
    document.addEventListener('mouseover', (event) => {
      const element = event.target;
      if (element.tagName === 'BUTTON' || element.tagName === 'A' || element.classList.contains('interactive')) {
        this.sendEvent(CUSTOM_EVENTS.HOVER_ELEMENT, {
          element_type: element.tagName.toLowerCase(),
          element_class: element.className,
          element_id: element.id,
          page_title: document.title,
          page_location: window.location.href
        });
      }
    });
  }

  // Enviar evento personalizado
  sendEvent(eventName, parameters = {}) {
    if (!window.gtag) {
      console.warn('Google Analytics no está cargado');
      return;
    }

    try {
      // Agregar datos automáticos
      const eventData = {
        ...parameters,
        timestamp: new Date().toISOString(),
        session_id: this.getSessionId(),
        user_id: this.getUserId(),
        device_type: this.getDeviceType(),
        browser_type: this.getBrowserType(),
        location: this.getLocation()
      };

      // Enviar evento
      window.gtag('event', eventName, eventData);
      
      // Guardar en historial local
      this.customEvents.push({
        name: eventName,
        data: eventData,
        timestamp: new Date()
      });

      // Limpiar historial antiguo (mantener solo últimos 100 eventos)
      if (this.customEvents.length > 100) {
        this.customEvents = this.customEvents.slice(-100);
      }

    } catch (error) {
      console.error('Error al enviar evento de Analytics:', error);
    }
  }

  // Eventos específicos del negocio
  trackUserAction(action, data = {}) {
    switch (action) {
      case 'login':
        this.sendEvent(CUSTOM_EVENTS.USER_LOGIN, data);
        break;
      case 'register':
        this.sendEvent(CUSTOM_EVENTS.USER_REGISTER, data);
        break;
      case 'logout':
        this.sendEvent(CUSTOM_EVENTS.USER_LOGOUT, data);
        break;
      case 'add_to_cart':
        this.sendEvent(CUSTOM_EVENTS.ADD_TO_CART, data);
        break;
      case 'remove_from_cart':
        this.sendEvent(CUSTOM_EVENTS.REMOVE_FROM_CART, data);
        break;
      case 'view_product':
        this.sendEvent(CUSTOM_EVENTS.VIEW_PRODUCT, data);
        break;
      case 'search':
        this.sendEvent(CUSTOM_EVENTS.SEARCH_PRODUCT, data);
        break;
      case 'contact':
        this.sendEvent(CUSTOM_EVENTS.CONTACT_SERVICE, data);
        break;
      case 'security_threat':
        this.sendEvent(CUSTOM_EVENTS.SECURITY_THREAT, data);
        break;
      default:
        this.sendEvent(action, data);
    }
  }

  // Funciones auxiliares
  getSessionId() {
    let sessionId = sessionStorage.getItem('ga_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('ga_session_id', sessionId);
    }
    return sessionId;
  }

  getUserId() {
    return localStorage.getItem('user_id') || 'anonymous';
  }

  getDeviceType() {
    const userAgent = navigator.userAgent;
    if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
      return 'mobile';
    } else if (/Tablet|iPad/.test(userAgent)) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  }

  getBrowserType() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Other';
  }

  getLocation() {
    // Implementar geolocalización si es necesario
    return 'unknown';
  }

  // Configurar propiedades de usuario
  setUserProperties(properties) {
    this.userProperties = { ...this.userProperties, ...properties };
    
    if (window.gtag) {
      window.gtag('config', GA_TRACKING_ID, {
        custom_map: {
          user_type: properties.userType || 'anonymous',
          user_segment: properties.userSegment || 'general'
        }
      });
    }
  }

  // Obtener métricas de rendimiento
  getPerformanceMetrics() {
    return {
      sessionDuration: Date.now() - this.sessionStartTime,
      pageViews: this.customEvents.filter(e => e.name === CUSTOM_EVENTS.PAGE_VIEW).length,
      eventsSent: this.customEvents.length,
      userProperties: this.userProperties
    };
  }

  // Exportar datos para análisis
  exportData() {
    return {
      sessionId: this.getSessionId(),
      userId: this.getUserId(),
      sessionStart: new Date(this.sessionStartTime).toISOString(),
      events: this.customEvents,
      userProperties: this.userProperties,
      performanceMetrics: this.getPerformanceMetrics()
    };
  }

  // Tracking de actividad del usuario
  logActivity(data) {
    this.sendEvent('user_activity', {
      ...data,
      session_id: this.getSessionId(),
      user_id: this.getUserId(),
      device_type: this.getDeviceType(),
      browser_type: this.getBrowserType(),
      location: this.getLocation()
    });
  }
}

// Instancia global
const analyticsManager = new AnalyticsManager();

export default analyticsManager;
export { CUSTOM_EVENTS, CUSTOM_DIMENSIONS, CUSTOM_METRICS }; 