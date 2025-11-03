# archivo principal de la aplicación Flask
from flask import Flask, render_template, request
from utils.calculator import calcular_impacto

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calcular', methods=['POST'])
def calcular():
    modelo = request.form.get('modelo')
    consultas = request.form.get('consultas', type=int)
    resultado = calcular_impacto(modelo, consultas) 
    return render_template('results.html', resultado=resultado)

if __name__ == '__main__':
    app.run(debug=True)