/**
 * ============================================================================
 * ARCHIVO: charts.js
 * DESCRIPCIÓN: Funciones para inicializar y renderizar gráficos Chart.js
 * 
 * INSTRUCCIONES *
 * 
 * Este archivo contiene placeholders (stubs) para 6 funciones principales.
 * Cada función recibe un objeto `chartData` con la siguiente estructura:
 * 
 * chartData = {
 *     models: ['GPT-4 Turbo', 'Claude 3 Opus', 'Gemini 1.5 Pro', 'Whisper Large V3'],
 *     queryTypes: ['texto', 'código', 'imagen', 'audio', 'video'],
 *     modelStats: {
 *         'GPT-4 Turbo': { agua: 1.23, energia: 0.35, carbono: 0.78 },
 *         'Claude 3 Opus': { agua: 1.0, energia: 0.28, carbono: 0.62 },
 *         ...
 *     },
 *     queryTypeStats: {
 *         'texto': { agua: 0.7, energia: 0.13, carbono: 0.27 },
 *         'imagen': { agua: 2.1, energia: 0.6, carbono: 1.2 },
 *         ...
 *     }
 * }
 * 
 * TAREAS:
 * 1. Implementar cada función según las especificaciones
 * 2. Usar Chart.js para renderizar (docs: https://www.chartjs.org/)
 * 3. Asegurar que los colores sean consistentes (ver COLOR_PALETTE abajo)
 * 4. Añadir tooltips informativos
 * 5. Hacer gráficos responsivos
 * ============================================================================
 */

// ============================================================================
// COLOR PALETTE - Mantener consistencia visual en todos los gráficos
// ============================================================================
const COLOR_PALETTE = {
    agua: 'rgba(54, 162, 235, 0.7)',      // Azul - agua
    energia: 'rgba(255, 206, 86, 0.7)',   // Amarillo - energía
    carbono: 'rgba(75, 192, 75, 0.7)',    // Verde - carbono
    models: [
        'rgba(255, 99, 132, 0.7)',         // Rojo - GPT-4
        'rgba(54, 162, 235, 0.7)',         // Azul - Claude
        'rgba(255, 206, 86, 0.7)',         // Amarillo - Gemini
        'rgba(153, 102, 255, 0.7)'         // Púrpura - Whisper
    ],
    queryTypes: {
        'texto': 'rgba(75, 192, 192, 0.7)',
        'código': 'rgba(201, 203, 207, 0.7)',
        'imagen': 'rgba(255, 99, 132, 0.7)',
        'audio': 'rgba(255, 159, 64, 0.7)',
        'video': 'rgba(153, 102, 255, 0.7)'
    }
};

// ============================================================================
// GRÁFICO 1: Comparación de impacto por modelo (Barras agrupadas)
// ============================================================================
/**
 * INSTRUCCIONES:
 * - Crear 3 datasets (agua, energía, carbono)
 * - X-axis = modelos
 * - Y-axis = cantidad (L, kWh, gCO2e)
 * - Barras agrupadas (no apiladas)
 * 
 * TIPS:
 * - Usar colors de COLOR_PALETTE para agua, energía, carbono
 * - Agregar leyenda clara
 * - Tooltip debe mostrar valor + unidad
 * 
 * REFERENCIA Chart.js:
 * https://www.chartjs.org/docs/latest/charts/bar.html
 */
function initModelComparisonChart(chartData) {
    const ctx = document.getElementById('modelComparisonChart');
    if (!ctx) return; // Si el elemento no existe, salir
    
    // TODO: Implementar lógica aquí
    // 1. Extraer datos de chartData.modelStats
    // 2. Crear arrays para agua, energía, carbono
    // 3. Renderizar gráfico con Chart.js
    
    console.log('📊 Gráfico 1: Comparación por modelo - IMPLEMENTAR');
    console.log('Datos disponibles:', chartData.modelStats);
}

// ============================================================================
// GRÁFICO 2: Impacto por tipo de consulta (Radar)
// ============================================================================
/**
 * INSTRUCCIONES:
 * - Tipo: Radar Chart (o alternativa Doughnut)
 * - Vertices = tipos de consulta (texto, código, imagen, audio, video)
 * - Radio = impacto total (agua + energía + carbono)
 * - IMPORTANTE: Normalizar valores a escala 0-100 para mejor visualización
 * 
 * FÓRMULA DE NORMALIZACIÓN:
 * impacto_normalizado = (impacto_actual / impacto_máximo) * 100
 * 
 * TIPS:
 * - Usar colores de COLOR_PALETTE.queryTypes
 * - Incluir leyenda
 * - Tooltip muestra el valor original + normalizado
 * 
 * REFERENCIA Chart.js:
 * https://www.chartjs.org/docs/latest/charts/radar.html
 */
