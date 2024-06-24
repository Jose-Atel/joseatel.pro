    function enviarWhatsapp() {
        var nombre = document.getElementById('nombre').value;
        var email = document.getElementById('email').value;
        var telefono = document.getElementById('telefono').value;
        var mensaje = document.getElementById('mensaje').value;

        // Validación de campos
        if (nombre.trim() === '' || email.trim() === '' || telefono.trim() === '') {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }

        // Construir el mensaje para WhatsApp
        var textoMensaje = `Hola, mi nombre es ${nombre}, mi número de teléfono es ${telefono} y mi dirección de correo electrónico es ${email}. ${mensaje}`;

        // URL base de WhatsApp
        var baseUrl = 'https://wa.me';

        // Componer la URL completa con el mensaje prellenado
        var url = `${baseUrl}/+59894054380/?text=${encodeURIComponent(textoMensaje)}`;

        // Abrir enlace en una nueva ventana
        window.open(url, '_blank');
    }
