// Función para manejar la selección de imagen
function handleImageSelection() {
    const fileInput = document.getElementById("imageInput");
    const labelFile = document.querySelector(".label-file");

    // Si hay un archivo seleccionado, actualizar el texto
    if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name; // Obtener el nombre del archivo
        labelFile.textContent = fileName;  // Cambiar el texto del label
    } else {
        labelFile.textContent = "Upload Image";  // Restaurar el texto original
    }
}

// Deshabilitar el botón de imagen si hay texto en el campo
document.getElementById("text").addEventListener("input", function () {
    const textInput = document.getElementById("text");
    const fileInput = document.getElementById("imageInput");
    const labelFile = document.querySelector(".label-file");

    if (textInput.value.trim() !== "") {
        labelFile.style.backgroundColor = "#B0B0B0";  // Fondo gris
        labelFile.style.cursor = "not-allowed";  // Cursor deshabilitado
        labelFile.style.pointerEvents = "none";  // Deshabilitar clics y hover
    } else {
        labelFile.style.backgroundColor = "#6F7302";  // Fondo verde oliva
        labelFile.style.cursor = "pointer";  // Cursor activo
        labelFile.style.pointerEvents = "auto";  // Habilitar clics y hover
    }
});

function generateQR() {
    const textInput = document.getElementById('text').value;
    const fileInput = document.getElementById('imageInput').files[0];
    
    if (!textInput && !fileInput) {
        alert('Por favor ingresa texto o selecciona una imagen para generar el QR');
        return;
    }

    let qrContent = textInput || URL.createObjectURL(fileInput);

    const qr = new QRious({
        element: document.getElementById('qrcode'),
        value: qrContent,
        size: 200
    });

    // Reset inputs
    document.getElementById('text').value = '';
    document.getElementById('imageInput').value = '';
    
    // Restaurar el estado del botón de subir imagen
    const labelFile = document.querySelector('.label-file');
    labelFile.textContent = 'Upload Image';
    labelFile.style.backgroundColor = '#6F7302';  // Restablecer solo el fondo, no el hover
    labelFile.style.cursor = 'pointer';  // Restablecer cursor
    labelFile.style.pointerEvents = 'auto';  // Habilitar clics y hover

    // Asegurarse de que el estilo hover funcione al pasar el mouse
    labelFile.addEventListener('mouseover', function() {
        labelFile.style.backgroundColor = '#F29B30';  // Cambiar el color de fondo al hacer hover
    });

    labelFile.addEventListener('mouseout', function() {
        labelFile.style.backgroundColor = '#6F7302';  // Restablecer el color de fondo cuando se quita el hover
    });
}


