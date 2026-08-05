$(function () {
    $.getJSON("data/logros.json", function (data) {
        const $logros = $("#logrosGrid");
        (data.logros || []).forEach(function (logro) {
            $logros.append(
                '<div class="col-md-4 col-sm-6">' +
                '<div class="valor-card d-flex align-items-center gap-3">' +
                '<div class="valor-icono"><i class="bi ' + logro.icono + '"></i></div>' +
                '<div><h2 class="valor-titulo">' + logro.titulo + '</h2>' +
                '<p class="valor-texto">' + logro.texto + '</p></div>' +
                '</div></div>'
            );
        });
    });

    $.getJSON("data/vida-escolar.json", function (data) {
        const $galeria = $("#vidaEscolarGrid");
        (data.items || []).forEach(function (item) {
            $galeria.append(
                '<div class="col-6 col-md-3">' +
                '<a href="galeria.html" class="galeria-item">' +
                '<img src="' + item.imagen + '" alt="' + item.alt + '">' +
                '<span class="galeria-overlay">' + item.etiqueta + '</span>' +
                '</a></div>'
            );
        });
    });

    $.getJSON("data/avisos.json", function (data) {
        const $avisos = $("#avisosGrid");
        (data.avisos || []).forEach(function (aviso, i) {
            const tieneDetalle = aviso.detalle && aviso.detalle.trim() !== "";
            const boton = tieneDetalle
                ? '<button class="aviso-ver-mas" data-aviso-index="' + i + '">Ver detalle <i class="bi bi-arrow-right"></i></button>'
                : "";
            $avisos.append(
                '<div class="col-md-4">' +
                '<div class="aviso-card hover-lift">' +
                '<h3 class="aviso-titulo">' + aviso.titulo + '</h3>' +
                '<p class="aviso-texto">' + aviso.texto + '</p>' +
                boton +
                '</div></div>'
            );
        });

        $(document).on("click", ".aviso-ver-mas", function () {
            const idx = $(this).data("aviso-index");
            const aviso = data.avisos[idx];
            $("#modalAvisoTitulo").text(aviso.titulo);
            $("#modalAvisoTexto").html(aviso.detalle.replace(/\\n/g, "<br>"));
            new bootstrap.Modal(document.getElementById("modalAviso")).show();
        });
    });
});