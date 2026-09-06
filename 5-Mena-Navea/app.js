// app.js
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover la clase active de todos los botones
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Ocultar todos los contenidos
            tabContents.forEach(content => content.classList.add('hidden'));

            // Añadir clase active al botón clickeado
            button.classList.add('active');
            
            // Mostrar la sección correspondiente
            const targetId = button.getAttribute('data-target');
            document.getElementById(targetId).classList.remove('hidden');
        });
    });

    // Validaciones e interacciones de prueba
    const inscribirBtns = document.querySelectorAll('.btn-primary');
    inscribirBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.taller-card');
            const titulo = card.querySelector('h3').innerText;
            alert(`Inscripción registrada con éxito en: ${titulo}`);
        });
    });
});