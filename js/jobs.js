document.addEventListener("DOMContentLoaded", function () {
    // Filter buttons functionality
    const filterBtns = document.querySelectorAll(".job-filter");

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            // Remove active class from all buttons
            filterBtns.forEach((b) => b.classList.remove("active"));

            // Add active class to clicked button
            this.classList.add("active");

            // Get filter value
            const filterValue = this.getAttribute("data-filter");

            // Filter logic would go here (to be implemented)
            console.log("Filter selected:", filterValue);
        });
    });

    // Search functionality
    const searchInput = document.getElementById("jobSearch");

    searchInput.addEventListener("input", function () {
        const searchValue = this.value.toLowerCase();

        // Search logic would go here (to be implemented)
        console.log("Search input:", searchValue);
    });

    // WhatsApp button functionality
    const whatsAppBtn = document.getElementById("whatsAppBtn");
    const whatsAppPopup = document.getElementById("whatsAppPopup");
    const closePopup = document.getElementById("closePopup");

    whatsAppBtn.addEventListener("click", function () {
        whatsAppPopup.style.display =
            whatsAppPopup.style.display === "block" ? "none" : "block";
    });

    closePopup.addEventListener("click", function () {
        whatsAppPopup.style.display = "none";
    });

    // Close popup when clicking outside
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".whatsapp-float")) {
            whatsAppPopup.style.display = "none";
        }
    });
});
