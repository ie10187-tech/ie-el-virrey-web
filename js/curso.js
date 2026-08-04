$(function () {
    const params = new URLSearchParams(window.location.search);
    const nivel = params.get("nivel");
    const area = params.get("area");

    const datos = window.cursosData && window.cursosData[nivel] && window.cursosData[nivel][area];

    if (!datos) {
        $("main").html(
            '<div class="container text-center py-5">' +
            '<p class="parrafo-institucional">No encontramos información de este curso.</p>' +
            '<a href="index.html" class="btn btn-institucional rounded-pill px-4">Volver al inicio</a>' +
            "</div>"
        );
        return;
    }

    const nivelTexto = nivel === "primaria" ? "Primaria" : "Secundaria";

    document.getElementById("tituloPagina").textContent =
        datos.titulo + " - " + nivelTexto + ' - I.E.P.S.M. N° 10187 "El Virrey"';

    $("#breadcrumbNivel").text(nivelTexto).attr("href", nivel + ".html");
    $("#breadcrumbArea").text(datos.titulo);

    $("#cursoIcono").addClass(datos.icono);
    $("#cursoTitulo").text(datos.titulo.toUpperCase());
    $("#cursoSubtitulo").text("Nivel " + nivelTexto + " · " + datos.grados);

    $("#volverNivel")
        .attr("href", nivel + ".html")
        .html('<i class="bi bi-arrow-left"></i> Volver a ' + nivelTexto);

    const $desc = $("#cursoDescripcion");
    (datos.descripcion || []).forEach(function (parrafo) {
        $desc.append($("<p>").addClass("parrafo-institucional").text(parrafo));
    });

    if (datos.galeria && datos.galeria.length) {
        const $gal = $("#cursoGaleria");
        datos.galeria.forEach(function (img) {
            $gal.append(
                '<div class="col-6 col-md-3"><div class="curso-galeria-item">' +
                '<img src="' + img.src + '" alt="' + (img.alt || "") + '"></div></div>'
            );
        });
    } else {
        $("#cursoGaleriaSection").addClass("d-none");
    }

    if (datos.pdfs && datos.pdfs.length) {
        const $pdfs = $("#cursoPdfs");
        datos.pdfs.forEach(function (pdf) {
            $pdfs.append(
                '<div class="col-md-4"><div class="pdf-card hover-lift">' +
                '<i class="bi bi-file-earmark-pdf-fill"></i><div>' +
                '<h3 class="pdf-titulo">' + pdf.titulo + '</h3>' +
                '<p class="pdf-fecha">Publicado: ' + pdf.fecha + '</p></div>' +
                '<a href="' + pdf.archivo + '" target="_blank" rel="noopener" class="pdf-boton">' +
                '<i class="bi bi-eye-fill"></i></a></div></div>'
            );
        });
    } else {
        $("#cursoPdfsSection").addClass("d-none");
    }
});