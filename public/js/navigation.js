// Obtener referencia al botón y al menú
const menuToggle = document.getElementById('menuToggle');
const menuContent = document.getElementById('menuContent');

// Agregar controlador de eventos al botón
menuToggle.addEventListener('click', () => {
  // Alternar la clase 'active' del menú para mostrarlo u ocultarlo
menuContent.classList.toggle('active');
});


