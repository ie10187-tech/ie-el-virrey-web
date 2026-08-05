$(function () {
  const $modal = $("#modalEmergencia");
  if ($modal.length === 0) return;

  $.getJSON("data/alerta.json", function (alerta) {
    if (!alerta.activa || haVencido(alerta.vigencia)) return;

    $modal.find("a.btn-modal-emergencia").attr("href", alerta.url_destino);

    const yaVisto = sessionStorage.getItem("modalEmergenciaVisto");
    if (!yaVisto) {
      const modalBootstrap = new bootstrap.Modal(document.getElementById("modalEmergencia"));
      modalBootstrap.show();
      sessionStorage.setItem("modalEmergenciaVisto", "true");
    }
  });
});