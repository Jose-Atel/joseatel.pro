function validarYEnviar() {
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var telefono = document.getElementById('telefono').value;
    var mensaje = document.getElementById('mensaje').value;
    
    // Validar que todos los campos obligatorios estén completos
    if (nombre.trim() === '') {
        alert('Por favor, ingresa tu nombre.');
        return;
    }
    
    if (email.trim() === '') {
        alert('Por favor, ingresa tu correo electrónico.');
        return;
    }
    
    if (telefono.trim() === '') {
        alert('Por favor, ingresa tu número de teléfono.');
        return;
    }
    
    // Validar el formato del correo electrónico
    var emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(email.toLowerCase())) {
        alert('El correo electrónico ingresado no es válido.');
        return;
    }
    
    // Validar que el teléfono sea numérico y tenga 10 dígitos
    var telefonoRegex = /^[0-9]{10}$/;
    if (!telefonoRegex.test(telefono)) {
        alert('El número de teléfono ingresado no es válido. Debe contener solo números y tener 10 dígitos.');
        return;
    }
    
    // Construir el mensaje con el formato deseado
    var textoMensaje = `Hola, mi nombre es ${nombre}, mi número de teléfono es ${telefono} y mi dirección de correo electrónico es ${email}. 
                        \n${mensaje}`;
    
    // URL base de WhatsApp
    var baseUrl = "https://wa.me";
    
    // Componer la URL completa con el mensaje prellenado
    var url = `${baseUrl}/+59894054380/?text=${encodeURIComponent(textoMensaje)}`;
    
    // Abrir enlace en una nueva ventana
    window.open(url, '_blank');
}