// Filtro de categorías genérico. Se activa solo en cualquier página que
// tenga un contenedor ".filtros-cinta" con los atributos:
//   data-items="<selector de las tarjetas a filtrar>"
//   data-vacio="<selector del mensaje de 'sin resultados'>"
//   data-buscador="<selector opcional de un input de búsqueda de texto>"
// El valor "mostrar todo" se toma del chip que ya viene marcado .active
// en el HTML, así que sirve igual para "todas" (noticias/galería/faq) o
// "todos" (logros) sin tocar el script.
$(function () {
  $(".filtros-cinta").each(function () {
    const $cinta = $(this);
    const itemSelector = $cinta.data("items");
    const vacioSelector = $cinta.data("vacio");
    const buscadorSelector = $cinta.data("buscador");
    const $buscador = buscadorSelector ? $(buscadorSelector) : null;

    if (!itemSelector) return;

    const valorTodos = $cinta.find(".filtro-chip.active").data("filtro");

    function aplicarFiltros() {
      const filtro = $cinta.find(".filtro-chip.active").data("filtro");
      const texto = $buscador ? $buscador.val().toLowerCase() : "";
      let hayResultados = false;

      $(itemSelector).each(function () {
        const categoria = $(this).data("categoria");
        const coincideCategoria = (filtro === valorTodos || categoria === filtro);
        const coincideTexto = !texto || $(this).text().toLowerCase().includes(texto);

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
});