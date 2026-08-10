$(function () {
  var $grid = $("#areasGrid");
  if ($grid.length === 0) return;

  var pagina = window.location.pathname.split("/").pop();
  var nivel = pagina === "primaria.html" ? "primaria" : "secundaria";
  var archivoIndex = "data/cursos-" + nivel + "-index.json";

  $.getJSON(archivoIndex, function (data) {
    (data.areas || []).forEach(function (area) {
      $grid.append(
        '<div class="col-md-3 col-sm-6">' +
        '<a href="curso.html?nivel=' + nivel + '&area=' + area.slug + '" class="area-card hover-lift">' +
        '<i class="bi ' + area.icono + '"></i>' +
        '<h3 class="area-titulo">' + area.titulo + '</h3>' +
        '<span class="area-ver-mas">Ver más <i class="bi bi-arrow-right"></i></span>' +
        '</a></div>'
      );
    });
  });
});