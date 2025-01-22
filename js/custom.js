// Notification bar

document.addEventListener("DOMContentLoaded", function () {
  const notification =
      document.querySelector(".notification-bar");
  const navbar = document.querySelector(".navbar");
  const closeButton = document.querySelector(".btn-close");

  // // Check stored state
  // if (localStorage.getItem("notificationDismissed") === "true") {
  //     notification.classList.remove("show");
  //     navbar.style.top = "0";
  // }

  // // Handle close click
  // closeButton.addEventListener("click", function () {
  //     localStorage.setItem("notificationDismissed", "true");
  //     navbar.style.top = "0";
  // });

  // Solo maneja el cierre temporal
  closeButton.addEventListener("click", function () {
      navbar.style.top = "0";
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
