/**
 * EcoAI - Main JavaScript
 * Maneja interactividad del formulario, validación y dinámicas de UI
 */

document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // ELEMENTOS DEL DOM
    // ========================================
    const modeloSelect = document.getElementById('modelo');
    const tipoSelect = document.getElementById('tipo_consulta');
    const cantidadInput = document.getElementById('cantidad');
    const submitBtn = document.getElementById('submitBtn');
    const form = document.getElementById('impactForm');
    const typeHint = document.getElementById('typeHint');
    const cantidadLabel = document.getElementById('cantidadLabel');
    const cantidadUnit = document.getElementById('cantidadUnit');
    const formError = document.getElementById('formError');

    // Mapeo de descripciones y unidades por tipo de consulta
    const queryTypeConfig = {
        texto: {
            hint: 'Número de consultas de texto simple',
            unit: 'consultas',
            label: 'Número de Consultas'
        },
        código: {
            hint: 'Cantidad de bloques de código',
            unit: 'bloques',
            label: 'Cantidad de Bloques'
        },
        imagen: {
            hint: 'Número de imágenes generadas',
            unit: 'imágenes',
            label: 'Número de Imágenes'
        },
        audio: {
            hint: 'Cantidad de minutos de audio',
            unit: 'minutos',
            label: 'Minutos de Audio'
        },
        video: {
            hint: 'Cantidad de minutos de video',
            unit: 'minutos',
            label: 'Minutos de Video'
        }
    };

    // ========================================
    // EVENT LISTENERS
    // ========================================

    /**
     * Modelo change - Habilitar tipo si modelo está seleccionado
     */
    if (modeloSelect) {
        modeloSelect.addEventListener('change', function() {
            validateForm();
        });
    }

    /**
     * Tipo de consulta change - Actualizar UI dinámicamente
     */
    if (tipoSelect) {
        tipoSelect.addEventListener('change', function() {
            const tipoValue = this.value;
            
            if (tipoValue && queryTypeConfig[tipoValue]) {
                const config = queryTypeConfig[tipoValue];
                
                // Actualizar hint
                typeHint.textContent = config.hint;
                typeHint.style.color = 'var(--text-light)';
                
                // Actualizar label
                cantidadLabel.textContent = config.label;
                
                // Actualizar unidad
                cantidadUnit.textContent = config.unit;
                
                // Habilitar input de cantidad
                cantidadInput.disabled = false;
                cantidadInput.focus();
            } else {
                // Reset si no hay valor seleccionado
                typeHint.textContent = 'Selecciona un tipo de consulta primero';
                typeHint.style.color = 'var(--text-light)';
                cantidadLabel.textContent = 'Cantidad';
                cantidadUnit.textContent = '';
                cantidadInput.disabled = true;
                cantidadInput.value = '';
            }
            
            validateForm();
        });
    }

    /**
     * Cantidad input - Validación en tiempo real
     */
    if (cantidadInput) {
        cantidadInput.addEventListener('input', function() {
            validateForm();
        });

        cantidadInput.addEventListener('blur', function() {
            if (this.value) {
                // Formatear número a 2 decimales si es necesario
                let num = parseFloat(this.value);
                if (!isNaN(num)) {
                    this.value = num.toFixed(2).replace(/\.?0+$/, '');
                }
            }
        });
    }

    /**
     * Form submit
     */
    if (form) {
        form.addEventListener('submit', function(e) {
            if (!validateForm()) {
                e.preventDefault();
                showError('Por favor completa todos los campos correctamente');
            }
        });
    }

    // ========================================
    // FUNCIONES DE VALIDACIÓN
    // ========================================

    /**
     * Validar formulario y habilitar/deshabilitar botón submit
     */
    function validateForm() {
        const modeloValue = modeloSelect.value.trim();
        const tipoValue = tipoSelect.value.trim();
        const cantidadValue = cantidadInput.value.trim();

        // Validaciones
        const isModeloValid = modeloValue.length > 0;
        const isTipoValid = tipoValue.length > 0;
        const isCantidadValid = cantidadValue.length > 0 && 
                                !isNaN(cantidadValue) && 
                                parseFloat(cantidadValue) > 0;

        // Habilitar botón submit si todos los campos son válidos
        submitBtn.disabled = !(isModeloValid && isTipoValid && isCantidadValid);

        // Limpiar error al empezar a escribir
        if (formError.textContent) {
            formError.classList.add('hidden');
            formError.textContent = '';
        }

        return isModeloValid && isTipoValid && isCantidadValid;
    }

    /**
     * Mostrar mensaje de error
     */
    function showError(message) {
        formError.textContent = message;
        formError.classList.remove('hidden');
        formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // ========================================
    // INICIALIZACIÓN
    // ========================================

    // Validar formulario al cargar
    validateForm();

    // ========================================
    // SMOOTH SCROLL PARA ANCHORS
    // ========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // FORMATO DE NÚMEROS EN RESULTADOS
    // ========================================

    // Mejorar presentación de números grandes con separadores de miles
    function formatNumber(num) {
        return Number(num).toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    // ========================================
    // ACCESSIBILITY
    // ========================================

    // Agregar aria-labels para accesibilidad
    if (submitBtn && !submitBtn.hasAttribute('aria-label')) {
        submitBtn.setAttribute('aria-label', 'Calcular impacto ambiental');
    }

    // ========================================
    // ANALYTICS (Opcional)
    // ========================================

    // Rastrear cuando el usuario completa el formulario
    if (form) {
        form.addEventListener('submit', function(e) {
            const modelo = modeloSelect.value;
            const tipo = tipoSelect.value;
            const cantidad = cantidadInput.value;
            
            // Aquí se puede agregar llamada a analytics
            console.log('Form submitted:', { modelo, tipo, cantidad });
        });
    }
});

/**
 * Función para copiar al portapapeles (útil para compartir resultados)
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        console.log('Copiado al portapapeles');
    }, function(err) {
        console.error('Error al copiar: ', err);
    });
}

/**
 * Función para imprimir resultados
 */
function printResults() {
    window.print();
}
