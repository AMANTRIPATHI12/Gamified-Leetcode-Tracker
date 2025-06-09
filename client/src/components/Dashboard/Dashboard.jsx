import { useAuth } from "../../context/AuthContext";
import { useLeetCodeSync } from "../../hooks/useLeetCodeSync";
import useUserStats from "../../hooks/useUserStats";
import useAssignedProblems from "../../hooks/useAssignedProblems";
import useThemeBackground, { getAvailableThemes } from "../../hooks/useThemeBackground";
import useBadges from "../../hooks/useBadges";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import "../../components/Visuals/fireflies.css";
import Fireflies from "../../components/Visuals/Fireflies";

// Sidebar component
const Sidebar = ({ isOpen, toggle, setActiveView }) => {
  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      exit={{ x: -300 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="fixed top-0 left-0 h-full w-64 bg-black/80 backdrop-blur-sm z-30 p-6"
    >
      <h2 className="text-2xl font-bold mb-6">Menu</h2>
      <ul className="space-y-4 text-lg">
        <li>
          <button onClick={() => { setActiveView("progress"); toggle(); }} className="hover:text-lime-400">Progress</button>
        </li>
        <li>
          <button onClick={() => { setActiveView("badges"); toggle(); }} className="hover:text-lime-400">Badges</button>
        </li>
        <li>
          <button onClick={() => { setActiveView("skills"); toggle(); }} className="hover:text-lime-400">Skill Tree</button>
        </li>
      </ul>
      <button onClick={toggle} className="mt-10 text-red-400 hover:underline">
        Close
      </button>
    </motion.aside>
  );
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  useLeetCodeSync(user?.uid);

  const { xp, streak, level, nextLevelXP, progressPercent } = useUserStats(user?.uid);
  const problems = useAssignedProblems(level) || [];
  const badges = useBadges(xp, streak) || [];

  const [theme, setTheme] = useState(localStorage.getItem("theme_override") || "auto");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("progress"); // ✅ Move inside component

  useEffect(() => {
    localStorage.setItem("theme_override", theme);
  }, [theme]);

  const videoPath = useThemeBackground(level);
  const displayName = user?.displayName ? user.displayName.split(" ")[0] : "User";

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Firefly Effect */}
      <Fireflies count={30} />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggle={() => setSidebarOpen(false)}
        setActiveView={setActiveView}
      />

      {/* Overlay Content */}
      <div className="relative z-10 p-6 min-h-screen">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl bg-black/30 font-bold drop-shadow-lg">
            Welcome, {displayName} 👋
          </h1>

          <div className="flex items-center space-x-4">
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="bg-black text-white px-3 py-1 rounded"
            >
              {getAvailableThemes().map((t) => (
                <option key={t} value={t}>
                  {t === "auto" ? "Auto Theme" : t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>

            <button
              onClick={() => setSidebarOpen(true)}
              className="bg-white/20 px-3 py-1 rounded hover:bg-white/30 text-white"
            >
              ☰ Menu
            </button>

            <button
              onClick={logout}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main View Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeView === "progress" && (
            <>
              {/* Profile */}
              <div className="bg-black/30 p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-2 drop-shadow">Profile</h2>
                <p className="drop-shadow">Email: {user?.email}</p>
                <p className="drop-shadow">LeetCode: {user?.leetcodeUsername || "Loading..."}</p>
              </div>

              {/* XP & Progress */}
              <div className="bg-black/30 p-4 rounded shadow md:col-span-2">
                <h2 className="text-xl font-bold mb-2 drop-shadow">Progress</h2>
                <p className="drop-shadow">XP: {xp}</p>
                <p className="drop-shadow">Level: {level}</p>
                <p className="drop-shadow">Streak: {streak} 🔥</p>
                <div className="mt-2 bg-gray-700 h-4 rounded">
                  <div
                    className="bg-green-400 h-4 rounded transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-sm text-gray-300 mt-1 drop-shadow">
                  {xp}/{nextLevelXP} XP to Level {level + 1}
                </p>
              </div>

              {/* Problems */}
              <div className="bg-black/30 p-4 rounded shadow md:col-span-3">
                <h2 className="text-xl font-bold mb-2 drop-shadow">Today's Assigned Problems</h2>
                {problems.length === 0 ? (
                  <p className="drop-shadow text-gray-400">No problems assigned yet.</p>
                ) : (
                  <ul className="list-disc ml-6 space-y-1">
                    {problems.map((p, i) => (
                      <li key={i}>
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-lime-300 underline drop-shadow"
                        >
                          {p.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}

          {activeView === "badges" && (
            <div className="bg-white/10 p-4 rounded shadow md:col-span-3">
              <h2 className="text-xl font-bold mb-2 drop-shadow bg-black/30 px-2 py-1 rounded inline-block">
                Achievements & Badges
              </h2>
              {badges.length === 0 ? (
                <p className="drop-shadow bg-black/20 px-2 py-1 rounded inline-block">
                  No badges yet — keep solving!
                </p>
              ) : (
                <div className="flex flex-wrap gap-4">
                  {badges.map((badge, index) => (
                    <div
                      key={index}
                      className="bg-black/30 px-4 py-2 rounded shadow text-center min-w-[120px]"
                    >
                      <div className="text-2xl">{badge.icon}</div>
                      <div className="text-sm font-bold mt-1">{badge.label}</div>
                      <div className="text-xs text-gray-300">{badge.description}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeView === "skills" && (
            <div className="bg-white/10 p-4 rounded shadow md:col-span-3">
              <h2 className="text-xl font-bold mb-2 drop-shadow bg-black/30 px-2 py-1 rounded inline-block">
                Skill Tree
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-green-500/20 border border-green-400 p-3 rounded">
                  <h3 className="font-bold text-lg">XP Boost</h3>
                  <p className="text-sm text-gray-300">+10% XP per day</p>
                  <span className="inline-block mt-2 text-xs bg-green-400 text-black px-2 py-1 rounded">
                    Unlocked
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
