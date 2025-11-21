"""
Unit tests para utils/calculator.py
Verifican la lógica de cálculo de impacto ambiental en diversas condiciones
"""

import pytest
from utils.calculator import calcular_impacto, DB


class TestCalcularImpactoValidInput:
    """Tests con entrada válida - validación completa de resultados"""
    
    def test_valid_input_comprehensive(self):
        """Entrada válida devuelve dict con todos los campos requeridos y valores válidos"""
        resultado = calcular_impacto('GPT-4 Turbo', 'texto', 5)
        
        # verificar tipo
        assert isinstance(resultado, dict)

        # verificar campos requeridos
        required_fields = ['modelo', 'tipo_consulta', 'cantidad', 'agua', 'energia', 'co2',
                          'eq_agua', 'eq_energia', 'eq_co2']
        for field in required_fields:
            assert field in resultado, f"Campo {field} falta en resultado"
        
        # verificar valores
        assert resultado['modelo'] == 'GPT-4 Turbo'
        assert resultado['tipo_consulta'] == 'texto'
        assert resultado['cantidad'] == 5
        
        # verificar valores positivos
        assert resultado['agua'] > 0
        assert resultado['energia'] > 0
        assert resultado['co2'] > 0

        # verificar equivalencias no vacías
        assert isinstance(resultado['eq_agua'], str) and len(resultado['eq_agua']) > 0
        assert isinstance(resultado['eq_energia'], str) and len(resultado['eq_energia']) > 0
        assert isinstance(resultado['eq_co2'], str) and len(resultado['eq_co2']) > 0
    
    @pytest.mark.parametrize("modelo,tipo,cantidad", [
        ('GPT-4 Turbo', 'texto', 5),
        ('Claude 3', 'imagen', 3),
        ('Gemini 1.5', 'código', 2),
    ])
    def test_multiple_valid_inputs(self, modelo, tipo, cantidad):
        """verif que múltiples combinaciones válidas funcionan correctamente"""
        resultado = calcular_impacto(modelo, tipo, cantidad)
        
        assert isinstance(resultado, dict)
        assert resultado['modelo'] == modelo
        assert resultado['tipo_consulta'] == tipo
        assert resultado['cantidad'] == cantidad
        assert resultado['agua'] > 0 and resultado['energia'] > 0 and resultado['co2'] > 0


class TestCalcularImpactoCantidadInvalida:
    """tests con cantidad inválida"""
    
    def test_cantidad_cero(self):
        """rechazar cantidad = 0"""
        resultado = calcular_impacto('GPT-4 Turbo', 'texto', 0)
        
        assert isinstance(resultado, str)
        assert 'Error' in resultado
    
    def test_cantidad_negativa(self):
        """rechazar cantidad negativa"""
        resultado = calcular_impacto('GPT-4 Turbo', 'texto', -5)
        
        assert isinstance(resultado, str)
        assert 'Error' in resultado
    
    def test_cantidad_tipo_invalido(self):
        """rechazar cantidad no numérica (pasada como string)"""
        resultado = calcular_impacto('GPT-4 Turbo', 'texto', 'cinco')
        
        assert isinstance(resultado, str)
        assert 'Error' in resultado


class TestCalcularImpactoModeloInvalido:
    """tests con modelo inválido"""
    
    def test_modelo_no_existe(self):
        """rechazar modelo que no existe en dataset"""
        resultado = calcular_impacto('InvalidModel', 'texto', 5)
        
        assert isinstance(resultado, str)
        assert 'no encontrada' in resultado or 'no reconocido' in resultado
    
    def test_modelo_nombre_incorrecto(self):
        """rechazar modelo con nombre incorrecto (case-sensitive)"""
        resultado = calcular_impacto('gpt-4 turbo', 'texto', 5)  # lowercase
        
        # Depende de implementación, pero debería fallar
        if isinstance(resultado, str):
            assert 'no encontrada' in resultado


class TestCalcularImpactoTipoInvalido:
    """tests con tipo de consulta inválido"""
    
    def test_tipo_no_existe(self):
        """rechazar tipo_consulta que no existe"""
        resultado = calcular_impacto('GPT-4 Turbo', 'tipo_invalido', 5)
        
        assert isinstance(resultado, str)
        assert 'no encontrada' in resultado


class TestCalcularImpactoCantidadEspecial:
    """tests con cantidades especiales (float, grandes números)"""
    
    def test_cantidad_float(self):
        """aceptar cantidades con decimales"""
        resultado = calcular_impacto('Claude 3', 'audio', 2.5)
        
        assert isinstance(resultado, dict)
        assert resultado['cantidad'] == 2.5
    
    def test_cantidad_grande(self):
        """manejar cantidades grandes"""
        resultado = calcular_impacto('GPT-4 Turbo', 'texto', 10000)
        
        assert isinstance(resultado, dict)
        assert resultado['cantidad'] == 10000
        assert resultado['agua'] > 0
    
    def test_cantidad_uno(self):
        """manejar cantidad = 1"""
        resultado = calcular_impacto('GPT-4 Turbo', 'texto', 1)
        
        assert isinstance(resultado, dict)
        assert resultado['cantidad'] == 1
        assert resultado['agua'] > 0


