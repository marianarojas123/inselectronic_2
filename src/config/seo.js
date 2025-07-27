// Configuración SEO para INSELECTRONIC
const SEO_CONFIG = {
  // Configuración básica
  siteName: 'INSELECTRONIC',
  siteDescription: 'Innovación tecnológica al servicio de tu futuro digital. Soluciones integrales en programación, diseño, seguridad informática y servicios tecnológicos.',
  siteUrl: 'https://inselectronic.com',
  siteLanguage: 'es',
  siteLocale: 'es_ES',
  
  // Configuración de redes sociales
  socialMedia: {
    facebook: 'https://www.facebook.com/inselectronic.insbot/',
    twitter: 'https://x.com/INSELECTRONIC1',
    instagram: 'https://www.instagram.com/inselectronic_alfayomega3/',
    linkedin: 'https://www.linkedin.com/in/insbot-inselectronic-b0344b281/',
    youtube: 'https://www.youtube.com/@inselectronic'
  },
  
  // Palabras clave principales
  keywords: [
    'tecnología',
    'programación',
    'diseño web',
    'seguridad informática',
    'desarrollo de software',
    'servicios tecnológicos',
    'innovación digital',
    'sistemas informáticos',
    'consultoría IT',
    'automatización',
    'inteligencia artificial',
    'machine learning',
    'cloud computing',
    'cybersecurity',
    'web development',
    'mobile apps',
    'e-commerce',
    'digital transformation',
    'IT solutions',
    'software development'
  ],
  
  // Configuración de páginas
  pages: {
    home: {
      title: 'INSELECTRONIC - Innovación Tecnológica al Servicio de tu Futuro Digital',
      description: 'Descubre soluciones tecnológicas innovadoras en programación, diseño web, seguridad informática y servicios digitales. Transformamos ideas en realidad digital.',
      keywords: ['tecnología', 'innovación', 'programación', 'diseño web', 'seguridad informática'],
      canonical: '/',
      ogType: 'website'
    },
    services: {
      title: 'Servicios Tecnológicos - INSELECTRONIC',
      description: 'Servicios integrales de tecnología: programación, diseño web, seguridad informática, desarrollo de aplicaciones y consultoría IT.',
      keywords: ['servicios tecnológicos', 'programación', 'diseño web', 'seguridad informática'],
      canonical: '/services',
      ogType: 'website'
    },
    products: {
      title: 'Productos Tecnológicos - INSELECTRONIC',
      description: 'Productos tecnológicos de alta calidad: software, aplicaciones, herramientas digitales y soluciones empresariales.',
      keywords: ['productos tecnológicos', 'software', 'aplicaciones', 'herramientas digitales'],
      canonical: '/services/products',
      ogType: 'website'
    },
    contact: {
      title: 'Contacto - INSELECTRONIC',
      description: 'Contáctanos para obtener soluciones tecnológicas personalizadas. Consultoría gratuita y soporte técnico especializado.',
      keywords: ['contacto', 'consultoría', 'soporte técnico', 'soluciones personalizadas'],
      canonical: '/contact',
      ogType: 'website'
    },
    portfolio: {
      title: 'Portfolio - INSELECTRONIC',
      description: 'Explora nuestro portfolio de proyectos tecnológicos exitosos. Casos de estudio y testimonios de clientes satisfechos.',
      keywords: ['portfolio', 'proyectos', 'casos de estudio', 'testimonios'],
      canonical: '/portfolio',
      ogType: 'website'
    }
  }
};

class SEOManager {
  constructor() {
    this.currentPage = '';
    this.metaTags = {};
    this.schemaMarkup = {};
  }

  // Inicializar SEO
  initialize() {
    this.setupMetaTags();
    this.setupSchemaMarkup();
    this.optimizeImages();
    this.generateSitemap();
    this.setupRobotsTxt();
    this.setupManifest();
    this.setupServiceWorker();
  }

