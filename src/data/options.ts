export type PriceType = 'one-time' | 'monthly' | 'yearly';

export interface Option {
  id: string;
  label: string;
  description: string;
  price: number;
  type: PriceType;
  percentage?: number;
}

export interface Section {
  id: string;
  title: string;
  subtitle?: string;
  multiSelect: boolean;
  options: Option[];
}

export const sections: Section[] = [
  {
    id: 'projectType',
    title: '1. Tipo de Proyecto',
    subtitle: '¿Qué tipo de proyecto deseas realizar?',
    multiSelect: false,
    options: [
      { id: 'pt_landing', label: 'Landing Page', description: 'Página de un solo scroll, ideal para captar leads o vender un producto específico de forma directa.', price: 350, type: 'one-time' },
      { id: 'pt_empresarial', label: 'Página Web Empresarial', description: 'Sitio web corporativo de varias secciones (Inicio, Nosotros, Servicios, Contacto) para presentar tu negocio.', price: 700, type: 'one-time' },
      { id: 'pt_premium', label: 'Página Premium', description: 'Experiencia visual de alto impacto con animaciones avanzadas y un diseño a la medida altamente creativo.', price: 1500, type: 'one-time' },
      { id: 'pt_tienda', label: 'Tienda Online', description: 'Plataforma de comercio electrónico para vender productos con carrito, pasarela de pagos y gestión de pedidos.', price: 2000, type: 'one-time' },
      { id: 'pt_sistema', label: 'Sistema Personalizado', description: 'Desarrollo de software a la medida con base de datos robusta para resolver necesidades específicas de tu empresa.', price: 4000, type: 'one-time' },
      { id: 'pt_rediseno', label: 'Rediseño Web', description: 'Renovación total o parcial de la estética y código de tu página web actual para modernizarla.', price: 500, type: 'one-time' },
      { id: 'pt_mantenimiento', label: 'Mantenimiento Web', description: 'Soporte técnico mensual, actualizaciones de seguridad y copias de respaldo para mantener tu sitio sano.', price: 120, type: 'monthly' },
      { id: 'pt_branding', label: 'Branding', description: 'Diseño de identidad visual y logotipos para lanzar o renovar la imagen de tu marca profesionalmente.', price: 400, type: 'one-time' },
    ]
  },
  {
    id: 'designLevel',
    title: '2. Diseño y Estilo',
    subtitle: '¿Qué nivel de diseño deseas?',
    multiSelect: false,
    options: [
      { id: 'dl_basico', label: 'Básico', description: 'Plantilla profesional limpia y directa. Excelente opción para presupuestos ajustados.', price: 0, type: 'one-time' },
      { id: 'dl_moderno', label: 'Moderno', description: 'Estética contemporánea con buen uso de espacios en blanco, tipografía moderna y elementos visuales.', price: 250, type: 'one-time' },
      { id: 'dl_premium', label: 'Premium', description: 'Diseño altamente cuidado y exclusivo, con detalles únicos y micro-animaciones personalizadas.', price: 600, type: 'one-time' },
      { id: 'dl_avanzado', label: 'UI/UX Avanzado', description: 'Investigación profunda de usuario y diseño de interfaces intuitivas de nivel mundial.', price: 1200, type: 'one-time' },
    ]
  },
  {
    id: 'branding',
    title: '3. Branding',
    subtitle: '¿Necesitas identidad visual para tu marca?',
    multiSelect: true,
    options: [
      { id: 'br_logo', label: 'Logo Profesional', description: 'Diseño de un logotipo memorable, representativo y adaptable a múltiples formatos.', price: 200, type: 'one-time' },
      { id: 'br_manual', label: 'Manual de Marca', description: 'Guía técnica completa del uso correcto de tu marca, colores, tipografías y variaciones.', price: 350, type: 'one-time' },
      { id: 'br_paleta', label: 'Paleta de Colores', description: 'Selección profesional de colores armónicos para transmitir psicológicamente los valores de tu empresa.', price: 120, type: 'one-time' },
      { id: 'br_redes', label: 'Kit para Redes Sociales', description: 'Plantillas de diseño coherentes y listas para tus perfiles de Facebook, Instagram o LinkedIn.', price: 250, type: 'one-time' },
    ]
  },
  {
    id: 'features',
    title: '4. Funcionalidades',
    subtitle: 'Selecciona las características que necesita tu proyecto',
    multiSelect: true,
    options: [
      { id: 'f_whatsapp', label: 'Integración WhatsApp', description: 'Botón flotante en tu web para que tus clientes te escriban directamente a tu número en un clic.', price: 60, type: 'one-time' },
      { id: 'f_contacto', label: 'Formulario de Contacto', description: 'Buzón de consultas seguro para que tus visitantes te envíen correos desde la propia página web.', price: 80, type: 'one-time' },
      { id: 'f_chat', label: 'Chat en Vivo', description: 'Sistema integrado y flotante para chatear y responder a tus visitantes en tiempo real.', price: 120, type: 'one-time' },
      { id: 'f_idioma', label: 'Multi idioma', description: 'Traducción de tu sitio a dos o más idiomas con selector para tener un alcance internacional.', price: 350, type: 'one-time' },
      { id: 'f_movil', label: 'Optimización Móvil', description: 'Diseño responsivo que garantiza que tu sitio se vea y funcione de forma impecable en celulares y tablets.', price: 150, type: 'one-time' },
      { id: 'f_seo_basico', label: 'SEO Básico', description: 'Configuración técnica inicial para que Google y otros buscadores comiencen a indexar tu página.', price: 250, type: 'one-time' },
      { id: 'f_seo_avanzado', label: 'SEO Avanzado', description: 'Estrategia profunda de palabras clave y estructura para posicionar tu sitio en los primeros lugares de búsqueda.', price: 700, type: 'one-time' },
      { id: 'f_reservas', label: 'Sistema de Reservas', description: 'Calendario automatizado interactivo para que tus clientes agenden citas o reuniones de forma fácil.', price: 600, type: 'one-time' },
      { id: 'f_pagos', label: 'Integración de Pagos', description: 'Conexión segura con pasarelas (como PayPal, Stripe) para cobrar tarjetas de crédito o débito.', price: 500, type: 'one-time' },
      { id: 'f_login', label: 'Login de Usuarios', description: 'Zona privada donde los usuarios pueden crear cuentas, iniciar sesión y recuperar contraseñas.', price: 450, type: 'one-time' },
      { id: 'f_admin', label: 'Dashboard Administrativo', description: 'Panel de control protegido para que tú mismo gestiones usuarios, contenido y configuraciones del sitio.', price: 900, type: 'one-time' },
      { id: 'f_analitico', label: 'Dashboard Analítico', description: 'Panel con gráficos y reportes detallados sobre el uso, interacciones y rendimiento de tu plataforma.', price: 1200, type: 'one-time' },
      { id: 'f_inventario', label: 'Inventario', description: 'Módulo especializado para el control en tiempo real del stock, entradas y salidas de tus productos.', price: 850, type: 'one-time' },
      { id: 'f_reportes', label: 'Reportes PDF/Excel', description: 'Funcionalidad para generar automáticamente documentos y bases de datos que se pueden descargar.', price: 300, type: 'one-time' },
      { id: 'f_api', label: 'API Personalizada', description: 'Creación de puntos de conexión para que tu web se pueda integrar y compartir datos con otros sistemas.', price: 1000, type: 'one-time' },
      { id: 'f_automatizacion', label: 'Automatizaciones', description: 'Procesos inteligentes para ahorrarte trabajo manual (por ejemplo, correos automáticos de bienvenida o facturas).', price: 800, type: 'one-time' },
      { id: 'f_blog', label: 'Blog', description: 'Sección especializada de artículos para generar contenido de valor, noticias y atraer tráfico orgánico.', price: 250, type: 'one-time' },
      { id: 'f_animaciones', label: 'Animaciones Premium', description: 'Efectos visuales deslumbrantes que se activan al hacer scroll y explorar la página, sorprendiendo al usuario.', price: 300, type: 'one-time' },
    ]
  },
  {
    id: 'content',
    title: '5. Contenido',
    subtitle: '¿Necesitas ayuda con la creación de contenido?',
    multiSelect: true,
    options: [
      { id: 'c_redaccion', label: 'Redacción Profesional', description: 'Textos persuasivos y optimizados (copywriting) orientados a vender y conectar emocionalmente con tu audiencia.', price: 300, type: 'one-time' },
      { id: 'c_foto', label: 'Fotografía Profesional', description: 'Sesión fotográfica presencial de alta calidad de tus productos, tu oficina o tu equipo de trabajo.', price: 900, type: 'one-time' },
      { id: 'c_video', label: 'Video Promocional', description: 'Producción audiovisual profesional para mostrar lo mejor de tu negocio de una forma dinámica e impactante.', price: 1500, type: 'one-time' },
      { id: 'c_traduccion', label: 'Traducción Inglés', description: 'Traducción completamente humana, precisa y adaptada culturalmente de todo tu sitio web.', price: 400, type: 'one-time' },
    ]
  },
  {
    id: 'hosting',
    title: '6. Hosting y Dominio',
    subtitle: 'Alojamiento para tu proyecto',
    multiSelect: true,
    options: [
      { id: 'h_dominio', label: 'Dominio (.com)', description: 'El nombre único que tendrás en internet (ejemplo: www.tuempresa.com).', price: 25, type: 'yearly' },
      { id: 'h_basico', label: 'Hosting Básico', description: 'Servidor compartido seguro y estable, ideal para la gran mayoría de sitios nuevos con tráfico moderado.', price: 120, type: 'yearly' },
      { id: 'h_premium', label: 'Hosting Premium', description: 'Servidor de alto rendimiento (cloud), más rápido y con recursos exclusivos para soportar miles de visitas.', price: 350, type: 'yearly' },
      { id: 'h_correos', label: 'Correos Corporativos', description: 'Creación y configuración de cuentas profesionales con el nombre de tu empresa (ej: ventas@tuempresa.com).', price: 80, type: 'one-time' },
    ]
  },
  {
    id: 'deliveryTime',
    title: '7. Tiempo de Entrega',
    subtitle: '¿Qué tan rápido necesitas el proyecto?',
    multiSelect: false,
    options: [
      { id: 'dt_normal', label: 'Tiempo Normal', description: 'Ritmo de trabajo estándar enfocado en los detalles sin presión de tiempo extrema.', price: 0, percentage: 0, type: 'one-time' },
      { id: 'dt_urgente', label: 'Urgente (7–10 días)', description: 'Horas extras asignadas a tu proyecto para lanzarlo más rápido que el promedio.', price: 0, percentage: 0.20, type: 'one-time' },
      { id: 'dt_express', label: 'Express (3–5 días)', description: 'Dedicación exclusiva y acelerada para emergencias, trabajando fines de semana si es necesario.', price: 0, percentage: 0.35, type: 'one-time' },
    ]
  },
  {
    id: 'maintenance',
    title: '8. Planes de Mantenimiento',
    subtitle: 'Soporte y actualizaciones continuas',
    multiSelect: false,
    options: [
      { id: 'm_sin', label: 'Sin Mantenimiento', description: 'Una vez entregado el proyecto, tú asumes el control absoluto y su mantenimiento.', price: 0, type: 'monthly' },
      { id: 'm_basico', label: 'Básico', description: 'Actualizaciones de sistema, monitoreo de que la página siga en línea y copias de seguridad mensuales.', price: 80, type: 'monthly' },
      { id: 'm_profesional', label: 'Profesional', description: 'Soporte con prioridad, optimización continua de velocidad y cambios menores de contenido a solicitud.', price: 200, type: 'monthly' },
      { id: 'm_premium', label: 'Premium', description: 'Gestión total: mejoras constantes, seguridad contra hackeos y atención inmediata 24/7.', price: 450, type: 'monthly' },
    ]
  }
];
