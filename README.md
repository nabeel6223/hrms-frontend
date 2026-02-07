🧑‍💼 Admin Dashboard – Frontend (React.js)

A modern Admin Dashboard web application built using React.js (v19) for managing employee data, payroll timelines, leave tracking, employee requests, and birthdays.
The project demonstrates scalable frontend architecture, reusable components, API integration using mock JSON data, authentication flow, and clean UI design using Material UI and Tailwind CSS.
⚠️ This project uses mocked backend APIs returning sample JSON data for demonstration purposes.

Live Demo: https://wisemonk-dashboard.netlify.app

**🚀 Features**
```bash
🔐 Authentication (Login Flow with Encrypted Payload)
📊 Dashboard Overview
👥 Employee Summary Module
💰 Payroll Timeline Visualization
🗓 Leave Management
📩 Requests Management
🎂 Employee Birthday Tracker
🧭 Sidebar Navigation with Context State
⚡ Data Fetching & Caching with React Query
🧩 Modular & Reusable Components
⏳ Loading Skeletons and Spinners
🎨 Material UI + Tailwind Styling
📱 Responsive Layout
```

**🛠 Tech Stack**
Core
-React.js v19
-Vite
-JavaScript (ES6+)

UI & Styling
-Material UI (MUI)
-Emotion (Styled Components)
-Tailwind CSS
-MUI Icons
-SVGR (SVG as React Components)

State & Forms
-React Context API
-React Hook Form

Networking & Utilities
-Axios
-TanStack React Query
-CryptoJS (Payload Encryption)

Routing
-React Router DOM v7

**📦 Installed Packages**
```bash
"@emotion/react": "^11.14.0",
"@emotion/styled": "^11.14.1",
"@mui/icons-material": "^7.3.7",
"@mui/material": "^7.3.7",
"@tailwindcss/vite": "^4.1.18",
"@tanstack/react-query": "^5.90.20",
"axios": "^1.13.3",
"crypto-js": "^4.2.0",
"react": "^19.2.0",
"react-dom": "^19.2.0",
"react-hook-form": "^7.71.1",
"react-router-dom": "^7.13.0",
"vite-plugin-svgr": "^4.5.0"
```

**🔗 Backend Dependency (Mock API)**

This frontend application is designed to consume APIs from a Node.js backend service.
Backend Repo: https://github.com/nabeel6223/wisemonk-backend

Currently:
✅ Backend APIs return mock JSON data
✅ No database integration is required
✅ Payloads simulate real-world API contracts
✅ Authentication is mocked for demo purposes

Default Backend Base URL:
http://localhost:9090(local)
https://wisemonk-backend.onrender.com(hosted)

Make sure the backend server is running before starting the frontend application.

**📂 Project Structure**
```bash
src/
│
├── api/
│   ├── auth.js            # Authentication APIs
│   ├── employee.js        # Employee APIs
│   ├── holidays.js        # Holiday APIs
│   └── payroll.js         # Payroll APIs
│
├── assets/                # Static assets
│
├── auth/
│   ├── components/        # Auth reusable components
│   └── pages/             # Login pages
│
├── context/
│   └── SidebarContext.jsx # Sidebar global state
│
├── dashboard/
│   ├── components/        # Dashboard reusable components
│   └── pages/             # Dashboard screens
│
├── Header/
│   ├── HeaderDashboard.jsx
│   └── HeaderLogin.jsx
│
├── icons/                 # SVG icons
│
├── loader/
│   ├── CardShimmer.jsx    # Skeleton loaders
│   ├── Loader.jsx         # Global loader
│   └── styles.css
│
├── Sidebar/
│   ├── Sidebar.jsx
│   └── styles.css
│
├── utils/                 # Utility helpers
│
├── App.jsx                # Application root
└── App.css
```
**⚙️ Installation & Setup**
1️⃣ Clone Repository
git clone https://github.com/nabeel6223/wisemonk-frontend
cd wisemonk-frontend

2️⃣ Install Dependencies
npm install

3️⃣ Start Backend Server
Ensure the backend server is running locally:
http://localhost:9090

4️⃣ Run Frontend Application
npm run dev

Application will be available at:

http://localhost:5173

**🔐 Authentication**
Login flow uses mocked API responses.
Credentials validation is simulated.
Request payload encryption is implemented using CryptoJS.

**🔄 Data Fetching Strategy**
API logic is centralized inside /src/api.
Network requests handled using Axios.
Server state management and caching using React Query.

🧪 Mock Data
All backend APIs return sample JSON data for demo purposes.
This allows frontend development without dependency on real backend services or databases.
