# archivo principal de la aplicación Flask
from flask import Flask, render_template, request
from utils.calculator import calcular_impacto, obtener_estadisticas_por_modelo, obtener_estadisticas_por_tipo_consulta

app = Flask(__name__)

# Ruta principal (interfaz web)

@app.route('/')
def index():
    return render_template('index.html')

# Ruta para formulario web

@app.route('/calcular', methods=['POST'])
def calcular():
    modelo = request.form.get('modelo')
    tipo_consulta = request.form.get('tipo_consulta')
    cantidad = request.form.get('cantidad', type=int)
    resultado = calcular_impacto(modelo, tipo_consulta, cantidad) 
    return render_template('results.html', resultado=resultado)

# Ruta para comparativo/gráficos

@app.route('/comparativo')
def comparativo():
    """
    Renderiza la página de comparativos con gráficos Chart.js.
    Pasa datos del CSV para visualización de estadísticas por modelo y tipo de consulta.
    """
    modelos = ['GPT-4 Turbo', 'Claude 3', 'Gemini 1.5']
    tipos_consulta = ['texto', 'código', 'imagen', 'audio', 'video']
    
    # Obtener estadísticas desde el CSV
    model_stats = obtener_estadisticas_por_modelo()
    query_type_stats = obtener_estadisticas_por_tipo_consulta()
    
    return render_template('results_charts.html',
        models=modelos,
        query_types=tipos_consulta,
        model_stats=model_stats,
        query_type_stats=query_type_stats
    )

if __name__ == '__main__':
    app.run(debug=True)