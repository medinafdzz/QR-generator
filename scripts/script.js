// Función para manejar la selección de imagen
function handleImageSelection() {
    const fileInput = document.getElementById("imageInput");
    const labelFile = document.querySelector(".label-file");

    if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name;
        labelFile.textContent = fileName;
    } else {
        labelFile.textContent = "Upload Image";
    }
}

function generateQR() {
    const textInput = document.getElementById('text').value;
    const fileInput = document.getElementById('imageInput').files[0];

    if (!textInput && !fileInput) {
        alert('Por favor ingresa texto o selecciona una imagen para generar el QR');
        return;
    }

    let qrContent = textInput || "";  // Si hay texto, usar texto, sino vacío

    if (fileInput) {
        // Usar FormData para enviar la imagen a Imgur
        const formData = new FormData();
        formData.append("image", fileInput);

        fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            headers: {
                'Authorization': 'Client-ID 11214b83c404406', // Tu Client-ID
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const imageUrl = data.data.link; // URL de la imagen subida

                // Generar el QR con la URL de la imagen
                const qr = new QRious({
                    element: document.getElementById('qrcode'),
                    value: imageUrl,
                    size: 200
                });

                // Mostrar el mensaje debajo del QR con el enlace de Imgur
                const imgurMessage = document.getElementById('imgur-message');
                const imgurLink = document.getElementById('imgur-link');
                imgurLink.href = imageUrl;
                imgurMessage.style.display = 'block'; // Mostrar el mensaje

                // Limpiar los campos de entrada
                document.getElementById('text').value = '';
                document.getElementById('imageInput').value = '';
                document.querySelector('.label-file').textContent = 'Upload Image';
            } else {
                alert('Error al subir la imagen');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al subir la imagen');
        });
    } else {
        // Generar el código QR solo con el texto
        const qr = new QRious({
            element: document.getElementById('qrcode'),
            value: qrContent,
            size: 200
        });
    }
}