const giftGrid = document.querySelector("#gift-grid");
const giftCount = document.querySelector("#gift-count");
const giftMessage = document.querySelector("#gift-message");
const occasionFilter = document.querySelector("#occasion-filter");
const recipientFilter = document.querySelector("#recipient-filter");
const budgetFilter = document.querySelector("#budget-filter");
const clearFilters = document.querySelector("#clear-filters");
const giftDialog = document.querySelector("#gift-dialog");
const closeDialogButton = document.querySelector("#close-gift-dialog");
const FILTER_STORAGE_KEY = "signatureGiftFilters";

let gifts = [];

//Restore saved filters, if available.
function restoreFilters() {

    try {

        const savedFilters = JSON.parse(localStorage.getItem(FILTER_STORAGE_KEY));
        if (!savedFilters) return;

        if ([...occasionFilter.options].some((option) => option.value === savedFilters.occasion)) {
            occasionFilter.value = savedFilters.occasion;
        }

        if ([...recipientFilter.options].some((option) => option.value === savedFilters.recipient)) {
            recipientFilter.value =savedFilters.recipient;

        }

        if ([...budgetFilter.options].some((option) => option.value === savedFilters.budget)) {
            budgetFilter.value = savedFilters.budget;
        }

    } catch (error) {
        console.error("Unable to restore saved filters:", error);
    }

}

//Save the selected filters for the next visit.
function saveFilters() {
    try {
        localStorage.setItem(
            "signatureGiftFilters",
            JSON.stringify({
                occasion: occasionFilter.value,
                recipient: recipientFilter.value,
                budget: budgetFilter.value
            })
        );
    } catch (error) {
        console.error("Unable to save filters:", error);
    }
}
 
// Fetch gift data from the local JSON file
async function getGifts() {
    try {
        const response = await fetch("data/gifts.json");
        if (!response.ok) throw new Error(`Unable to load gift data: ${response.status}`);

        gifts = await response.json();
        restoreFilters();
        filterGifts();
    } catch (error) {
        console.error("Gift data error:", error);
        giftCount.textContent = "Gift ideas unavailable";
        giftMessage.textContent = "We are unable to load our gift ideas right now. Please try again later.";
    }
}

//Create the gift cards
function displayGifts(giftList) {
    giftGrid.replaceChildren();
    giftMessage.textContent = "";
    giftCount.textContent = `${giftList.length} ${giftList.length === 1 ? "gift idea" : "gift ideas"}`;

    if (giftList.length === 0) {
        giftMessage.textContent = "No gifts match those filters. Try changing your selections.";
        return;
    }

    giftList.forEach((gift) => {
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

        const recipient = document.createElement("p");
        recipient.textContent = `For: ${gift.recipient}`;

        const occasion = document.createElement("p");
        occasion.textContent = `Occasion: ${gift.occasion}`;

        const category = document.createElement("p");
        category.textContent = `Category: ${gift.category}`;

        const price = document.createElement("p");
        price.classList.add("gift-price");
        price.textContent = `$${gift.price}`;

        const detailsButton = document.createElement("button");
        detailsButton.type = "button";
        detailsButton.classList.add("button", "gift-details");
        detailsButton.dataset.id = gift.id;
        detailsButton.textContent = "View Details";

        content.append(title, price, detailsButton);
        card.append(image, content);
        giftGrid.append(card);
    });
}

//Filter gifts based on the current selections.
function filterGifts() {
    const selectedOccasion = occasionFilter.value;
    const selectedRecipient = recipientFilter.value;
    const selectedBudget = budgetFilter.value;

    const filteredGifts = gifts.filter((gift) => {
        const matchesOccasion = selectedOccasion === "all" || gift.occasion === selectedOccasion;
        const matchesRecipient = selectedRecipient === "all" || gift.recipient === selectedRecipient;
        const matchesBudget = selectedBudget === "all" || gift.price <= Number(selectedBudget);
        return matchesOccasion && matchesRecipient && matchesBudget;
    });

    saveFilters();
    displayGifts(filteredGifts);
}

//Display the selected gifts in the modal.
function openGiftDetails(giftId) {
    const gift = gifts.find((item) => item.id === Number(giftId));
    if (!gift || !giftDialog) return;

    document.querySelector("#gift-dialog-title").textContent = gift.name;
    const dialogImage = document.querySelector("#dialog-gift-image");
    dialogImage.src = gift.image;
    dialogImage.alt = gift.name;
    document.querySelector("#dialog-gift-description").textContent = gift.description;
    document.querySelector("#dialog-gift-recipient").textContent = gift.recipient;
    document.querySelector("#dialog-gift-occasion").textContent = gift.occasion;
    document.querySelector("#dialog-gift-category").textContent = gift.category;
    document.querySelector("#dialog-gift-price").textContent = `$${gift.price}`;
    giftDialog.showModal();
}

// Event listeners for filters.
occasionFilter.addEventListener("change", filterGifts);
recipientFilter.addEventListener("change", filterGifts);
budgetFilter.addEventListener("change", filterGifts);

// Handle all View Details buttons using event delegation.
giftGrid.addEventListener("click", (event) => {
    const detailsButton = event.target.closest(".gift-details");
    if (detailsButton) openGiftDetails(detailsButton.dataset.id);
});

// Close the modal.
closeDialogButton.addEventListener("click", () => giftDialog.close());

// Close when the user clicks the backdrop.
giftDialog.addEventListener("click", (event) => {
    if (event.target === giftDialog) giftDialog.close();
});

// Clear filters and saved preferences.
clearFilters.addEventListener("click", () => {
    occasionFilter.value = "all";
    recipientFilter.value = "all";
    budgetFilter.value = "all";
    saveFilters();
    displayGifts(gifts);
});

getGifts();
