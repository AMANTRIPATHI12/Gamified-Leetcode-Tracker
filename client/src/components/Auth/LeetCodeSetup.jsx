import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";

const LeetCodeSetup = ({ onComplete }) => {
  const { user } = useAuth();
  const [username, setUsername] = useState("");

  const handleSave = async () => {
    if (!username.trim()) return;

    const ref = doc(db, "users", user.uid);

    await setDoc(ref, {
      displayName: user.displayName,
      email: user.email,
      leetcodeUsername: username,
      trackingMode: "fresh", // always fresh
      joinedDate: new Date().toISOString().slice(0, 10),
      xp: 0,
      level: 0,
      streak: 0,
      logs: [],
      lastCheckIn: null,
    });

    onComplete(); // notify parent to reload dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="max-w-md w-full bg-gray-900 p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Enter your LeetCode Username</h2>
        <input
          className="w-full p-2 mb-4 text-white rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. your_leetcode_id"
        />
        <button
          onClick={handleSave}
          disabled={!username.trim()}
          className="w-full bg-lime-500 text-black py-2 rounded hover:bg-lime-600"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default LeetCodeSetup;
