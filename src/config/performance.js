// Sistema de Monitoreo de Rendimiento
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.thresholds = {
      fcp: 1800, // First Contentful Paint (ms)
      lcp: 2500, // Largest Contentful Paint (ms)
      fid: 100,  // First Input Delay (ms)
      cls: 0.1,  // Cumulative Layout Shift
      ttfb: 600, // Time to First Byte (ms)
      fmp: 2000, // First Meaningful Paint (ms)
      tti: 3800  // Time to Interactive (ms)
    };
    this.alerts = [];
    this.observers = [];
  }

  // Inicializar monitoreo
  initialize() {
    this.setupCoreWebVitals();
    this.setupPerformanceObserver();
    this.setupResourceMonitoring();
    this.setupErrorMonitoring();
    this.setupMemoryMonitoring();
    this.setupNetworkMonitoring();
    this.setupUserExperienceMonitoring();
  }

  // Configurar Core Web Vitals
  setupCoreWebVitals() {
    // First Contentful Paint (FCP)
    this.observeFCP();
    
    // Largest Contentful Paint (LCP)
    this.observeLCP();
    
    // First Input Delay (FID)
    this.observeFID();
    
    // Cumulative Layout Shift (CLS)
    this.observeCLS();
    
    // Time to First Byte (TTFB)
    this.observeTTFB();
  }

  // Observar First Contentful Paint
  observeFCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          this.metrics.fcp = entry.startTime;
          this.checkThreshold('fcp', entry.startTime);
          this.sendMetric('FCP', entry.startTime);
        });
      });
      
      observer.observe({ entryTypes: ['paint'] });
      this.observers.push(observer);
    }
  }

  // Observar Largest Contentful Paint
  observeLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
        this.checkThreshold('lcp', lastEntry.startTime);
        this.sendMetric('LCP', lastEntry.startTime);
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(observer);
    }
  }

  // Observar First Input Delay
  observeFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          this.metrics.fid = entry.processingStart - entry.startTime;
          this.checkThreshold('fid', this.metrics.fid);
          this.sendMetric('FID', this.metrics.fid);
        });
      });
      
      observer.observe({ entryTypes: ['first-input'] });
      this.observers.push(observer);
    }
  }

  // Observar Cumulative Layout Shift
  observeCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.metrics.cls = clsValue;
            this.checkThreshold('cls', clsValue);
            this.sendMetric('CLS', clsValue);
          }
        });
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(observer);
    }
  }

  // Observar Time to First Byte
  observeTTFB() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'navigation') {
            const ttfb = entry.responseStart - entry.requestStart;
            this.metrics.ttfb = ttfb;
            this.checkThreshold('ttfb', ttfb);
            this.sendMetric('TTFB', ttfb);
          }
        });
      });
      
      observer.observe({ entryTypes: ['navigation'] });
      this.observers.push(observer);
    }
  }

  // Configurar observador de rendimiento general
  setupPerformanceObserver() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          this.analyzePerformanceEntry(entry);
        });
      });
      
      observer.observe({ 
        entryTypes: ['navigation', 'resource', 'paint', 'measure'] 
      });
      this.observers.push(observer);
    }
  }

  // Analizar entrada de rendimiento
  analyzePerformanceEntry(entry) {
    switch (entry.entryType) {
      case 'navigation':
        this.analyzeNavigationTiming(entry);
        break;
      case 'resource':
        this.analyzeResourceTiming(entry);
        break;
      case 'paint':
        this.analyzePaintTiming(entry);
        break;
      case 'measure':
        this.analyzeCustomMeasure(entry);
        break;
    }
  }

  // Analizar timing de navegación
  analyzeNavigationTiming(entry) {
    const timing = {
      dns: entry.domainLookupEnd - entry.domainLookupStart,
      tcp: entry.connectEnd - entry.connectStart,
      ttfb: entry.responseStart - entry.requestStart,
      download: entry.responseEnd - entry.responseStart,
      domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
      load: entry.loadEventEnd - entry.loadEventStart,
      total: entry.loadEventEnd - entry.fetchStart
    };

    this.metrics.navigationTiming = timing;
    this.sendMetric('NavigationTiming', timing);
  }

  // Analizar timing de recursos
  analyzeResourceTiming(entry) {
    if (entry.duration > 3000) { // Recursos que tardan más de 3 segundos
      this.alert('SLOW_RESOURCE', {
        name: entry.name,
        duration: entry.duration,
        size: entry.transferSize,
        type: entry.initiatorType
      });
    }

    this.metrics.resources = this.metrics.resources || [];
    this.metrics.resources.push({
      name: entry.name,
      duration: entry.duration,
      size: entry.transferSize,
      type: entry.initiatorType
    });
  }

  // Analizar timing de pintura
  analyzePaintTiming(entry) {
    if (entry.name === 'first-paint') {
      this.metrics.fp = entry.startTime;
      this.sendMetric('FP', entry.startTime);
    } else if (entry.name === 'first-contentful-paint') {
      this.metrics.fcp = entry.startTime;
      this.sendMetric('FCP', entry.startTime);
    }
  }

  // Analizar medida personalizada
  analyzeCustomMeasure(entry) {
    this.metrics.customMeasures = this.metrics.customMeasures || {};
    this.metrics.customMeasures[entry.name] = entry.duration;
    this.sendMetric('CustomMeasure', { name: entry.name, duration: entry.duration });
  }

  // Monitorear recursos
  setupResourceMonitoring() {
    // Monitorear carga de imágenes
    this.monitorImageLoading();
    
    // Monitorear carga de scripts
    this.monitorScriptLoading();
    
    // Monitorear carga de CSS
    this.monitorCSSLoading();
  }

  // Monitorear carga de imágenes
  monitorImageLoading() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      const startTime = performance.now();
      
      img.addEventListener('load', () => {
        const loadTime = performance.now() - startTime;
        if (loadTime > 2000) {
          this.alert('SLOW_IMAGE_LOAD', {
            src: img.src,
            loadTime: loadTime
          });
        }
      });

      img.addEventListener('error', () => {
        this.alert('IMAGE_LOAD_ERROR', {
          src: img.src
        });
      });
    });
  }

  // Monitorear carga de scripts
  monitorScriptLoading() {
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
      const startTime = performance.now();
      
      script.addEventListener('load', () => {
        const loadTime = performance.now() - startTime;
        if (loadTime > 1000) {
          this.alert('SLOW_SCRIPT_LOAD', {
            src: script.src,
            loadTime: loadTime
          });
        }
      });

      script.addEventListener('error', () => {
        this.alert('SCRIPT_LOAD_ERROR', {
          src: script.src
        });
      });
    });
  }

  // Monitorear carga de CSS
  monitorCSSLoading() {
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    stylesheets.forEach(link => {
      const startTime = performance.now();
      
      link.addEventListener('load', () => {
        const loadTime = performance.now() - startTime;
        if (loadTime > 1000) {
          this.alert('SLOW_CSS_LOAD', {
            href: link.href,
            loadTime: loadTime
          });
        }
      });

      link.addEventListener('error', () => {
        this.alert('CSS_LOAD_ERROR', {
          href: link.href
        });
      });
    });
  }

  // Monitorear errores
  setupErrorMonitoring() {
    window.addEventListener('error', (event) => {
      this.alert('JAVASCRIPT_ERROR', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.alert('UNHANDLED_PROMISE_REJECTION', {
        reason: event.reason
      });
    });
  }

  // Monitorear memoria
  setupMemoryMonitoring() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = performance.memory;
        const memoryUsage = {
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
          limit: memory.jsHeapSizeLimit,
          percentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
        };

        if (memoryUsage.percentage > 80) {
          this.alert('HIGH_MEMORY_USAGE', memoryUsage);
        }

        this.metrics.memory = memoryUsage;
        this.sendMetric('MemoryUsage', memoryUsage);
      }, 30000); // Cada 30 segundos
    }
  }

  // Monitorear red
  setupNetworkMonitoring() {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      this.metrics.network = {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      };

      connection.addEventListener('change', () => {
        this.metrics.network = {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData
        };
        this.sendMetric('NetworkChange', this.metrics.network);
      });
    }
  }

  // Monitorear experiencia de usuario
  setupUserExperienceMonitoring() {
    // Monitorear interacciones del usuario
    let lastInteraction = Date.now();
    
    ['click', 'scroll', 'keypress', 'mousemove'].forEach(eventType => {
      document.addEventListener(eventType, () => {
        lastInteraction = Date.now();
      });
    });

    // Detectar inactividad
    setInterval(() => {
      const inactiveTime = Date.now() - lastInteraction;
      if (inactiveTime > 300000) { // 5 minutos
        this.sendMetric('UserInactivity', inactiveTime);
      }
    }, 60000); // Cada minuto

    // Monitorear tiempo de respuesta de la interfaz (reducido)
    let lastFrameTime = performance.now();
    let frameCount = 0;
    
    const measureFrameTime = () => {
      const currentTime = performance.now();
      const frameTime = currentTime - lastFrameTime;
      frameCount++;
      
      // Solo alertar cada 100 frames para reducir spam
      if (frameCount % 100 === 0 && frameTime > 33.33) { // Más de 30 FPS
        this.alert('LOW_FRAME_RATE', { frameTime, frameCount });
      }
      
      lastFrameTime = currentTime;
      requestAnimationFrame(measureFrameTime);
    };
    
    requestAnimationFrame(measureFrameTime);
  }

  // Verificar umbrales
  checkThreshold(metric, value) {
    const threshold = this.thresholds[metric];
    if (threshold && value > threshold) {
      // Evitar alertas duplicadas
      const alertKey = `THRESHOLD_EXCEEDED_${metric.toUpperCase()}`;
      const lastAlert = this.alerts[this.alerts.length - 1];
      
      if (!lastAlert || lastAlert.type !== alertKey || 
          Date.now() - new Date(lastAlert.timestamp).getTime() > 30000) { // 30 segundos
        this.alert(alertKey, {
          metric,
          value,
          threshold
        });
      }
    }
  }

  // Generar alerta
  alert(type, data) {
    const alert = {
      type,
      data,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    this.alerts.push(alert);
    
    // Solo mostrar en consola en desarrollo y con límite de frecuencia
    if (process.env.NODE_ENV === 'development') {
      // Limitar alertas a una por tipo cada 60 segundos
      const lastAlertOfType = this.alerts
        .filter(a => a.type === type)
        .slice(-1)[0];
      
      if (!lastAlertOfType || 
          Date.now() - new Date(lastAlertOfType.timestamp).getTime() > 60000) {
        console.warn('🚨 Alerta de rendimiento:', alert);
      }
    }
    
    // Enviar a sistema de monitoreo
    this.sendAlert(alert);
  }

  // Enviar métrica
  sendMetric(name, value) {
    // Enviar a Google Analytics
    if (window.gtag) {
      window.gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: value,
        page_title: document.title,
        page_location: window.location.href
      });
    }

    // Enviar a sistema de monitoreo interno (reducido)
    if (process.env.NODE_ENV === 'development') {
      this.sendToMonitoringSystem('metric', { name, value });
    }
  }

  // Enviar alerta
  sendAlert(alert) {
    // Enviar a Google Analytics
    if (window.gtag) {
      window.gtag('event', 'performance_alert', {
        alert_type: alert.type,
        alert_data: alert.data,
        page_title: document.title,
        page_location: window.location.href
      });
    }

    // Enviar a sistema de monitoreo interno (reducido)
    if (process.env.NODE_ENV === 'development') {
      this.sendToMonitoringSystem('alert', alert);
    }
  }

  // Enviar a sistema de monitoreo
  sendToMonitoringSystem(type, data) {
    // Implementar envío a sistema de monitoreo externo
    // Por ejemplo: Sentry, LogRocket, etc.
    // Solo en desarrollo para evitar spam
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Enviando ${type} a sistema de monitoreo:`, data);
    }
  }

  // Crear medida personalizada
  measure(name, fn) {
    const startTime = performance.now();
    const result = fn();
    const endTime = performance.now();
    
    performance.measure(name, {
      start: startTime,
      end: endTime
    });

    return result;
  }

  // Obtener métricas actuales
  getMetrics() {
    return {
      ...this.metrics,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };
  }

  // Obtener reporte de rendimiento
  getPerformanceReport() {
    const report = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      metrics: this.metrics,
      alerts: this.alerts,
      score: this.calculatePerformanceScore(),
      recommendations: this.generateRecommendations()
    };

    return report;
  }

  // Calcular puntuación de rendimiento
  calculatePerformanceScore() {
    let score = 100;
    
    // Reducir puntuación basado en métricas
    if (this.metrics.lcp > this.thresholds.lcp) {
      score -= 20;
    }
    if (this.metrics.fid > this.thresholds.fid) {
      score -= 15;
    }
    if (this.metrics.cls > this.thresholds.cls) {
      score -= 15;
    }
    if (this.metrics.ttfb > this.thresholds.ttfb) {
      score -= 10;
    }

    return Math.max(0, score);
  }

  // Generar recomendaciones
  generateRecommendations() {
    const recommendations = [];

    if (this.metrics.lcp > this.thresholds.lcp) {
      recommendations.push('Optimizar el Largest Contentful Paint optimizando imágenes y recursos críticos');
    }

    if (this.metrics.fid > this.thresholds.fid) {
      recommendations.push('Reducir el First Input Delay dividiendo tareas largas y optimizando JavaScript');
    }

    if (this.metrics.cls > this.thresholds.cls) {
      recommendations.push('Reducir el Cumulative Layout Shift reservando espacio para elementos dinámicos');
    }

    if (this.metrics.ttfb > this.thresholds.ttfb) {
      recommendations.push('Mejorar el Time to First Byte optimizando el servidor y la red');
    }

    return recommendations;
  }

  // Limpiar observadores
  cleanup() {
    this.observers.forEach(observer => {
      observer.disconnect();
    });
    this.observers = [];
  }
}

// Instancia global
const performanceMonitor = new PerformanceMonitor();

export default performanceMonitor; 