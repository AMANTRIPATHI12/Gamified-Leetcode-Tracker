import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { db } from "./firebase/config";
import { doc, getDoc } from "firebase/firestore";

import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Auth/Login";
import LeetCodeSetup from "./components/Auth/LeetCodeSetup";

function App() {
  const { user } = useAuth();
  const [showSetup, setShowSetup] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const checkUserProfile = async () => {
      if (!user) return;
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      setShowSetup(!snap.exists());
      setLoaded(true);
    };

    if (user) {
      checkUserProfile();
    } else {
      setLoaded(true);
    }
  }, [user]);

  if (!loaded) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <Login />
            ) : showSetup ? (
              <LeetCodeSetup onComplete={() => setShowSetup(false)} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            !user ? (
              <Navigate to="/" />
            ) : showSetup ? (
              <LeetCodeSetup onComplete={() => setShowSetup(false)} />
            ) : (
              <Dashboard />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
