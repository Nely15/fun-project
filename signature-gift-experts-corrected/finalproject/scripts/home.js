const featuredGrid = document.querySelector("#featured-gifts");

async function loadFeaturedGifts() {
    if (!featuredGrid) return;

    try {
        const response = await fetch("data/gifts.json");
        if (!response.ok) {
            throw new Error(`Gift data request failed: ${response.status}`);
        }

        const gifts = await response.json();
        const featuredGifts = gifts.filter((gift) => [1, 3, 5].includes(gift.id));

        featuredGrid.replaceChildren();

        featuredGifts.forEach((gift) => {
            const card = document.createElement("article");
            card.classList.add("gift-card");

            const image = document.createElement("img");
            image.src = gift.image;
            image.alt = gift.name;
            image.loading = "lazy";
            image.width = 400;
            image.height = 300;

            const content = document.createElement("div");
            content.classList.add("gift-card-content");

            const title = document.createElement("h3");
            title.textContent = gift.name;

            const description = document.createElement("p");
            description.textContent = gift.description;

            const price = document.createElement("p");
            price.classList.add("gift-price");
            price.textContent = `$${gift.price}`;

            const link = document.createElement("a");
            link.classList.add("text-link");
            link.href = "gifts.html";
            link.textContent = "Explore gift ideas";

            content.append(title, description, price, link);
            card.append(image, content);
            featuredGrid.append(card);
        });
    } catch (error) {
        console.error("Unable to load featured gifts:", error);
        featuredGrid.textContent =
            "Our featured gift ideas are temporarily unavailable. Please visit the Gift Ideas page.";
    }
}

loadFeaturedGifts();
