$(function () {
    var $target = $("#quienesSomosTexto");
    if ($target.length === 0) return;

    $.getJSON("data/nosotros.json", function (data) {
        (data.quienes_somos || []).forEach(function (p) {
            $("#quienesSomosTexto").append($("<p>").addClass("parrafo-institucional").text(p));
        });

        (data.historia || []).forEach(function (p) {
            $("#historiaTexto").append($("<p>").addClass("parrafo-institucional").text(p));
        });

        $("#misionTexto").text(data.mision || "");
        $("#visionTexto").text(data.vision || "");

        var $valores = $("#valoresGrid");
        (data.valores || []).forEach(function (v) {
            $valores.append(
                '<div class="col-md-3 col-sm-6"><div class="valor-inst-card hover-lift">' +
                '<i class="bi ' + v.icono + '"></i>' +
                '<h3 class="valor-inst-titulo">' + v.titulo + '</h3>' +
                '</div></div>'
            );
        });

        var $directivo = $("#equipoDirectivoGrid");
        (data.equipo_directivo || []).forEach(function (p) {
            $directivo.append(
                '<div class="col-md-4"><div class="equipo-card hover-lift">' +
                '<div class="equipo-icono"><i class="bi bi-person-fill"></i></div>' +
                '<h3 class="equipo-nombre">' + p.nombre + '</h3>' +
                '<p class="equipo-cargo">' + p.cargo + '</p>' +
                '</div></div>'
            );
        });

        var $admin = $("#equipoAdministrativoGrid");
        (data.equipo_administrativo || []).forEach(function (p) {
            $admin.append(
                '<div class="col-md-4"><div class="equipo-card hover-lift">' +
                '<div class="equipo-icono"><i class="bi bi-person-fill"></i></div>' +
                '<h3 class="equipo-nombre">' + p.nombre + '</h3>' +
                '<p class="equipo-cargo">' + p.cargo + '</p>' +
                '</div></div>'
            );
        });

        var $escudo = $("#escudoLista");
        (data.escudo_significado || []).forEach(function (item) {
            $escudo.append(
                $("<li>").html("<strong>" + item.titulo + ":</strong> " + item.texto)
            );
        });

        $("#uniformeDiarioTexto").text(data.uniforme_diario_texto || "");
        $("#uniformeFisicaTexto").text(data.uniforme_fisica_texto || "");
    });
});