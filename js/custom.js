/* GENERAL */

// Notification bar

// document.addEventListener("DOMContentLoaded", function () {
//     const notification = document.querySelector(".notification-bar");
//     const navbar = document.querySelector(".navbar");
//     const closeButton = notification.querySelector(".btn-close");

//     closeButton.addEventListener("click", function () {
//         notification.classList.add("fade");
//         notification.classList.remove("show");

//         // Fix navbar position
//         navbar.style.position = "fixed";
//         navbar.style.top = "0";
//         navbar.style.width = "100%";
//         navbar.style.zIndex = "1030";
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
    // Check if notification is visible and add a class to body
    function updateNotificationState() {
        const notificationBar = document.querySelector(".notification-bar");
        if (
            notificationBar &&
            window.getComputedStyle(notificationBar).display !== "none"
        ) {
            document.body.classList.add("notification-visible");
        } else {
            document.body.classList.remove("notification-visible");
        }
    }

    // Run on page load
    updateNotificationState();

    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            // Skip if it's just '#'
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                });
            }
        });
    });

    // Update notification state when it changes
    const notificationCloseBtn = document.querySelector(
        ".notification-bar .btn-close"
    );
    if (notificationCloseBtn) {
        notificationCloseBtn.addEventListener("click", function () {
            // Wait for animation to complete
            setTimeout(updateNotificationState, 300);
        });
    }
});

// Notification bar

document.addEventListener("DOMContentLoaded", function () {
    const notificationBar = document.querySelector(".notification-bar");
    const navbar = document.querySelector(".navbar");
    const body = document.body;

    // Function to update navbar position and body padding
    function updatePositions() {
        const notificationHeight =
            notificationBar && notificationBar.offsetHeight;

        if (navbar && notificationBar) {
            // Update navbar position based on notification height
            navbar.style.top = notificationBar.classList.contains("show")
                ? `${notificationHeight}px`
                : "0";

            // Update body padding to account for fixed elements
            const totalHeight = notificationBar.classList.contains("show")
                ? notificationHeight + navbar.offsetHeight
                : navbar.offsetHeight;
            body.style.paddingTop = `${totalHeight}px`;

            // Store notification height as CSS variable for other elements to use
            document.documentElement.style.setProperty(
                "--notification-height",
                notificationBar.classList.contains("show")
                    ? `${notificationHeight}px`
                    : "0px"
            );
        }
    }

    // Run on page load
    updatePositions();

    // Update when window is resized
    window.addEventListener("resize", updatePositions);

    // Update when notification is closed
    const closeButton = notificationBar.querySelector(".btn-close");
    if (closeButton) {
        closeButton.addEventListener("click", function () {
            // Allow time for the transition to complete
            setTimeout(updatePositions, 300);
        });
    }
});

// Menu click outside the menu

document.addEventListener("DOMContentLoaded", function () {
    // Get references to the navbar and toggle button
    const navbar = document.querySelector(".navbar-collapse");
    const navbarToggler = document.querySelector(".navbar-toggler");

    // Function to close the navbar
    function closeNavbar() {
        if (navbar.classList.contains("show")) {
            const bsCollapse = new bootstrap.Collapse(navbar);
            bsCollapse.hide();
        }
    }

    // Handle clicks on document
    document.addEventListener("click", function (event) {
        if (
            navbar.classList.contains("show") &&
            !navbar.contains(event.target) &&
            !navbarToggler.contains(event.target)
        ) {
            closeNavbar();
        }
    });

    // Also handle touch events for mobile
    document.addEventListener("touchstart", function (event) {
        if (
            navbar.classList.contains("show") &&
            !navbar.contains(event.target) &&
            !navbarToggler.contains(event.target)
        ) {
            closeNavbar();
        }
    });

    // Close navbar when a nav link is clicked
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeNavbar();
        });
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