function initQueryTypeChart(chartData) {
    const ctx = document.getElementById('queryTypeChart');
    if (!ctx) return;
    
    // TODO: Implementar lógica aquí
    // 1. Calcular impacto total por tipo de consulta
    // 2. Normalizar a escala 0-100
    // 3. Crear dataset para radar
    // 4. Renderizar gráfico
    
    console.log('🎯 Gráfico 2: Impacto por tipo - IMPLEMENTAR');
    console.log('Datos disponibles:', chartData.queryTypeStats);
}

// ============================================================================
// GRÁFICO 3: Distribución del consumo energético (Pie Chart)
// ============================================================================
/**
 * INSTRUCCIONES:
 * - Tipo: Pie Chart
 * - Opciones: A) Por tipo_consulta O B) Por modelo
 * - Recomendación: Implementar por tipo_consulta primero
 * - Slices = cada tipo de consulta con su % de energía total
 * 
 * CÁLCULO:
 * 1. Sumar energía total de todos los tipos
 * 2. Calcular % de cada tipo respecto al total
 * 3. Labels: "Texto (15%)", "Imagen (45%)", etc.
 * 
 * TIPS:
 * - Usar colors de COLOR_PALETTE.queryTypes
 * - Legend en la derecha
 * - Tooltip muestra valor absoluto + porcentaje
 * 
 * REFERENCIA Chart.js:
 * https://www.chartjs.org/docs/latest/charts/doughnut.html
 */
function initEnergyDistributionChart(chartData) {
    const ctx = document.getElementById('energyDistributionChart');
    if (!ctx) return;
    
    // TODO: Implementar lógica aquí
    // 1. Calcular energía total por tipo de consulta
    // 2. Calcular porcentajes
    // 3. Crear dataset para pie/doughnut
    // 4. Renderizar gráfico
    
    console.log('⚡ Gráfico 3: Distribución energética - IMPLEMENTAR');
    console.log('Datos disponibles:', chartData.queryTypeStats);
}

// ============================================================================
// GRÁFICO 4: Equivalencias visuales (Cards + Infografías)
// ============================================================================
/**
 * INSTRUCCIONES:
 * - NO es un gráfico Chart.js clásico
 * - Crear cards HTML dinámicamente
 * - Cada card muestra una equivalencia visual
 * 
 * FORMATO SUGERIDO:
 * 
 * Card 1: "💧 Agua"
 * - Imagen/ícono: gota de agua
 * - Texto: "123.5 L de agua"
 * - Equivalencia: "= 246 vasos de agua"
 * 
 * Card 2: "⚡ Energía"
 * - Imagen/ícono: bombilla
 * - Texto: "2.5 kWh"
 * - Equivalencia: "= 150 minutos de ampolleta LED"
 * 
 * Card 3: "🌍 Carbono"
 * - Imagen/ícono: planeta
 * - Texto: "5.2 kg CO₂"
 * - Equivalencia: "= 26 km en coche"
 * 
 * TIPS:
 * - Usar emoji como íconos (simple y accesible)
 * - Hacer cards responsivas (CSS grid)
 * - Datos vienen de chartData.modelStats
 * 
 * DATOS A RECIBIR:
 * - eq_agua, eq_energia, eq_co2 (ya están en el dataset)
 * - Usar estos valores directamente
 */
function updateEquivalenceCards(chartData) {
    const container = document.getElementById('equivalenceCards');
    if (!container) return;
    
    // TODO: Implementar lógica aquí
    // 1. Tomar primer modelo (o hacer dinámico con selector)
    // 2. Crear HTML para 3 cards (agua, energía, carbono)
    // 3. Llenar con datos de eq_agua, eq_energia, eq_co2
    // 4. Insertar en el container
    
    console.log('💡 Gráfico 4: Equivalencias - IMPLEMENTAR');
    console.log('Datos disponibles:', chartData.modelStats);
}

// ============================================================================
// GRÁFICO 5: Evolución del impacto acumulado (Line Chart)
// ============================================================================
/**
 * INSTRUCCIONES:
 * - Tipo: Line Chart con área (area chart)
 * - X-axis: Número de consultas (1, 10, 100, 1000, 10000)
 * - Y-axis: Impacto acumulado (agua en L, energía en kWh, carbono en kg)
 * 
 * LÓGICA:
 * 1. Tomar modelo seleccionado en #cumulativeModel
 * 2. Tomar tipo de consulta seleccionado en #cumulativeQueryType
 * 3. Obtener valores base (agua, energía, carbono) para esa combinación
 * 4. Multiplicar por [1, 10, 100, 1000, 10000]
 * 5. Crear 3 líneas (agua, energía, carbono)
 * 
 * EJEMPLO:
 * Si Claude 3 Opus + texto:
 * - Cantidad 1: agua=0.6L, energia=0.12kWh, carbono=0.24kg
 * - Cantidad 10: agua=6L, energia=1.2kWh, carbono=2.4kg
 * - Cantidad 1000: agua=600L, energia=120kWh, carbono=240kg
 * 
 * TIPS:
 * - Usar escala logarítmica en X si el rango es muy grande
 * - Incluir tooltip con equivalencia ("1000 = X duchas")
 * - Actualizar cuando cambian los selects
 * 
 * REFERENCIA Chart.js:
 * https://www.chartjs.org/docs/latest/charts/line.html
 */
