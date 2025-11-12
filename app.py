# archivo principal de la aplicación Flask
from flask import Flask, render_template, request
from utils.calculator import calcular_impacto

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

if __name__ == '__main__':
    app.run(debug=True)