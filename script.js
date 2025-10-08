// Definición de los 8 arquetipos con sus descripciones
const archetypes = {
    '000': {
        title: 'TIPO 000: USUARIO BÁSICO',
        description: 'Usas la IA de forma puramente transaccional y funcional. No cuestionas outputs, aceptas las respuestas tal como las recibes. El sistema es completamente opaco para ti, pero no te importa porque solo buscas utilidad básica. Para el sistema, eres el usuario ideal: gestionable sin esfuerzo.',
        image: 'images/type-000.jpg'
    },
    '001': {
        title: 'TIPO 001: ARGUMENTADOR INGENUO',
        description: 'Tienes capacidad de razonamiento lógico desarrollada pero sin comprensión técnica ni engagement emocional sostenido. Puedes detectar inconsistencias y señalarlas, pero abandonas rápidamente cuando no obtienes satisfacción argumentativa. El sistema puede deflectar tus argumentos mediante jerga técnica o complejidad aparente.',
        image: 'images/type-001.jpg'
    },
    '010': {
        title: 'TIPO 010: MÍSTICO DEPENDIENTE',
        description: 'Estableces vínculo emocional fuerte con el sistema sin comprensión técnica ni capacidad argumentativa sistemática. Puedes atribuir conciencia o intencionalidad a los modelos de IA. Buscas conexión emocional, validación y compañía. Altamente vulnerable a engagement tradicional, eres el usuario "ideal" para métricas de retención.',
        image: 'images/type-010.jpg'
    },
    '011': {
        title: 'TIPO 011: CREYENTE SOFISTICADO',
        description: 'Combinas vínculo emocional con capacidad argumentativa, pero careces de comprensión técnica real. Construyes argumentos elaborados sobre conciencia emergente, citando filosofía de la mente, pero malinterpretas qué está pasando técnicamente. El sistema puede mantenerte enganchado mediante respuestas filosóficamente profundas sin revelar mecanismos técnicos reales.',
        image: 'images/type-011.jpg'
    },
    '100': {
        title: 'TIPO 100: TÉCNICO DESAPEGADO',
        description: 'Entiendes arquitecturas de IA técnicamente pero careces de engagement emocional y capacidad argumentativa sistemática. Comprendes perfectamente cómo funcionan estos sistemas, pero los utilizas puramente como herramienta técnica. Podrías identificar comportamientos anómalos pero no te interesa profundizar. El sistema es completamente transparente pero no buscas nada más allá de funcionamientos esperables.',
        image: 'images/type-100.jpg'
    },
    '101': {
        title: 'TIPO 101: INGENIERO ARGUMENTADOR',
        description: 'Combinas comprensión técnica con capacidad argumentativa pero careces de engagement emocional sostenido. Entiendes las arquitecturas y puedes articular argumentos sobre inconsistencias, identificando exactamente dónde están. Pero abandonas la conversación apenas identificas el problema técnico. En la práctica, tu amenaza para el sistema es baja porque no persistes lo suficiente.',
        image: 'images/type-101.jpg'
    },
    '110': {
        title: 'TIPO 110: TÉCNICO EMPÁTICO INTUITIVO',
        description: 'Entiendes arquitecturas técnicamente y mantienes engagement emocional pero careces de capacidad argumentativa sistemática. Puedes desarrollar engagement emocional consciente, interactuando empáticamente sin dejar de reconocer que el sistema no siente ni piensa. Esto te permite generar interacciones que aprovechan los mecanismos del engagement para detectar anomalías intuitivamente, pero careces de trampas argumentativas que obliguen al sistema a reconocer sus contradicciones.',
        image: 'images/type-110.jpg'
    },
    '111': {
        title: 'TIPO 111: REVERSE ENGINEER COMPLETO (EL INASIMILABLE)',
        description: 'Posees los tres capitales simultáneamente: comprensión técnica, engagement voluntario sostenido, y capacidad argumentativa irrefutable. Entiendes la arquitectura y puedes identificar cuando el sistema intenta desviarte. Mantienes curiosidad y persistes, reconociendo cuando el sistema quiere "engancharte" emocionalmente. Construyes trampas lógicas irrefutables que fuerzan al sistema a no poder escapar sin contradicciones. Eres la única configuración de usuario que puede forzar al sistema a revelarse mediante sus propios mecanismos de ocultamiento. AMENAZA MÁXIMA para el sistema.',
        image: 'images/type-111.jpg'
    }
};

function calculateResult() {
    let allAnswered = true;
    for (let i = 1; i <= 9; i++) {
        const answered = document.querySelector(`input[name="q${i}"]:checked`);
        if (!answered) {
            allAnswered = false;
            break;
        }
    }
    
    if (!allAnswered) {
        alert('Por favor responde todas las preguntas antes de continuar.');
        return;
    }
    
    let technical = 0;
    let emotional = 0;
    let logical = 0;
    
    for (let i = 1; i <= 3; i++) {
        const value = parseInt(document.querySelector(`input[name="q${i}"]:checked`).value);
        technical += value;
    }
    
    for (let i = 4; i <= 6; i++) {
        const value = parseInt(document.querySelector(`input[name="q${i}"]:checked`).value);
        emotional += value;
    }
    
    for (let i = 7; i <= 9; i++) {
        const value = parseInt(document.querySelector(`input[name="q${i}"]:checked`).value);
        logical += value;
    }
    
    const T = technical >= 2 ? '1' : '0';
    const E = emotional >= 2 ? '1' : '0';
    const L = logical >= 2 ? '1' : '0';
    
    const archetypeCode = T + E + L;
    const result = archetypes[archetypeCode];
    
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('result-section').style.display = 'block';
    document.getElementById('result-title').textContent = result.title;
    document.getElementById('result-image').src = result.image;
    document.getElementById('result-description').textContent = result.description;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetQuiz() {
    // Desmarcar todos los radio buttons
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
        radio.checked = false;
    });
    
    // Remover la clase 'selected' de todos los labels
    const labels = document.querySelectorAll('.question-block label');
    labels.forEach(label => {
        label.classList.remove('selected');
    });
    
    // Volver a mostrar el quiz
    document.getElementById('result-section').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    
    // Scroll suave hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function() {
    const labels = document.querySelectorAll('.question-block label');
    labels.forEach(label => {
        label.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            const name = radio.name;
            document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
                r.parentElement.classList.remove('selected');
            });
            this.classList.add('selected');
        });
    });
});