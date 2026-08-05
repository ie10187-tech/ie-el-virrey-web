function iniciarBuscador() {
    var mapaData = [];
    var debounceTimer = null;
    var itemActivo = -1;

    $.getJSON("data/mapa-sitio.json", function (data) {
        mapaData = data.secciones || [];
    });

    var $input = $("#campoBusqueda");
    var $dropdown = $("#sugerenciasBusqueda");

    if ($input.length === 0) return;

    // Búsqueda en tiempo real con debounce 200ms
    $input.on("input", function () {
        clearTimeout(debounceTimer);
        var query = $(this).val();

        if (query.trim().length < 2) {
            cerrarDropdown();
            return;
        }

        debounceTimer = setTimeout(function () {
            buscar(query.trim());
        }, 200);
    });

    function buscar(query) {
        var q = query.toLowerCase();
        var resultados = mapaData.filter(function (s) {
            return (
                s.titulo.toLowerCase().includes(q) ||
                (s.keywords || []).some(function (k) {
                    return k.toLowerCase().includes(q);
                })
            );
        });
        renderDropdown(resultados, query);
    }

    function resaltar(texto, query) {
        var re = new RegExp("(" + query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
        return texto.replace(re, "<mark>$1</mark>");
    }

    function renderDropdown(resultados, query) {
        $dropdown.empty();
        itemActivo = -1;

        if (resultados.length === 0) {
            $dropdown.append(
                '<div class="busq-item busq-vacio">' +
                '<i class="bi bi-search me-2"></i>Sin resultados para "<strong>' + query + '</strong>"' +
                '</div>'
            );
        } else {
            resultados.forEach(function (r) {
                $dropdown.append(
                    '<a href="' + r.url + '" class="busq-item">' +
                    '<i class="bi bi-arrow-right-circle me-2"></i>' +
                    resaltar(r.titulo, query) +
                    '</a>'
                );
            });
        }

        $dropdown.show();
    }

    // Navegación con teclado
    $input.on("keydown", function (e) {
        var $items = $dropdown.find("a.busq-item");

        if (e.key === "ArrowDown") {
            e.preventDefault();
            itemActivo = Math.min(itemActivo + 1, $items.length - 1);
            actualizarActivo($items);

        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            itemActivo = Math.max(itemActivo - 1, -1);
            actualizarActivo($items);

        } else if (e.key === "Enter") {
            e.preventDefault();
            if (itemActivo >= 0 && $items.eq(itemActivo).length) {
                window.location.href = $items.eq(itemActivo).attr("href");
            } else if ($items.length === 1) {
                window.location.href = $items.first().attr("href");
            }

        } else if (e.key === "Escape") {
            cerrarDropdown();
            $input.blur();
        }
    });

    function actualizarActivo($items) {
        $items.removeClass("busq-item-activo");
        if (itemActivo >= 0) {
            $items.eq(itemActivo).addClass("busq-item-activo");
        }
    }

    // Cerrar al hacer clic fuera
    $(document).on("click", function (e) {
        if (!$(e.target).closest("#contenedorBusqueda").length) {
            cerrarDropdown();
        }
    });

    // Cerrar al perder foco (delay para permitir clic en resultado)
    $input.on("blur", function () {
        setTimeout(cerrarDropdown, 150);
    });

    $input.on("focus", function () {
        if ($input.val().trim().length >= 2) {
            buscar($input.val().trim());
        }
    });

    function cerrarDropdown() {
        $dropdown.hide();
        $dropdown.empty();
        itemActivo = -1;
    }
}