# 📚 Estructura Modular de CSS - EcoAI

## Descripción

El CSS de EcoAI ha sido dividido en módulos temáticos para mejorar la mantenibilidad, claridad y escalabilidad del código. Cada archivo CSS es responsable de un aspecto específico de la aplicación.

## 📁 Estructura de Archivos

```
static/css/
├── style.css              # Archivo principal que importa todos los módulos
├── variables.css          # Variables y configuración global
├── base.css               # Reset CSS y estilos base
├── navbar.css             # Estilos del navbar/header
├── layout.css             # Sección de bienvenida y disposición general
├── forms.css              # Estilos de formularios e inputs
├── buttons.css            # Estilos de botones
├── info-section.css       # Sección de información
├── results.css            # Sección de resultados y tarjetas
├── modal.css              # Estilos del modal
├── footer.css             # Estilos del footer
├── animations.css         # Keyframes y animaciones
├── responsive.css         # Media queries y diseño responsivo
└── utilities.css          # Clases de utilidad
```

## 📖 Descripción de Módulos

### **variables.css**
Define todas las variables CSS globales:
- Colores principales y secundarios
- Colores de texto y fondo
- Sistema de sombras (4 niveles)
- Sistema de transiciones
- Border radius estándar

```css
--primary-color: #10b981
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
--radius-lg: 0.75rem
```

### **base.css**
Reset CSS y estilos base para elementos:
- Normalización de márgenes y padding
- Smooth scrolling
- Estilos globales para body
- Estilos de enlaces

### **navbar.css**
Componentes del navegador:
- `.navbar` - Contenedor principal (sticky)
- `.navbar-brand` - Logo y nombre
- `.navbar-nav` - Links de navegación
- Responsive en mobile

### **layout.css**
Estructura de secciones:
- `.main-content` - Contenedor general
- **Welcome Section** - Hero, descripción y características
- `.features-grid` - Grid de 3 tarjetas de características
- `.welcome-container` - Dos columnas (contenido + imagen)

### **forms.css**
Estilos de formularios:
- `.calculator-container` - Contenedor del formulario
- `.form-group` - Agrupación de elementos
- `.form-select`, `.form-input` - Campos de entrada
- Estados: focus, disabled
- `.form-hint` - Textos de ayuda
- `.form-error` - Mensajes de error

### **buttons.css**
Variantes de botones:
- `.btn-primary` - Botón principal (verde)
- `.btn-secondary` - Botón secundario (azul)
- `.btn-lg` - Tamaño grande
- Estados: hover, disabled
- `.btn-icon` - Soporte para iconos

### **info-section.css**
Sección informativa:
- `.info-grid` - Grid responsivo
- `.info-card` - Tarjetas con gradiente
- `.info-number` - Círculo numerado
- Estilos tipográficos

### **results.css**
Visualización de resultados:
- `.results-grid` - Grid de tarjetas de resultados
- `.result-card` - Tarjetas individuales (water, energy, carbon)
- Color-coded top borders
- `.summary-card` - Resumen de consulta
- `.cta-section` - Call-to-action
- Estados: success, error, empty

### **modal.css**
Modal para comparaciones:
- `.modal` - Overlay y contenedor
- `.modal-content` - Caja de contenido
- `.modal-close` - Botón cerrar
- `.placeholder` - Placeholders para gráficos
- Estados: hidden

### **footer.css**
Sección de pie de página:
- `.footer` - Fondo oscuro
- `.footer-content` - Grid de secciones
- `.footer-section` - Columnas con enlaces
- `.footer-bottom` - Copyright

### **animations.css**
Keyframes y efectos:
- `slideInLeft` - Entrada desde la izquierda
- `slideInRight` - Entrada desde la derecha
- `fadeIn` - Desvanecimiento
- `float` - Efecto flotante (hero illustration)

### **responsive.css**
Media queries para todos los tamaños:
- **Tablet (≤768px)** - Ajustes para tablets
- **Mobile (≤480px)** - Ajustes para móviles
- Stack vertical, redimensionamiento de fuentes
- Ocultar elementos no esenciales

### **utilities.css**
Clases de utilidad:
- `.hidden` - Ocultar elementos (display: none)
- `.sr-only` - Screen reader only (accesibilidad)

## 🔄 Orden de Carga

El archivo `style.css` importa los módulos en este orden:

1. **Configuración** (variables, base)
2. **Componentes** (navbar, layout, forms, buttons, etc.)
3. **Efectos** (animations)
4. **Responsive** (media queries)
5. **Utilidades** (helpers)

Este orden asegura que:
- Las variables se carguen primero
- Los estilos base no sean sobrescritos
- Las media queries se apliquen al final
- Las utilidades tengan prioridad

## 🛠️ Cómo Mantener y Extender

### Agregar una Nueva Sección
1. Crear nuevo archivo `static/css/nueva-seccion.css`
2. Escribir estilos para los componentes
3. Agregar import en `style.css`:
```css
@import url('nueva-seccion.css');
```

### Modificar Colores Globales
1. Editar `variables.css`
2. Todos los componentes se actualizarán automáticamente
3. Ejemplo: cambiar `--primary-color` actualiza toda la app

### Agregar una Animación
1. Editar `animations.css`
2. Agregar nuevo `@keyframes`
3. Usar en componentes:
```css
animation: mi-nueva-animacion 0.6s ease-out;
```

### Hacer Responsive
1. Agregar reglas en `responsive.css`
2. Usar media queries existentes o crear nuevas
3. Probar en breakpoints: 480px, 768px, 1200px

## 📊 Estadísticas

- **Total líneas de CSS**: ~650+ (distribuidas)
- **Número de módulos**: 13
- **Variables CSS**: 20+
- **Breakpoints responsive**: 2 (tablet, mobile)
- **Animaciones**: 4 keyframes
- **Clases de utilidad**: 2

## ✨ Beneficios de la Estructura Modular

✅ **Claridad** - Cada archivo tiene una responsabilidad clara
✅ **Mantenibilidad** - Fácil encontrar y modificar estilos
✅ **Escalabilidad** - Agregar nuevas secciones sin conflictos
✅ **Reutilización** - Variables compartidas en toda la app
✅ **Debugging** - Errores localizados en módulos específicos
✅ **Colaboración** - Equipo puede trabajar en diferentes módulos

## 🎨 Paleta de Colores

| Nombre | Valor | Uso |
|--------|-------|-----|
| Primary | #10b981 | Botones, links, acentos |
| Primary Dark | #059669 | Hover states |
| Primary Light | #d1fae5 | Backgrounds |
| Secondary | #3b82f6 | Botones alternativos |
| Danger | #ef4444 | Errores, advertencias |
| Warning | #f59e0b | Alertas (energía) |
| Text Dark | #1f2937 | Texto principal |
| Text Light | #6b7280 | Texto secundario |
| Background | #f9fafb | Backgrounds claros |
| White | #ffffff | Fondo blanco |

## 📱 Breakpoints

| Dispositivo | Ancho Máximo | Archivo |
|------------|-------------|---------|
| Desktop | 1200px+ | Sin cambios |
| Tablet | ≤768px | responsive.css |
| Mobile | ≤480px | responsive.css |

---

**Última actualización**: Noviembre 2025
**Versión**: 2.0 (Modularizada)
