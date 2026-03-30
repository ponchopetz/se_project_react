# 👕 What to Wear — React Weather-Based Clothing App

## Related Repositories

- **Backend:** [se_project_express](https://github.com/ponchopetz/se_project_express)

## 📖 Project Description

**What to Wear** is a responsive React application that helps users browse clothing items based on current weather conditions.  
Users can preview clothing items, view detailed images in a modal, and add new garments through a form-driven interface.

The project focuses on **component-based architecture**, **state-driven UI**, and **real-world frontend patterns**, simulating how modern React applications are built, extended, and maintained.

---

## ✨ Functionality

- Fetches live weather data from an external API
- Determines weather type (hot, warm, cold) and day/night state
- Displays a weather-specific visual card
- Filters clothing items based on current weather
- Opens a **preview modal** when a clothing card is clicked
- Opens a **form modal** to add new garments
- Supports closing modals via:
  - close button
  - clicking outside the modal
  - pressing the `ESC` key
- Responsive header with mobile navigation menu

---

## 🧠 Technologies & Strategies Used

### **Core Technologies**

- **React** — Functional components and hooks
- **JavaScript (ES6+)** — Async/await, destructuring, modules
- **HTML5** — Semantic, accessible markup
- **CSS3** — Flexbox, media queries, transitions
- **Vite** — Fast dev server and optimized builds
- **Git & GitHub** — Version control and deployment
- **Prettier** — Automated, consistent code formatting

---

### **React & Architecture Patterns**

- **Component-based design** for scalability and reuse
- **Unidirectional data flow** using props
- **Local state management** with `useState`
- **Side effects & lifecycle control** using `useEffect`
- **Custom hooks** to share modal behavior across components
- **Separation of concerns** between UI, logic, and data processing

---

### **API & Data Handling**

- External weather data fetched from **OpenWeather API**
- Dedicated API utility layer (`weatherApi.js`)
- Weather data normalization via a processing function
- Day/night detection using sunrise/sunset timestamps
- Defensive defaults for missing or unsupported weather conditions

---

### **UI / UX Strategies**

- Controlled modals with smooth open/close transitions
- Outside-click and keyboard (`ESC`) accessibility support
- Responsive header with a mobile-friendly navigation menu
- Conditional rendering for mobile vs desktop layouts
- Cursor feedback and visual affordances for interactive elements

---

### **Code Quality & Maintainability**

- Reusable helper functions and constants
- Clean folder structure organized by feature
- Avoidance of duplicated logic through shared utilities
- Predictable state updates and explicit event handling

---

## 🚀 Live Deployment

👉 **GitHub Pages:**  
https://ponchopetz.github.io/se_project_react/

---

## Project Pitch Video

Check out [this video](https://www.loom.com/share/520eae18aad24ae3a3a33a6294cc0842), where I describe my
project and some challenges I faced while building it.

---

## 🛠️ Installation & Setup

Clone the repository:

```bash
git clone https://github.com/ponchopetz/se_project_react.git
cd se_project_react
npm install
npm run dev
```
