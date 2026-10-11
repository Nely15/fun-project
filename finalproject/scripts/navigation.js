const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".navigation");
const navigationLinks = document.querySelectorAll(".navigation a");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", String(!isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Open navigation menu" : "Close navigation menu"
        );
        navigation.classList.toggle("open", !isOpen);
        menuButton.textContent = isOpen ? "☰" : "✕";
    });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";

navigationLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    }
});

// Shared footer details on every page that includes these elements.
const year = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

if (year) year.textContent = new Date().getFullYear();
if (lastModified) lastModified.textContent = `Last modified: ${document.lastModified}`;
