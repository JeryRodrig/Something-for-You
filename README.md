# ❤️ A Little Something for You

A small romantic, mobile-friendly website built with vanilla HTML, CSS, and JavaScript. It combines a full-screen photo cover with a personal letter and an interactive hug-booking experience. The page's markup, styles, and scripts are embedded in `index.html`; no framework, build step, or server is required.

## ✨ What the Website Does

- Opens with a photo-led cover and a link to the letter.
- Shows a personal note and a pair of responses to the hug invitation.
- The "Yes, please" button reveals four hug options. The booking button becomes available after all four are selected.
- The "No" button uses a short text crossfade. On desktop, the alternate message appears on hover or keyboard focus; on mobile, it appears briefly after a tap.
- Lets the visitor choose a day and time, then opens WhatsApp with a prefilled booking message.
- Adapts its layout for mobile screens and respects reduced-motion preferences.

## ▶️ Run It

Open `index.html` directly in a web browser. The cover photo is loaded from Unsplash, so an internet connection is needed to display it.

## 🛠️ Customize

Edit the cover copy, letter, buttons, and closing in `index.html`. Replace the cover image URL in the `<img class="cover__photo">` element to use a different photo. Update the WhatsApp number in the `wa.me` URL near the end of the embedded script to change the booking destination.

## 📁 Project Structure

```text
.
|-- index.html       # Complete website: markup, styles, and interactive behavior
|-- README.md        # Project overview and instructions
|-- script.js        # Standalone script file, not loaded by the current page
|-- styles.css       # Standalone stylesheet, not loaded by the current page
\-- .azure/          # Azure project metadata
```