const summary = document.querySelector("#request-summary");
const message = document.querySelector("#thank-you-message");
const heading = document.querySelector("#thank-you-heading");

try {
    const savedRequest = sessionStorage.getItem("signatureGiftRequest");

    if (!savedRequest) {
        message.textContent = "No recent request was found. You can start a new gift request below.";
    } else {
        const request = JSON.parse(savedRequest);
        heading.textContent = `Thank you, ${request.name || "there"}!`;
        message.textContent = "Here is a summary of the information you submitted.";

        const fields = [
            ["Name", request.name],
            ["Email", request.email],
            ["Recipient", request.recipient],
            ["Occasion", request.occasion],
            ["Budget", request.budget],
            ["Preferred style", request.style],
            ["Interests", request.interests],
            ["Additional details", request.details || "None provided"]
        ];

        fields.forEach(([label, value]) => {
            const term = document.createElement("dt");
            const description = document.createElement("dd");
            term.textContent = label;
            description.textContent = value || "Not provided";
            summary.append(term, description);
        });
    }
} catch (error) {
    console.error("Unable to display request:", error);
    message.textContent = "We couldn't display your request. Please try submitting it again.";
}
