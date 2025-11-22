# EcoAI — Calculadora del Impacto Ambiental del Uso de IA

[![Tests](https://img.shields.io/badge/tests-53%20passing-brightgreen)](./TEST_RESULTADOS.md)
[![Coverage](https://img.shields.io/badge/coverage-87%25-yellowgreen)](./htmlcov/index.html)
[![Python](https://img.shields.io/badge/python-3.13-blue)](https://python.org)
[![Flask](https://img.shields.io/badge/flask-3.0+-red)](https://flask.palletsprojects.com/)
[![Chart.js](https://img.shields.io/badge/chart.js-4.4+-orange)](https://www.chartjs.org/)

**EcoAI** es una aplicación web desarrollada con **Python** y **Flask** que permite calcular y visualizar el **impacto ambiental del uso de la inteligencia artificial**, expresado en consumo de agua, energía y emisiones de CO₂.

## Índice
1. [Características Principales](#características-principales)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas) 
3. [Instalación y Configuración](#instalación-y-configuración)
4. [Uso de la Aplicación](#uso-de-la-aplicación)
5. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
6. [Testing y Calidad de Código](#testing-y-calidad-de-código)
7. [Estructura de CSS Modular](#estructura-de-css-modular)
8. [Implementación de Gráficos](#implementación-de-gráficos)
9. [API y Endpoints](#api-y-endpoints)
10. [Historias de Usuario](#historias-de-usuario)
11. [Contribución](#contribución)
12. [Equipo de Desarrollo](#equipo-de-desarrollo)
13. [Licencia](#licencia)

---

## Características Principales

### Calculadora de Impacto Ambiental
- **Cálculo preciso** del consumo de agua, energía y CO₂ por consultas de IA
- **Soporte para múltiples modelos**: GPT-4 Turbo, Claude 3 Opus, Gemini 1.5 Pro, Whisper Large V3
- **Tipos de consulta**: Texto, código, imagen, audio y video
- **Equivalencias cotidianas**: "Tu consumo equivale a X vasos de agua /  X minutos de luz LED / X km de recorrido en auto"

### Visualizaciones Interactivas
- **Gráficos comparativos** entre modelos de IA
- **Análisis de distribución** energética por tipo de consulta  
- **Cards dinámicas** con equivalencias ambientales
- **Proyecciones de uso** acumulado y eficiencia

### Interfaz de Usuario Moderna
- **Diseño responsivo** para desktop, tablet y móvil
- **Smooth scrolling** y animaciones fluidas
- **Paleta de colores eco-friendly** (verde y azul)
- **Iconografía intuitiva** con emojis ambientales

### Calidad y Confiabilidad
- **87% de cobertura de tests** con 53 tests automatizados
- **Validación exhaustiva** de formularios y datos
- **Manejo robusto de errores** y casos extremos
- **Estructura modular** para fácil mantenimiento

---

## Tecnologías Utilizadas

### Backend
- **Python 3.13** - Lenguaje principal
- **Flask 3.0+** - Framework web minimalista
- **Pandas** - Procesamiento y análisis de datos
- **Pytest** - Framework de testing con cobertura

### Frontend  
- **HTML5 semántico** con templates Jinja2
- **CSS modular** (13 archivos especializados)
- **JavaScript vanilla** para interactividad
- **Chart.js 4.4+** para visualizaciones dinámicas

### Herramientas de Desarrollo
- **Git/GitHub** - Control de versiones y colaboración
- **VS Code** - Editor con extensiones Python
- **pytest-cov** - Reportes de cobertura de código
- **GitHub Actions** (futuro) - CI/CD automatizado

### Estructura de Datos
- **CSV personalizado** con datos de impacto ambiental
- **15+ filas de datos** validados y curados
- **4 modelos de IA** con 5 tipos de consulta cada uno

---

## Instalación y Configuración

### Prerrequisitos
- Python 3.13+ instalado
- Git para clonar el repositorio
- Editor de código (VS Code recomendado)

### Clonar el Repositorio
```bash
git clone https://github.com/martinaemunoz/ecoai-latinasincloud.git
cd ecoai-latinasincloud
```

### Crear Entorno Virtual
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux  
python3 -m venv venv
source venv/bin/activate
```

### Instalar Dependencias
```bash
pip install -r requirements.txt
```

### Ejecutar la Aplicación
```bash
python app.py
```

La aplicación estará disponible en `http://localhost:5000`

### Ejecutar Tests
```bash
# Ejecutar todos los tests
pytest tests/ -v

# Con reporte de cobertura
pytest tests/ --cov=. --cov-report=term-missing --cov-report=html

# Tests específicos
pytest tests/test_calculator.py -v
pytest tests/test_flask_routes.py -v
```

---

## Uso de la Aplicación

### 1. Página Principal
- **Descripción** del proyecto y su propósito
- **Formulario** para seleccionar modelo, tipo de consulta y cantidad
- **Validación** en tiempo real de campos
- **Información** sobre metodología y fuentes (TO DO)

### 2. Calculadora de Impacto
1. **Selecciona un modelo**: GPT-4 Turbo, Claude 3, Gemini 1.5, Whisper Large V3
2. **Elige tipo de consulta**: Texto, código, imagen, audio o video
3. **Ingresa la cantidad**: Número de consultas o minutos
4. **Obtén resultados**: Agua (L), energía (kWh), CO₂ (g)

### 3. Resultados y Equivalencias
- **Cards visuales** con iconos representativos
- **Equivalencias cotidianas**: vasos de agua, horas de LED, etc.
- **Resumen** de la consulta realizada
- **Opciones** para calcular nuevamente o ver comparativas

### 4. Gráficos y Análisis (En desarrollo)
- **Comparativas** entre modelos
- **Distribución** de consumo energético
- **Proyecciones** de uso acumulado
- **Índice** de eficiencia ambiental

---

## Arquitectura del Proyecto

### Estructura de Directorios
```
ecoai/
├── app.py                      # Aplicación Flask principal
├── requirements.txt            # Dependencias Python
├── data/
│   └── ecoai_dataset.csv      # Dataset con datos de impacto
├── templates/                  # Templates Jinja2
│   ├── base.html              # Template base
│   ├── index.html             # Página principal
│   ├── results.html           # Página de resultados
│   └── results_charts.html    # Página de gráficos
├── static/                     # Archivos estáticos
│   ├── css/                   # Estilos modulares (13 archivos)
│   │   ├── style.css          # Archivo principal
│   │   ├── variables.css      # Variables globales
│   │   ├── base.css           # Reset y base
│   │   ├── navbar.css         # Navegación
│   │   ├── forms.css          # Formularios
│   │   ├── buttons.css        # Botones
│   │   ├── results.css        # Resultados
│   │   ├── charts.css         # Gráficos
│   │   └── responsive.css     # Media queries
│   └── js/
│       ├── main.js            # JavaScript principal
│       └── charts.js          # Funciones de Chart.js
├── utils/                      # Utilidades y lógica de negocio
│   ├── __init__.py
│   └── calculator.py          # Lógica de cálculos
├── tests/                      # Tests automatizados
│   ├── __init__.py
│   ├── conftest.py            # Configuración de pytest
│   ├── test_calculator.py     # Tests unitarios (33 tests)
│   └── test_flask_routes.py   # Tests de integración (20 tests)
└── htmlcov/                    # Reportes de cobertura HTML
```

### Flujo de Datos
```
Usuario → Formulario (index.html) 
    ↓
Flask app.py recibe POST /calcular
    ↓
utils/calculator.py procesa datos + CSV
    ↓
Cálculos de impacto ambiental
    ↓
Render results.html con resultados
    ↓
JavaScript (main.js) mejora UX
```

---

## Testing y Calidad de Código

### Estadísticas de Testing
- **Total Tests**: 53 (100% passing)
- **Cobertura**: 87%
- **Tiempo de ejecución**: 1.48s
- **Tests unitarios**: 33 (62.3%)
- **Tests de integración**: 20 (37.7%)

### Tipos de Tests Implementados

#### Tests Unitarios (`test_calculator.py`)
- ✅ **Validación de entrada** (modelos, tipos, cantidades)
- ✅ **Cálculos matemáticos** (escalamiento, precisión)
- ✅ **Integridad de datos** (CSV, campos requeridos)
- ✅ **Casos extremos** (valores grandes, decimales)

#### Tests de Integración (`test_flask_routes.py`)
- ✅ **Rutas Flask** (GET /, POST /calcular)
- ✅ **Renderización de templates** (index.html, results.html)
- ✅ **Formularios** (validación, envío)
- ✅ **Contenido de respuesta** (HTML, datos)

### Métricas de Calidad
| Archivo | Statements | Missing | Cobertura | Líneas faltantes |
|---------|-----------|---------|-----------|------------------|
| **app.py** | 22 | 6 | **73%** | 31-38, 46 |
| **utils/calculator.py** | 87 | 38 | **56%** | 24-26, 40-62, 71-93, 102-112 |
| **Tests** | 254 | 2 | **99%** | Configuración auxiliar |

### Ejecutar Tests
```bash
# Todos los tests con verbose
pytest tests/ -v

# Con cobertura detallada
pytest tests/ --cov=. --cov-report=term-missing --cov-report=html

# Tests específicos
pytest tests/test_calculator.py::TestCalcularImpactoValidInput -v
```

---

## Estructura de CSS Modular

### Filosofía de Diseño
El CSS está dividido en **13 módulos especializados** para mejorar mantenibilidad y escalabilidad:

### Módulos Principales
```css
/* Configuración global */
variables.css     /* Variables CSS, colores, sombras */
base.css         /* Reset CSS, estilos base */

/* Componentes de UI */
navbar.css       /* Navegación sticky */
forms.css        /* Formularios e inputs */
buttons.css      /* Botones con animaciones */
results.css      /* Cards de resultados */
modal.css        /* Modales y overlays */

/* Layout y secciones */
layout.css       /* Hero, features, layout general */
info-section.css /* Sección informativa */
footer.css       /* Pie de página */

/* Efectos y responsive */
animations.css   /* Keyframes y transiciones */
charts.css       /* Estilos para gráficos */
responsive.css   /* Media queries */
```

### Paleta de Colores
| Variable | Valor | Uso |
|----------|-------|-----|
| `--primary-color` | #10b981 | Botones, acentos principales |
| `--primary-dark` | #059669 | Estados hover |
| `--secondary-color` | #3b82f6 | Botones secundarios |
| `--text-dark` | #1f2937 | Texto principal |
| `--text-light` | #6b7280 | Texto secundario |

### Breakpoints Responsive
- **Desktop**: 1200px+
- **Tablet**: ≤768px 
- **Mobile**: ≤480px

---

## Implementación de Gráficos

### Chart.js Integration
EcoAI utiliza **Chart.js 4.4+** para visualizaciones interactivas:

### Gráficos Implementados

#### 1. Comparación por Modelo (Bar Chart)
```javascript
// agua, energía y CO₂ por cada modelo de IA
initModelComparisonChart(chartData)
```

#### 2. Distribución por Tipo (Radar Chart)  
```javascript
// impacto relativo de texto, código, imagen, audio, video
initQueryTypeChart(chartData)
```

#### 3. Distribución Energética (Pie Chart)
```javascript
// % de energía consumida por tipo de consulta
initEnergyDistributionChart(chartData)
```

#### 4. Equivalencias Visuales (Cards HTML)
```javascript
// cards dinámicas con iconos y equivalencias
updateEquivalenceCards(chartData)
```

#### 5. Impacto Acumulado (Line Chart)
```javascript
// proyección de consumo: 1, 10, 100, 1K, 10K consultas
initCumulativeImpactChart(chartData)
```

#### 6. Índice de Eficiencia (Horizontal Bar)
```javascript
// ranking de eficiencia ambiental por modelo
initEfficiencyIndexChart(chartData)
```

### Estructura de Datos
```javascript
const chartData = {
    models: ['GPT-4 Turbo', 'Claude 3 Opus', 'Gemini 1.5 Pro', 'Whisper Large V3'],
    queryTypes: ['texto', 'código', 'imagen', 'audio', 'video'],
    modelStats: {
        'GPT-4 Turbo': { agua: 1.23, energia: 0.35, carbono: 0.78 }
        // ... más modelos
    },
    queryTypeStats: {
        'texto': { agua: 0.7, energia: 0.13, carbono: 0.27 }
        // ... más tipos
    }
};
```

### Paleta de Colores para Gráficos
```javascript
const COLOR_PALETTE = {
    agua: 'rgba(54, 162, 235, 0.7)',      // Azul
    energia: 'rgba(255, 206, 86, 0.7)',   // Amarillo  
    carbono: 'rgba(75, 192, 75, 0.7)',    // Verde
    models: [
        'rgba(255, 99, 132, 0.7)',         // GPT-4
        'rgba(54, 162, 235, 0.7)',         // Claude
        'rgba(255, 206, 86, 0.7)',         // Gemini
        'rgba(153, 102, 255, 0.7)'         // Whisper
    ]
};
```

---

## API y Endpoints

### Rutas Principales

#### `GET /`
- **Descripción**: Página principal con formulario
- **Template**: `index.html`
- **Funcionalidad**: Mostrar calculadora y información

#### `POST /calcular`  
- **Descripción**: Procesar cálculo de impacto
- **Parámetros**: 
  - `modelo`: Nombre del modelo de IA
  - `tipo_consulta`: Tipo de consulta (texto, código, etc.)
  - `cantidad`: Número de consultas/minutos
- **Respuesta**: Render `results.html` con datos calculados
- **Validación**: Modelo válido, tipo válido, cantidad > 0

#### `GET /comparativo` (En desarrollo)
- **Descripción**: Página de gráficos y análisis
- **Template**: `results_charts.html`  
- **Funcionalidad**: Visualizaciones interactivas

### Ejemplo de Respuesta
```python
resultado = {
    'modelo': 'GPT-4 Turbo',
    'tipo_consulta': 'texto', 
    'cantidad': 10,
    'cantidad_formateada': '10 consultas',
    'agua': 12.30,           # Litros
    'energia': 3.50,         # kWh 
    'co2': 7.80,            # Gramos
    'eq_agua': '49.2 vasos de agua (250ml)',
    'eq_energia': '210 minutos de LED (60W)',
    'eq_co2': '0.065 km en automóvil'
}
```

### Manejo de Errores
```python
# Casos de error comunes
- Modelo no encontrado → "Modelo no encontrado en dataset"
- Tipo inválido → "Tipo de consulta no válido"  
- Cantidad inválida → "La cantidad debe ser mayor a 0"
- CSV no encontrado → Error del servidor (manejo interno)
```

---

## Historias de Usuario

### HU1 — Calcular impacto ambiental 
> *Como usuaria curiosa del impacto ecológico de la IA, quiero ingresar mis datos de uso (tipo de modelo y número de consultas) para conocer cuánta agua y energía se consume en promedio.*

**Criterios de aceptación:**
- ✅ El formulario permite seleccionar modelo y cantidad de consultas
- ✅ Al enviar los datos, se muestra un resumen con resultados de agua, energía y CO₂
- ✅ Validación en tiempo real de campos
- ✅ Equivalencias cotidianas comprensibles

**Estado**: Implementado completamente

### HU2 — Visualizar resultados de forma clara ✅  
> *Como usuaria, quiero ver mis resultados mediante gráficos para entender mejor mi impacto ambiental.*

**Criterios de aceptación:**
- ✅ Cards visuales con iconos representativos
- ✅ Colores específicos por métrica (azul=agua, amarillo=energía, verde=CO₂)
- ✅ Equivalencias en texto simple y comprensible
- 🔄 Gráficos interactivos (en desarrollo)

**Estado**: Mayormente implementado, gráficos en progreso

### HU3 — Comparar entre modelos de IA 🔄
> *Como usuaria técnica, quiero comparar la eficiencia ambiental entre diferentes modelos de IA para tomar decisiones informadas.*

**Criterios de aceptación:**
- 🔄 Gráfico comparativo entre modelos
- 🔄 Métricas de eficiencia ambiental
- 🔄 Recomendaciones basadas en uso

**Estado**: En desarrollo (página de gráficos)

### HU4 — Entender mi impacto a largo plazo 📋
> *Como usuaria recurrente, quiero proyectar mi impacto mensual/anual según mi frecuencia de uso.*

**Criterios de aceptación:**
- 📋 Proyección de uso acumulado
- 📋 Equivalencias a escala temporal
- 📋 Consejos para reducir impacto

**Estado**: Planificado (futuras iteraciones)

---

## Contribución

### Cómo Contribuir
1. **Fork** el repositorio
2. **Crea** una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Desarrolla** siguiendo las convenciones del proyecto
4. **Ejecuta** tests (`pytest tests/ -v`)
5. **Commit** con mensajes descriptivos
6. **Push** a tu rama (`git push origin feature/nueva-funcionalidad`)
7. **Abre** un Pull Request

### Convenciones de Código
- **Python**: PEP 8, docstrings, type hints cuando sea apropiado
- **HTML**: Semántico, accesible, templates Jinja2
- **CSS**: Modular, variables CSS, mobile-first
- **JavaScript**: ES6+, funciones puras, comentarios descriptivos

### Estructura de Commits
```bash
tipo(alcance): descripción breve

# Ejemplos:
feat(calculator): agregar soporte para modelo Claude 3.5
fix(css): corregir responsive en móviles
test(routes): agregar tests para validación de formularios
docs(readme): actualizar documentación de instalación
```

### Testing Requirements
- ✅ Tests unitarios para nueva lógica
- ✅ Tests de integración para nuevas rutas
- ✅ Mantener cobertura ≥85%
- ✅ Todos los tests deben pasar

### Próximas Mejoras
- [✅] **Implementar gráficos Chart.js** (prioridad alta)
- [✅] **Completar endpoint /comparativo** 
- [ ] **Mejorar cobertura de tests** al 95%
- [ ] **Agregar tests de rendimiento**
- [ ] **Implementar caché de datos**
- [ ] **Internacionalización** (i18n)
- [ ] **PWA** para uso offline
- [ ] **API REST** para terceros

---

## Equipo de Desarrollo

### Desarrolladoras Principales
- **Estrella Alberto** - Data Science & UX/UI
- **Martina Muñoz** - Backend, Testing, DevOps

## Licencia

Este proyecto está desarrollado como parte del curso de **Python con Flask** de **Latinas in Cloud**.

**Objetivos de Aprendizaje Logrados:**
- ✅ Desarrollo web con Flask y Python
- ✅ Manipulación de datos con Pandas  
- ✅ Frontend responsivo con HTML/CSS/JS
- ✅ Testing automatizado con pytest
- ✅ Control de versiones con Git/GitHub
- ✅ Trabajo colaborativo en equipo
- ✅ Documentación técnica completa

---

**💚 Proyecto realizado con ❤️ por el equipo EcoAI**  
**Noviembre 2025 • Latinas in Cloud • Python + Flask Cohort**

[![Latinas in Cloud](https://img.shields.io/badge/Latinas%20in%20Cloud-2025-purple)](https://latinasincloud.org)
[![Python](https://img.shields.io/badge/Made%20with-Python-3776ab)](https://python.org)

[![Flask](https://img.shields.io/badge/Powered%20by-Flask-000000)](https://flask.palletsprojects.com)

