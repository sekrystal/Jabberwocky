# Jabberwocky

> _A privacy-first browser utility that intercepts and obfuscates PII directly on your device._

---

<!-- Hero banner using one of the user's PNGs -->
<p align="center">
  <img src="screenshots/dashboard-on.png" width="400" alt="Jabberwocky Dashboard screenshot" />
</p>

---

## About

**Jabberwocky** is a powerful privacy tool that intercepts and scrambles your personal data right in your browser—before it ever leaves your device. Designed for effortless use and maximum local privacy, it combines accessibility with true peace of mind.  
<br>
_This project was created for the [Lovable competition](https://lovable.dev)!_

---

## Demo GIF Size Advice

> ⚠️ **Best Practice:** For GitHub READMEs, keep GIF demo files under **5MB** for optimal loading and performance. Trim your GIF to ~10 seconds, use 500–800px width, and consider [EZGIF](https://ezgif.com/optimize) or similar tools to compress and resize. Swap your GIF file in `/screenshots` and update the README reference accordingly.

---

## Table of Contents

- [About](#about)
- [Screenshots](#screenshots)
- [Quick Start & Onboarding](#quick-start--onboarding)
- [Install and Integrate `snifferjs`](#install-and-integrate-snifferjs)
- [How to Make a Browser Extension](#how-to-make-a-browser-extension)
- [Troubleshooting & FAQ](#troubleshooting--faq)
- [Credits & License](#credits--license)
- [Even Cooler Work](#even-cooler-work)

---

## Screenshots

All images are shipped with this repo in `/screenshots` for reliable rendering.

<table>
  <tr>
    <td>
      <img src="screenshots/dashboard-on.png" width="300" alt="Dashboard Protection On" />
    </td>
    <td>
      <img src="screenshots/dashboard-off.png" width="300" alt="Dashboard Protection Off" />
    </td>
  </tr>
  <tr>
    <td>
      <img src="screenshots/popup-modal.png" width="300" alt="Extension Popup Modal" />
    </td>
    <td>
    </td>
  </tr>
</table>

---

## Quick Start & Onboarding

Getting started is easy—even if you've never used a terminal before!

### 1. Download the Code

- On GitHub, click the **Code** button and select _“Download ZIP”_. Unzip it.

### 2. Install Dependencies

- **Recommended:** Use [Visual Studio Code](https://code.visualstudio.com/).  
  Open this folder and click “Install dependencies” when prompted.
- **Or:** Open Terminal/Command Prompt, then run:
  ```sh
  npm install
  ```

### 3. Run the App Locally

- Still in VSCode: click “Run and Debug” or run in terminal:
  ```sh
  npm run dev
  ```
- Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Install and Integrate `snifferjs`

Give your local app real PII protection:

### 1. Install snifferjs

```sh
npm install snifferjs
```

### 2. Integrate snifferjs

- In the `/src/lib/` folder (create if missing), make a file called `snifferjs.ts`:

  ```ts
  // src/lib/snifferjs.ts
  import snifferjs from "snifferjs";
  snifferjs.patchAll();
  ```

- In your main entry point (`src/main.tsx`), add at the VERY TOP:

  ```ts
  import "./lib/snifferjs";
  ```

That’s it—protection is enabled automatically when your app starts.

---

## How to Make a Browser Extension

You can turn Jabberwocky into a Chrome/Edge extension! Here’s how:

### 1. Use this manifest.json (copy-paste as is)

Create a `manifest.json` in your project root **exactly like this**:

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

### 2. Patch snifferjs *immediately* in your content script

At the very top of your `content.js` file, add:

```js
import snifferjs from "snifferjs";
snifferjs.patchAll();
```
> This ensures Jabberwocky privacy protection runs before any page scripts can capture your data.

### 3. Load as an Unpacked Extension

- Run `npm run build` to generate your `/dist` folder.
- In your browser go to `chrome://extensions`
- Enable “Developer mode”
- Click “Load unpacked” and select your `/dist` folder.

---

## Troubleshooting & FAQ

**Why don’t screenshots or images show up?**  
Check that your image filenames exactly match those in the `/screenshots` folder.

**snifferjs not active in your browser?**  
Check your browser’s console for errors; make sure you followed the extension setup steps closely.

**Not comfortable with the Terminal?**  
Use Visual Studio Code or GitHub Desktop—both support installing and running projects with just a few clicks!

---

## Credits & License

- **Author:** Sam Krystal
- Built using Lovable
- PII interception via [snifferjs](https://github.com/cyphunk/snifferjs)
- Icons from [lucide.dev](https://lucide.dev/)
- Licensed under [MIT](LICENSE)

---

## Even Cooler Work
I work at [Confident Security](https://confident.security/), we're a provably private AI solution that allows you to use any AI model without having your data retained. We believe data protection should be provable, practical, and easy to use. If you've got a popular AI model, lots of GPUs, and care about your customers, give me a holler!
<br>
Follow us on Twitter/X for privacy insights and updates: [@confident_sec](https://x.com/confident_sec)
