$(function () {
    const datos = window.galeriaData || {};
    const $grid = $("#galeriaGrid");

    // 1. Arma las tarjetas de categoría (portada + conteo real de fotos)
    Object.keys(datos).forEach(function (key) {
        const cat = datos[key];
        const cantidad = cat.fotos.length;
        const etiquetaFotos = cantidad === 1 ? "foto" : "fotos";

        const $col = $('<div class="col-md-4 col-sm-6"></div>');
        const $card = $(
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

    // 2. Al abrir el modal (único para todas las categorías), llena el
    //    carrusel con las fotos de la categoría en la que se hizo clic
    $("#modalGaleria").on("show.bs.modal", function (event) {
        const key = $(event.relatedTarget).data("categoria");
        const cat = datos[key];
        if (!cat) return;

        $("#modalGaleriaLabel").text(cat.label);

        const $inner = $("#carruselGaleriaInner").empty();
        cat.fotos.forEach(function (foto, i) {
            $inner.append(
                '<div class="carousel-item' + (i === 0 ? " active" : "") + '">' +
                '<img src="' + foto.src + '" class="d-block w-100 carrusel-img" alt="' + cat.label + '">' +
                '<p class="carrusel-caption">' + foto.caption + '</p>' +
                '</div>'
            );
        });

        // Oculta las flechas si la categoría tiene solo 1 foto (no hay nada que navegar)
        $(".carousel-control-prev, .carousel-control-next").toggle(cat.fotos.length > 1);
    });
});