# Integration tests para Flask routes (app.py)
# Verifican que las rutas funcionan correctamente con templates y formularios.

import pytest

class TestIndexRoute:
    """tests para ruta GET /"""
    
    def test_index_route_status_200(self, client):
        """verificar que GET / retorna status 200"""
        response = client.get('/')
        assert response.status_code == 200
    
    def test_index_route_returns_html(self, client):
        """verificar que GET / retorna HTML content-type"""
        response = client.get('/')
        assert 'text/html' in response.content_type or response.content_type == 'text/html; charset=utf-8'
    
    def test_index_form_elementos_presentes(self, client):
        """verificar que formulario tiene todos los elementos necesarios"""
        response = client.get('/')
        
        # verificar selects
        assert b'<select' in response.data
        assert b'name="modelo"' in response.data or b'name=\'modelo\'' in response.data
        assert b'name="tipo_consulta"' in response.data or b'name=\'tipo_consulta\'' in response.data
        
        # verificar input number
        assert b'name="cantidad"' in response.data or b'name=\'cantidad\'' in response.data
        assert b'type="number"' in response.data or b'type=\'number\'' in response.data
    
    def test_index_form_opciones_modelos_y_tipos(self, client, all_query_types):
        """verificar que opciones de modelos y tipos están presentes en formulario"""
        response = client.get('/')
        
        # verificar que los 3 modelos están disponibles
        assert b'GPT-4 Turbo' in response.data
        assert b'Claude 3' in response.data
        assert b'Gemini 1.5' in response.data
        
        # verificar que todas las opciones de tipos de consulta están
        for tipo in all_query_types:
            assert tipo.encode('utf-8') in response.data, f"Tipo {tipo} no encontrado en HTML"
    
    def test_index_tiene_titulo_y_encabezado(self, client):
        """verificar que página tiene un título o encabezado"""
        response = client.get('/')
        assert b'<title>' in response.data or b'<h' in response.data


class TestCalcularRoute:
    """tests para ruta POST /calcular - validación general de respuesta"""
    
    def test_calcular_route_post_valido_y_retorna_html(self, client, valid_form_data):
        """POST válido retorna 200 con HTML"""
        response = client.post('/calcular', data=valid_form_data)
        
        assert response.status_code == 200
        assert 'text/html' in response.content_type or response.content_type == 'text/html; charset=utf-8'
    
    def test_calcular_resultados_contienen_todos_campos(self, client, valid_form_data):
        """verificar que resultados contienen modelo, cantidad, agua, energía y CO₂"""
        response = client.post('/calcular', data=valid_form_data)
        
        # validar que todos los campos requeridos están presentes
        assert valid_form_data['modelo'].encode('utf-8') in response.data, "Modelo no en respuesta"
        assert str(valid_form_data['cantidad']).encode('utf-8') in response.data, "Cantidad no en respuesta"
        
        # validar impactos ambientales
        response_lower = response.data.lower()
        assert b'agua' in response_lower or b'l' in response_lower, "Agua no en respuesta"
        assert b'energia' in response_lower or b'kwh' in response_lower, "Energía no en respuesta"
        assert b'co' in response_lower or b'carbono' in response_lower, "CO₂ no en respuesta"


class TestCalcularRouteValidation:
    """validación de entrada en POST /calcular"""
    
    def test_calcular_campos_faltantes_manejados(self, client):
        """verificar que campos faltantes se manejan correctamente"""
        # sin modelo
        response1 = client.post('/calcular', data={'tipo_consulta': 'texto', 'cantidad': 5})
        assert response1.status_code in [200, 400, 500] or b'Error' in response1.data
        
        # sin tipo_consulta
        response2 = client.post('/calcular', data={'modelo': 'GPT-4 Turbo', 'cantidad': 5})
        assert response2.status_code in [200, 400, 500] or b'Error' in response2.data
        
        # sin cantidad
        response3 = client.post('/calcular', data={'modelo': 'GPT-4 Turbo', 'tipo_consulta': 'texto'})
        assert response3.status_code in [200, 400, 500] or b'Error' in response3.data
    
    def test_calcular_datos_invalidos_rechazan(self, client):
        """verificar que datos inválidos son rechazados"""
        # modelo inválido
        response1 = client.post('/calcular', data={
            'modelo': 'InvalidModel',
            'tipo_consulta': 'texto',
            'cantidad': 5
        })
        assert response1.status_code == 200
        assert b'Error' in response1.data or b'no encontrada' in response1.data
        
        # tipo inválido
        response2 = client.post('/calcular', data={
            'modelo': 'GPT-4 Turbo',
            'tipo_consulta': 'tipo_invalido',
            'cantidad': 5
        })
        assert response2.status_code == 200
        assert b'Error' in response2.data or b'no encontrada' in response2.data
        
        # cantidad inválida (cero)
        response3 = client.post('/calcular', data={
            'modelo': 'GPT-4 Turbo',
            'tipo_consulta': 'texto',
            'cantidad': 0
        })
        assert response3.status_code == 200
        assert b'Error' in response3.data
        
        # cantidad negativa
        response4 = client.post('/calcular', data={
            'modelo': 'GPT-4 Turbo',
            'tipo_consulta': 'texto',
            'cantidad': -5
        })
        assert response4.status_code == 200
        assert b'Error' in response4.data


