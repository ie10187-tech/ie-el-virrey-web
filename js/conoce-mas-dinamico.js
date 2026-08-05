$(function () {
    $.getJSON("data/conoce-mas.json", function (data) {
        const $razones = $("#razonesGrid");
        (data.razones || []).forEach(function (r) {
            $razones.append(
                '<div class="col-md-3 col-sm-6">' +
                '<div class="razon-card hover-lift">' +
                '<i class="bi ' + r.icono + '"></i>' +
                '<h3 class="razon-titulo">' + r.titulo + '</h3>' +
                '<p class="razon-texto">' + r.texto + '</p>' +
                '</div></div>'
            );
        });

        const $accesos = $("#accesosGrid");
        (data.accesos || []).forEach(function (a) {
            $accesos.append(
                '<div class="col-md-4">' +
                '<a href="' + a.url + '" class="acceso-card hover-lift">' +
                '<img src="' + a.imagen + '" alt="' + a.alt + '">' +
                '<div class="acceso-overlay">' +
                '<h3 class="acceso-titulo">' + a.titulo + '</h3>' +
                '<p class="acceso-texto">' + a.texto + '</p>' +
                '<span class="acceso-link">Conoce más <i class="bi bi-arrow-right"></i></span>' +
                '</div></a></div>'
            );
        });
    });
});