$(function () {
  $("#header").load("includes/header.html", function () {
    const pagina = window.location.pathname.split("/").pop() || "index.html";
    $("#menuLinks a, .topbar-links a").each(function () {
      if ($(this).attr("href") === pagina) {
        $(this).addClass("active");
      }
    });
  });
  $("#footer").load("includes/footer.html");
});