# 📊 Guía de Implementación de Gráficos - EcoAI

## 📍 Ubicación de Archivos

### Archivos principales a editar:

```
ecoai/
├── templates/
│   └── results_charts.html          ← Aquí están los canvas (placeholders)
├── static/js/
│   └── charts.js                    ← Aquí van las funciones de Chart.js
├── app.py                           ← Aquí agregar ruta /charts
└── requirements.txt                 ← Verificar que Chart.js está en CDN
```

---

## 🎯 Tareas por Completar

### Tarea 1: Actualizar `app.py`
**Ubicación:** `app.py`
**Acción:** Agregar una nueva ruta `@app.route('/comparativo')` que renderice `results_charts.html`

```python
@app.route('/comparativo')
def charts():
    # Aquí debes pasar datos al template
    # 1. Cargar datos del CSV
    # 2. Calcular estadísticas por modelo y tipo_consulta
    # 3. Pasar como contexto al template
    
    return render_template('results_charts.html',
        models=['GPT-4 Turbo', 'Claude 3 Opus', 'Gemini 1.5 Pro', 'Whisper Large V3'],
        query_types=['texto', 'código', 'imagen', 'audio', 'video'],
        model_stats={...},  # Ver ejemplo abajo
        query_type_stats={...}  # Ver ejemplo abajo
    )
```

**Datos esperados (ejemplo):**
```python
model_stats = {
    'GPT-4 Turbo': {'agua': 1.23, 'energia': 0.35, 'carbono': 0.78},
    'Claude 3 Opus': {'agua': 1.0, 'energia': 0.28, 'carbono': 0.62},
    'Gemini 1.5 Pro': {'agua': 1.08, 'energia': 0.32, 'carbono': 0.69},
    'Whisper Large V3': {'agua': 1.4, 'energia': 0.33, 'carbono': 0.58}
}

query_type_stats = {
    'texto': {'agua': 0.7, 'energia': 0.13, 'carbono': 0.27},
    'código': {'agua': 1.1, 'energia': 0.23, 'carbono': 0.42},
    'imagen': {'agua': 2.1, 'energia': 0.6, 'carbono': 1.2},
    'audio': {'agua': 1.4, 'energia': 0.33, 'carbono': 0.58},
    'video': {'agua': 4.4, 'energia': 1.17, 'carbono': 2.5}
}
```

---

### Tarea 2: Implementar Funciones en `charts.js`
**Ubicación:** `static/js/charts.js`

El archivo ya tiene el skeleton con placeholders `TODO`. Para cada gráfico:

