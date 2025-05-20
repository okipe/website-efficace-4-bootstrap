// Esta función ajustará la línea temporal basada en la posición del último nodo
function adjustTimelineLine() {
    const timelineContainer = document.querySelector(".ruta-flow");
    const cardHeaders = document.querySelectorAll(".ruta-card-header");

    if (!cardHeaders.length || !timelineContainer) return;

    const lastHeader = cardHeaders[cardHeaders.length - 1];
    const containerRect = timelineContainer.getBoundingClientRect();
    const lastHeaderRect = lastHeader.getBoundingClientRect();

    const headerCenter = lastHeaderRect.top + lastHeaderRect.height / 2;
    const timelineHeight = headerCenter - containerRect.top - 53;

    timelineContainer.style.setProperty(
        "--timeline-height",
        `${timelineHeight}px`
    );

    console.log("Nueva altura de la línea: " + timelineHeight + "px");
}

// Ajustar la línea cuando la página se carga y cuando se redimensiona
document.addEventListener("DOMContentLoaded", function () {
    adjustTimelineLine();

    // Añadir listener para redimensionamiento
    window.addEventListener("resize", adjustTimelineLine);
});
