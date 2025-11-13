// Validación y lógica dinámica del formulario
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.impact-form');
    const tipoConsultaSelect = document.getElementById('tipo_consulta');
    const cantidadInput = document.getElementById('cantidad');
    const cantidadLabel = document.getElementById('cantidad-label');
    const modeloSelect = document.getElementById('modelo');

    // Actualizar label y habilitar campo cuando se selecciona tipo de consulta
    tipoConsultaSelect.addEventListener('change', function(e) {
        const selectedType = e.target.value;
        
        if (selectedType) {
            // Obtener el label correspondiente del atributo data
            const labelText = tipoConsultaSelect.dataset[selectedType];
            cantidadLabel.textContent = labelText || 'Cantidad:';
            cantidadInput.disabled = false;
            cantidadInput.placeholder = `Ingresa ${labelText.toLowerCase()}`;
            cantidadInput.required = true;
        } else {
            // Reset si no hay selección
            cantidadLabel.textContent = 'Cantidad:';
            cantidadInput.disabled = true;
            cantidadInput.placeholder = 'Selecciona un tipo de consulta primero';
            cantidadInput.value = '';
            cantidadInput.required = false;
        }
    });

    // Validación al enviar
    form.addEventListener('submit', function(e) {
        const modelo = modeloSelect.value;
        const tipoConsulta = tipoConsultaSelect.value;
        const cantidad = parseInt(cantidadInput.value);
        
        if (!modelo || !tipoConsulta || isNaN(cantidad) || cantidad <= 0) {
            e.preventDefault();
            alert('Por favor completa todos los campos correctamente');
        }
    });
});
