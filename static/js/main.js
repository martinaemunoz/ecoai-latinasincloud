/**
 * main js
 * maneja interactividad, validación y dinámicas ui
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

    // mapeo de descripciones y unidades por tipo de consulta
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
     * modelo change - habilitar tipo si modelo está seleccionado
     */
    if (modeloSelect) {
        modeloSelect.addEventListener('change', function() {
            validateForm();
        });
    }

    /**
     * tipo de consulta habilita input y actualiza UI dinámicamente
     */
    if (tipoSelect) {
        tipoSelect.addEventListener('change', function() {
            const tipoValue = this.value;
            
            if (tipoValue && queryTypeConfig[tipoValue]) {
                const config = queryTypeConfig[tipoValue];
                
                // actualizar hint
                typeHint.textContent = config.hint;
                typeHint.style.color = 'var(--text-light)';
                
                // actualizar label
                cantidadLabel.textContent = config.label;

                // actualizar unidad
                cantidadUnit.textContent = config.unit;
                
                // habilitar input de cantidad
                cantidadInput.disabled = false;
                cantidadInput.focus();
            } else {
                // reset si no hay valor seleccionado
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
     * cantidad input - validación en tiempo real
     */
    if (cantidadInput) {
        cantidadInput.addEventListener('input', function() {
            // convertir a número entero
            if (this.value && !isNaN(this.value)) {
                this.value = Math.floor(Math.abs(parseInt(this.value)));
            }
            validateForm();
        });

        cantidadInput.addEventListener('blur', function() {
            if (this.value) {
                // asegurar que sea un número entero positivo
                let num = parseInt(this.value);
                if (!isNaN(num) && num > 0) {
                    this.value = num;
                } else {
                    this.value = '';
                }
            }
        });
    }

    /**
     * form submit
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
     * validar formulario y habilitar/deshabilitar botón submit
     */
    function validateForm() {
        const modeloValue = modeloSelect.value.trim();
        const tipoValue = tipoSelect.value.trim();
        const cantidadValue = cantidadInput.value.trim();

        // validaciones
        const isModeloValid = modeloValue.length > 0;
        const isTipoValid = tipoValue.length > 0;
        const isCantidadValid = cantidadValue.length > 0 && 
                                !isNaN(cantidadValue) && 
                                parseFloat(cantidadValue) > 0;

        // habilitar botón submit si todos los campos son válidos
        submitBtn.disabled = !(isModeloValid && isTipoValid && isCantidadValid);

        // limpiar error al empezar a escribir
        if (formError.textContent) {
            formError.classList.add('hidden');
            formError.textContent = '';
        }

        return isModeloValid && isTipoValid && isCantidadValid;
    }

    /**
     * mostrar mensaje de error
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

    // Scroll específico para "¿Cómo funciona?" (#info)
    document.querySelectorAll('a[href="#info"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector('#info');
            
            if (target) {
                // Obtener altura del navbar para ajustar el scroll
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                
                // Calcular posición ajustada para mostrar el título completo
                const targetPosition = target.offsetTop - navbarHeight + 50;
                
                // Scroll suave a la posición ajustada
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll específico para "Comenzar Cálculo" (#calculator)
    document.querySelectorAll('a[href="#calculator"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector('#calculator');
            
            if (target) {
                // Para el botón "Comenzar Cálculo", usar scroll normal sin ajuste extra
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll genérico para otros enlaces de anclaje (si los hay)
    document.querySelectorAll('a[href^="#"]:not([href="#info"]):not([href="#calculator"])').forEach(anchor => {
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
