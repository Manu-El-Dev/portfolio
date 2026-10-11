const THEME_KEY = "theme";

const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector(".theme-icon");


function getCurrentTheme() {
    return document.documentElement.dataset.theme;
}


function updateThemeButton(theme) {
    const isDark = theme === "dark";

    themeIcon.textContent = isDark ? "☀" : "☾";

    themeToggle.setAttribute(
        "aria-pressed",
        String(isDark)
    );

    themeToggle.setAttribute(
        "aria-label",
        isDark
            ? "Cambiar a modo claro"
            : "Cambiar a modo oscuro"
    );
}


function setTheme(theme) {
    document.documentElement.dataset.theme = theme;

    localStorage.setItem(
        THEME_KEY,
        theme
    );

    updateThemeButton(theme);
}


function toggleTheme() {
    const currentTheme = getCurrentTheme();

    const newTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";

    setTheme(newTheme);
}


themeToggle.addEventListener(
    "click",
    toggleTheme
);


updateThemeButton(
    getCurrentTheme()
);