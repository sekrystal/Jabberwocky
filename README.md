
# Jabberwocky

<p align="center">
  <img src="screenshots/gifdemo.gif" alt="Jabberwocky Demo Banner" width="640" />
</p>

> _A privacy-first browser utility that intercepts and obfuscates PII directly in your browser—on your device only._

---

## About

**Jabberwocky** is a browser privacy shield. It intercepts and scrambles your personal data before it ever leaves your computer—no cloud, no trackers, no leaks.  
**This project was made for the [Lovable AI Showdown](https://aishowdown.lovable.app/)!**

---

## Quick Start

**Run the demo locally:**  
_(The “demo” is the local app UI. For real intercept support, see the integration section below)._

- Follow the install and run steps below. This demo works locally and demonstrates the UI and logs.
- **Note:** The _real_ thing (live PII interception) also requires integration with `snifferjs`, as described further below!

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

Want to see what Jabberwocky looks like?  
Example usage screenshots—in a quadrant layout—below:

<p align="center">
  <img src="screenshots/Dashboard Top.png" width="320" alt="Dashboard Top" />
  <img src="screenshots/Dashboard Bottom.png" width="320" alt="Dashboard Bottom" /><br />
  <img src="screenshots/PII Download.png" width="320" alt="PII Download" />
  <img src="screenshots/Plugin Modal.png" width="320" alt="Plugin Modal" />
</p>

> 🖼️ **To update or add your own screenshots or GIFs:**  
> Place new image files inside the `/screenshots` directory and reference them in the README as needed.

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
   - “Load unpacked” → `/dist` folder

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
I work at [Confident Security](https://confident.security)—we build provably private AI. If you've got a popular AI model, lots of compute, and care about your users, give me a holler!

**Follow us for privacy news and updates:**  
👉 [@confident_sec on Twitter/X](https://x.com/confident_sec)

