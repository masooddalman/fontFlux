const STYLE_ID = 'fontflux-styles';
const LINK_ID = 'fontflux-fonts';

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'applyFonts') {
        updateFonts(request.fonts);
        // Save to storage
        chrome.storage.sync.set({ fontFluxSettings: request.fonts });
        sendResponse({ status: 'success' });
    }
});

// Load saved settings on startup
chrome.storage.sync.get(['fontFluxSettings'], (result) => {
    if (result.fontFluxSettings) {
        updateFonts(result.fontFluxSettings);
    }
});

function updateFonts(fonts) {
    if (!fonts) return;

    const { serif, sans, mono } = fonts;
    const families = [];

    // Helper to format font name for Google Fonts URL
    const formatFont = (font) => font.replace(/ /g, '+');

    if (serif && serif !== 'Default') families.push(formatFont(serif));
    if (sans && sans !== 'Default') families.push(formatFont(sans));
    if (mono && mono !== 'Default') families.push(formatFont(mono));

    // Remove existing link if no fonts selected (or update it)
    let link = document.getElementById(LINK_ID);

    if (families.length > 0) {
        if (!link) {
            link = document.createElement('link');
            link.id = LINK_ID;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }
        // Request weights 400 and 700 for better rendering
        const familyString = families.map(f => `family=${f}:wght@400;700`).join('&');
        link.href = `https://fonts.googleapis.com/css2?${familyString}&display=swap`;
    } else if (link) {
        link.remove();
    }

    // Update CSS
    let style = document.getElementById(STYLE_ID);
    if (!style) {
        style = document.createElement('style');
        style.id = STYLE_ID;
        document.head.appendChild(style);
    }

    let cssRules = [];

    if (sans && sans !== 'Default') {
        cssRules.push(`body, p, span, div, a, li, td, th, input, button, textarea, select { font-family: '${sans}', sans-serif !important; }`);
    }

    if (serif && serif !== 'Default') {
        // Apply serif to headings if selected
        cssRules.push(`h1, h2, h3, h4, h5, h6 { font-family: '${serif}', serif !important; }`);
    }

    if (mono && mono !== 'Default') {
        cssRules.push(`pre, code, kbd, samp, var, tt { font-family: '${mono}', monospace !important; }`);
    }

    style.textContent = cssRules.join('\n');
}
