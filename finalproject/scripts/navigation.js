const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".navigation");
const navigationLinks = document.querySelector("navigation a");



// Mobile navigation
if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        const isOpen = menuButton.getAttribute("aria-expanded") === "true";

        menuButton.setAttribute("aria-expanded", String(!isOpen));

        menuButton.setAttribute(
            "aria-label", 
            isOpen ? "Open navigationmenu" : "Close navigation menu"
        );

        navigation.classList.toggle("open", !isOpen);

        menuButton.textContent = isOpen ? "☰" : "✕";

    });

}

//wayfinding
const currentPage = window.location.pathname.split("/").pop() || "index.html";

navigationLinks.forEach((link) => {

    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");

    }
});