$(function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const datos = window.noticiasData && window.noticiasData[id];

    if (!datos) {
        $("main").html(
            '<div class="container text-center py-5">' +
            '<p class="parrafo-institucional">No encontramos esta noticia.</p>' +
            '<a href="noticias.html" class="btn btn-institucional rounded-pill px-4">Volver a Noticias</a>' +
            "</div>"
        );
        return;
    }

    // Título de la pestaña y breadcrumb
    document.getElementById("tituloPagina").textContent =
        datos.titulo + ' - I.E.P.S.M. N° 10187 "El Virrey"';

    $("#breadcrumbNoticia").text(datos.titulo);

    // Imagen, badge, fecha y título
    $("#detalleImagen").attr("src", datos.imagen).attr("alt", datos.titulo);
    $("#detalleBadge").text(datos.categoriaLabel).attr("class", "noticia-badge badge-" + datos.categoria);
    $("#detalleFecha").html('<i class="bi bi-calendar3"></i> ' + datos.fecha);
    $("#detalleTitulo").text(datos.titulo);

    // Párrafos del contenido
    const $contenido = $("#detalleContenido");
    (datos.contenido || []).forEach(function (parrafo) {
        $contenido.append($("<p>").addClass("parrafo-institucional").text(parrafo));
    });

    // Galería de imágenes (si tiene)
    if (datos.galeria && datos.galeria.length) {
        const $gal = $("#detalleGaleria");
        datos.galeria.forEach(function (img) {
            $gal.append(
                '<div class="col-6 col-md-4">' +
                '<img src="' + img.src + '" alt="' + (img.alt || "") + '" class="detalle-galeria-img"></div>'
            );
        });
    } else {
        $("#detalleGaleriaSection").addClass("d-none");
    }

    // Botones de compartir: arma el link con la URL real de esta noticia
    const urlActual = window.location.href;

    $("#compartirFacebook").attr(
        "href",
        "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(urlActual)
    );

    $("#compartirWhatsapp").attr(
        "href",
        "https://api.whatsapp.com/send?text=" + encodeURIComponent(datos.titulo + " - " + urlActual)
    );

    // Etiquetas Open Graph: para que la vista previa en Facebook/WhatsApp
    // muestre el título, resumen e imagen correctos de esta noticia
    const resumenOg = (datos.contenido && datos.contenido[0]) ? datos.contenido[0].slice(0, 160) : "";
    const urlAbsoluta = window.location.origin + window.location.pathname + window.location.search;

    $("#ogTitulo").attr("content", datos.titulo + ' - I.E.P.S.M. N° 10187 "El Virrey"');
    $("#ogDescripcion").attr("content", resumenOg);
    $("#ogImagen").attr("content", window.location.origin + "/" + datos.imagen);
    $("#ogUrl").attr("content", urlAbsoluta);
});