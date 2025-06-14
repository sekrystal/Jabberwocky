# Jabberwocky

![Dashboard ON](screenshots/dashboard-on.png)

## Overview

Jabberwocky is a privacy-first utility that intercepts and obfuscates personally identifiable information (PII) from your browser—before it can leave your computer. Inspired by the recent changes to Chromium (June 2024) that broke traditional ad blockers and privacy extensions, Jabberwocky aims to fill the gap with a transparent, 100% local solution.

**Built with:**  
- [Lovable](https://lovable.dev/) (AI-powered app builder)  
- OpenAI (for rapid prototyping and guidance)

---

## Screenshots

**Hero dashboard (protection ON – local render):**  
![Dashboard ON](screenshots/dashboard-on.png)

**Dashboard (protection OFF – local render):**  
![Dashboard OFF](screenshots/dashboard-off.png)

**Extension popup preview – local render:**  
![Extension Modal](screenshots/popup-modal.png)

*To add your own images locally, add `.png` or `.jpg` files to the `screenshots/` folder and use:*
```md
![Description](screenshots/your-image.png)
```
*See end of this doc for remote demo images (Unsplash).*

---

## Quick Start

```sh
npm install
npm run dev
```
- Visit [http://localhost:5173](http://localhost:5173) to view.
- To build: `npm run build`
- *Need help? See [Troubleshooting](#troubleshooting).*

---

## Demo GIF

Place your demo GIF at `screenshots/demo.gif`.  
How to make one:  
1. Record your screen (QuickTime on Mac, Xbox Game Bar/ShareX on Windows, Peek on Linux).
2. Show key features: toggling, logs, export, modal, etc.
3. Convert `.mp4` to GIF (ezgif.com).
4. Save as `screenshots/demo.gif`.

```md
![Jabberwocky Demo](screenshots/demo.gif)
```

---

## Features

- **Real-time PII Interception log**: See what personal data is getting sent out of your browser and how it's scrambled.
- **Toggle Protection**: Instantly enable/disable PII shielding.
- **Detailed listing**: Visualize what data is intercepted (userAgent, location, cookies, POST data, etc).
- **Export and Clear Logs**: Download CSV or clear log at any time.
- **Beautiful UI**: Fully responsive, modern look.
- **100% Local**: No cloud, no login, no tracking.

---

## Privacy Threats Jabberwocky Prevents

- Browser fingerprinting (userAgent, navigator)
- Geolocation data leaks (window.location, APIs)
- Cookie/session hijacking or accidental server leaks
- Form data sniffing (POSTed emails, real names, tokens)
- Analytics/tracker access to unique identifiers
- Unintended third-party POST/GET transmission of PII
- Leaky referer headers exposing where you came from
- Language/locale profiling to deduce identity or region
- Device/OS fingerprinting

---

## Future-Proof & Extensible

- Extend to new PII types as threats arise (add `snifferjs` listeners)
- User-selectable shield levels (strict/medium/custom)
- Custom spoofing rules by category (e.g., force cookies → anonymous)
- Supports new browsers (Chrome, Edge—could add more)
- Could power accessibility/privacy content overlays
- Easily add logging for new sensitive fields (phone, address, biometrics)

---

## Functional Integration & Extension (Seamless Steps)

### 1. Install Everything

```sh
npm install
npm install snifferjs
```

### 2. Swap in snifferjs for Mock

- **Replace:**  
  Rename or move `src/lib/snifferjs-mock.ts` (backup).
- **In `src/lib/`, create:** `snifferjs.ts`:
  ```ts
  import snifferjs from "snifferjs";
  // Initialize early
  snifferjs.patchAll();

  // Export event subscription as in your previous mock:
  // [Implement mapping from snifferjs events to your InterceptRecord type.]
  ```
- **Update imports:**  
  Everywhere you imported `snifferjs-mock`, use `snifferjs` instead.

### 3. Build as Extension

- Create `manifest.json` (Chrome Manifest V3).
- Grant these permissions in manifest:
  ```json
  "permissions": ["scripting", "activeTab", "storage"]
  ```
- Use the built `dist/` as your popup/option page.
- Load “Unpacked Extension” at `chrome://extensions`.

**Extension-specific guide:**  
- Chrome/Edge: Use Manifest V3, React build as popup.  
- Firefox: (Not supported out-of-box, but possible with polyfills.)

---

## Troubleshooting

- **Images aren’t displaying?**  
  - Local images: Check paths and filename case; must be in `/screenshots/`
  - Remote images: Require internet, some Markdown viewers block external links.
- **Snifferjs not patching?**  
  - Make sure you import/patch as early as possible.
  - Use browser console for logs; check that snifferjs is running.
- **Build fails?**  
  - Try `npm install` again, check Node version, clear cache.

---

## Additional Demo Images (Remote)

*You can use these high-quality images from Unsplash in your blog, docs, or even as placeholder screenshots (require internet):*

**Matrix Movie Still**  
![Matrix movie still](https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=max&w=1200)

**A woman sitting on a bed using a laptop**  
![A woman on bed with laptop](https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=max&w=1200)

**Woman in white long sleeve shirt using black laptop**  
![Woman using laptop](https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=max&w=1200)

**Body of water surrounded by trees**  
![Body of water](https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=max&w=1200)

**Orange and white tabby cat lying on brown and black floral textile**  
![Orange cat](https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=max&w=1200)

---

## How Does It Work?

- By default, this app simulates interception of data (for the contest version—actual interception is not yet functional).
- The plan is to **integrate [snifferjs](https://github.com/cyphunk/snifferjs)** for real PII interception. See below!

---

## How I Built This Project

Created in days using [Lovable](https://lovable.dev/) with the help of OpenAI’s code-completion and chat feature:

- **UI design:** Lovable + Tailwind + shadcn/ui library
- **OpenAI:** Used to suggest React patterns, design strategies, and to break development into manageable steps.
- **Rapid iteration:** Lovable’s chat-based “AI edit” workflow handled boilerplate, refactors, and even layout fine-tuning live.
- **Integration discovery:** Lovable/OpenAI were used to plan the snifferjs integration below.

_See full history and code conversations on Lovable._

---

## Roadmap: Integrating snifferjs

To make Jabberwocky fully functional (beyond mock/demo), follow these steps:

1. **Install snifferjs**
   ```sh
   npm install snifferjs
   ```
   Or [clone/fork snifferjs](https://github.com/cyphunk/snifferjs) and bring its core logic into the `/lib` directory for deeper customization.

2. **Inject snifferjs in your extension/app**
   - In the browser extension popup: inject and activate snifferjs’s API-patching as soon as possible in the page lifecycle.
   - For this React app, call snifferjs’s interception methods instead of (or in addition to) the existing mock logic in `src/lib/snifferjs-mock.ts`.

3. **Replace Mock Events**
   - Where the code currently emits demo records, subscribe to real snifferjs events (documented in the snifferjs repo).

4. **Connect to UI**
   - Send real intercepted PII/device events into the React state (`records`), ideally preserving the same `InterceptRecord` type.

5. **Permissions (Extension)**
   - Prepare a `manifest.json` with permissions suitable for content scripts (see snifferjs docs).
   - Use the dashboard UI as the main popup UI.
   - Add extension boilerplate for Chrome/Edge distribution.

6. **Testing & Privacy**
   - Ensure all logic runs _locally only_. No cloud events, tracking, or remote logging—by design!

7. **Publish**
   - Update README with any new extension install or usage steps as you progress.

---

## Running Locally

```sh
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Making It a Browser Extension

- See the [snifferjs](https://github.com/cyphunk/snifferjs) README for guidance on injection.
- Use this dashboard as your extension’s popup or options page.
- Adjust `manifest.json` as needed (`manifest v3` for modern Chrome/Edge).

---

## Credits & License

- UI and logic by Sam Krystal, built with [Lovable](https://lovable.dev) and OpenAI.
- [snifferjs](https://github.com/cyphunk/snifferjs) for API interception (integration pending).
- Icons by [lucide.dev](https://lucide.dev/).
- See LICENSE for terms (please add your license).

---

## Questions

Feel free to open issues or reach out via [Lovable](https://lovable.dev).