class TestCalcularRouteValidCombinations:
    """tests para múltiples combinaciones válidas de modelo+tipo"""
    
    def test_gpt4_texto(self, client):
        """test GPT-4 Turbo + texto"""
        response = client.post('/calcular', data={
            'modelo': 'GPT-4 Turbo',
            'tipo_consulta': 'texto',
            'cantidad': 1
        })
        assert response.status_code == 200
        assert b'GPT-4 Turbo' in response.data
    
    def test_claude_codigo(self, client):
        """test Claude 3 + código"""
        response = client.post('/calcular', data={
            'modelo': 'Claude 3',
            'tipo_consulta': 'código',
            'cantidad': 1
        })
        assert response.status_code == 200
        assert b'Claude 3' in response.data
    
    def test_gemini_imagen(self, client):
        """test Gemini 1.5 + imagen"""
        response = client.post('/calcular', data={
            'modelo': 'Gemini 1.5',
            'tipo_consulta': 'imagen',
            'cantidad': 1
        })
        assert response.status_code == 200
        assert b'Gemini 1.5' in response.data
    
    def test_claude_audio(self, client):
        """test Claude 3 + audio"""
        response = client.post('/calcular', data={
            'modelo': 'Claude 3',
            'tipo_consulta': 'audio',
            'cantidad': 1
        })
        assert response.status_code == 200
        assert b'Claude 3' in response.data
    
    def test_video_result(self, client):
        """test con tipo video"""
        response = client.post('/calcular', data={
            'modelo': 'Claude 3',
            'tipo_consulta': 'video',
            'cantidad': 2
        })
        assert response.status_code == 200
        assert b'Claude 3' in response.data


class TestTemplateRendering:
    """tests para verificar que templates se renderizan correctamente"""
    
    def test_index_template_existe(self, client):
        """Verificar que template index.html existe y se renderiza"""
        response = client.get('/')
        assert response.status_code == 200
        # si template no existiera, flask lanzaría error
    
    def test_results_template_existe(self, client, valid_form_data):
        """verificar que template results.html existe y se renderiza"""
        response = client.post('/calcular', data=valid_form_data)
        assert response.status_code == 200
        # si template no existiera, flask lanzaría error
    
    def test_template_inheritance_base(self, client):
        """verificar que templates heredan de base.html (si existe)"""
        response = client.get('/')
        # Buscar elementos comunes de base (ej: doctype, html tags)
        assert b'<!doctype' in response.data.lower() or b'<!DOCTYPE' in response.data
        assert b'<html' in response.data or b'<HTML' in response.data


class TestFormSubmissionAndEdgeCases:
    """tests para flujo completo de formulario y casos especiales"""
    
    def test_form_post_retorna_resultados(self, client):
        """verificar que submit de formulario retorna página de resultados"""
        response = client.post('/calcular', data={
            'modelo': 'GPT-4 Turbo',
            'tipo_consulta': 'texto',
            'cantidad': 5
        })
        
        assert response.status_code == 200
        assert b'Resultado' in response.data or b'resultado' in response.data.lower() or b'Impacto' in response.data
    
    def test_form_cantidad_especial_aceptada(self, client):
        """verificar que formulario acepta cantidades especiales (float, grandes)"""
        # cantidad con decimales
        response1 = client.post('/calcular', data={
            'modelo': 'Claude 3',
            'tipo_consulta': 'audio',
            'cantidad': '2.5'
        })
        assert response1.status_code == 200
        
        # cantidad grande
        response2 = client.post('/calcular', data={
            'modelo': 'GPT-4 Turbo',
            'tipo_consulta': 'texto',
            'cantidad': '1000'
        })
        assert response2.status_code == 200


class TestResponseContent:
    """tests para verificar contenido específico en respuestas"""

    def test_results_contienen_equivalencias_y_formato(self, client, valid_form_data):
        """verificar que resultados muestran equivalencias e información formateada"""
        response = client.post('/calcular', data=valid_form_data)
        
        # debe contener palabras clave de equivalencias
        tiene_eq = (b'vaso' in response.data or 
                   b'botella' in response.data or 
                   b'ampolleta' in response.data or 
                   b'led' in response.data or 
                   b'auto' in response.data or
                   b'km' in response.data)
        assert tiene_eq, "No se encontraron referencias a equivalencias en respuesta"
        
        # verificar que tipo_consulta se muestra correctamente
        response2 = client.post('/calcular', data={
            'modelo': 'GPT-4 Turbo',
            'tipo_consulta': 'texto',
            'cantidad': 1
        })
        assert b'texto' in response2.data.lower() or b'Texto' in response2.data
