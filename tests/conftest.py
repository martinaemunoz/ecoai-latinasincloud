import pytest
import sys
from pathlib import Path

# directorio raíz al path para imports
PROJECT_ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from app import app

@pytest.fixture
def client():
    # cliente flask para testing
    """ Configura la app en modo testing y proporciona un cliente para hacer requests. """
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


@pytest.fixture
def app_context():
    # contexto de app flask para testing
    with app.app_context():
        yield app


@pytest.fixture
def valid_form_data():
   # datos de formulario válidos para tests
    return {
        'modelo': 'GPT-4 Turbo',
        'tipo_consulta': 'texto',
        'cantidad': 5
    }


@pytest.fixture
def all_modelos():
    """
    Lista de todos los modelos válidos.
    """
    return ['GPT-4 Turbo', 'Claude 3', 'Gemini 1.5']


@pytest.fixture
def all_query_types():
    """
    Lista de todos los tipos de consulta válidos.
    """
    return ['texto', 'código', 'imagen', 'audio', 'video']