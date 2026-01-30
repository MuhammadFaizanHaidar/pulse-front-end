# Pulse Platform – Frontend Assessment Implementation

This document describes what was implemented to complete the Pulse Platform frontend assessment, how the solution aligns with the assessment and framework rules, and how to set up and use the application.

---

## Table of Contents

1. [Overview](#overview)
2. [Assessment Rules & How I Followed Them](#assessment-rules--how-i-followed-them)
3. [What Was Implemented](#what-was-implemented)
4. [Tech Stack & Project Structure](#tech-stack--project-structure)
5. [How to Use / Run the Project](#how-to-use--run-the-project)
6. [API Usage](#api-usage)
7. [Key Files & Responsibilities](#key-files--responsibilities)

---

## Overview

**Pulse** is a market monitoring and smart alerts platform for stocks and crypto. The assessment required building the **frontend only**; the backend API was provided and was **not modified**. The frontend is a React (Vite) app that consumes the backend API to display:

- Dashboard (portfolio summary, top gainers/losers, recent news, active alerts)
- Assets (unified stocks + crypto list with filtering)
- News (with category filter)
- Alerts (grouped by severity)
- Portfolio (summary, allocation chart, value chart, holdings table)

The implementation includes all **core requirements** and the **optional “nice to have”** features from the assessment (loading states, error handling, formatting, sortable/searchable assets, responsive layout, asset detail modal, News/Alerts/Portfolio pages, Recharts, Context API, dark mode, polling).

---

## Assessment Rules & How I Followed Them

### Do not modify the backend

- No backend code was changed. All data comes from the existing API (`/api/portfolio`, `/api/dashboard`, `/api/stocks`, `/api/crypto`, `/api/news`, `/api/alerts`, `/api/portfolio/performance`).

### Do not spend time on MetaMask

- MetaMask integration was left as provided in the layout. No extra work was done on it.

### Work within the existing project structure

- New code was added only under `frontend/src/`:
  - **Pages**: `Dashboard.jsx`, `Assets.jsx`, `News.jsx`, `Alerts.jsx`, `Portfolio.jsx`
  - **Components**: `Layout.jsx` (updated), `LoadingSkeleton.jsx` (new)
  - **Context**: `context/ThemeContext.jsx` (new)
  - **Services**: `api.js` (extended with `getPortfolioPerformance` and optional `VITE_API_URL`)
- Existing routing (`App.jsx`), entry point (`main.jsx`), and config (`vite.config.js`, `tailwind.config.js`) were extended, not replaced.

### Code quality

- **React patterns**: Functional components and hooks only (`useState`, `useEffect`, `useCallback`, `useMemo`, `useContext`).
- **Structure**: One main component per page; shared logic (formatting, filters) kept local or in small helpers.
- **Error handling**: `try/catch` on API calls, error state, and user-facing messages with retry where appropriate (e.g. Dashboard).

### UI/UX

- **Tailwind CSS** used for all styling (no new CSS frameworks).
- **Visual hierarchy**: Clear headings, cards, and sections; green for positive changes, red for negative.
- **Consistency**: Shared card styles, spacing, and dark-mode-aware classes across pages.

### API usage

- All data is fetched via the existing `src/services/api.js` helpers (`getDashboard`, `getPortfolio`, `getStocks`, `getCrypto`, `getNews`, `getAlerts`, `getPortfolioPerformance`). No ad-hoc fetch calls; backend response shapes (`response.data.data` or `response.data` for legacy endpoints) are handled in the pages.

---

## What Was Implemented

### Core (required)

| Requirement | Implementation |
|------------|----------------|
| **Dashboard – Portfolio summary** | Card with total value and change amount/percentage from `/api/portfolio`; green/red for positive/negative. |
| **Dashboard – Top 3 gainers & losers** | Two sections from `/api/dashboard` (`topGainers`, `topLosers`), sliced to 3 each; symbol, name, price, change % with color coding. |
| **Dashboard – Recent 5 news** | List from `/api/dashboard` → `recentNews` (5 items): title, source, timestamp, category badge. |
| **Dashboard – Active 5 alerts** | List from `/api/dashboard` → `activeAlerts` (5 items): message, severity badge (color-coded), timestamp. |
| **Assets – Unified table** | Data from `/api/stocks` and `/api/crypto`; columns: symbol, name, price, change %, volume; green/red for change. |
| **Assets – Filter** | Buttons: **All** / **Stocks Only** / **Crypto Only** to filter the table. |

### Optional (nice to have)

| Feature | Implementation |
|--------|----------------|
| **Loading states** | Skeleton components (`LoadingSkeleton.jsx`): `DashboardSkeleton`, `TableSkeleton`, and generic `Skeleton` used on Dashboard, Assets, News, Alerts, Portfolio. |
| **Error handling** | Error state per page; user-facing message and “Try again” (Dashboard) or static message (others). |
| **Number formatting** | `Intl.NumberFormat` for currency; fixed-decimal formatting for percentages and volume (e.g. 1.5B, 50M). |
| **Icons / visual appeal** | Emojis for section headings (e.g. Portfolio, Top Gainers, News, Alerts) and clear severity/category badges. |
| **Sortable table (Assets)** | Clickable column headers for **Price**, **Change %**, and **Volume**; toggles ascending/descending. |
| **Search (Assets)** | Text input to filter assets by symbol or name (client-side). |
| **Responsive design** | Tailwind breakpoints: table columns hidden on small screens; filter + search stack on mobile; touch-friendly controls. |
| **Asset detail** | Clicking a row opens a modal with symbol, name, type, price, change, volume, sector, market cap. |
| **News page** | Full list from `/api/news`; category dropdown (All, Macro, Technology, Crypto, Earnings, Regulatory, Market). |
| **Alerts page** | Full list from `/api/alerts`; grouped by severity (Critical, High, Medium, Low) with counts. |
| **Portfolio page** | Summary card; Recharts **PieChart** for asset allocation (%), **BarChart** for value per asset; holdings table. |
| **Recharts** | Used on Portfolio: pie (allocation), bar (value by asset). |
| **Context API** | `ThemeContext` for dark/light theme; `ThemeProvider` in `main.jsx`; `useTheme()` in `Layout`. |
| **Transitions** | `transition-colors duration-200` on body and main surfaces; smooth theme and hover transitions. |
| **Dark mode** | Toggle in header (🌙/☀️); class `dark` on `<html>`; preference stored in `localStorage` (`pulse-theme`). |
| **Polling** | Dashboard refetches data every 30 seconds via `setInterval` calling the same fetch function. |

---

## Tech Stack & Project Structure

### Technologies

- **React 18** (functional components, hooks)
- **React Router 6** (client-side routing)
- **Vite** (build and dev server)
- **Tailwind CSS** (styling, including `dark:` with `darkMode: 'class'`)
- **Axios** (API client in `api.js`)
- **Recharts** (PieChart, BarChart on Portfolio page)

### Frontend structure (relevant parts)

```
frontend/
├── index.html
├── vite.config.js          # Dev server, proxy /api → backend
├── tailwind.config.js      # darkMode: 'class', pulse theme colors
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx            # ThemeProvider wraps App
    ├── App.jsx             # Router + routes for /, /assets, /news, /alerts, /portfolio
    ├── index.css           # Tailwind directives + body transition
    ├── components/
    │   ├── Layout.jsx      # Header, sidebar nav, dark mode button, main content area
    │   ├── LoadingSkeleton.jsx  # Skeleton, DashboardSkeleton, TableSkeleton
    │   └── MetaMaskButton.jsx   # (unchanged, as per assessment)
    ├── context/
    │   └── ThemeContext.jsx     # ThemeProvider, useTheme, dark class on <html>
    ├── pages/
    │   ├── Dashboard.jsx   # Portfolio card, gainers/losers, news, alerts; polling
    │   ├── Assets.jsx      # Table, filter, search, sort, detail modal
    │   ├── News.jsx        # News list, category filter
    │   ├── Alerts.jsx      # Alerts grouped by severity
    │   └── Portfolio.jsx   # Summary, allocation pie, value bar, holdings table
    └── services/
        └── api.js          # Axios instance, getDashboard, getPortfolio, getStocks, getCrypto, getNews, getAlerts, getPortfolioPerformance
```

---

## How to Use / Run the Project

### Prerequisites

- **Node.js** v16 or higher  
- **npm** (or yarn)

### Option A: Backend and frontend in the same repo (monorepo-style)

1. **Start the backend** (from the repo root that contains the backend):

   ```bash
   cd backend
   npm install
   npm start
   ```

   The API runs at **http://localhost:5000** (or **http://localhost:5001** if 5000 is in use; see note below).

2. **Start the frontend**:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   Vite runs at **http://localhost:3000** (or the next free port, e.g. 3001, if 3000 is taken).

3. **Proxy**: Ensure `frontend/vite.config.js` proxies `/api` to the same port your backend uses (e.g. `target: 'http://localhost:5001'` if the backend is on 5001).

4. Open **http://localhost:3000** (or the port Vite printed) in the browser.

**Note:** On some systems, port 5000 is used by another service (e.g. macOS AirPlay). If the backend fails with “address already in use”, start it on another port, e.g.:

```bash
PORT=5001 npm start
```

Then set the proxy in `vite.config.js` to `http://localhost:5001`.

### Option B: Frontend only (e.g. separate repo like pulse-front-end)

If the frontend lives in its own repo and the backend runs elsewhere:

1. **Run the backend** from the original assessment repo (as in Option A) and note its URL (e.g. `http://localhost:5001`).

2. **In the frontend repo**, create a `.env` file:

   ```env
   VITE_API_URL=http://localhost:5001
   ```

   (Use the actual backend URL and port.)

3. **Install and run the frontend**:

   ```bash
   npm install
   npm run dev
   ```

4. Open the URL Vite prints (e.g. http://localhost:3000). The app will call the backend at `VITE_API_URL` for all `/api` requests.

### Build for production

```bash
cd frontend
npm run build
```

Output is in `frontend/dist`. Serve that folder with any static host. For production, set `VITE_API_URL` to your deployed backend URL so the built app knows where to send API requests.

### Dark mode

- Use the **🌙 / ☀️** button in the top-right of the header to switch between light and dark theme.
- The choice is stored in `localStorage` under `pulse-theme` and restored on reload.
- The implementation uses Tailwind’s `darkMode: 'class'` and adds/removes the `dark` class on `<html>`.

---

## API Usage

The frontend uses these endpoints via `src/services/api.js`:

| Page / feature | API call | Backend response usage |
|----------------|---------|-------------------------|
| Dashboard – portfolio card | `getPortfolio()` | `response.data.data` → `totalValue`, `totalChange`, `totalChangePercent` |
| Dashboard – gainers, losers, news, alerts | `getDashboard()` | `response.data.data` → `topGainers`, `topLosers`, `recentNews`, `activeAlerts` |
| Assets | `getStocks()`, `getCrypto()` | `response.data` (arrays) for stocks and crypto |
| News | `getNews({ category })` | `response.data.data` (array); optional `category` query param |
| Alerts | `getAlerts()` | `response.data.data` (array) |
| Portfolio – summary & holdings | `getPortfolio()` | `response.data.data` |
| Portfolio – charts | `getPortfolioPerformance()` | `response.data.data` → `assetAllocation`, and portfolio assets for value bar |

- **Wrapped responses** (e.g. `/api/dashboard`, `/api/portfolio`): the actual data is at `response.data.data`.
- **Legacy endpoints** (`/api/stocks`, `/api/crypto`): the array is at `response.data`.

No backend code was changed; only these existing endpoints and response shapes are used.

---

## Key Files & Responsibilities

| File | Responsibility |
|------|----------------|
| `main.jsx` | Renders app with `ThemeProvider` so theme is available everywhere. |
| `App.jsx` | Defines routes: `/`, `/assets`, `/news`, `/alerts`, `/portfolio`. |
| `context/ThemeContext.jsx` | Holds `dark` state, applies `dark` class to `<html>`, persists to `localStorage`, exposes `toggleTheme`. |
| `components/Layout.jsx` | Shell: header (logo, theme toggle, MetaMask), sidebar nav, main content area; uses `useTheme()`. |
| `components/LoadingSkeleton.jsx` | Reusable skeleton UI for loading states. |
| `services/api.js` | Axios instance; base URL from `VITE_API_URL` when set; exports all API helpers. |
| `pages/Dashboard.jsx` | Fetches portfolio + dashboard; shows portfolio card, top 3 gainers/losers, 5 news, 5 alerts; 30s polling; loading/error UI. |
| `pages/Assets.jsx` | Fetches stocks + crypto; filter (All/Stocks/Crypto), search, sortable columns, responsive table, row-click modal. |
| `pages/News.jsx` | Fetches news with optional category; category dropdown; list with source, timestamp, impact/category badges. |
| `pages/Alerts.jsx` | Fetches alerts; groups by severity; lists message, severity badge, timestamp, “Action required” when present. |
| `pages/Portfolio.jsx` | Fetches portfolio + performance; summary card; Recharts pie (allocation) and bar (value); holdings table. |
| `vite.config.js` | Dev server port and proxy for `/api` to backend. |
| `tailwind.config.js` | `darkMode: 'class'` and custom `pulse` colors. |

---