function initCumulativeImpactChart(chartData) {
    const ctx = document.getElementById('cumulativeImpactChart');
    if (!ctx) return;
    
    const selectedModel = document.getElementById('cumulativeModel')?.value || 'GPT-4 Turbo';
    const selectedQueryType = document.getElementById('cumulativeQueryType')?.value || 'texto';
    
    // TODO: Implementar lógica aquí
    // 1. Obtener datos base para modelo + tipo seleccionado
    // 2. Crear arrays de cantidades [1, 10, 100, 1000, 10000]
    // 3. Multiplicar por cantidad para cada métrica
    // 4. Crear 3 datasets (agua, energía, carbono)
    // 5. Renderizar gráfico de línea
    
    console.log('📈 Gráfico 5: Impacto acumulado - IMPLEMENTAR');
    console.log('Modelo:', selectedModel, 'Tipo:', selectedQueryType);
}

// ============================================================================
// GRÁFICO 6: Índice de Eficiencia Ambiental (Horizontal Bar)
// ============================================================================
/**
 * INSTRUCCIONES:
 * - Tipo: Bar Chart horizontal
 * - X-axis: Score de eficiencia (0-100)
 * - Y-axis: Modelos (GPT-4, Claude, Gemini, Whisper)
 * 
 * FÓRMULA DE EFICIENCIA:
 * Score = 100 / (agua_promedio + energia_promedio + carbono_promedio)
 * 
 * RESULTADO:
 * - Modelos más eficientes tienen scores más altos
 * - Gráfico ordena de mayor a menor eficiencia
 * 
 * EJEMPLO CÁLCULO:
 * GPT-4: (1.23 + 0.35 + 0.78) = 2.36 total → score = 100/2.36 ≈ 42.4
 * Claude: (1.0 + 0.28 + 0.62) = 1.9 total → score = 100/1.9 ≈ 52.6 (más eficiente)
 * 
 * TIPS:
 * - Color de barras: verde para eficiente, rojo para ineficiente
 * - Barras más largas = mejor eficiencia
 * - Incluir tooltips con breakdown (agua, energía, carbono)
 * 
 * REFERENCIA Chart.js:
 * https://www.chartjs.org/docs/latest/charts/bar.html#horizontal-bar-chart
 */
function initEfficiencyIndexChart(chartData) {
    const ctx = document.getElementById('efficiencyIndexChart');
    if (!ctx) return;
    
    // TODO: Implementar lógica aquí
    // 1. Iterar sobre chartData.models
    // 2. Calcular score de eficiencia para cada modelo
    // 3. Ordenar modelos por score (mayor a menor)
    // 4. Crear dataset para bar chart horizontal
    // 5. Renderizar gráfico
    
    console.log('🌿 Gráfico 6: Índice de eficiencia - IMPLEMENTAR');
    console.log('Datos disponibles:', chartData.modelStats);
}

// ============================================================================
// UTILIDADES Y HELPERS
// ============================================================================

/**
 * Calcula el impacto total para una métrica (agua, energía, carbono)
 * Útil para normalización y cálculos auxiliares
 */
function calculateTotalImpact(impactDict, metric) {
    return Object.values(impactDict).reduce((sum, item) => sum + item[metric], 0);
}

/**
 * Normaliza valores a escala 0-100 basado en el máximo encontrado
 */
function normalizeToScale(values, min = 0, max = 100) {
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const range = maxValue - minValue || 1;
    
    return values.map(v => ((v - minValue) / range) * (max - min) + min);
}

/**
 * Formatea números con decimales y unidad
 */
function formatValue(value, unit = '') {
    return `${(value).toFixed(2)} ${unit}`;
}

console.log('✅ charts.js cargado exitosamente');
console.log('Funciones disponibles:');
console.log('- initModelComparisonChart()');
console.log('- initQueryTypeChart()');
console.log('- initEnergyDistributionChart()');
console.log('- updateEquivalenceCards()');
console.log('- initCumulativeImpactChart()');
console.log('- initEfficiencyIndexChart()');
