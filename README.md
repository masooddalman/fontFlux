<div align="center">
  <img src="screens/fontFluxIcon.png" alt="FontFlux Logo" width="128"/>
  <h1>FontFlux</h1>
</div>

FontFlux is a powerful Chrome Extension that empowers you to take control of your reading experience by customizing fonts on any website using the vast library of Google Fonts. Whether you prefer a specific serif for reading articles or a clean sans-serif for browsing, FontFlux makes it easy to personalize the web.

<div align="center">
  <img src="screens/fontFlux.jpg" alt="FontFlux Interface" width="300"/>
</div>

> **Note:** We are working on publishing FontFlux to the Chrome Web Store soon!

## Why Choose FontFlux?

* **Superior Font Selection**: FontFlux boasts a much larger collection of fonts than other similar extensions.
* **YouTube Live Chat Support**: Unlike other similar extensions, FontFlux can also change the font of the **YouTube live chat box and other chat boxes**.
* **Customizable**: You can customize the font for each category (Serif, Sans Serif, and Monospace) to your liking.
* **Lightweight**: FontFlux is lightweight and does not affect the performance of your browser.

## Examples

See how FontFlux transforms your browsing experience:

| Before | After |
| :---: | :---: |
| <img src="screens/before1.jpg" width="400" alt="Before 1"/> | <img src="screens/after1.jpg" width="400" alt="After 1"/> |
| <img src="screens/before2.jpg" width="400" alt="Before 2"/> | <img src="screens/after2.jpg" width="400" alt="After 2"/> |
| <img src="screens/before3.jpg" width="400" alt="Before 3"/> | <img src="screens/after3.jpg" width="400" alt="After 3"/> |

the selected font in the screen shot is **Vazirmatn**

## How It Works

FontFlux operates by injecting a content script into the web pages you visit. When you select your preferred fonts via the extension popup:

1. The extension saves your preferences to your browser's local storage.
2. It dynamically loads the selected font stylesheets from the Google Fonts API.
3. It applies these fonts to the page by overriding the default CSS font-family properties for Serif, Sans Serif, and Monospace elements.
4. Your settings are persisted, so your favorite fonts are automatically applied to every new page you navigate to.

## How to Use

### Installation

Since this project is currently in development/open source:

1. Clone or download this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **"Developer mode"** in the top right corner.
4. Click the **"Load unpacked"** button.
5. Select the directory where you saved the FontFlux files.

### Customizing Fonts

1. Click the **FontFlux icon** in your Chrome toolbar.
2. You will see dropdown menus for **Serif**, **Sans Serif**, and **Monospace** font types.
3. Select your desired font for each category from the list.
4. The changes will be applied immediately to the current page.
5. Enjoy a personalized web experience!

## Disclaimer

This extension is provided "as is" without warranty of any kind. While we strive to ensure compatibility with most websites, forcing font changes can occasionally affect the visual layout or design of certain pages. Use it at your own discretion. We are not affiliated with Google or Google Fonts.

## Open Source

This is an open-source project, and we welcome contributions from the community! If you have ideas for new features, bug fixes, or improvements, please feel free to fork the repository and submit a **Pull Request**.

Your feedback and contributions help make FontFlux better for everyone.
