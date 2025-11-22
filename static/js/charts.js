// Paleta de colores para mantener consistencia visual en todos los gráficos
const COLOR_PALETTE = {
    agua: 'rgba(54, 162, 235, 0.7)',      // Azul - agua
    energia: 'rgba(255, 206, 86, 0.7)',   // Amarillo - energía
    carbono: 'rgba(75, 192, 75, 0.7)',    // Verde - carbono
    models: [
        'rgba(255, 99, 132, 0.7)',         // Rojo - GPT-4 Turbo
        'rgba(54, 162, 235, 0.7)',         // Azul - Claude 3
        'rgba(255, 206, 86, 0.7)'          // Amarillo - Gemini 1.5
    ],
    queryTypes: {
        'texto': 'rgba(75, 192, 192, 0.7)',
        'código': 'rgba(201, 203, 207, 0.7)',
        'imagen': 'rgba(255, 99, 132, 0.7)',
        'audio': 'rgba(255, 159, 64, 0.7)',
        'video': 'rgba(153, 102, 255, 0.7)'
    }
};

// Gráfico de comparación de impacto ambiental por modelo IA (barras agrupadas)
function initModelComparisonChart(chartData) {
    const ctx = document.getElementById('modelComparisonChart');
    if (!ctx) return; // Si el elemento no existe, salir
    
    // Extraer datos de chartData.modelStats
    const models = chartData.models;
    const waterData = models.map(modelo => chartData.modelStats[modelo].agua);
    const energyData = models.map(modelo => chartData.modelStats[modelo].energia);
    const carbonData = models.map(modelo => chartData.modelStats[modelo].carbono);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: models,
            datasets: [
                {
                    label: 'Agua (L)',
                    data: waterData,
                    backgroundColor: COLOR_PALETTE.agua,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Energía (kWh)',
                    data: energyData,
                    backgroundColor: COLOR_PALETTE.energia,
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Carbono (gCO2e)',
                    data: carbonData,
                    backgroundColor: COLOR_PALETTE.carbono,
                    borderColor: 'rgba(75, 192, 75, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        padding: 15,
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.parsed.y.toFixed(2);
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(2);
                        }
                    }
                }
            }
        }
    });
}

// gráfico radar que muestra el impacto ambiental por tipo de consulta
function initQueryTypeChart(chartData) {
    const ctx = document.getElementById('queryTypeChart');
    if (!ctx) return;
    
    // calcular impacto total por tipo de consulta
    const queryTypes = chartData.queryTypes;
    const impacts = queryTypes.map(type => {
        const stats = chartData.queryTypeStats[type];
        return stats.agua + stats.energia + stats.carbono;
    });
    
    // normalizar a escala 0-100
    const normalized = normalizeToScale(impacts);
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: queryTypes,
            datasets: [{
                label: 'Impacto Ambiental Total',
                data: normalized,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        padding: 15,
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Impacto (normalizado): ' + context.parsed.r.toFixed(2);
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            }
        }
    });
}

// gráfico circular que muestra la distribución porcentual del consumo energético
function initEnergyDistributionChart(chartData) {
    const ctx = document.getElementById('energyDistributionChart');
    if (!ctx) return;
    
    // calcular energía total por tipo de consulta
    const queryTypes = chartData.queryTypes;
    const energyByType = queryTypes.map(type => chartData.queryTypeStats[type].energia);
    const totalEnergy = energyByType.reduce((a, b) => a + b, 0);
    const percentages = energyByType.map(e => (e / totalEnergy) * 100);
    
    // obtener colores para cada tipo
    const colors = queryTypes.map(type => COLOR_PALETTE.queryTypes[type]);
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: queryTypes,
            datasets: [{
                data: percentages,
                backgroundColor: colors,
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 15,
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed.toFixed(1) + '%';
                        }
                    }
                }
            }
        }
    });
}

