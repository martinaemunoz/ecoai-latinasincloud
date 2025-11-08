# utils/calculos.py

def calcular_metricas(datos):
    """
    Función de ejemplo que simula el cálculo de métricas
    según los datos enviados desde el frontend o una API.
    """

    # Verificamos que lleguen los datos correctos
    modelo = datos.get('modelo')
    consultas = datos.get('consultas', 0)

    # Ejemplo simple de cálculo (puedes reemplazarlo por lógica real)
    if modelo == 'A':
        eficiencia = consultas * 0.8
    elif modelo == 'B':
        eficiencia = consultas * 1.2
    else:
        eficiencia = consultas * 1.0

    resultado = {
        "modelo": modelo,
        "consultas": consultas,
        "eficiencia_estimacion": round(eficiencia, 2),
        "mensaje": "Cálculo realizado correctamente ✅"
    }

    return resultado