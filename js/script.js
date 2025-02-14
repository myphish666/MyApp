document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".fade-in").forEach((el) => {
        el.classList.add("visible");
    });

    document.getElementById("contact-form")?.addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Форма отправлена!");
    });
});
