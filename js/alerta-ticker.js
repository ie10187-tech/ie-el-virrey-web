$(function () {
  $.getJSON("data/alerta.json", function (alerta) {
    if (!alerta.activa || haVencido(alerta.vigencia)) return;

    const html =
      '<a href="' + alerta.url_destino + '" class="alerta-ticker-link" aria-label="' + alerta.etiqueta + '">' +
      '<div class="alerta-ticker tipo-' + alerta.tipo + '">' +
      '<span class="alerta-ticker-etiqueta"><i class="bi ' + alerta.icono + '"></i> ' + alerta.etiqueta + '</span>' +
      '<div class="alerta-ticker-track">' +
      '<div class="alerta-ticker-contenido">' +
      '<span>' + alerta.texto + '</span>' +
      '<span>' + alerta.texto + '</span>' +
      '</div></div>' +
      '<span class="alerta-ticker-ver">' + alerta.url_label + ' <i class="bi bi-arrow-right"></i></span>' +
      '</div></a>';

    $("#alertaTickerContenedor").html(html);
  });
});