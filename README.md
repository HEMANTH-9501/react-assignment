# Employee Insights Dashboard (ReactJS Assignment)

A modern, production-ready React 18 application implementing the assignment requirements:

- Authentication with Context API
- Protected routes using React Router v6
- Employee list, details, photo capture, chart, and map pages
- Axios for API calls
- Recharts for bar chart visualization
- React Leaflet + OpenStreetMap for map
- Tailwind CSS for a clean, responsive UI
- Custom hooks, reusable components, toasts, dark/light theme, and more

---

## Tech Stack

- **React 18** (functional components + hooks only)
- **Vite** for fast dev/build
- **React Router v6** for routing
- **Axios** for HTTP requests
- **Recharts** for bar chart visualization
- **React Leaflet + Leaflet** for maps (OpenStreetMap tiles)
- **Tailwind CSS** for styling & layout
- **Context API** for authentication, theme, employee data, toasts

---

## Folder Structure

```text
src/
  App.jsx
  main.jsx
  index.css
  components/
    common/        # Reusable UI pieces (buttons, modals, toasts, etc.)
    layout/        # Shared layout (navbar, page container)
    list/          # List-specific components
    details/       # Details page components (camera)
  pages/           # Route-level pages (login, list, details, photo, chart, map)
  context/         # Auth, theme, employees, toasts
  services/        # Axios instance
  hooks/           # Custom hooks (useApi, useAuth)
  utils/           # Formatting and employee helpers
```

---

## Setup & Run Instructions

1. **Clone or copy the project folder**

   ```bash
   cd react-assign
   ```

2. **Install dependencies**

   Make sure you have Node.js 18+ installed.

   ```bash
   npm install
   ```

3. **Start the dev server**

   ```bash
   npm run dev
   ```

   Open the URL printed in the terminal (usually `http://localhost:5173`).

4. **Login credentials**

   - Username: `testuser`
   - Password: `Test123`

5. **Build for production**

   ```bash
   npm run build
   ```

6. **Preview production build**

   ```bash
   npm run preview
   ```

---

## App Behavior Overview

- **Login (`/`)**
  - Validates username/password.
  - On success, stores auth state in Context + `localStorage`, redirects to `/list`.
  - Includes password visibility toggle and loading spinner.

- **List Page (`/list`)**
  - On mount, calls:

    ```http
    POST https://backend.jotish.in/backend_dev/gettabledata.php
    {
      "username": "test",
      "password": "123456"
    }
    ```

  - Displays employees in modern cards.
  - Search by name or city, sort by name/city/salary.
  - Optional pagination (8 per page).
  - Each card is clickable → `/details/:id`.
  - Buttons to view **Salary Chart** (`/chart`) and **Map** (`/map`).
  - Logout in navbar.

- **Details Page (`/details/:id`)**
  - Reads employee from global employee state (Context).
  - If direct navigation and state is missing, instructs user to load `/list`.
  - Shows all fields in a clean definition list.
  - Includes **Capture Photo** area:
    - Uses `navigator.mediaDevices.getUserMedia`.
    - Live camera preview.
    - Capture to canvas → base64.
    - Navigates to `/photo` with image + employee info in `location.state`.

- **Photo Result (`/photo`)**
  - Shows captured image and employee name.
  - Allows **download** and **retake**.
  - Handles missing state gracefully by redirecting back.

- **Chart (`/chart`)**
  - Uses first 10 employees from state.
  - Plots salaries in a responsive Recharts bar chart.
  - Tooltip shows formatted currency.
  - If salary fields are not numeric, shows explanatory message.

- **Map (`/map`)**
  - Uses React Leaflet with OpenStreetMap tiles.
  - Attempts to read `lat`/`lng` (or similar) fields from API.
  - If coordinates exist, plots markers with employee name + city popups.
  - If not, displays a friendly message explaining that coordinates are absent.

- **Protected Routes**
  - All pages except `/` are protected.
  - Unauthenticated access redirects to `/`.

- **Dark/Light Theme**
  - Toggle in navbar.
  - Persists in `localStorage`.
  - Uses Tailwind `dark` mode classes.

- **Toasts**
  - Custom toast context and component for success/error/info notifications.

---

## Sample Screenshots (Placeholders)

You can capture screenshots and place them in a `screenshots/` folder:

- `screenshots/login.png`
- `screenshots/list.png`
- `screenshots/details.png`
- `screenshots/photo.png`
- `screenshots/chart.png`
- `screenshots/map.png`

Then reference them here:

```md
![Login Screen](screenshots/login.png)
![Employee List](screenshots/list.png)
...
```

---

## Recording Screen (Assignment Instructions)

To record your screen while using the app:

1. Use any screen recorder (e.g. OBS Studio, Loom, Windows Game Bar).
2. Start recording before opening `npm run dev` and your browser.
3. Demonstrate:
   - Login flow (valid and invalid attempts).
   - Employee list search, sorting, pagination.
   - Details page and camera capture.
   - Photo result page (download/retake).
   - Salary chart and map pages.
   - Dark/light theme toggle and logout.
4. Stop recording and export as MP4 (or your preferred format).

---

## Deployment Instructions (Netlify / Vercel)

### Netlify

1. Create a new site on Netlify.
2. Connect your Git repository or drag-and-drop the built folder.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. (Optional) Set SPA routing redirects:

   - Create a file `public/_redirects` with:

     ```txt
     /* /index.html 200
     ```

### Vercel

1. Import your project in Vercel.
2. Framework preset: **Vite** or **Other** with:
   - Build command: `npm run build`
   - Output directory: `dist`
3. Deploy.
4. Vercel automatically handles SPA routing.

---

## Notes

- The backend API schema is not documented publicly; the app includes flexible helpers that attempt to infer common field names for IDs, names, cities, salaries, and coordinates.
- Once your backend exposes consistent fields (e.g. `emp_id`, `emp_name`, `city`, `salary`, `lat`, `lng`), the UI will automatically render better labels, chart data, and map markers.