// Gráfico de líneas que proyecta el impacto ambiental acumulado por cantidad de consultas
function initCumulativeImpactChart(chartData) {
    const ctx = document.getElementById('cumulativeImpactChart');
    if (!ctx) return;
    
    const selectedModel = document.getElementById('cumulativeModel')?.value || 'GPT-4 Turbo';
    const selectedQueryType = document.getElementById('cumulativeQueryType')?.value || 'texto';
    
    // Obtener datos base para modelo + tipo seleccionado
    const baseStats = chartData.queryTypeStats[selectedQueryType];
    
    if (!baseStats) {
        console.error('No se encontraron datos para:', selectedModel, selectedQueryType);
        return;
    }
    
    // Crear arrays de cantidades para proyección
    const quantities = [1, 10, 100, 1000, 10000];
    const waterData = quantities.map(q => (baseStats.agua * q).toFixed(2));
    const energyData = quantities.map(q => (baseStats.energia * q).toFixed(2));
    const carbonData = quantities.map(q => (baseStats.carbono * q).toFixed(2));
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: quantities.map(q => q + ' consultas'),
            datasets: [
                {
                    label: 'Agua (L)',
                    data: waterData,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Energía (kWh)',
                    data: energyData,
                    borderColor: 'rgba(255, 206, 86, 1)',
                    backgroundColor: 'rgba(255, 206, 86, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Carbono (gCO2e)',
                    data: carbonData,
                    borderColor: 'rgba(75, 192, 75, 1)',
                    backgroundColor: 'rgba(75, 192, 75, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        padding: 15,
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.parsed.y;
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(0);
                        }
                    }
                }
            }
        }
    });
}

// Gráfico de barras horizontales que muestra el índice de eficiencia ambiental por modelo
function initEfficiencyIndexChart(chartData) {
    const ctx = document.getElementById('efficiencyIndexChart');
    if (!ctx) return;
    
    // Calcular score de eficiencia para cada modelo
    const models = chartData.models;
    const efficiencyScores = models.map(model => {
        const stats = chartData.modelStats[model];
        const total = stats.agua + stats.energia + stats.carbono;
        return {
            modelo: model,
            score: 100 / total
        };
    });
    
    // Ordenar por score (mayor a menor eficiencia)
    efficiencyScores.sort((a, b) => b.score - a.score);
    
    // Extraer etiquetas y scores ordenados
    const sortedModels = efficiencyScores.map(e => e.modelo);
    const sortedScores = efficiencyScores.map(e => e.score);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedModels,
            datasets: [{
                label: 'Índice de Eficiencia Ambiental',
                data: sortedScores,
                backgroundColor: sortedScores.map(score => {
                    if (score > 40) return 'rgba(75, 192, 75, 0.7)';
                    if (score > 30) return 'rgba(255, 206, 86, 0.7)';
                    return 'rgba(255, 99, 132, 0.7)';
                }),
                borderColor: sortedScores.map(score => {
                    if (score > 40) return 'rgba(75, 192, 75, 1)';
                    if (score > 30) return 'rgba(255, 206, 86, 1)';
                    return 'rgba(255, 99, 132, 1)';
                }),
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        padding: 15,
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Score: ' + context.parsed.x.toFixed(2);
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(0);
                        }
                    }
                }
            }
        }
    });
}

// Funciones auxiliares para cálculos de impacto y normalización de datos

// Calcula el impacto total para una métrica específica
function calculateTotalImpact(impactDict, metric) {
    return Object.values(impactDict).reduce((sum, item) => sum + item[metric], 0);
}

// Normaliza valores a escala 0-100 basado en el máximo encontrado
function normalizeToScale(values, min = 0, max = 100) {
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const range = maxValue - minValue || 1;
    
    return values.map(v => ((v - minValue) / range) * (max - min) + min);
}

// Formatea números con decimales y unidad
function formatValue(value, unit = '') {
    return `${(value).toFixed(2)} ${unit}`;
}

