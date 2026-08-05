$(function () {
    // Avisos y Comunicados
    const $avisos = $("#avisosGrid");
    (window.avisosData || []).forEach(function (aviso) {
        $avisos.append(
            '<div class="col-md-4">' +
            '<div class="aviso-card hover-lift">' +
            '<h3 class="aviso-titulo">' + aviso.titulo + '</h3>' +
            '<p class="aviso-texto">' + aviso.texto + '</p>' +
            '</div></div>'
        );
    });

    // Logros Destacados
    const $logros = $("#logrosGrid");
    (window.logrosData || []).forEach(function (logro) {
        $logros.append(
            '<div class="col-md-4 col-sm-6">' +
            '<div class="valor-card d-flex align-items-center gap-3">' +
            '<div class="valor-icono"><i class="bi ' + logro.icono + '"></i></div>' +
            '<div>' +
            '<h2 class="valor-titulo">' + logro.titulo + '</h2>' +
            '<p class="valor-texto">' + logro.texto + '</p>' +
            '</div></div></div>'
        );
    });
});