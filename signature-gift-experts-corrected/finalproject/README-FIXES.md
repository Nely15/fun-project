# Signature Gift Experts — corrected project copy

## What was fixed
- Fixed the homepage featured-gift selector and rendering logic.
- Removed the Gift Ideas script from the homepage; each page now loads its own script.
- Fixed responsive navigation and current-page highlighting.
- Fixed Gift Ideas filtering, saved filter preferences, and modal detail fields.
- Fixed the form's name/occasion field names and the confirmation page's session-storage key.
- Corrected dialog markup and backdrop styling.
- Added skip-to-content links, keyboard focus styling, and a more polished card/page-intro/CTA style.
- Standardized footer year and last-modified text across pages.
- Confirmed the JSON contains 15 gifts and that all referenced gift image files exist.

## How to test
1. Extract this folder into your WDD231 project location.
2. Open the folder in VS Code.
3. Run it using the VS Code **Live Server** extension (right-click `index.html` → **Open with Live Server**). Do not test JSON fetching by opening the HTML file directly with a `file://` URL.
4. On Home, confirm three featured gifts load.
5. On Gift Ideas, test all filters, Clear Filters, View Details, and reloading to confirm filters are remembered.
6. On Find a Gift, complete and submit the form; confirm the summary appears on `thank-you.html`.
7. Test mobile widths around 320px, 375px, 768px, and desktop widths; test navigation with keyboard and screen reader tools.

## Important notes before submission
- The request form is a front-end demonstration: it saves the request in the browser session and displays it on the confirmation page. It does not email the request to a business or send it to a server.
- The Open Graph title/description/type metadata are present. After you confirm the final GitHub Pages URL, set `og:url` and `og:image` to the exact published page and absolute image URL.
- The site has a favicon file (`favicon.ico`) at the project root.
- Recheck the assignment rubric and run the course's required HTML/CSS/accessibility audits before submitting.
