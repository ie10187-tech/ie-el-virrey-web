$(function () {
  const $modal = $("#modalEmergencia");

  if ($modal.length === 0) return;

  // Fuente única de la fecha: si el ticker está en la página, se usa la
  // misma fecha que él (así no hay que actualizarla en dos lugares).
  const fechaVigencia = $("#alertaTicker").data("vigencia") || $modal.data("vigencia");

  // Si ya pasó la fecha de vigencia, no mostrar nunca
  if (haVencido(fechaVigencia)) return;

  // Mostrar solo una vez por sesión de navegador (no en cada página que visite)
  const yaVisto = sessionStorage.getItem("modalEmergenciaVisto");

  if (!yaVisto) {
    const modalBootstrap = new bootstrap.Modal(document.getElementById("modalEmergencia"));
    modalBootstrap.show();
    sessionStorage.setItem("modalEmergenciaVisto", "true");
  }
});