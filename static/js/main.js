// validación del formulario
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.impact-form');
    const consultasInput = document.getElementById('consultas');

    form.addEventListener('submit', function(e) {
        const consultas = parseInt(consultasInput.value);
        if (isNaN(consultas) || consultas <= 0) {
            e.preventDefault();
            alert('Por favor ingresa un número válido de consultas mayor a 0');
        }
    });
});
