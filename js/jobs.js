document.addEventListener("DOMContentLoaded", function () {
    // Filter buttons functionality
    const filterBtns = document.querySelectorAll(".job-filter");
    const jobCards = document.querySelectorAll(".job-card");

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            // Remove active class from all buttons
            filterBtns.forEach((b) => b.classList.remove("active"));

            // Add active class to clicked button
            this.classList.add("active");

            // Get filter value
            const filterValue = this.getAttribute("data-filter");

            // Filter job cards
            jobCards.forEach((card) => {
                if (filterValue === "all") {
                    card.style.display = "block";
                    card.parentElement.style.display = "block";
                } else {
                    const cardCategory = card.getAttribute("data-category");
                    if (cardCategory === filterValue) {
                        card.style.display = "block";
                        card.parentElement.style.display = "block";
                    } else {
                        card.style.display = "none";
                        card.parentElement.style.display = "none";
                    }
                }
            });

            console.log("Filter selected:", filterValue);
        });
    });

    // Search functionality
    const searchInput = document.getElementById("jobSearch");

    searchInput.addEventListener("input", function () {
        const searchValue = this.value.toLowerCase();

        jobCards.forEach((card) => {
            const jobTitle = card
                .querySelector(".job-card-header h3")
                .textContent.toLowerCase();
            const jobCompany = card
                .querySelector(".job-company")
                .textContent.toLowerCase();
            const jobRubro = card
                .querySelector(".job-type-badge")
                .textContent.toLowerCase();

            if (
                jobTitle.includes(searchValue) ||
                jobCompany.includes(searchValue) ||
                jobRubro.includes(searchValue)
            ) {
                card.style.display = "block";
                card.parentElement.style.display = "block";
            } else {
                card.style.display = "none";
                card.parentElement.style.display = "none";
            }
        });

        console.log("Search input:", searchValue);
    });

    // WhatsApp button functionality
    const whatsAppBtn = document.getElementById("whatsAppBtn");
    const whatsAppPopup = document.getElementById("whatsAppPopup");
    const closePopup = document.getElementById("closePopup");

    if (whatsAppBtn && whatsAppPopup && closePopup) {
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
    }
});
