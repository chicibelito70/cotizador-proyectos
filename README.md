# 💎 Cotizador de Proyectos Inteligente (Premium)

Este es un sistema web interactivo de alta gama diseñado para automatizar el proceso de cotización de servicios digitales (Páginas Web, Tiendas Online, Branding, SEO, etc.). Ofrece una experiencia de usuario fluida, asesoramiento en tiempo real y generación automática de presupuestos profesionales.

---

## 🚀 Características Principales

- **Interfaz de Usuario Premium**: Diseño moderno con enfoque en *Dark Mode*, *Glassmorphism* y tipografía *Outfit*.
- **Asistente de Cotización (Wizard)**: Flujo dinámico paso a paso que evita la carga cognitiva.
- **Cálculo en Tiempo Real**: Los subtotales y totales se actualizan instantáneamente basándose en las selecciones.
- **Lógica de Negocio Inteligente**: Evaluación automática de descuentos (ej: 20% dcto por Rediseño) y ajustes por tiempo de entrega.
- **Asesoramiento Detallado**: Cada opción incluye una descripción técnica y comercial para guiar al cliente.
- **Omnicanalidad**: Botón flotante de WhatsApp integrado con mensajes pre-configurados.
- **Automatización de Email**: Envío de resumen detallado con diseño HTML profesional tanto al cliente como al administrador.

---

## 🛠️ Stack Tecnológico

- **Framework**: React + Vite (TypeScript)
- **Animaciones**: Framer Motion
- **Iconografía**: Lucide React
- **Estilos**: Vanilla CSS (Arquitectura modular)
- **Email Service**: EmailJS (Integración segura sin backend propio)

---

## ⚙️ Configuración del Proyecto

### Requisitos Previos
- Node.js instalado.
- Cuenta en EmailJS para la gestión de correos.

### Instalación
1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar dependencias.
3. Crear un archivo `.env` (opcional) o configurar las credenciales directamente en `src/App.tsx`.

### Seguridad y Variables de Entorno
Para mantener la seguridad de la aplicación, las credenciales de EmailJS deben ser gestionadas mediante variables de entorno en producción:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

---



```bash
# Para generar la versión de producción
npm run build
```

---

## 📄 Estructura de Datos

Toda la lógica de precios y servicios se encuentra centralizada en `src/data/options.ts`, lo que permite una edición rápida de tarifas y descripciones sin tocar la lógica del componente principal.

---

**Desarrollado con enfoque en conversión y experiencia de usuario.**
