document.addEventListener("DOMContentLoaded", () => {
    const dropdowns = document.querySelectorAll(".dropdown-head");
    dropdowns.forEach((dropdown) => {
        dropdown.addEventListener("click", function() {
            const content = dropdown.querySelector(".dropdown-content");
            content.classList.toggle("hidden");
        });
    });
});

export function linkDropdown(dropdown) {
    dropdown.addEventListener("click", function() {
        const content = dropdown.querySelector(".dropdown-content");
        content.classList.toggle("hidden");
    });
}

