# Helia-Dashboard

A sleek, responsive Property Management dashboard built with React + TypeScript, Tailwind CSS and React Router.
Provides tenant management (fetches tenant data from a webhook) and maintenance issue tracking UI components — ready to extend into a full property management app.

---

## ⭐ Features

* Tenant Management dashboard (cards + detail modal)
* Issues & Maintenance list (table with status & priority)
* Client-side routing with React Router
* Modern UI using Tailwind CSS and lucide-react icons
* Fetches tenant data from a configurable webhook (example: n8n webhook)

---

## 🚀 Quick Start

```bash
# clone
git clone https://github.com/alihassanml/Helia-Dashboard.git
cd Helia-Dashboard

# install
npm install
# or
yarn

# dev
npm run dev
# or
yarn dev
```

App will run on the default Vite/CRA dev server (check your project setup: `package.json` scripts).

---

## Project Structure (important files)

```
src/
  components/
    Home.tsx       # Landing / actions (Rent, Issues)
    Rent.tsx       # Tenant dashboard — fetches webhook data and shows modal details
    Issues.tsx     # Maintenance issues table
  App.tsx
  main.tsx
  index.css
```

---

## 🔧 Important Notes / Environment

### Webhook / API

`Rent.tsx` currently fetches tenant data from this webhook:

```
https://n8n.cloudboticsconsultancy.com/webhook/a0b65aad-f5d8-4848-a77c-dfc6f138d4a2
```

You should make this configurable via an environment variable. Example `.env` (Vite):

```
VITE_TENANTS_WEBHOOK=https://your-webhook-url.example.com
```

Then in code (example):

```ts
const response = await fetch(import.meta.env.VITE_TENANTS_WEBHOOK);
```

### Expected webhook payload (example)

The UI expects a JSON like:

```json
{
  "data": [
    {
      "row_number": 2,
      "Name": "Ali Hassan",
      "Email": "alihassanbscs99@gmail.com",
      "Phone": 3048630925,
      "Zip Code": 54000,
      "Employ Status": "Employed",
      "Monthly Income": "Above 10k",
      "Rental History": "Excellent",
      "Amount": 1200,
      "Due Date": "2025-10-01",
      "Email Sent": "SENT",
      "References": "Yes",
      "Summary": "Applicant summary..."
    }
  ]
}
```

Adjust mapping in `Rent.tsx` if your webhook returns different field names.

---

## ✅ Fixes / Improvements included in this repo

* Replace icon import for `Home` with the actual `Home` component in `App.tsx`:

  ```diff
  - import { Home } from "lucide-react";
  + import Home from "./components/Home";
  ```
* Use React Router `useNavigate()` instead of undefined `setCurrentPage(...)` handlers in components. Replace calls like:

  ```diff
  - onClick={() => setCurrentPage('rent')}
  + onClick={() => navigate('/rent')}
  ```

(These fixes may already be applied in your local copy — verify.)

---

## 🛠️ Dev Tips

* Components are written in TypeScript (`.tsx`). Add stronger types for tenants and issues to improve safety.
* Use Tailwind JIT for fast styling. Ensure `tailwind.config.js` content paths include `src/**/*.{ts,tsx,js,jsx}`.
* Replace hard-coded webhook URL with an env var for security and ease of deployment.
* Add error handling and retry/backoff logic for network requests.
* Add unit tests for components with React Testing Library + Vitest / Jest.

---

## ♻️ Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make changes and commit with clear message
4. Open a PR describing the changes

Prefer small commits and feature branches. Follow semantic commit messages if possible.

---

## 📝 Coding Conventions

* Use functional components + hooks.
* Keep components small and focused — split large components into smaller presentational + container parts.
* Keep UI presentational logic in components; data fetching in top-level container or use React Query when scaling.

---

## 📷 Screenshots

*(Add screenshots here — place images in `docs/` or `.github/assets/` then reference in this README with relative paths.)*

```md
![Home screen](./.github/assets/home.png)
![Rent dashboard](./.github/assets/rent.png)
![Issues table](./.github/assets/issues.png)
```

---

## 🚢 Deployment

* Static hosting: Vercel, Netlify — set environment variable `VITE_TENANTS_WEBHOOK`.
* Containerized: Build production assets (`npm run build`) and serve with any static server.

---

## 📄 License

MIT — see `LICENSE` (add one if missing).

---

## Contact / Author

Ali Hassan — feel free to open issues or PRs on the repo.

