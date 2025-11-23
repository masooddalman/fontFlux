let FONTS = {
    serif: [],
    sans: [],
    mono: []
};

document.addEventListener('DOMContentLoaded', async () => {
    const serifSelect = document.getElementById('serif-select');
    const sansSelect = document.getElementById('sans-select');
    const monoSelect = document.getElementById('mono-select');
    const applyBtn = document.getElementById('apply-btn');
    const resetBtn = document.getElementById('reset-btn');
    const statusMsg = document.getElementById('status-msg');

    try {
        const response = await fetch('fonts.json');
        const allFonts = await response.json();

        allFonts.forEach(font => {
            if (font.category === 'serif') FONTS.serif.push(font.family);
            if (font.category === 'sans-serif') FONTS.sans.push(font.family);
            if (font.category === 'monospace') FONTS.mono.push(font.family);
        });

        const vazirName = "Vazirmatn";
        if (!FONTS.serif.includes(vazirName)) FONTS.serif.push(vazirName);
        if (!FONTS.sans.includes(vazirName)) FONTS.sans.push(vazirName);
        if (!FONTS.mono.includes(vazirName)) FONTS.mono.push(vazirName);

        FONTS.serif.sort();
        FONTS.sans.sort();
        FONTS.mono.sort();

    } catch (e) {
        // Fallback if JSON fails
        const vazirName = "Vazirmatn";
        FONTS.serif = ["Merriweather", "Playfair Display", "Lora", "PT Serif", "Roboto Slab", vazirName];
        FONTS.sans = ["Roboto", "Open Sans", "Lato", "Montserrat", "Poppins", vazirName];
        FONTS.mono = ["Roboto Mono", "Source Code Pro", "Space Mono", vazirName];

        FONTS.serif.sort();
        FONTS.sans.sort();
        FONTS.mono.sort();
    }

    populateSelect(serifSelect, FONTS.serif);
    populateSelect(sansSelect, FONTS.sans);
    populateSelect(monoSelect, FONTS.mono);

    chrome.storage.sync.get(['fontFluxSettings'], (result) => {
        if (result.fontFluxSettings) {
            serifSelect.value = result.fontFluxSettings.serif || 'Default';
            sansSelect.value = result.fontFluxSettings.sans || 'Default';
            monoSelect.value = result.fontFluxSettings.mono || 'Default';
        }
    });

    applyBtn.addEventListener('click', () => {
        const settings = {
            serif: serifSelect.value,
            sans: sansSelect.value,
            mono: monoSelect.value
        };
        applySettings(settings);
    });

    resetBtn.addEventListener('click', () => {
        const settings = {
            serif: 'Default',
            sans: 'Default',
            mono: 'Default'
        };

        serifSelect.value = 'Default';
        sansSelect.value = 'Default';
        monoSelect.value = 'Default';

        applySettings(settings);
    });

    function populateSelect(selectElement, fontList) {
        selectElement.innerHTML = '<option value="Default">Default</option>';
        fontList.forEach(font => {
            const option = document.createElement('option');
            option.value = font;
            option.textContent = font;
            selectElement.appendChild(option);
        });
    }

    function applySettings(settings) {
        chrome.storage.sync.set({ fontFluxSettings: settings });

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'applyFonts', fonts: settings }, () => {
                    if (chrome.runtime.lastError) {
                        // Ignore error if content script isn't loaded
                    }
                });
            }
        });

        showStatus();
    }

    function showStatus() {
        statusMsg.classList.add('visible');
        setTimeout(() => {
            statusMsg.classList.remove('visible');
        }, 2000);
    }
});
