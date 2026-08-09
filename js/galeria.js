$(function () {
    $.getJSON("data/galeria.json", function (data) {
        var datos = data.categorias || {};
        var $grid = $("#galeriaGrid");

        // Arma las tarjetas de categoría
        Object.keys(datos).forEach(function (key) {
            var cat = datos[key];
            var cantidad = cat.fotos.length;
            var etiquetaFotos = cantidad === 1 ? "foto" : "fotos";

            var $col = $('<div class="col-md-4 col-sm-6"></div>');
            var $card = $(
                '<div class="categoria-galeria-card hover-lift" data-bs-toggle="modal" ' +
                'data-bs-target="#modalGaleria" data-categoria="' + key + '">' +
                '<img src="' + cat.portada + '" alt="' + cat.label + '">' +
                '<div class="categoria-galeria-overlay">' +
                '<h3 class="categoria-galeria-titulo">' + cat.label + '</h3>' +
                '<span class="categoria-galeria-count"><i class="bi bi-images"></i> ' + cantidad + ' ' + etiquetaFotos + '</span>' +
                '</div></div>'
            );
            $col.append($card);
            $grid.append($col);
        });

        // Al abrir el modal llena el carrusel con las fotos de la categoría
        $("#modalGaleria").on("show.bs.modal", function (event) {
            var key = $(event.relatedTarget).data("categoria");
            var cat = datos[key];
            if (!cat) return;

            $("#modalGaleriaLabel").text(cat.label);

            var $inner = $("#carruselGaleriaInner").empty();
            cat.fotos.forEach(function (foto, i) {
                $inner.append(
                    '<div class="carousel-item' + (i === 0 ? " active" : "") + '">' +
                    '<img src="' + foto.src + '" class="d-block w-100 carrusel-img" alt="' + cat.label + '">' +
                    '<p class="carrusel-caption">' + foto.caption + '</p>' +
                    '</div>'
                );
            });

            $(".carousel-control-prev, .carousel-control-next").toggle(cat.fotos.length > 1);
        });
    });
});