# EcoAI — Calculadora del Impacto Ambiental del Uso de IA

## Índice
1. Resumen del Proyecto  
2. Objetivos Generales  
3. Definición de Producto  
4. Historias de Usuario  
5. Diseño de Interfaz de Usuario  
   - 5.1 Prototipo de Baja Fidelidad  
   - 5.2 Prototipo de Alta Fidelidad  
   - 5.3 Testeos de Usabilidad  
6. Pruebas Unitarias  
7. Objetivos de Aprendizaje  

---

## 1. Resumen del Proyecto

**EcoAI** es una aplicación web desarrollada con **Python** y **Flask** que permite calcular y visualizar el **impacto ambiental del uso de la inteligencia artificial**, expresado en consumo de agua, energía y emisiones de CO₂.  

El sistema utiliza un **dataset propio** que relaciona el tipo de modelo de IA y el volumen de consultas con el consumo de recursos, entregando resultados personalizados y comparaciones con promedios globales.  

Además, el proyecto incorpora un **modelo predictivo simple** (Machine Learning) que estima el impacto mensual del usuario según su frecuencia de uso.

---

## 2. Objetivos Generales

- Desarrollar una aplicación web CRUD con **Flask** y **Python**.  
- Implementar una API para calcular y predecir el consumo ambiental según parámetros ingresados.  
- Incluir visualizaciones dinámicas de los resultados con **Chart.js**.  
- Aplicar conceptos básicos de **ciencia de datos** para procesar y analizar el dataset.  
- Desarrollar una estructura colaborativa, asignando roles específicos a las integrantes del equipo.  
- Documentar el proceso completo y asegurar la funcionalidad mediante pruebas manuales y unitarias.  

---

## 3. Definición de Producto

**EcoAI** está dirigida a usuarios interesados en conocer el **impacto ambiental de su uso de herramientas de IA** (como ChatGPT, Gemini o Claude).  
La aplicación permite ingresar datos de uso, tipo de modelo y frecuencia para calcular el consumo estimado en:
- Litros de agua 💧  
- Watts-hora ⚡  
- Gramos de CO₂ 🌫️  

El usuario puede:
- Registrar su uso estimado.  
- Visualizar sus resultados con gráficos interactivos.  
- Comparar su consumo con el promedio global.  
- Consultar equivalencias ecológicas (por ejemplo, “X litros de agua ≈ duchas de 5 minutos”).  

**Tecnologías utilizadas:**
- Python (Flask, Pandas, scikit-learn)  
- HTML / CSS / Bootstrap  
- Chart.js  
- Git / GitHub  

---

## 4. Historias de Usuario

**HU1 — Calcular impacto ambiental**  
> *Como usuaria curiosa del impacto ecológico de la IA, quiero ingresar mis datos de uso (tipo de modelo y número de consultas) para conocer cuánta agua y energía se consume en promedio.*

**Criterios de aceptación:**
- El formulario debe permitir seleccionar modelo y cantidad de consultas.  
- Al enviar los datos, se muestra un resumen con resultados de agua, energía y CO₂.

---

**HU2 — Visualizar resultados de forma clara**  
> *Como usuaria, quiero ver mis resultados mediante gráficos para entender mejor mi impacto ambiental.*

**Criterios de aceptación:**
- Gráfico de barras o torta con los tres indicadores.  
- Texto explicativo con equivalencias (“Tu consumo equivale a X duchas”).  

---

**HU3 — Predecir consumo mensual**  
> *Como usuaria recurrente, quiero estimar mi impacto mensual según mi frecuencia de uso.*

**Criterios de aceptación:**
- Campo adicional para frecuencia semanal.  
- Resultado predictivo basado en modelo de regresión lineal.  

---

## 5. Diseño de Interfaz de Usuario

### 5.1 Prototipo de Baja Fidelidad

El primer prototipo se diseñó para definir la estructura del flujo principal:
- Pantalla de inicio con descripción del proyecto.  
- Formulario de cálculo (inputs para modelo, consultas, frecuencia).  
- Dashboard de resultados.  

*El prototipo fue hecho en papel y luego digitalizado.*

---

### 5.2 Prototipo de Alta Fidelidad

El diseño final incluye una paleta de colores naturales (verde y azul), íconos ecológicos y un layout simple con navegación clara.

🖼️ **Secciones:**
1. Inicio  
2. Calculadora de Impacto  
3. Resultados y Visualizaciones  
4. Información y contexto ambiental  

> El prototipo fue realizado en **Figma** y refleja la estructura del proyecto Flask.

---

### 5.3 Testeos de Usabilidad

Durante el desarrollo se realizaron pruebas con usuarios reales y compañeras de equipo.  
**Principales ajustes realizados:**
- Se aumentó el contraste de los gráficos para mejor legibilidad.  
- Se simplificó el texto de resultados para hacerlo más comprensible.  
- Se agregó un resumen textual con equivalencias cotidianas.  

---

## 6. Pruebas Unitarias

Las pruebas unitarias se realizaron con **pytest**, cubriendo las siguientes áreas:
- Validación de inputs del formulario.  
- Correcta ejecución de las rutas Flask (`/calcular`, `/predict`).  
- Funciones de cálculo de consumo (`utils.py`).  
- Formato de respuesta de la API.

✅ **Cobertura estimada:** 80% de statements, 85% de functions.  

---

## 7. Objetivos de Aprendizaje

### Python y Flask
- Manejo de rutas, templates y contextos (`render_template`, `request`, `url_for`).  
- Creación y consumo de APIs REST.  
- Validación de datos del usuario.  
- Implementación de CRUD básico.  

### Ciencia de Datos
- Limpieza y manipulación de datos con **Pandas**.  
- Conversión y validación de tipos.  
- Implementación de modelo de predicción simple con **scikit-learn**.  

### Frontend
- Uso de **HTML5 semántico** y **CSS**.  
- Gráficos interactivos con **Chart.js**.  
- Diseño responsivo para desktop y móvil.  

### Control de Versiones
- Flujo de trabajo en GitHub (branches, commits, pull requests).  
- Gestión del proyecto con **issues** y **projects**.  
- Documentación del progreso del equipo.  

### Colaboración y Gestión
- Trabajo en equipo con roles definidos (Backend, Data, Frontend, QA).  
- Comunicación asertiva y documentación continua.  
- Presentación final del proyecto en entorno controlado (demo local Flask).  

---

**💚 Proyecto realizado por: Estrella Alberto, Clara Angulo, Martina Muñoz e Isidora Zapata**  
Equipo **EcoAI** — Noviembre 2025  
Desarrollado en el marco del curso de **Python con Flask** de Latinas in Cloud.  

