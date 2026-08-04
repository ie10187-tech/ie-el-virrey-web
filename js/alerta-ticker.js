$(function () {
  const $alerta = $("#alertaTicker");

  if ($alerta.length === 0) return;

  const fechaVigencia = $alerta.data("vigencia"); // ej. "2026-08-31"

  if (haVencido(fechaVigencia)) {
    $alerta.remove();
  }
});