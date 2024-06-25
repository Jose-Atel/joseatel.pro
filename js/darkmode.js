const darkModeToggle = document.getElementById('darkModeToggle'); // Assuming you have a button with this ID

darkModeToggle.addEventListener('click', () => {
  const html = document.querySelector('html'); 

  // Toggle the 'dark' class on the root element
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    localStorage.setItem('darkMode', 'false'); // Store preference in local storage
  } else {
    html.classList.add('dark');
    localStorage.setItem('darkMode', 'true'); // Store preference in local storage
  }
});

// Check if dark mode is enabled on page load
const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
if (darkModeEnabled) {
  document.querySelector('html').classList.add('dark');
}