
# Jabberwocky

> _A privacy-first browser utility that intercepts and obfuscates PII directly on your device._

---

<!-- Hero banner with the quadrant layout and demo (remove old gif reference) -->
<p align="center">
  <img src="screenshots/popup-modal.png" width="300" alt="Quadrant 3 - Extension Popup" />
</p>

---

## Demo GIF Size Advice

> ⚠️ **Best Practice:** For GitHub READMEs, keep GIF demo files under **5MB** for optimal loading and performance. Trim your GIF to ~10 seconds, use 500–800px width, and consider [EZGIF](https://ezgif.com/optimize) or similar tools to compress and resize. Swap your GIF file in `/screenshots` and update the README reference accordingly.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Screenshots](#screenshots)
- [Quick Start & Onboarding](#quick-start--onboarding)
- [Install and Integrate `snifferjs`](#install-and-integrate-snifferjs)
- [How to Make a Browser Extension](#how-to-make-a-browser-extension)
- [Troubleshooting & FAQ](#troubleshooting--faq)
- [Credits & License](#credits--license)
- [About Confident Security](#about-confident-security)

---

## Project Overview

Jabberwocky intercepts and scrambles your browser’s PII (personally identifiable information) — _before it ever leaves your machine_. There is **no cloud**, no tracking, and everything runs 100% locally.

---

## Screenshots

All images are shipped with this repo in `/screenshots` for reliable rendering.

<table>
  <tr>
    <td>
      <img src="screenshots/dashboard-on.png" width="300" />
    </td>
    <td>
      <img src="screenshots/dashboard-off.png" width="300" />
    </td>
  </tr>
  <tr>
    <td>
      <img src="screenshots/popup-modal.png" width="300" />
    </td>
    <td>
      <img src="screenshots/Plugin Modal.png" width="300" />
    </td>
  </tr>
</table>

---

## Quick Start & Onboarding

Getting started is easy, even if you've never used a terminal before.  

### 1. Download the Code

- On GitHub, click the **Code** button and “Download ZIP”. Unzip it.

### 2. Install Dependencies

- If you use [Visual Studio Code](https://code.visualstudio.com/), open this folder and click “Install dependencies” when prompted.  
- Or in a terminal window (search for “Terminal” or “Command Prompt” in your OS):

  ```sh
  npm install
  ```

### 3. Run the App Locally

- In VSCode: click “Run and Debug” or open a terminal and type:

  ```sh
  npm run dev
  ```

- Navigate to [http://localhost:5173](http://localhost:5173) in your web browser.

---

## Install and Integrate `snifferjs`

Give your local app real PII protection:

### 1. Install snifferjs

Open your terminal and type:

```sh
npm install snifferjs
```

### 2. Create the Integration

- Go to the `/src/lib/` folder (create if missing),  
- Make `snifferjs.ts`:

  ```ts
  // src/lib/snifferjs.ts
  import snifferjs from "snifferjs";
  snifferjs.patchAll();
  ```

- In your main entry point (`src/main.tsx`), at the very top, add:

  ```ts
  import "./lib/snifferjs";
  ```

That's it—PII interception runs as soon as your app starts.

---

## How to Make a Browser Extension

You can turn Jabberwocky into a Chrome/Edge extension! Here’s a step-by-step, including a manifest you can copy:

### 1. Create `manifest.json` in your project root

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

### 2. Patch snifferjs as Early As Possible

At the **TOP** of your content script (`content.js`):

```js
import snifferjs from "snifferjs";
snifferjs.patchAll();
```
This ensures privacy protection is active as soon as any webpage script runs.

### 3. Load as an Unpacked Extension

- Run `npm run build` to generate the `/dist` folder.
- Go to `chrome://extensions`
- Enable “Developer mode”
- Click “Load unpacked” and select your `/dist` folder.

---

## Troubleshooting & FAQ

**Why aren't screenshots or images showing up?**  
Check that your image filenames match those in the `/screenshots` folder (including case sensitivity).

**snifferjs not active?**  
Check your browser’s console for errors; ensure you followed the integration steps above.

**Not comfortable with the Terminal?**  
Use GitHub Desktop or Visual Studio Code—you can click instead of type!

---

## Credits & License

- **Author:** Sam Krystal
- Built using Lovable
- PII interception via [snifferjs](https://github.com/cyphunk/snifferjs)
- Icons from [lucide.dev](https://lucide.dev/)
- Licensed under [MIT](LICENSE)

---

## About Confident Security

[Confident Security](https://confident.security/) helps organizations solve the hardest privacy and security challenges, from preventing breaches to building cutting-edge privacy products.  
**If you care about privacy for your company, clients, or product, [reach out to Sam Krystal](https://confident.security/)** and let's build the future of private tech together!

