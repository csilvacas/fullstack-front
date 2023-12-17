$(document).ready(function () {
    $('#pedidoform').submit(function (event) {
        event.preventDefault(); // Detener el envío del formulario por defecto

        let nombreValue = $('#nombre').val().trim();
        let apellidosValue = $('#apellidos').val().trim();
        let nombreLabel = $('#label_nombre');
        let apellidosLabel = $('#label_apellidos');

        cambiarColorLabel(nombreLabel, nombreValue === "", 'red');
        cambiarColorLabel(apellidosLabel, apellidosValue === "", 'red');

        // Solo enviar la solicitud en el caso de que ambos campos tengan algún valor.
        if (nombreValue !== "" && apellidosValue !== "") {            
            $('#pedidoform')[0].submit(); // Envía el formulario
        }
    });

    $("#tamano").on('change', function() {
        console.log(this.value);
        
        var selectedSize = this.value;

        // Realizar la llamada AJAX
        $.ajax({
            url: "http://localhost:5000/checksize",
            method: "POST",
            data: { size: selectedSize },
            success: function(response) {
                // Modificar el DOM con la respuesta obtenida
                $("#resultado_tamano").text(response);
            },
            error: function(xhr, status, error) {
                console.error("Error en la llamada AJAX:", status, error);                
            }
        });
    });
    

    // Función para cambiar el color del Label
    function cambiarColorLabel(label, valorVacio, color) {
        if (valorVacio) {
            label.css('color', color);
        } else {
            label.css('color', '');
        }
    }
});