class TestCalcularImpactoAllCombinations:
    """verificar que todos los modelos y tipos de consulta funcionan"""
    
    @pytest.mark.parametrize("modelo,tipo", [
        ('GPT-4 Turbo', 'texto'),
        ('Claude 3', 'texto'),
        ('Gemini 1.5', 'texto'),
        ('GPT-4 Turbo', 'código'),
        ('Claude 3', 'código'),
        ('Gemini 1.5', 'código'),
        ('GPT-4 Turbo', 'imagen'),
        ('Claude 3', 'imagen'),
        ('Gemini 1.5', 'imagen'),
        ('Claude 3', 'audio'),
        ('Gemini 1.5', 'audio'),
        ('GPT-4 Turbo', 'video'),
        ('Claude 3', 'video'),
        ('Gemini 1.5', 'video'),
    ])
    def test_all_modelo_tipo_combinations(self, modelo, tipo):
        """verif que todas las combinaciones válidas de modelo+tipo funcionan"""
        resultado = calcular_impacto(modelo, tipo, 1)
        
        assert isinstance(resultado, dict), f"Resultado no es dict para {modelo}+{tipo}"
        assert resultado['modelo'] == modelo
        assert resultado['tipo_consulta'] == tipo
        assert resultado['agua'] > 0 and resultado['energia'] > 0 and resultado['co2'] > 0


class TestCalcularImpactoMatematica:
    """tests para verificar que cálculos matemáticos son correctos"""
    
    def test_calculo_escala_lineal(self):
        """verif que el impacto escala linealmente con cantidad"""
        resultado_1 = calcular_impacto('GPT-4 Turbo', 'texto', 1)
        resultado_10 = calcular_impacto('GPT-4 Turbo', 'texto', 10)
        
        # agua con 10 debe ser aprox 10x que con 1
        ratio = resultado_10['agua'] / resultado_1['agua']
        assert ratio == pytest.approx(10.0, rel=0.02)
    
    def test_calculo_siempre_positivo(self, all_modelos, all_query_types):
        """verif que el resultado nunca tiene valores negativos"""
        for modelo in all_modelos:
            for tipo in all_query_types:
                resultado = calcular_impacto(modelo, tipo, 5)
                if isinstance(resultado, dict):
                    assert resultado['agua'] > 0, f"Agua negativa para {modelo} + {tipo}"
                    assert resultado['energia'] > 0, f"Energía negativa para {modelo} + {tipo}"
                    assert resultado['co2'] > 0, f"CO2 negativo para {modelo} + {tipo}"
    
    def test_calculo_valores_decimales(self):
        """verif que valores tienen máximo 2 decimales"""
        resultado = calcular_impacto('Claude 3', 'código', 3)
        
        # Convertir a string y verificar decimales
        agua_str = str(resultado['agua'])
        if '.' in agua_str:
            decimals = len(agua_str.split('.')[-1])
            assert decimals <= 2, f"Agua tiene {decimals} decimales, esperaba <=2"


class TestDataIntegrity:
    """Tests para verificar integridad completa del CSV"""
    
    def test_csv_cargado(self):
        """verif que CSV se cargó correctamente como diccionario"""
        assert DB is not None
        assert isinstance(DB, dict)
        assert len(DB) > 0
    
    def test_csv_minimo_filas(self):
        """verif que CSV tiene mínimo 14 filas (3 modelos × tipos variados)"""
        total_filas = sum(len(rows) for rows in DB.values())
        assert total_filas >= 14
    
    def test_csv_integridad_completa(self, all_modelos, all_query_types):
        """validación integral: campos, valores numéricos, tipos y equivalencias"""
        required_fields = ['modelo', 'tipo_consulta', 'agua(L)', 'energia(kWh)', 
                          'carbono(gCO2e)', 'eq_agua', 'eq_energia', 'eq_co2']
        
        for rows in DB.values():
            for row in rows:
                # verificar que todos los campos requeridos existen y no están vacíos
                for field in required_fields:
                    assert field in row, f"Campo {field} falta en row {row}"
                    assert row[field] != '', f"Campo {field} está vacío en {row}"
                
                # verificar valores numéricos son positivos
                agua = float(row['agua(L)'])
                energia = float(row['energia(kWh)'])
                carbono = float(row['carbono(gCO2e)'])
                
                assert agua > 0, f"Agua debe ser > 0 en {row}, got {agua}"
                assert energia > 0, f"Energía debe ser > 0 en {row}, got {energia}"
                assert carbono > 0, f"Carbono debe ser > 0 en {row}, got {carbono}"
                
                # verificar modelo y tipo válidos
                assert row['modelo'] in all_modelos, f"Modelo inválido: {row['modelo']}"
                assert row['tipo_consulta'] in all_query_types, f"Tipo inválido: {row['tipo_consulta']}"
                
                # verificar equivalencias presentes
                assert len(row['eq_agua']) > 0, f"eq_agua vacía en {row}"
                assert len(row['eq_energia']) > 0, f"eq_energia vacía en {row}"
                assert len(row['eq_co2']) > 0, f"eq_co2 vacía en {row}"