  // Configurar metadatos dinámicos
  setupMetaTags() {
    // Meta tags básicos
    this.addMetaTag('charset', 'UTF-8');
    this.addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    this.addMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    this.addMetaTag('googlebot', 'index, follow');
    
    // Meta tags de autor
    this.addMetaTag('author', 'INSELECTRONIC');
    this.addMetaTag('copyright', 'INSELECTRONIC');
    
    // Meta tags de verificación
    this.addMetaTag('google-site-verification', 'your-verification-code');
    this.addMetaTag('msvalidate.01', 'your-bing-verification-code');
    
    // Meta tags de seguridad
    this.addMetaTag('X-Frame-Options', 'SAMEORIGIN');
    this.addMetaTag('X-Content-Type-Options', 'nosniff');
    this.addMetaTag('X-XSS-Protection', '1; mode=block');
    this.addMetaTag('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Meta tags de rendimiento
    this.addMetaTag('Cache-Control', 'public, max-age=31536000');
    this.addMetaTag('Expires', new Date(Date.now() + 31536000000).toUTCString());
  }

  // Actualizar metadatos de página
  updatePageMeta(pageKey, customData = {}) {
    const pageConfig = SEO_CONFIG.pages[pageKey] || SEO_CONFIG.pages.home;
    const currentUrl = window.location.href;
    
    // Actualizar título
    document.title = customData.title || pageConfig.title;
    
    // Actualizar meta description
    this.updateMetaTag('description', customData.description || pageConfig.description);
    
    // Actualizar keywords
    this.updateMetaTag('keywords', customData.keywords || pageConfig.keywords.join(', '));
    
    // Actualizar canonical
    this.updateCanonical(customData.canonical || pageConfig.canonical);
    
    // Actualizar Open Graph
    this.updateOpenGraph({
      title: customData.title || pageConfig.title,
      description: customData.description || pageConfig.description,
      url: currentUrl,
      type: customData.ogType || pageConfig.ogType,
      image: customData.image || `${SEO_CONFIG.siteUrl}/og-image.jpg`,
      siteName: SEO_CONFIG.siteName
    });
    
    // Actualizar Twitter Card
    this.updateTwitterCard({
      title: customData.title || pageConfig.title,
      description: customData.description || pageConfig.description,
      image: customData.image || `${SEO_CONFIG.siteUrl}/twitter-image.jpg`,
      card: 'summary_large_image'
    });
    
    this.currentPage = pageKey;
  }

  // Configurar Schema Markup
  setupSchemaMarkup() {
    // Schema de organización
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'INSELECTRONIC',
      url: SEO_CONFIG.siteUrl,
      logo: `${SEO_CONFIG.siteUrl}/logo.png`,
      description: SEO_CONFIG.siteDescription,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'ES',
        addressLocality: 'Madrid',
        addressRegion: 'Madrid'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+34-XXX-XXX-XXX',
        contactType: 'customer service',
        email: 'info@inselectronic.com'
      },
      sameAs: Object.values(SEO_CONFIG.socialMedia),
      founder: {
        '@type': 'Person',
        name: 'INSELECTRONIC Team'
      },
      foundingDate: '2023',
      industry: 'Technology',
      keywords: SEO_CONFIG.keywords.join(', ')
    };

    this.addSchemaMarkup(organizationSchema);

