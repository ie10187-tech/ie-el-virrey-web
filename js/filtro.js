window.initFiltros = function () {
  $(".filtros-cinta").each(function () {
    var $cinta = $(this);

    if ($cinta.data("filtroInicializado")) return;
    $cinta.data("filtroInicializado", true);

    var itemSelector = $cinta.data("items");
    var vacioSelector = $cinta.data("vacio");
    var buscadorSelector = $cinta.data("buscador");
    var $buscador = buscadorSelector ? $(buscadorSelector) : null;

    if (!itemSelector) return;

    var valorTodos = $cinta.find(".filtro-chip.active").data("filtro");

    function aplicarFiltros() {
      var filtro = $cinta.find(".filtro-chip.active").data("filtro");
      var texto = $buscador ? $buscador.val().toLowerCase() : "";
      var hayResultados = false;

      $(itemSelector).each(function () {
        var categoria = $(this).data("categoria");
        var coincideCategoria = (filtro === valorTodos || categoria === filtro);
        var coincideTexto = !texto || $(this).text().toLowerCase().includes(texto);

        if (coincideCategoria && coincideTexto) {
          $(this).removeClass("d-none");
          hayResultados = true;
        } else {
          $(this).addClass("d-none");
        }
      });

      if (vacioSelector) {
        $(vacioSelector).toggleClass("d-none", hayResultados);
      }
    }

    $cinta.on("click", ".filtro-chip", function () {
      $cinta.find(".filtro-chip").removeClass("active");
      $(this).addClass("active");
      if ($buscador) $buscador.val("");
      aplicarFiltros();
    });

    if ($buscador) {
      $buscador.on("keyup", aplicarFiltros);
    }
  });
};

$(function () {
  window.initFiltros();
});