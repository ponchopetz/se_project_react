# What to Wear — Full-Stack Weather-Based Clothing App

A full-stack React application that recommends clothing based on live weather data. Users can register, log in, manage their wardrobe, like items, and edit their profile. The frontend communicates with a custom REST API backed by MongoDB.

**Backend repository:** [se_project_express](https://github.com/ponchopetz/se_project_express)

---

## Features

- Live weather data from OpenWeather API with automatic geolocation
- JWT-based authentication: register, log in, persistent sessions via localStorage
- Protected routes — unauthorized users are redirected away from `/profile`
- Add, view, and delete clothing items (owner-only deletion enforced)
- Like / unlike items with real-time state updates
- Edit profile name and avatar URL
- Responsive layout with mobile navigation menu
- Modals close on outside click, Escape key, or close button

---

## Tech Stack

### Frontend

- **React 18** — functional components, hooks (`useState`, `useEffect`, `useContext`, `useRef`)
- **React Router v6** — client-side routing with protected route pattern
- **Vite** — dev server and production build tooling
- **CSS3** — BEM methodology, Flexbox, responsive design with media queries
- **Context API** — global current user state shared across component tree

### Backend

- **Node.js / Express** — RESTful API with JWT auth, rate limiting, Helmet security headers
- **MongoDB / Mongoose** — document storage with schema validation
- **bcryptjs** — password hashing
- **jsonwebtoken** — token signing and verification

### Patterns & Practices

- Custom hooks: `useForm` (controlled form state + validation), `useModalClose` (Escape + outside click)
- Unidirectional data flow — all state mutations handled in `App`, passed down via props
- Token-protected API calls with `Authorization: Bearer` header
- BEM naming convention throughout CSS

---

## Running Locally

Requires the [backend](https://github.com/ponchopetz/se_project_express) running on `localhost:3001`.

```bash
git clone https://github.com/ponchopetz/se_project_react.git
cd se_project_react
npm install
npm run dev
```
