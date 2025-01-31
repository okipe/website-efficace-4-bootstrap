/* GENERAL */

// Notification bar

document.addEventListener("DOMContentLoaded", function () {
    const notification = document.querySelector(".notification-bar");
    const navbar = document.querySelector(".navbar");
    const closeButton = notification.querySelector(".btn-close");

    closeButton.addEventListener("click", function () {
        notification.classList.add("fade");
        notification.classList.remove("show");

        // Fix navbar position
        navbar.style.position = "fixed";
        navbar.style.top = "0";
        navbar.style.width = "100%";
        navbar.style.zIndex = "1030";
    });
});

// WhatsApp widget

document.addEventListener("DOMContentLoaded", function () {
    const whatsAppBtn = document.getElementById("whatsAppBtn");
    const whatsAppPopup = document.getElementById("whatsAppPopup");
    const closePopup = document.getElementById("closePopup");

    // Mostrar/ocultar popup
    whatsAppBtn.addEventListener("click", function () {
        whatsAppPopup.style.display =
            whatsAppPopup.style.display === "block" ? "none" : "block";
    });

    // Cerrar popup
    closePopup.addEventListener("click", function () {
        whatsAppPopup.style.display = "none";
    });

    // Cerrar popup al hacer clic fuera
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".whatsapp-float")) {
            whatsAppPopup.style.display = "none";
        }
    });
});

/* CV GALLERY */

// Filtrado de templates
document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const templates = document.querySelectorAll(".template-item");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // Actualizar estado activo de los botones
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            // Filtrar templates
            const filter = button.getAttribute("data-filter");

            templates.forEach((template) => {
                if (
                    filter === "all" ||
                    template.getAttribute("data-category") === filter
                ) {
                    template.style.display = "block";
                    // Añadir animación
                    template.style.animation = "fadeInUp 0.6s ease backwards";
                } else {
                    template.style.display = "none";
                }
            });
        });
    });
});

// Escuchar el evento de envío exitoso del formulario
Cognito.on("afterSubmit", (event) => {
    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(
        document.getElementById("downloadModal")
    );
    modal.hide();

    // Iniciar la descarga
    const guideUrl = event.entry.GuideURL; // Campo oculto en Cognito Form
    if (guideUrl) {
        window.open(guideUrl, "_blank");
    }
});