1. **Lee los comentarios con instrucciones detalladas** (arriba de cada función)
2. **Implementa la lógica** según la especificación
3. **Usa Chart.js** ([docs](https://www.chartjs.org/))
4. **Mantén la consistencia de colores** (usa `COLOR_PALETTE`)

#### Gráficos a implementar (en orden de prioridad):

| # | Función | Tipo | Prioridad | Nota |
|---|---------|------|-----------|------|
| 1 | `initModelComparisonChart()` | Bar (agrupado) | 🔴 Alta | Comparar agua/energía/CO₂ por modelo |
| 2 | `initQueryTypeChart()` | Radar | 🔴 Alta | Mostrar impacto relativo de cada tipo |
| 3 | `initEnergyDistributionChart()` | Pie | 🟡 Media | % de energía por tipo |
| 4 | `updateEquivalenceCards()` | Cards HTML | 🟡 Media | Infografías visuales |
| 5 | `initCumulativeImpactChart()` | Line | 🟢 Baja | Proyección a escala |
| 6 | `initEfficiencyIndexChart()` | Bar Horizontal | 🟢 Baja | Ranking de eficiencia |

---

## 🔗 Flujo de Datos

```
results.html (usuario calcula impacto)
    ↓
app.py /calcular endpoint (procesa formulario)
    ↓
results.html (muestra resultado + botón "Ver análisis")
    ↓
results_charts.html (link a /charts)
    ↓
app.py /charts endpoint (carga datos de CSV)
    ↓
results_charts.html (renderiza con datos pasados)
    ↓
charts.js (inicializa 6 gráficos con Chart.js)
```

---

## 📌 Instrucciones Específicas por Gráfico

### 1️⃣ Gráfico 1: Comparación por Modelo (Bar Chart Agrupado)

**Dónde:** `static/js/charts.js` → función `initModelComparisonChart()`

**Qué hacer:**
- Extraer datos de `chartData.modelStats`
- Crear 3 arrays: agua, energía, carbono
- Agrupar barras por modelo (no apilar)

**Código base:**
```javascript
const data = {
    labels: chartData.models,  // ['GPT-4 Turbo', 'Claude 3 Opus', ...]
    datasets: [
        {
            label: 'Agua (L)',
            data: [1.23, 1.0, 1.08, 1.4],
            backgroundColor: COLOR_PALETTE.agua
        },
        {
            label: 'Energía (kWh)',
            data: [0.35, 0.28, 0.32, 0.33],
            backgroundColor: COLOR_PALETTE.energia
        },
        {
            label: 'Carbono (gCO2e)',
            data: [0.78, 0.62, 0.69, 0.58],
            backgroundColor: COLOR_PALETTE.carbono
        }
    ]
};
```

---

### 2️⃣ Gráfico 2: Impacto por Tipo (Radar Chart)

**Dónde:** `static/js/charts.js` → función `initQueryTypeChart()`

**Qué hacer:**
- Calcular impacto total por tipo: `agua + energía + carbono`
- Normalizar valores a escala 0-100
- Usar función helper `normalizeToScale()`

**Código base:**
```javascript
const queryTypes = chartData.queryTypes;
const impacts = queryTypes.map(type => {
    const stats = chartData.queryTypeStats[type];
    return stats.agua + stats.energia + stats.carbono;
});
const normalized = normalizeToScale(impacts);

const data = {
    labels: queryTypes,
    datasets: [{
        label: 'Impacto Ambiental',
        data: normalized,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: true
    }]
};
```

---

### 3️⃣ Gráfico 3: Distribución Energética (Pie Chart)

**Dónde:** `static/js/charts.js` → función `initEnergyDistributionChart()`

**Qué hacer:**
- Sumar energía total por tipo_consulta
- Calcular porcentaje
- Crear pie chart

**Código base:**
```javascript
const energyByType = chartData.queryTypes.map(type => 
    chartData.queryTypeStats[type].energia
);
const totalEnergy = energyByType.reduce((a, b) => a + b, 0);
const percentages = energyByType.map(e => (e / totalEnergy) * 100);

const data = {
    labels: chartData.queryTypes,
    datasets: [{
        data: percentages,
        backgroundColor: Object.values(COLOR_PALETTE.queryTypes)
    }]
};
```

---

### 4️⃣ Gráfico 4: Equivalencias (Cards HTML)

**Dónde:** `static/js/charts.js` → función `updateEquivalenceCards()`

**Qué hacer:**
- Crear HTML para 3 cards (agua, energía, carbono)
- Usar emoji como íconos
- Mostrar equivalencias del dataset

**Código base:**
```javascript
const modelo = chartData.models[0]; // o hacer dinámico
const stats = chartData.modelStats[modelo];

const html = `
    <div class="equivalence-card">
        <div class="card-icon">💧</div>
        <h4>Agua</h4>
        <p class="value">${stats.agua.toFixed(2)} L</p>
        <p class="equivalence">${stats.agua * 0.2} vasos de agua</p>
    </div>
    <div class="equivalence-card">
        <div class="card-icon">⚡</div>
        <h4>Energía</h4>
        <p class="value">${stats.energia.toFixed(2)} kWh</p>
        <p class="equivalence">${stats.energia * 60} minutos de LED</p>
    </div>
    ...
`;
container.innerHTML = html;
```

---

### 5️⃣ Gráfico 5: Impacto Acumulado (Line Chart)

**Dónde:** `static/js/charts.js` → función `initCumulativeImpactChart()`

**Qué hacer:**
- Leer modelo y tipo seleccionado en los dropdowns
- Obtener valores base
- Multiplicar por [1, 10, 100, 1000, 10000]
- Crear 3 líneas (agua, energía, carbono)

**Fórmula:**
```
Para cantidad Q:
    agua_acumulado = agua_base * Q
    energia_acumulada = energia_base * Q
    carbono_acumulado = carbono_base * Q
```

---

### 6️⃣ Gráfico 6: Eficiencia (Bar Horizontal)

**Dónde:** `static/js/charts.js` → función `initEfficiencyIndexChart()`

**Qué hacer:**
- Calcular: `score = 100 / (agua + energía + carbono)`
- Ordenar modelos por score (mayor a menor)
- Crear bar chart horizontal

**Código base:**
```javascript
const scores = chartData.models.map(modelo => {
    const stats = chartData.modelStats[modelo];
    const total = stats.agua + stats.energia + stats.carbono;
    return 100 / total;
});

// Ordenar por score (mayor a menor)
const sorted = chartData.models
    .map((m, i) => ({ modelo: m, score: scores[i] }))
    .sort((a, b) => b.score - a.score);
```

---

## 🚀 Checklist de Implementación

- [ ] Agregar ruta `/charts` en `app.py`
- [ ] Pasar datos correctos desde `app.py` a `results_charts.html`
- [ ] Implementar `initModelComparisonChart()`
- [ ] Implementar `initQueryTypeChart()`
- [ ] Implementar `initEnergyDistributionChart()`
- [ ] Implementar `updateEquivalenceCards()`
- [ ] Implementar `initCumulativeImpactChart()`
- [ ] Implementar `initEfficiencyIndexChart()`
- [ ] Añadir CSS para cards de equivalencias (opcional, pero recomendado)
- [ ] Probar todos los gráficos en el navegador
- [ ] Verificar responsividad en mobile
- [ ] Commit y push a branch

---

## 🎨 Recomendaciones de CSS

Crear archivo `static/css/charts.css` con estilos para:

```css
.charts-container { max-width: 1200px; margin: 0 auto; }
.chart-section { margin-bottom: 3rem; }
.equivalence-cards { 
    display: grid; 
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
    gap: 1.5rem; 
}
.equivalence-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-align: center;
}
.card-icon { font-size: 3rem; margin-bottom: 0.5rem; }
```

---

## 📚 Recursos Útiles

- **Chart.js Documentación:** https://www.chartjs.org/
- **Chart.js Ejemplos:** https://www.chartjs.org/samples/latest/
- **Colors Palette:** https://colorbrewer2.org/

---

## 💬 Preguntas Frecuentes

**P: ¿Qué datos me llegan en chartData?**
R: Ver estructura en `results_charts.html` línea ~229 (variable `chartData`)

**P: ¿Cómo accedo a datos de un modelo específico?**
R: `chartData.modelStats['GPT-4 Turbo']` → `{agua: 1.23, energia: 0.35, carbono: 0.78}`

**P: ¿Tengo que hacer que los gráficos sean dinámicos?**
R: Solo `initCumulativeImpactChart()` es dinámico (tiene selects). Los otros se inicializan una vez.

**P: ¿Qué pasa si faltan datos?**
R: Agregar validaciones (if !chartData, if !modelStats, etc.) y mensajes de error claros.

---

## 📞 Contacto

Si tienes dudas sobre la estructura de datos o cómo funciona algo, revisa los comentarios en los archivos. Están muy detallados.

¡Buena suerte! 🚀
