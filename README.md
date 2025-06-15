<!-- Badges -->
<p align="center">
  <a href="https://github.com/SamKrystal/jabberwocky/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-brightgreen.svg" alt="MIT License Badge" />
  </a>
  <a href="https://github.com/SamKrystal/jabberwocky/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-blue.svg" alt="PRs Welcome Badge" />
  </a>
</p>

# Jabberwocky

<p align="center">
  <img src="screenshots/gifdemo.gif" alt="Jabberwocky Demo Banner" width="640" />
</p>

> _A privacy-first browser utility that intercepts and obfuscates PII directly in your browser—on your device only._

---

## About

**Jabberwocky** is a browser privacy extension. It intercepts and scrambles your personal data before it ever leaves your computer—no cloud, no trackers, no leaks.

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

## Screenshots

Here’s a preview of Jabberwocky in action:

<p align="center">
  <img src="screenshots/Dashboard Top.png" width="320" alt="Dashboard Top" />
  <img src="screenshots/Dashboard Bottom.png" width="320" alt="Dashboard Bottom" /><br />
  <img src="screenshots/PII Download.png" width="320" alt="PII Download" />
  <img src="screenshots/Plugin Modal.png" width="320" alt="Plugin Modal" />
</p>

---

## Table of Contents

- [About](#about)
- [Screenshots](#screenshots)
- [Quick Start](#quick-start)
- [Install and Integrate `snifferjs`](#install-and-integrate-snifferjs)
- [Making a Browser Extension](#making-a-browser-extension)
- [Troubleshooting & FAQ](#troubleshooting--faq)
- [Credits & License](#credits--license)

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

Want Jabberwocky as a Chrome/Edge extension?  
_Follow these steps for a smooth install:_

### 1. Build the App

In your project directory, run:
```sh
npm run build
```

This will generate a `/dist` folder containing everything Chrome needs.

---

### 2. Add a Manifest

**In your project root folder**, create a file called `manifest.json` **(not inside src)**:

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

---

### 3. Patch snifferjs for Browser Extension

Create `content.js` in `/dist` (or copy and edit from your Vite build outputs):

```js
import snifferjs from "snifferjs";
snifferjs.patchAll();
```

> _Tip:_ You can also bundle this logic with your Vite build pipeline if you're advanced.

---

### 4. (Optional) Add Extension Icons

- Place your icon images (icon16.png, icon48.png, icon128.png) inside a new `/dist/images/` directory.
- Update their references in `manifest.json` above if they differ.

---

### 5. Load the Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`.
2. Turn ON **Developer mode** (toggle in top right).
3. Click **Load unpacked**.
4. Select your `/dist` folder (after it contains all the files above).
5. Jabberwocky should now appear in your extensions list! Click its puzzle piece icon to run.

**Common Issues/Tips:**
- Make sure you select the **built `/dist` folder**, not `/src` or root.
- If icons or popups don't appear, double-check file locations and manifest paths.
- If you update the code, rebuild (`npm run build`) and re-load the extension.

---

## Troubleshooting & FAQ

- **snifferjs not active?**  
  Check the browser console for errors; confirm extension steps. ChatGPT can help with the rest!
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

## Even Better Privacy

I work at [Confident Security](https://confident.security)—we build provably private AI.  
If you've got a popular AI model, lots of compute, and care about your users, give me a holler!

**Follow us for privacy news and updates:**  
👉 [@confident_sec on Twitter/X](https://x.com/confident_sec)
