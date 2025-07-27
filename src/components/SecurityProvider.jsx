import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const SecurityContext = createContext();

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity debe ser usado dentro de un SecurityProvider');
  }
  return context;
};

const SecurityProvider = ({ children }) => {
  const [securityStatus, setSecurityStatus] = useState({
    isSecure: true,
    threats: [],
    lastScan: new Date(),
    firewallActive: true,
    encryptionActive: true,
    ddosProtection: true,
    botProtection: true,
    rateLimitActive: true
  });

  const [requestCount, setRequestCount] = useState({});
  const [suspiciousActivity, setSuspiciousActivity] = useState([]);
  const [blockedIPs, setBlockedIPs] = useState(new Set());

  // Configuración de seguridad
  const SECURITY_CONFIG = {
    maxRequestsPerMinute: 60,
    maxRequestsPerHour: 1000,
    suspiciousPatterns: [
      /script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /<iframe/i,
      /<object/i,
      /<embed/i,
      /eval\s*\(/i,
      /document\./i,
      /window\./i,
      /alert\s*\(/i,
      /confirm\s*\(/i,
      /prompt\s*\(/i
    ],
    blockedUserAgents: [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /curl/i,
      /wget/i,
      /python/i,
      /php/i,
      /java/i,
      /perl/i
    ],
    allowedOrigins: [
      'localhost',
      '127.0.0.1',
      'inselectronic.com',
      'www.inselectronic.com',
      'insbot.com',
      'www.insbot.com'
    ]
  };

  // Función para detectar actividad sospechosa
  const detectSuspiciousActivity = (data) => {
    const threats = [];
    
    // Detectar patrones sospechosos en URLs
    if (data.url && SECURITY_CONFIG.suspiciousPatterns.some(pattern => pattern.test(data.url))) {
      threats.push({
        type: 'XSS_ATTEMPT',
        severity: 'HIGH',
        description: 'Intento de Cross-Site Scripting detectado',
        timestamp: new Date(),
        data: data.url
      });
    }

    // Detectar User-Agents sospechosos
    if (data.userAgent && SECURITY_CONFIG.blockedUserAgents.some(pattern => pattern.test(data.userAgent))) {
      threats.push({
        type: 'BOT_ATTEMPT',
        severity: 'MEDIUM',
        description: 'Bot o crawler no autorizado detectado',
        timestamp: new Date(),
        data: data.userAgent
      });
    }

    // Detectar rate limiting
    const clientIP = data.ip || 'unknown';
    const currentTime = Date.now();
    const minuteKey = Math.floor(currentTime / 60000);
    const hourKey = Math.floor(currentTime / 3600000);

    if (!requestCount[clientIP]) {
      setRequestCount(prev => ({
        ...prev,
        [clientIP]: { minute: {}, hour: {} }
      }));
    }

    const clientRequests = requestCount[clientIP] || { minute: {}, hour: {} };
    
    // Contar requests por minuto
    if (!clientRequests.minute[minuteKey]) {
      clientRequests.minute[minuteKey] = 0;
    }
    clientRequests.minute[minuteKey]++;

    // Contar requests por hora
    if (!clientRequests.hour[hourKey]) {
      clientRequests.hour[hourKey] = 0;
    }
    clientRequests.hour[hourKey]++;

    // Verificar límites
    if (clientRequests.minute[minuteKey] > SECURITY_CONFIG.maxRequestsPerMinute) {
      threats.push({
        type: 'RATE_LIMIT_EXCEEDED',
        severity: 'HIGH',
        description: 'Demasiadas solicitudes por minuto',
        timestamp: new Date(),
        data: { ip: clientIP, count: clientRequests.minute[minuteKey] }
      });
      blockedIPs.add(clientIP);
    }

    if (clientRequests.hour[hourKey] > SECURITY_CONFIG.maxRequestsPerHour) {
      threats.push({
        type: 'RATE_LIMIT_EXCEEDED_HOUR',
        severity: 'HIGH',
        description: 'Demasiadas solicitudes por hora',
        timestamp: new Date(),
        data: { ip: clientIP, count: clientRequests.hour[hourKey] }
      });
      blockedIPs.add(clientIP);
    }

    // Verificar origen
    if (data.origin && !SECURITY_CONFIG.allowedOrigins.some(origin => data.origin.includes(origin))) {
      threats.push({
        type: 'UNAUTHORIZED_ORIGIN',
        severity: 'MEDIUM',
        description: 'Origen no autorizado',
        timestamp: new Date(),
        data: data.origin
      });
    }

    return threats;
  };

  // Función para registrar actividad
  const logActivity = (activityData) => {
    const threats = detectSuspiciousActivity(activityData);
    
    if (threats.length > 0) {
      setSuspiciousActivity(prev => [...prev, ...threats]);
      setSecurityStatus(prev => ({
        ...prev,
        threats: [...prev.threats, ...threats],
        isSecure: false
      }));

      // Notificar amenazas
      threats.forEach(threat => {
        console.warn(`🚨 AMENAZA DE SEGURIDAD: ${threat.type} - ${threat.description}`);
        
        if (threat.severity === 'HIGH') {
          toast.error(`🚨 Amenaza de seguridad detectada: ${threat.description}`, {
            duration: 5000,
            position: 'top-center'
          });
        }
      });

      // Bloquear IPs maliciosas
      if (threats.some(t => t.type === 'RATE_LIMIT_EXCEEDED' || t.type === 'XSS_ATTEMPT')) {
        const clientIP = activityData.ip || 'unknown';
        blockedIPs.add(clientIP);
        setBlockedIPs(new Set(blockedIPs));
      }
    }
  };

  // Función para verificar si una IP está bloqueada
  const isIPBlocked = (ip) => {
    return blockedIPs.has(ip);
  };

  // Función para escanear seguridad
  const performSecurityScan = () => {
    const scanResults = {
      timestamp: new Date(),
      threats: securityStatus.threats.length,
      blockedIPs: blockedIPs.size,
      suspiciousActivity: suspiciousActivity.length,
      firewallStatus: securityStatus.firewallActive,
      encryptionStatus: securityStatus.encryptionActive,
      ddosProtectionStatus: securityStatus.ddosProtection,
      botProtectionStatus: securityStatus.botProtection,
      rateLimitStatus: securityStatus.rateLimitActive
    };

    console.log('🔒 Escaneo de seguridad completado:', scanResults);
    
    setSecurityStatus(prev => ({
      ...prev,
      lastScan: new Date()
    }));

    return scanResults;
  };

  // Función para limpiar datos antiguos
  const cleanupOldData = () => {
    const oneHourAgo = Date.now() - 3600000;
    const oneDayAgo = Date.now() - 86400000;

    // Limpiar actividad sospechosa antigua
    setSuspiciousActivity(prev => 
      prev.filter(activity => activity.timestamp.getTime() > oneDayAgo)
    );

    // Limpiar conteo de requests antiguo
    setRequestCount(prev => {
      const cleaned = {};
      Object.keys(prev).forEach(ip => {
        const clientData = prev[ip];
        const cleanedMinute = {};
        const cleanedHour = {};

        Object.keys(clientData.minute).forEach(key => {
          if (parseInt(key) * 60000 > oneHourAgo) {
            cleanedMinute[key] = clientData.minute[key];
          }
        });

        Object.keys(clientData.hour).forEach(key => {
          if (parseInt(key) * 3600000 > oneDayAgo) {
            cleanedHour[key] = clientData.hour[key];
          }
        });

        if (Object.keys(cleanedMinute).length > 0 || Object.keys(cleanedHour).length > 0) {
          cleaned[ip] = { minute: cleanedMinute, hour: cleanedHour };
        }
      });
      return cleaned;
    });
  };

  // Monitoreo continuo
  useEffect(() => {
    // Escanear cada 5 minutos
    const scanInterval = setInterval(performSecurityScan, 300000);
    
    // Limpiar datos cada hora
    const cleanupInterval = setInterval(cleanupOldData, 3600000);

    // Monitorear actividad del navegador
    const handleBeforeUnload = () => {
      logActivity({
        type: 'PAGE_UNLOAD',
        timestamp: new Date(),
        url: window.location.href,
        userAgent: navigator.userAgent
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        logActivity({
          type: 'PAGE_HIDDEN',
          timestamp: new Date(),
          url: window.location.href
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(scanInterval);
      clearInterval(cleanupInterval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Protección contra ataques de consola
  useEffect(() => {
    const originalConsole = { ...console };
    
    // Detectar intentos de manipulación de consola
    const detectConsoleManipulation = () => {
      if (console.log !== originalConsole.log) {
        logActivity({
          type: 'CONSOLE_MANIPULATION',
          severity: 'HIGH',
          description: 'Intento de manipulación de consola detectado',
          timestamp: new Date()
        });
      }
    };

    const consoleCheckInterval = setInterval(detectConsoleManipulation, 1000);

    return () => clearInterval(consoleCheckInterval);
  }, []);

  const value = {
    securityStatus,
    logActivity,
    isIPBlocked,
    performSecurityScan,
    cleanupOldData,
    blockedIPs: Array.from(blockedIPs),
    suspiciousActivity,
    requestCount
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
};

export default SecurityProvider; 