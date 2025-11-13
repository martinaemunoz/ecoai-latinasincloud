import csv
from pathlib import Path

def cargar_datos_csv():
    """Carga el dataset de ecoai desde CSV"""
    csv_path = Path(__file__).parent.parent / 'data' / 'ecoai_dataset.csv'
    datos_raw = []
    
    try:
        with open(csv_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                datos_raw.append(row)
    except FileNotFoundError:
        print(f"Advertencia: No se encontró {csv_path}")
        return {}
    
    return datos_raw

# Cargar datos al iniciar el módulo
DATOS_RAW = cargar_datos_csv()

def calcular_impacto(modelo, tipo_consulta, cantidad):
    """
    Calcula el impacto ambiental basado en modelo, tipo de consulta y cantidad.
    
    Args:
        modelo: nombre del modelo (ej: 'GPT-4 Turbo')
        tipo_consulta: tipo de consulta (ej: 'texto', 'código', 'imagen', 'audio', 'video')
        cantidad: cantidad según la unidad (número de preguntas, minutos, etc.)
    
    Returns:
        dict con resultados o string de error
    """
    if not isinstance(cantidad, (int, float)) or cantidad <= 0:
        return "Error: La cantidad debe ser un número positivo"
    
    # Buscar filas que coincidan con modelo y tipo_consulta
    filas_coincidentes = [
        row for row in DATOS_RAW 
        if row['modelo'] == modelo and row['tipo_consulta'] == tipo_consulta
    ]
    
    if not filas_coincidentes:
        return f"Combinación no encontrada: {modelo} + {tipo_consulta}"
    
    # Promediar valores si hay múltiples filas
    agua_prom = sum(float(row['agua(L)']) for row in filas_coincidentes) / len(filas_coincidentes)
    energia_prom = sum(float(row['energia(kWh)']) for row in filas_coincidentes) / len(filas_coincidentes)
    carbono_prom = sum(float(row['carbono(gCO2e)']) for row in filas_coincidentes) / len(filas_coincidentes)
    
    # Usar la equivalencia de la primera fila coincidente
    eq_agua = filas_coincidentes[0]['eq_agua']
    eq_energia = filas_coincidentes[0]['eq_energia']
    eq_co2 = filas_coincidentes[0]['eq_co2']
    
    return {
        "modelo": modelo,
        "tipo_consulta": tipo_consulta,
        "cantidad": cantidad,
        "agua": round(agua_prom * cantidad, 2),
        "energia": round(energia_prom * cantidad, 2),
        "co2": round(carbono_prom * cantidad, 2),
        "eq_agua": eq_agua,
        "eq_energia": eq_energia,
        "eq_co2": eq_co2
    }