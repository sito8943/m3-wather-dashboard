# Weather Dashboard (React + TypeScript + Vite)

Small weather dashboard that lets you add multiple locations and view the current temperature and conditions using Open‑Meteo. Forecasts are persisted locally and can be refreshed, edited, or removed.

**Features**
- Add forecasts: Provide name, latitude, longitude, and optional API URL.
- Current conditions: Shows current temperature (°C) and a readable weather description.
- Visual cues: Card background color adapts to the current weather.
- Manage: Edit a forecast, delete one, or clear all with a single click.
- Refresh: One‑click refresh updates all cards to “now”.
- Local persistence: Saved in `localStorage` using a configurable key.

**Tech Stack**
- React 19, TypeScript, Vite 7
- Tailwind CSS 4
- react‑hook‑form
- Font Awesome (icons)
- Open‑Meteo client (`openmeteo`)

**Getting Started**
- Prerequisites: Node.js 18+ recommended.
- Install: `npm install`
- Dev server: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`
- Preview build: `npm run preview`

**Environment**
- Create a `.env` file with:
  - `VITE_FORECASTS_LOCAL_KEY="local.forecasts"`
- Used by `src/config.ts:1` to name the storage bucket.

**Usage**
- Add a forecast using the “+” button in the header.
  - Enter a friendly name, latitude, longitude, and optional custom URL.
  - Default URL is Open‑Meteo: `https://api.open-meteo.com/v1/forecast`.
- Each card shows:
  - Current temperature (°C) and weather description in English.
  - A subtle background color matching the weather.
  - Edit and Delete actions (with tooltips).
- Refresh all by clicking the circular arrow in the header; cards refetch and re‑compute to the nearest hour.
- Clear all forecasts via the trash button in the header.

**Architecture Overview**
- Data fetch: `src/lib/openmeteo.ts:1`
  - `fetchHourlyTemperature(params)` queries Open‑Meteo and maps hourly arrays: time, temperature_2m, weathercode.
- Domain types: `src/lib/types.ts:1`
- Local state: `src/store/useForecasts.tsx:1`
  - Manages add/update/remove, get by id, and persists to `localStorage`.
- UI
  - Header and dialogs: `src/components/Header/Header.tsx:1`, `src/components/Dialogs/*`
  - Grid + cards: `src/components/Grid/*`, `src/components/WeatherCard/WeatherCard.tsx:1`
  - Weather helpers: `src/components/WeatherCard/utils.ts:1` (text and background mapping)
- View: `src/views/Home.tsx:1`

**Notes**
- Temperature and condition are derived by finding the hourly entry closest to the current time.
- You can customize background colors in `src/index.css:1` (`.weather-*` classes).
- If you prefer imperial units or more variables, extend `fetchHourlyTemperature` and the card mapping.

**License**
- MIT

