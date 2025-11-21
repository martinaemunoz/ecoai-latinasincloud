import csv
from pathlib import Path

def cargar_datos_csv():
    """
    Carga el dataset de ecoai desde CSV en un diccionario anidado.
    
    Estructura: 
        DB[f"{modelo}_{tipo_consulta}"] = [lista de filas con esos datos]
    
    Esto permite búsquedas O(1) en lugar de O(n).
    """
    csv_path = Path(__file__).parent.parent / 'data' / 'ecoai_dataset.csv'
    db = {}
    
    try:
        with open(csv_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                key = f"{row['modelo']}_{row['tipo_consulta']}"
                if key not in db:
                    db[key] = []
                db[key].append(row)
    except FileNotFoundError:
        print(f"Advertencia: No se encontró {csv_path}")
        return {}
    
    return db

# Cargar datos al iniciar el módulo
DB = cargar_datos_csv()

def calcular_equivalencias(agua_total, energia_total, co2_total):
    """
    Calcula las equivalencias basadas en los valores totales de agua, energía y CO2.
    
    Args:
        agua_total: litros de agua totales
        energia_total: kWh de energía totales
        co2_total: gramos de CO2 totales
    
    Returns:
        dict con equivalencias formateadas
    """
    # Equivalencias de agua (1 vaso = 250ml = 0.25L)
    vasos = agua_total / 0.25
    botellas = agua_total / 0.5
    duchas = agua_total / 75  # Una ducha de 5 min consume aprox 75L
    eq_agua = f"{vasos:.2f} vasos de agua / {botellas:.2f} botellas de 500ml / {duchas:.4f} duchas de 5 min"
    
    # Equivalencias de energía (1 kWh = 16.67 minutos de LED)
    minutos = energia_total * 16.67
    eq_energia = f"{minutos:.2f} min ampolleta LED"
    
    # Equivalencias de CO2 (1 km en auto = 0.12 kg CO2 = 120 gCO2e)
    km_auto = co2_total / 120
    eq_co2 = f"{km_auto:.5f} km en auto"
    
    return {
        "eq_agua": eq_agua,
        "eq_energia": eq_energia,
        "eq_co2": eq_co2
    }

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
    
    # Buscar en el diccionario usando clave modelo_tipo
    key = f"{modelo}_{tipo_consulta}"
    filas_coincidentes = DB.get(key, [])
    
    if not filas_coincidentes:
        return f"Combinación no encontrada: {modelo} + {tipo_consulta}"
    
    # Promediar valores si hay múltiples filas
    agua_prom = sum(float(row['agua(L)']) for row in filas_coincidentes) / len(filas_coincidentes)
    energia_prom = sum(float(row['energia(kWh)']) for row in filas_coincidentes) / len(filas_coincidentes)
    carbono_prom = sum(float(row['carbono(gCO2e)']) for row in filas_coincidentes) / len(filas_coincidentes)
    
    # Obtener unidad de medida
    unidad_medida = filas_coincidentes[0].get('unidad_medida', '')
    
    # Mapeo de descripciones por tipo de consulta
    descripciones = {
        'texto': 'respuesta(s) de texto',
        'código': 'bloque(s) de código',
        'imagen': 'imagen(es) generada',
        'audio': 'minuto(s) de transcripción de audio',
        'video': 'minuto(s) de video'
    }
    
    descripcion_tipo = descripciones.get(tipo_consulta, tipo_consulta)
    # Solo agregar 's' al final de "generada" para imágenes en plural
    if tipo_consulta == 'imagen' and cantidad != 1:
        cantidad_formateada = f"{int(cantidad) if isinstance(cantidad, int) or cantidad == int(cantidad) else cantidad} {descripcion_tipo}s"
    else:
        cantidad_formateada = f"{int(cantidad) if isinstance(cantidad, int) or cantidad == int(cantidad) else cantidad} {descripcion_tipo}"
    
    # Calcular totales basados en la cantidad
    agua_total = agua_prom * cantidad
    energia_total = energia_prom * cantidad
    co2_total = carbono_prom * cantidad
    
    # Calcular equivalencias dinámicamente basadas en los totales
    equivalencias = calcular_equivalencias(agua_total, energia_total, co2_total)
    
    return {
        "modelo": modelo,
        "tipo_consulta": tipo_consulta,
        "cantidad": cantidad,
        "cantidad_formateada": cantidad_formateada,
        "unidad_medida": unidad_medida,
        "agua": round(agua_total, 2),
        "energia": round(energia_total, 2),
        "co2": round(co2_total, 2),
        "eq_agua": equivalencias["eq_agua"],
        "eq_energia": equivalencias["eq_energia"],
        "eq_co2": equivalencias["eq_co2"]
    }