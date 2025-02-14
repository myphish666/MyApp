document.addEventListener("DOMContentLoaded", async () => {
    const goalsList = document.getElementById("goals-list");

    try {
        const response = await fetch("data/goals.json");
        const goals = await response.json();

        goals.forEach(goal => {
            const goalCard = document.createElement("div");
            goalCard.classList.add("goal-card");
            goalCard.innerHTML = `
                <h2>${goal.year}</h2>
                <p>${goal.description}</p>
            `;
            goalsList.appendChild(goalCard);
        });
    } catch (error) {
        console.error("Ошибка загрузки целей: ", error);
    }
});
