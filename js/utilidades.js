// Funciones compartidas por varios scripts del sitio.

// Indica si una fecha de vigencia (formato "AAAA-MM-DD") ya pasó.
// La usan el ticker de avisos y el modal de emergencia para dejar de
// mostrarse automáticamente después de esa fecha.
function haVencido(fechaVigencia) {
    const limite = new Date(fechaVigencia + "T23:59:59");
    return new Date() > limite;
}