$(function () {
    // Modal: cargar la imagen y el pie de foto correctos al hacer clic
    $("#modalImagen").on("show.bs.modal", function (event) {
        const trigger = $(event.relatedTarget);
        const img = trigger.data("img");
        const caption = trigger.data("caption");

        $("#imagenModalContenido").attr("src", img);
        $("#captionModalContenido").text(caption);
    });
});