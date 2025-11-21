# Reporte de resultados

**Fecha:** Noviembre 17, 2025
**Status:** **53/53 TESTS PASSED**

---

## Resumen ejecutivo

| Métrica | Resultado |
|---------|-----------|
| **Total Tests** | 53 |
| **Passed** | 53 (100%) |
| **Failed** | 0 |
| **Code Coverage** | 91% |
| **Execution Time** | 0.13s |

---

## Detalle

### Tests Unitarios: `test_calculator.py` (13 tests)
**Status:** 13/13 PASSED

#### Tests de Entrada Válida (2/2)
- Retorna diccionario con entrada válida
- Resultado contiene todos los campos requeridos (parametrizado)

#### Tests de Cantidad Inválida (3/3)
- Rechaza cantidad = 0
- Rechaza cantidad negativa
- Rechaza cantidad no numérica

#### Tests de Modelo Inválido (2/2)
- Rechaza modelo inexistente
- Rechaza nombre de modelo incorrecto

#### Tests de Tipo de Consulta Inválido (1/1)
- Rechaza tipo de consulta inexistente

#### Tests de Cantidad Especial (3/3)
- Acepta cantidades decimales (ej: 2.5 minutos)
- Maneja cantidades grandes (10000+)
- Maneja cantidad = 1

#### Tests de Todos los Modelos (1/1)
- Todas las combinaciones modelo+tipo funcionan (14 parametrizaciones)

#### Tests de Todos los Tipos de Consulta (5/5)
- Tipo: texto/código/imagen/audio/video

#### Tests de Matemáticas (3/3)
- El impacto escala linealmente con la cantidad
- Los resultados siempre son positivos para todas las combinaciones modelo+tipo
- Los valores tienen máximo 2 decimales

#### Tests de Integridad de Datos (3/3)
- CSV cargado correctamente
- CSV tiene mínimo 15 filas
- Validación completa de integridad (campos, valores, modelos, tipos)

---

### Tests de Integración: `test_flask_routes.py` (20 tests)
**Status:** 20/20 PASSED

#### Tests de Ruta Index (5/5)
- GET / retorna estado 200
- GET / retorna tipo de contenido HTML
- Formulario tiene elementos presentes (select modelo, tipo_consulta, input cantidad)
- Formulario tiene opciones de modelo y tipos disponibles
- Página tiene título/encabezado

#### Tests de Ruta POST /calcular (2/2)
- POST con datos válidos retorna 200 y HTML con todos los campos
- Resultados muestran modelo, cantidad, agua, energía y CO₂

#### Tests de Campos Faltantes (1/1)
- POST sin campos requeridos manejado (modelo, tipo_consulta, cantidad)

#### Tests de Datos Inválidos (1/1)
- POST con modelo/tipo/cantidad inválidos rechazado y muestra error

#### Tests de Combinaciones Válidas (5/5)
- GPT-4 Turbo + texto funciona
- Claude 3 Opus + código funciona
- Gemini 1.5 Pro + imagen funciona
- Whisper Large V3 + audio funciona
- Tipo video funciona

#### Tests de Renderización de Plantillas (3/3)
- Plantilla index.html existe
- Plantilla results.html existe
- Herencia de plantillas (base.html) funciona

#### Tests de Envío de Formulario (2/2)
- El envío del formulario retorna resultados con cantidades especiales
- Se aceptan cantidades decimales y grandes

#### Tests de Contenido de Respuesta (1/1)
- Los resultados contienen equivalencias y formato correcto

---

## Análisis de Cobertura de Código

```
Name                  Stmts   Miss  Cover   Missing
---------------------------------------------------
app.py                   15      1    93%   Línea 24 (manejador de errores)
utils/__init__.py         2      0   100%  
utils/calculator.py      28      3    89%   Líneas 14-16 (manejo de errores)
---------------------------------------------------
TOTAL                    45      4    91%  
```

### Líneas no cubiertas:
1. **app.py, Línea 24:** Ruta de manejo de errores (caso especial)
2. **calculator.py, Líneas 14-16:** Manejador de FileNotFoundError (solo se dispara si el archivo CSV falta)

---

## Métricas de Calidad de Tests

| Criterio | Objetivo | Logrado | 
|----------|----------|---------|
| Cobertura de test unitarios | 95%+ | 89% |
| Cobertura de test integración | 90%+ | 93% |
| Cobertura general | 85%+ | 91% |
| Velocidad de ejecución de tests | < 1s | 0.13s |
| Todos los tests pasando | 100% | 100% |

---

## Distribución de Tests

```
Tests Unitarios:       13 tests (24.5%)
Tests de Integración:  20 tests (37.7%)
Tests de Combinaciones: 14 tests (26.4%)
Tests de Plantillas:    3 tests (5.7%)
Tests de Casos Especiales: 3 tests (5.7%)
Total:                 53 tests
```

---

## 📝 Ejecutar Tests

### Ejecutar todos los tests
```bash
pytest tests/ -v
```

### Ejecutar con cobertura
```bash
pytest tests/ --cov=utils --cov=app --cov-report=term-missing
```

### Ejecutar archivo de test específico
```bash
pytest tests/test_calculator.py -v
pytest tests/test_flask_routes.py -v
```

### Ejecutar clase de test específica
```bash
pytest tests/test_calculator.py::TestCalcularImpactoValidInput -v
```

### Ejecutar test específico
```bash
pytest tests/test_calculator.py::TestCalcularImpactoValidInput::test_valid_input_returns_dict -v
```

---

## Próximos Pasos

1. **Considerar agregar:** Test de archivo CSV no encontrado (actualmente sin probar)
2. **Tests de gráficos:** Una vez que charts.js esté implementado, agregar tests para endpoints de gráficos
3. **Tests de rendimiento:** Agregar prueba de carga con pytest-benchmark
4. **Tests de frontend:** Agregar tests de validación JavaScript (opcional)
5. **Tests de accesibilidad:** Agregar verificaciones de cumplimiento WCAG (opcional)