    // Schema de sitio web
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
      description: SEO_CONFIG.siteDescription,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SEO_CONFIG.siteUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    };

    this.addSchemaMarkup(websiteSchema);
  }

  // Agregar Schema Markup
  addSchemaMarkup(schema) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  // Configurar datos estructurados para productos
  addProductSchema(product) {
    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.image,
      brand: {
        '@type': 'Brand',
        name: 'INSELECTRONIC'
      },
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'EUR',
        availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        seller: {
          '@type': 'Organization',
          name: 'INSELECTRONIC'
        }
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviewCount
      }
    };

    this.addSchemaMarkup(productSchema);
  }

  // Configurar datos estructurados para servicios
  addServiceSchema(service) {
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.name,
      description: service.description,
      provider: {
        '@type': 'Organization',
        name: 'INSELECTRONIC'
      },
      areaServed: {
        '@type': 'Country',
        name: 'Spain'
      },
      serviceType: service.category,
      offers: {
        '@type': 'Offer',
        price: service.price,
        priceCurrency: 'EUR'
      }
    };

    this.addSchemaMarkup(serviceSchema);
  }

  // Configurar datos estructurados para artículos
  addArticleSchema(article) {
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      image: article.image,
      author: {
        '@type': 'Organization',
        name: 'INSELECTRONIC'
      },
      publisher: {
        '@type': 'Organization',
        name: 'INSELECTRONIC',
        logo: {
          '@type': 'ImageObject',
          url: `${SEO_CONFIG.siteUrl}/logo.png`
        }
      },
      datePublished: article.publishedDate,
      dateModified: article.modifiedDate,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': article.url
      }
    };

    this.addSchemaMarkup(articleSchema);
  }

  // Optimizar imágenes
  optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Agregar atributos de carga lazy
      if (!img.loading) {
        img.loading = 'lazy';
      }
      
      // Agregar atributos de tamaño
      if (!img.sizes) {
        img.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
      }
      
      // Agregar atributos de descripción
      if (!img.alt) {
        img.alt = 'INSELECTRONIC - ' + (img.title || 'Imagen');
      }
    });
  }

  // Generar sitemap dinámico
  generateSitemap() {
    const sitemap = {
      urlset: {
        '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
        url: [
          {
            loc: SEO_CONFIG.siteUrl,
            lastmod: new Date().toISOString(),
            changefreq: 'daily',
            priority: '1.0'
          },
          {
            loc: `${SEO_CONFIG.siteUrl}/services`,
            lastmod: new Date().toISOString(),
            changefreq: 'weekly',
            priority: '0.9'
          },
          {
            loc: `${SEO_CONFIG.siteUrl}/services/products`,
            lastmod: new Date().toISOString(),
            changefreq: 'weekly',
            priority: '0.8'
          },
          {
            loc: `${SEO_CONFIG.siteUrl}/contact`,
            lastmod: new Date().toISOString(),
            changefreq: 'monthly',
            priority: '0.7'
          },
          {
            loc: `${SEO_CONFIG.siteUrl}/portfolio`,
            lastmod: new Date().toISOString(),
            changefreq: 'weekly',
            priority: '0.8'
          }
        ]
      }
    };

    return sitemap;
  }

  // Configurar robots.txt
  setupRobotsTxt() {
    const robotsContent = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${SEO_CONFIG.siteUrl}/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /private/
Disallow: /api/

# Allow important pages
Allow: /services/
Allow: /products/
Allow: /contact/
Allow: /portfolio/

# Crawl delay
Crawl-delay: 1`;

    // En un entorno real, esto se serviría desde el servidor
    console.log('Robots.txt content:', robotsContent);
  }

  // Configurar manifest.json
  setupManifest() {
    const manifest = {
      name: 'INSELECTRONIC',
      short_name: 'INSELECTRONIC',
      description: 'Innovación tecnológica al servicio de tu futuro digital',
      start_url: '/',
      display: 'standalone',
      background_color: '#000000',
      theme_color: '#00ff88',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    };

    // En un entorno real, esto se serviría como archivo estático
    console.log('Manifest.json content:', manifest);
  }

  // Configurar Service Worker para PWA
  setupServiceWorker() {
    // Solo registrar Service Worker en producción
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registrado:', registration);
        })
        .catch(error => {
          console.log('Error al registrar Service Worker:', error);
        });
    } else {
      // En desarrollo, deshabilitar completamente
      console.log('Service Worker deshabilitado en desarrollo');
      
      // Desregistrar cualquier Service Worker existente
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          registrations.forEach(registration => {
            registration.unregister();
            console.log('Service Worker desregistrado');
          });
        });
      }
    }
  }

  // Funciones auxiliares
  addMetaTag(name, content) {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  updateMetaTag(name, content) {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  updateCanonical(url) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${SEO_CONFIG.siteUrl}${url}`;
  }

  updateOpenGraph(data) {
    const ogTags = {
      'og:title': data.title,
      'og:description': data.description,
      'og:url': data.url,
      'og:type': data.type,
      'og:image': data.image,
      'og:site_name': data.siteName,
      'og:locale': SEO_CONFIG.siteLocale
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    });
  }

  updateTwitterCard(data) {
    const twitterTags = {
      'twitter:card': data.card,
      'twitter:title': data.title,
      'twitter:description': data.description,
      'twitter:image': data.image,
      'twitter:site': '@INSELECTRONIC1',
      'twitter:creator': '@INSELECTRONIC1'
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    });
  }

  // Análisis de SEO
  analyzeSEO() {
    const analysis = {
      title: {
        present: !!document.title,
        length: document.title?.length || 0,
        optimal: document.title?.length >= 30 && document.title?.length <= 60
      },
      description: {
        present: !!document.querySelector('meta[name="description"]'),
        length: document.querySelector('meta[name="description"]')?.content?.length || 0,
        optimal: (document.querySelector('meta[name="description"]')?.content?.length || 0) >= 120 && (document.querySelector('meta[name="description"]')?.content?.length || 0) <= 160
      },
      canonical: {
        present: !!document.querySelector('link[rel="canonical"]')
      },
      images: {
        total: document.querySelectorAll('img').length,
        withAlt: document.querySelectorAll('img[alt]').length,
        withoutAlt: document.querySelectorAll('img:not([alt])').length
      },
      headings: {
        h1: document.querySelectorAll('h1').length,
        h2: document.querySelectorAll('h2').length,
        h3: document.querySelectorAll('h3').length
      },
      links: {
        internal: document.querySelectorAll('a[href^="/"]').length,
        external: document.querySelectorAll('a[href^="http"]').length
      }
    };

    return analysis;
  }

  // Generar reporte de SEO
  generateSEOReport() {
    const analysis = this.analyzeSEO();
    const report = {
      timestamp: new Date().toISOString(),
      page: this.currentPage,
      url: window.location.href,
      analysis,
      recommendations: []
    };

    // Recomendaciones basadas en el análisis
    if (!analysis.title.optimal) {
      report.recommendations.push('Optimizar el título de la página (30-60 caracteres)');
    }

    if (!analysis.description.optimal) {
      report.recommendations.push('Optimizar la meta descripción (120-160 caracteres)');
    }

    if (analysis.images.withoutAlt > 0) {
      report.recommendations.push(`Agregar atributos alt a ${analysis.images.withoutAlt} imágenes`);
    }

    if (analysis.headings.h1 > 1) {
      report.recommendations.push('Usar solo un H1 por página');
    }

    return report;
  }
}

// Instancia global
const seoManager = new SEOManager();

export default seoManager;
export { SEO_CONFIG }; 