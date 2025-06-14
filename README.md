
// Jabberwocky

> _A privacy-first browser utility that intercepts and obfuscates PII directly in your browser—on your device only._

---

## About

**Jabberwocky** is a next-level browser privacy shield. It intercepts and scrambles your personal data before it ever leaves your computer—no cloud, no trackers, no leaks.  
**This project was made for the [Lovable Competition](https://lovable.dev)!**

---

## Quick Start

**Anyone can do it!**

### 1. Get the Code

- Click **Code** (top right) and choose _“Download ZIP”_.
- Unzip it anywhere.

### 2. Install Dependencies

- **Best:** Open this folder in [Visual Studio Code](https://code.visualstudio.com/).
- Or, open a terminal window there and run:
  ```sh
  npm install
  ```

### 3. Run It Locally

- In VSCode: click “Run and Debug” _or_
- In terminal:
  ```sh
  npm run dev
  ```
- Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Screenshots & GIFs

Add images/GIFs that show off Jabberwocky!

1. **Put your files in the `/screenshots` folder.**
   - Supported: PNG, JPG, GIF (for animation demos).
   - **Keep GIFs under ~5MB for fast loading!** (Trim with [EZGIF](https://ezgif.com/optimize) or similar.)
2. **Reference your images below**  
   - Example usage:

```md
<p align="center">
  <img src="screenshots/your-demo.gif" width="400" alt="Screenshot description" />
</p>
```

| Example           | Suggested Usage              |
|-------------------|-----------------------------|
| dashboard.png     | Main dashboard              |
| demo.gif          | Animated usage demo         |
| popup-modal.png   | The browser extension popup |

---

## Table of Contents

- [About](#about)
- [Screenshots & GIFs](#screenshots--gifs)
- [Quick Start](#quick-start)
- [Install and Integrate `snifferjs`](#install-and-integrate-snifferjs)
- [Making a Browser Extension](#making-a-browser-extension)
- [Troubleshooting & FAQ](#troubleshooting--faq)
- [Credits & License](#credits--license)
- [Even Cooler Work](#even-cooler-work)

---

## Install and Integrate `snifferjs`

Give your app real PII protection:
1. `npm install snifferjs`
2. Create `src/lib/snifferjs.ts`:
   ```ts
   import snifferjs from "snifferjs";
   snifferjs.patchAll();
   ```
3. At the VERY TOP of `src/main.tsx`:  
   `import "./lib/snifferjs";`

Done! Now every session is protected.

---

## Making a Browser Extension

Convert Jabberwocky to a Chrome/Edge extension:

1. **Add This manifest.json** to root:
   ```json
   {
     "manifest_version": 3,
     "name": "Jabberwocky",
     "version": "1.0.0",
     "description": "A privacy tool to intercept and shield PII.",
     "permissions": ["activeTab", "storage", "scripting"],
     "action": {
       "default_popup": "index.html",
       "default_icon": {
         "16": "images/icon16.png",
         "48": "images/icon48.png",
         "128": "images/icon128.png"
       }
     },
     "content_scripts": [
       {
         "matches": ["<all_urls>"],
         "js": ["content.js"]
       }
     ],
     "background": {
       "service_worker": "background.js"
     },
     "icons": {
       "16": "images/icon16.png",
       "48": "images/icon48.png",
       "128": "images/icon128.png"
     }
   }
   ```
2. **Patch snifferjs at the top of `content.js`:**
   ```js
   import snifferjs from "snifferjs";
   snifferjs.patchAll();
   ```
3. **Load in chrome://extensions:**  
   - Enable “Developer mode”
   - “Load unpacked” &rarr; `/dist` folder

---

## Troubleshooting & FAQ

- **Screenshots not showing?**  
  Check spelling and extension. Files MUST be in `/screenshots`.
- **snifferjs not active?**  
  Check browser console for errors; confirm extension steps.
- **Afraid of the terminal?**  
  Use VSCode or GitHub Desktop to install/run things with click buttons!

---

## Credits & License

- **Author:** Sam Krystal  
- Built with Lovable  
- Uses [snifferjs](https://github.com/cyphunk/snifferjs) for advanced PII interception  
- Icons: [lucide.dev](https://lucide.dev/)  
- License: [MIT](LICENSE)

---

## Even Cooler Work

I care deeply about data privacy.  
So much so that I work at [Confident Security](https://confident.security)—we build provably private AI. If you’re worried about your data privacy and security, or you’re building an AI product and want to explore partnerships, check us out!

**Follow us for privacy news and updates:**  
👉 [@confident_sec on Twitter/X](https://x.com/confident_sec)

