from flask import Flask, render_template, request, jsonify
from utils.calculator import calcular_impacto
from utils.calculos import calcular_metricas

app = Flask(__name__)

# Ruta principal (interfaz web)


@app.route('/')
def index():
    return render_template('index.html')

# Ruta para formulario web


@app.route('/calcular', methods=['POST'])
def calcular():
    modelo = request.form.get('modelo')
    consultas = request.form.get('consultas', type=int)
    resultado = calcular_impacto(modelo, consultas)
    return render_template('results.html', resultado=resultado)

# Ruta API (para pruebas con curl o peticiones externas)


@app.route('/api/calcular', methods=['POST'])
def calcular_api():
    datos = request.get_json()
    resultado = calcular_metricas(datos)
    return jsonify(resultado)


if __name__ == '__main__':
    app.run(debug=True)