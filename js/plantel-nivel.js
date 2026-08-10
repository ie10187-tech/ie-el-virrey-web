$(function () {
    var pagina = window.location.pathname.split("/").pop();
    var nivel = pagina === "primaria.html" ? "primaria" : (pagina === "secundaria.html" ? "secundaria" : null);
    if (!nivel) return;

    $.getJSON("data/" + nivel + "-plantel.json", function (data) {
        var h = data.horario || {};
        $("#horarioIngreso").text(h.ingreso || "");
        $("#horarioRecreo").text(h.recreo || "");
        $("#horarioSalida").text(h.salida || "");

        var $docentes = $("#docentesGrid");
        (data.docentes || []).forEach(function (d) {
            $docentes.append(
                '<div class="col-md-3 col-sm-6">' +
                '<div class="equipo-card hover-lift">' +
                '<div class="equipo-icono"><i class="bi bi-person-fill"></i></div>' +
                '<h3 class="equipo-nombre">' + d.nombre + '</h3>' +
                '<p class="equipo-cargo">' + d.cargo + '</p>' +
                '</div></div>'
            );
        });

        var $classroom = $("#classroomGrid");
        (data.classroom || []).forEach(function (c) {
            $classroom.append(
                '<div class="col-md-4 col-sm-6">' +
                '<div class="card h-100 hover-lift text-center">' +
                '<div class="card-body">' +
                '<div class="classroom-icono">' + c.grado + '</div>' +
                '<h3 class="card-title h5">' + c.grado + ' Grado</h3>' +
                '<a href="' + c.url + '" target="_blank" rel="noopener" class="btn btn-institucional-fill w-100 mt-2">' +
                'Ingresar <i class="bi bi-box-arrow-up-right"></i></a>' +
                '</div></div></div>'
            );
        });
    });
});