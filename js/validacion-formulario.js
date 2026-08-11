// Validación Bootstrap genérica. Se aplica a cualquier formulario con la
// clase "form-contacto" (Contacto y Libro de Reclamaciones la comparten).
// Si el formulario es válido, no se bloquea el envío: se manda de verdad
// a Web3Forms (POST real, procesado en producción).
$(function () {
    document.querySelectorAll("form.form-contacto").forEach(function (form) {
        form.addEventListener("submit", function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                form.classList.add("was-validated");
            }
        });
    });
});