$(function () {
    $.getJSON("data/galeria-index.json", function (index) {
        var slugs = index.categorias || [];
        var $grid = $("#galeriaGrid");
        var categoriasData = {};

        var promesas = slugs.map(function (slug) {
            return $.getJSON("data/galeria/" + slug + ".json").then(function (data) {
                categoriasData[slug] = data;
            });
        });

        $.when.apply($, promesas).always(function () {
            slugs.forEach(function (slug) {
                var cat = categoriasData[slug];
                if (!cat) return;

                var cantidad = (cat.fotos || []).length;
                var etiqueta = cantidad === 1 ? "foto" : "fotos";

                var $col = $('<div class="col-md-4 col-sm-6"></div>');
                $col.append(
                    '<div class="categoria-galeria-card hover-lift" data-bs-toggle="modal" ' +
                    'data-bs-target="#modalGaleria" data-categoria="' + slug + '">' +
                    '<img src="' + cat.portada + '" alt="' + cat.label + '">' +
                    '<div class="categoria-galeria-overlay">' +
                    '<h3 class="categoria-galeria-titulo">' + cat.label + '</h3>' +
                    '<span class="categoria-galeria-count"><i class="bi bi-images"></i> ' + cantidad + ' ' + etiqueta + '</span>' +
                    '</div></div>'
                );
                $grid.append($col);
            });

            $("#modalGaleria").on("show.bs.modal", function (event) {
                var slug = $(event.relatedTarget).data("categoria");
                var cat = categoriasData[slug];
                if (!cat) return;

                $("#modalGaleriaLabel").text(cat.label);
                var $inner = $("#carruselGaleriaInner").empty();

                (cat.fotos || []).forEach(function (foto, i) {
                    $inner.append(
                        '<div class="carousel-item' + (i === 0 ? " active" : "") + '">' +
                        '<img src="' + foto.src + '" class="d-block w-100 carrusel-img" alt="' + cat.label + '">' +
                        '<p class="carrusel-caption">' + foto.caption + '</p>' +
                        '</div>'
                    );
                });

                $(".carousel-control-prev, .carousel-control-next").toggle((cat.fotos || []).length > 1);
            });
        });
    });
});