$(function () {
  $("#header").load("includes/header.html", function () {

    // Marcar enlace activo en el menú
    var pagina = window.location.pathname.split("/").pop() || "index.html";
    $("#menuLinks a, .topbar-links a").each(function () {
      if ($(this).attr("href") === pagina) {
        $(this).addClass("active");
      }
    });

    // Inicializar buscador DESPUÉS de que el header ya está en el DOM
    iniciarBuscador();
  });

  $("#footer").load("includes/footer.html");
});