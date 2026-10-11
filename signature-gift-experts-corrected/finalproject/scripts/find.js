const giftRequestForm = document.querySelector("#gift-request-form");
const formMessage = document.querySelector("#form-message");

if (giftRequestForm && formMessage) {
    giftRequestForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!giftRequestForm.reportValidity()) {

            return;

        }

        try {

            const formData = new FormData(giftRequestForm);

            const request = Object.fromEntries(formData.entries());

            // Store the current request for the confirmation page.
            sessionStorage.setItem(
                "signatureGiftRequest",
                JSON.stringify(request)
            );

            // Remember non-sensitive preferences for the next visit. 
            localStorage.setItem(
                "signatureGiftPreferences",
                JSON.stringify({

                    recipient: request.recipient,
                    occasion: request.occasion,
                    budget: request.budget,
                    style: request.style,
                    interests: request.interests

                })
            );

            window.location.href = "thank-you.html";

        } catch (error) {

            console.error("Unable to save gift request:", error);

            formMessage.textContent =
              "We couldn't prepare your request. Please try again.";
        }

    });

}