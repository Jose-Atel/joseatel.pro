  const darkModeToggle = document.getElementById('darkModeToggle');
  const html = document.querySelector('html');

  // Función para actualizar el texto del botón
  const updateButtonText = () => {
    if (html.classList.contains('dark')) {
      darkModeToggle.textContent = 'Modo Claro';
    } else {
      darkModeToggle.textContent = 'Modo Oscuro';
    }
  };

  darkModeToggle.addEventListener('click', () => {
    // Toggle the 'dark' class on the root element
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('darkMode', 'false'); // Store preference in local storage
    } else {
      html.classList.add('dark');
      localStorage.setItem('darkMode', 'true'); // Store preference in local storage
    }

    // Actualizar el texto del botón
    updateButtonText();
  });

  // Check if dark mode is enabled on page load
  const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
  if (darkModeEnabled) {
    html.classList.add('dark');
  }

  // Actualizar el texto del botón al cargar la página
  updateButtonText();
