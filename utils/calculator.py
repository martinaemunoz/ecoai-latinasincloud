def calcular_impacto(modelo, consultas):
    if not isinstance(consultas, (int, float)) or consultas <= 0:
        return "Error: El número de consultas debe ser un número positivo"
        
    impactos = {
        # valores ficticios de impacto ambiental por modelo
        'gpt-3.5-turbo': {"agua":0.45, "energia":0.09, "carbono":0.18},
        'gpt-4': {"agua":0.75, "energia":0.15, "carbono":0.30},
        'gemini': {"agua":0.60, "energia":0.12, "carbono":0.25},
        'claude': {"agua":0.50, "energia":0.10, "carbono":0.20}
    }
    if modelo in impactos:
        return {
        "modelo": modelo,
        "consultas": consultas,
        "agua": round(impactos[modelo]["agua"] * consultas, 2),
        "energia": round(impactos[modelo]["energia"] * consultas, 2),
        "co2": round(impactos[modelo]["carbono"] * consultas, 2)
        }
    
    else:
        return "Modelo no reconocido"