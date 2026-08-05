$(function () {
    $.getJSON("data/aviso-institucional.json", function (data) {

        // Fecha de actualización y referencia
        $("#avisoFechaActualizacion").text(data.fecha_actualizacion);
        $("#avisoReferenciaOficio").text(data.referencia_oficio);

        // Tabla de cronograma
        const $tbody = $("#cronogramaTbody");
        $tbody.empty();
        (data.cronograma || []).forEach(function (fila) {
            $tbody.append(
                "<tr>" +
                "<td>" + fila.bloque + "</td>" +
                "<td>" + fila.inicio + "</td>" +
                "<td>" + fila.termino + "</td>" +
                "<td>" + fila.semanas + "</td>" +
                "<td>" + fila.observacion + "</td>" +
                "</tr>"
            );
        });

        // Tarjetas de documentos
        const $docs = $("#documentosGrid");
        $docs.empty();
        (data.documentos || []).forEach(function (doc) {
            $docs.append(
                '<div class="col-md-6">' +
                '<div class="card h-100 shadow-sm border-0 rep-doc-card p-4 text-center">' +
                '<div class="card-body d-flex flex-column align-items-center justify-content-center p-0">' +
                '<i class="bi bi-file-earmark-pdf-fill display-4 mb-3 rep-doc-icono"></i>' +
                '<h3 class="card-title h5 rep-doc-titulo mb-2">' + doc.titulo + '</h3>' +
                '<p class="card-text text-muted small rep-doc-fecha mb-4">Publicado: ' + doc.fecha + '</p>' +
                '<button type="button" class="btn rep-doc-boton mt-auto px-4 rounded-pill" data-bs-toggle="modal" data-bs-target="#' + doc.modal + '">' +
                '<i class="bi bi-eye-fill me-2"></i>Ver Documento' +
                '</button>' +
                '</div></div></div>'
            );
        });

    });
});