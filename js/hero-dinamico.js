$(function () {
    var $hero = $("#heroTitulo");
    if ($hero.length === 0) return;

    $.getJSON("data/inicio-hero.json", function (data) {
        $hero.html(data.hero_titulo || "");

        if (data.hero_imagen) {
            $("#heroImagen").attr("src", data.hero_imagen);
        }

        var $valores = $("#valoresGrid");
        (data.valores || []).forEach(function (v) {
            $valores.append(
                '<div class="col-md-3 col-sm-6 fade-in">' +
                '<div class="valor-card d-flex align-items-center gap-3">' +
                '<div class="valor-icono"><i class="bi ' + v.icono + '"></i></div>' +
                '<div>' +
                '<h2 class="valor-titulo">' + v.titulo + '</h2>' +
                '<p class="valor-texto">' + v.texto + '</p>' +
                '</div></div></div>'
            );
        });
    });
});