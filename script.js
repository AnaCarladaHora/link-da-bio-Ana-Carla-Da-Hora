const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

const themeButton = document.getElementById("themeButton");
const savedTheme = localStorage.getItem("anaTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeButton.textContent = "☀";
}

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");

    themeButton.textContent = isDark ? "☀" : "☾";
    localStorage.setItem("anaTheme", isDark ? "dark" : "light");
});

const cards = document.querySelectorAll(".link-card");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(15px)";
    card.style.transition =
        `opacity 0.5s ease ${index * 0.06}s,
         transform 0.5s ease ${index * 0.06}s,
         box-shadow 0.25s ease,
         border-color 0.25s ease`;
    observer.observe(card);
});

cards.forEach((card) => {
    card.addEventListener("click", () => {
        card.style.transform = "scale(0.98)";
        setTimeout(() => { card.style.transform = ""; }, 150);
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        document.body.classList.remove("dark");
        themeButton.textContent = "☾";
        localStorage.setItem("anaTheme", "light");
    }
});
