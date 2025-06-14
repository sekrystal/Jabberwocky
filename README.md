# Jabberwocky

A privacy-first browser utility that intercepts and obfuscates PII directly on your device.  
Author: **Sam Krystal**  
_Built with Lovable, OpenAI, and snifferjs (integration ready)_

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Quick Start](#quick-start)
- [Demo GIF](#demo-gif)
- [Functional Integration (snifferjs)](#functional-integration-snifferjs)
- [Making It a Browser Extension](#making-it-a-browser-extension)
- [Troubleshooting & FAQ](#troubleshooting--faq)
- [Credits & License](#credits--license)

---

## Overview

Jabberwocky intercepts and obfuscates personally identifiable information (PII) before it ever leaves your browser—no cloud, no tracking.  
_Designed for the new privacy challenges post-Chromium June 2024._

---

## Features

- **Real-time PII log:** See exactly what gets intercepted and scrambled.
- **Toggle Protection:** Instantly turn shielding on/off.
- **Detailed listing:** Visualizes types (userAgent, cookies, POST data, etc).
- **Export or Clear logs:** Download CSV or clear at any time.
- **Fully Local:** 100% client-side, no remote code or analytics.
- **Beautiful UI:** Responsive, modern design.

---

## Screenshots

> _All images should be in the `/screenshots/` folder for best compatibility._

**Hero Dashboard (Protection ON):**  
![Dashboard ON](screenshots/dashboard-on.png)

**Dashboard (Protection OFF):**  
![Dashboard OFF](screenshots/dashboard-off.png)

**Extension Popup Preview:**  
![Extension Modal](screenshots/popup-modal.png)

<details>
<summary>How to add your own:</summary>

Place `.png` or `.jpg` files in `/screenshots/`, then reference in markdown:
```
![Description](screenshots/your-image.png)
```
</details>

---

## Quick Start

```sh
npm install
npm run dev
```
- Open [http://localhost:5173](http://localhost:5173) in your browser.

#### Build for production:
```sh
npm run build
```

#### Need help?
See [Troubleshooting & FAQ](#troubleshooting--faq) below.

---

## Demo GIF

> Record your screen, show toggling/log/export.  
> Save as `screenshots/demo.gif`:

```md
![Jabberwocky Demo](screenshots/demo.gif)
```

---

## Functional Integration (snifferjs)

### 1. Install snifferjs

```sh
npm install snifferjs
```

### 2. Enable Interception

In `src/lib/`, create (or update) `snifferjs.ts`:

```ts
import snifferjs from "snifferjs";
snifferjs.patchAll();
// Subscribe to snifferjs events and adapt to your InterceptRecord type here.
```

- **Tip:** Replace imports of `snifferjs-mock` with your new `snifferjs` module.

### 3. Hook UI to snifferjs

- Wherever you subscribe to intercepted events (in state/store/hooks), use the real snifferjs listeners.
- Make sure each intercepted event is formatted to your UI's `InterceptRecord` type.

> See [`snifferjs` docs](https://github.com/cyphunk/snifferjs) for detailed API.

---

## Making It a Browser Extension

### 1. Prepare Chrome Manifest

Create `manifest.json`:

```json
{
  "manifest_version": 3,
  "name": "Jabberwocky",
  "version": "1.0.0",
  "permissions": ["scripting", "activeTab", "storage"],
  // ...other required fields...
}
```

- _Load your built `/dist` as "Unpacked" at `chrome://extensions`._

### 2. Inject and enable snifferjs

- Inject your code so `snifferjs.patchAll()` runs as soon as possible in the extension.

### 3. Use Dashboard as Popup

- The dashboard React UI becomes your extension popup/option page.

---

## Troubleshooting & FAQ

- **Images not showing?**
  - Use `/screenshots/` path and check filename case.
- **snifferjs not patching?**
  - Import/patch as early as possible. Console-log for confirmation.
- **Build issues?**
  - Run `npm install` again, check Node version, or clear npm/yarn cache.

- **Need more help?**  
  See [Lovable docs](https://docs.lovable.dev/) or [Open Issue](https://lovable.dev).

---

## Credits & License

- **Author:** Sam Krystal  
- Built using [Lovable](https://lovable.dev) + [OpenAI](https://openai.com)
- PII interception via [snifferjs](https://github.com/cyphunk/snifferjs)
- Icons by [lucide.dev](https://lucide.dev/)
- See LICENSE for terms.

---
