Gamified Coding Dashboard
This is a full-stack gamified dashboard designed to make daily coding practice visually immersive and rewarding. It integrates with LeetCode, tracks user progress, assigns daily problems, awards XP, unlocks achievements, and evolves the theme dynamically like a game.

🔧 Tech Stack
React + Vite + Tailwind CSS (Frontend)

Node.js + Express (Backend)

Firebase (Auth + Firestore)

TMDb API (for dynamic backgrounds, optional)

Framer Motion (UI animation)

LeetCode GraphQL scraping (user stats)

🚀 Features
✅ Google Authentication (Firebase)
✅ LeetCode integration (auto-fetch username, XP, solved count)
✅ Daily XP-based problem assignment
✅ XP tracking, streak system
✅ Dynamic level progression
✅ Video background themes based on XP level (God of War, Elden Ring, Sekiro, etc.)
✅ Manual theme override selector
✅ Achievements & badges (e.g., 100 XP, 3-day streak)
✅ Firefly particle animation for ambiance
✅ Sidebar navigation (Progress, Badges, Skill Tree)
✅ Smooth scrolling and responsive UI
🚧 Skill Tree system (placeholder, extendable)

📦 Project Setup
Clone the repo:

bash
Copy
Edit
git clone https://github.com/your-username/gamified-dashboard.git
cd gamified-dashboard
Install dependencies:

bash
Copy
Edit
# For frontend
cd client
npm install

# For backend
cd ../server
npm install
Set up Firebase:

Create a Firebase project

Enable Authentication (Google)

Enable Firestore Database

Copy config to client/firebase/config.js

client/firebase/config.js:

js
Copy
Edit
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "XXXXXXX",
  appId: "XXXXXXX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
Set environment variables in .env:

client/.env
VITE_FIREBASE_API_KEY=your_key
...

server/.env (if needed for LeetCode or CORS proxy)

Start the project:

bash
Copy
Edit
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
📁 Folder Structure
client/
├── components/
│ ├── Auth/
│ ├── Dashboard/
│ ├── SkillTree/
│ └── Visuals/
├── context/
├── firebase/
├── hooks/
├── App.jsx
└── main.jsx

server/
├── index.js
└── routes/leetcode.js

💡 Future Ideas
XP store to unlock visual upgrades

Multiplayer leaderboard

Discord/Slack integration for XP updates

Custom daily goal setting