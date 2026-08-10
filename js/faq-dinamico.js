$(function () {
    var $acordeon = $("#acordeonFaq");
    if ($acordeon.length === 0) return;

    $.getJSON("data/faq.json", function (data) {
        (data.preguntas || []).forEach(function (item, i) {
            var id = "faqItem" + i;
            $acordeon.append(
                '<div class="faq-item" data-categoria="' + item.categoria + '">' +
                '<div class="accordion-item">' +
                '<h2 class="accordion-header">' +
                '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#' + id + '">' +
                item.pregunta +
                '</button></h2>' +
                '<div id="' + id + '" class="accordion-collapse collapse" data-bs-parent="#acordeonFaq">' +
                '<div class="accordion-body">' + item.respuesta + '</div>' +
                '</div></div></div>'
            );
        });

        if (window.initFiltros) window.initFiltros();
    });
});