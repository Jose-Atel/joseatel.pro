    function enviarWhatsapp() {
        var nombre = document.getElementById('nombre');
        var email = document.getElementById('email');
        var telefono = document.getElementById('telefono');
        var mensaje = document.getElementById('mensaje');

        // Validación de campos
        if (nombre.value.trim() === '') {
            nombre.style.border = '1px solid red';
            nombre.focus();
            return;
        } else {
            nombre.style.border = '1px solid #ccc';
        }

        if (email.value.trim() === '') {
            email.style.border = '1px solid red';
            email.focus();
            return;
        } else {
            email.style.border = '1px solid #ccc';
        }

        // Validación de formato de correo electrónico
        var emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if (!emailRegex.test(email.value.toLowerCase())) {
            email.style.border = '1px solid red';
            email.focus();
            return;
        } else {
            email.style.border = '1px solid #ccc';
        }

        if (telefono.value.trim() === '') {
            telefono.style.border = '1px solid red';
            telefono.focus();
            return;
        } else {
            telefono.style.border = '1px solid #ccc';
        }

        // Validación de formato de teléfono (numérico y 10 dígitos)
        var telefonoRegex = /^[0-9]{10}$/;
        if (!telefonoRegex.test(telefono.value)) {
            telefono.style.border = '1px solid red';
            telefono.focus();
            return;
        } else {
            telefono.style.border = '1px solid #ccc';
        }

        // Construir el mensaje para WhatsApp
        var textoMensaje = `Hola, mi nombre es ${nombre.value}, mi número de teléfono es ${telefono.value} y mi dirección de correo electrónico es ${email.value}. ${mensaje.value}`;

        // URL base de WhatsApp
        var baseUrl = 'https://wa.me';

        // Componer la URL completa con el mensaje prellenado
        var url = `${baseUrl}/NUMERO_DE_TELEFONO/?text=${encodeURIComponent(textoMensaje)}`;

        // Abrir enlace en una nueva ventana
        window.open(url, '_blank');
    }
