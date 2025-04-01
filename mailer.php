<?php
// mailer.php

// Solo procesar solicitudes POST.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger y sanitizar los datos del formulario.
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // Verificar que los campos estén completos y que el correo sea válido.
    if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Oops! Hubo un problema con tu envío. Por favor, completa el formulario y vuelve a intentarlo.";
        exit;
    }

    // Dirección de correo del vendedor (actualiza este dato)
    $recipient = "jhordanmallma4@gmail.com";

    // Asunto del correo que se enviará al vendedor.
    $subject = "Nuevo mensaje de contacto de $name";

    // Construir el contenido del correo para el vendedor.
    $email_content = "Nombre: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Mensaje:\n$message\n";

    // Cabeceras del correo.
    $email_headers = "From: $name <$email>";

    // Enviar el correo al vendedor.
    if (mail($recipient, $subject, $email_content, $email_headers)) {

        // Si el correo al vendedor se envió correctamente, enviar respuesta automática al usuario.
        $user_subject = "Gracias por contactarnos - Respuesta Automática";
        $fragment = "“El éxito no es la clave de la felicidad. La felicidad es la clave del éxito.” – Albert Schweitzer";
        $link = "https://example.com/muestra"; // Actualiza con la URL deseada.
        $user_body = "Hola $name,\n\n" .
                     "¡Gracias por contactarnos! Hemos recibido tu mensaje y pronto nos pondremos en contacto contigo.\n\n" .
                     "Mientras tanto, te compartimos este fragmento exclusivo de 'La Fórmula para Emprender':\n" .
                     "$fragment\n\n" .
                     "Puedes descargar la muestra completa aquí: $link\n\n" .
                     "Saludos cordiales,\n" .
                     "El equipo de Ventas";
        $user_headers = "From: noreply@example.com\r\n"; // Actualiza con tu correo remitente.

        // Enviar el correo de respuesta automática al usuario.
        mail($email, $user_subject, $user_body, $user_headers);

        // Responder con un mensaje de éxito.
        http_response_code(200);
        echo "¡Gracias! Tu mensaje ha sido enviado con éxito.";
    } else {
        // Si ocurre un error al enviar el correo al vendedor.
        http_response_code(500);
        echo "Oops! Algo salió mal y no pudimos enviar tu mensaje.";
    }
} else {
    // Si la solicitud no es POST.
    http_response_code(403);
    echo "Hubo un problema con tu envío, por favor intenta de nuevo.";
}
?>

