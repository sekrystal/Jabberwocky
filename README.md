
# Jabberwocky

> **Project repo name:** _Please rename this repository to `Jabberwocky` on GitHub for contest eligibility and clarity!_

## Overview

![Jabberwocky Logo](screenshots/dashboard-on.png)

Jabberwocky is a privacy-first utility that intercepts and obfuscates personally identifiable information (PII) from your browser—before it can leave your computer. Inspired by the recent changes to Chromium (June 2024) that broke traditional ad blockers and privacy extensions, Jabberwocky aims to fill the gap with a transparent, 100% local solution.

**Built with:**  
- [Lovable](https://lovable.dev/) (AI-powered app builder)  
- OpenAI (for rapid prototyping and guidance)

---

## Features

- **Real-time PII Interception log**: See what personal data is getting sent out of your browser and how it's scrambled.
- **Toggle Protection**: Instantly enable/disable PII shielding.
- **Detailed listing**: Visualize what data is intercepted (userAgent, location, cookies, POST data, etc).
- **Export and Clear Logs**: Download CSV or clear log at any time.
- **Beautiful UI**: Fully responsive, modern look.
- **100% Local**: No cloud, no login, no tracking.

---

## Screenshots

### Dashboard (Protection ON)
![Dashboard ON](screenshots/dashboard-on.png)

### Dashboard (Protection OFF)
![Dashboard OFF](screenshots/dashboard-off.png)

### Popup Modal (Browser Extension Preview)
![Popup Modal](screenshots/popup-modal.png)

---

## How Does It Work?

- By default, this app simulates interception of data (for the contest version—actual interception is not yet functional).
- The plan is to **integrate [snifferjs](https://github.com/cyphunk/snifferjs)** for real PII interception. See below!

---

## How I Built This Project

Created in days using [Lovable](https://lovable.dev/) with the help of OpenAI’s code-completion and chat feature:

- **UI design**: Lovable + Tailwind + shadcn/ui library
- **OpenAI**: Used to suggest React patterns, design strategies, and to break development into manageable steps.
- **Rapid iteration**: Lovable’s chat-based “AI edit” workflow handled boilerplate, refactors, and even layout fine-tuning live.
- **Integration discovery**: Lovable/OpenAI were used to plan the snifferjs integration below.

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

- UI and logic by [your name], built with [Lovable](https://lovable.dev) and OpenAI.
- [snifferjs](https://github.com/cyphunk/snifferjs) for API interception (integration pending).
- Icons by [lucide.dev](https://lucide.dev/).
- See LICENSE for terms (please add your license).

---

## Questions

Feel free to open issues or reach out via [Lovable](https://lovable.dev).

---

